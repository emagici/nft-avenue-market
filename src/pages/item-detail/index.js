import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../components/dropdown";
import qs from "qs";
import { Accordion, AccordionItem, AccordionPanel } from '../../components/accordion'
import Web3 from "web3";
import axios from "axios";
import Modal from "../../components/modal";
import ItemHistoryRow from "./item-history-row";
import PurchasedModal from "./purchased-modal";

import { ThumbUpIcon, ClipboardCopyIcon } from "@heroicons/react/solid";

import { SharedContext } from '../../context/shared-context';
import { UserContext } from '../../context/user-context'
import { Web3Context } from '../../context/web3-context'
import {
  MARKETPLACE_ABI,
  MARKETPLACE_ADDRESS,
} from "../../contracts/FomoMarketPlace";
import {
  GENERICNFT_ABI
} from "../../contracts/GenericNFT";
import {
  GENERIC_TOKEN_ABI
} from "../../contracts/GenericToken";
import {
  tokenTypes,
  fomoTokenAddress,
  getPayTokenFromListing,
  getPayTokenDetailByAddress,
  listingFeeToken,
} from "../../utilities/utils";

import {
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

import AppUrls from '../../AppSettings';

const tabs = [
  { name: 'Info', href: '#', current: true },
  // { name: 'Creator', href: '#', current: false },
  { name: 'History', href: '#', current: false },
  { name: 'Transfer', href: '#', current: false },
];

// const listingTypes = ["Fixed Price", "Timed Auction", "Open For Offers"];
const listingTypes = ["Fixed Price"];
const listingLengths = [3, 7, 14, 30];

const user = {
  name: "",
  profilePictureUrl: "",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};


export default function ItemDetail(props) {
  const location = useLocation();

  const [makeOfferModalOpen, setMakeOfferModalOpen] = useState(false);
  const [tokenid, setTokenId] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftVideoSrc, setVideoNftSrc] = useState("");
  const [nftImageSrc, setImageNftSrc] = useState("");
  const [web3, setWeb3] = useState();
  const [marketplaceContract, setMarketplaceContract] = useState();
  const [myAdd, setMyadd] = useState();
  const [activeTab, setActiveTab] = useState("Info");
  const [isOwner, setIsOwner] = useState(false);
  const [nftQuantityOwned, setNftQuantityOwned] = useState(0);
  const [ListPrice, setListPrice] = useState(0);
  const [ListQuantity, setListQuantity] = useState(0);
  const [ListingToken, setListingToken] = useState(fomoTokenAddress);
  const [isItemListed, setIsItemListed] = useState(false);
  const [listingType, setListingType] = useState("Fixed Price");
  const [listingLength, setListingLength] = useState(7);
  const [shareUrl, setShareUrl] = useState(null);

  const [showPurchasedModal, setShowPurchasedModal] = useState(false)

  const [offerLength, setOfferLength] = useState(7);
  const [offerQuantity, setOfferQuantity] = useState(1);
  const [offerPricePerItem, setOfferPricePerItem] = useState(0);
  const [offerToken, setOfferToken] = useState(fomoTokenAddress);

  const [listings, setlistings] = useState([]);
  const [offers, setOffers] = useState([]);
  const [history, setHistory] = useState([]);

  const [lowestSellerItem, setLowestSellerItem] = useState();

  const [hasLiked, setHasLiked] = useState(false);
  
  const sharedContext = useContext(SharedContext);
  const userContext = useContext(UserContext)
  const web3Context = useContext(Web3Context)

  const getEvent = () =>{
      axios({
        method: "get",
        url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetEvents?contractAddress=${nftAddress}&tokenId=${tokenid}`,
      })
      .then(async function (response) {
        setHistory(response.data.result)
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  const getTokenURI = async () => {

    const ownCurrentNft = userContext.state.ownNfts.find(o => o.TokenId === tokenid && o.NftAddress.toLowerCase() === nftAddress.toLowerCase());

    if(ownCurrentNft){
      setNftQuantityOwned(ownCurrentNft.OwnedNftQuantity)
      setIsOwner(true);
    }

    if(isItemListed){
      getListedNftInfo()
    }
    else{
      getExternalNftInfo()
    }
  };

  const getListedNftInfo = () => {
    getEvent();

    let url = `${appUrls.fomoHostApi}/api/services/app/Nft/GetNftInfoByContractAddress?contractAddress=${nftAddress}&tokenId=${tokenid}`;

    if(userContext.state.id){
      url += `&loggedInUserId=${userContext.state.id}`
    }

    axios({
      method: "get",
      url: url,
    })
    .then(async function (nftListingResponse) {
      console.log(nftListingResponse)

      const nftListingResult = nftListingResponse.data.result;

      setHasLiked(nftListingResult[0].nft.hasLiked);
      setNftDescription(nftListingResult[0].nft.description);
      setNftName(nftListingResult[0].nft.tokenName)
      setImageNftSrc(nftListingResult[0].nft.imageUrl)
      setVideoNftSrc(nftListingResult[0].nft.videoUrl)

      const listingItems = await Promise.all(nftListingResult.map( async (item) => (
        {
          id: item.nft.id,
          TokenId: item.nft.tokenId,
          NftAddress: item.nft.nft,
          TokenName:  item.nft.tokenName,
          owner: item.nft.owner,
          ownerUserId: item.nft.ownerId,
          pricePerItem:  Web3.utils.fromWei(item.nft.pricePerItem.toLocaleString("en-GB").replaceAll(',',''), "ether"),
          quantity: item.nft.quantity,
          sellerName: item.seller.name,
          sellerProfilePic: item.seller.profilePictureUrl,
          payToken: await getPayTokenFromListing(web3, item.nft.nft, item.nft.tokenId, item.nft.owner)
        }
      )));

      const sortedlistingItems = listingItems.sort(function(a, b) {return a.pricePerItem - b.pricePerItem;});
      setLowestSellerItem(sortedlistingItems[0])

      setlistings(listingItems);

      const offerItems = nftListingResult[0].offers.map((item) => (
        {
          TokenId: item.tokenId,
          NftAddress: item.nftAddress,
          creatorAddress: item.creatorAddress,
          pricePerItem:  Web3.utils.fromWei(item.pricePerItem.toLocaleString("en-GB").replaceAll(',',''), "ether"),
          quantity: item.quantity,
          creatorUsername: item.creatorUsername,
          deadline: item.deadline,
          offerTokenName: getPayTokenDetailByAddress(item.payToken).payTokenName
        }
      ))

      setOffers(offerItems);
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  const getExternalNftInfo = () => {
    axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetExternalNftInfo?TokenId=${tokenid}&ContractAddress=${nftAddress}`,
    })
      .then(function (response) {
        const nftDetails = response.data.result;
        setVideoNftSrc(nftDetails.videoUrl)
        setImageNftSrc(nftDetails.imageUrl)
        setNftDescription(nftDetails.description)
        setNftName(nftDetails.tokenName)
        if(nftDetails.hasAnyListing){
          setIsItemListed(true);
          getListedNftInfo();
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  const listItem = async () => {
    if (!web3 || !userContext.state.sign || !web3Context.state.userConnected){
      alert("Please connect wallet and sign in")
      return;
    } 

    if(ListPrice <= 0 || ListQuantity <= 0){
      alert("Please enter price and quantity more than 0");
      return;
    }

    const genericTokenContract = new web3.eth.Contract(GENERIC_TOKEN_ABI, listingFeeToken);
    let currentAllowance = await genericTokenContract.methods.allowance(myAdd, MARKETPLACE_ADDRESS).call();
    const listingFee = await marketplaceContract.methods.listingFee().call();

    if(Number(currentAllowance) < Number(listingFee)){
        await genericTokenContract.methods.approve(MARKETPLACE_ADDRESS, listingFee)
        .send({
          from: myAdd
        })
        .then( async function (result) {
          checkNftApprovalAndList();
        })
        .catch(error => {
        });
    }
    else
      checkNftApprovalAndList();
  };

  const checkNftApprovalAndList = async () => {
    const genericNftContract = new web3.eth.Contract(GENERICNFT_ABI, nftAddress);
    const isApprovedForAll = await genericNftContract.methods.isApprovedForAll(myAdd, MARKETPLACE_ADDRESS).call();

    if(!isApprovedForAll){
        await genericNftContract.methods.setApprovalForAll(MARKETPLACE_ADDRESS, true)
        .send({
          from: myAdd
        })
        .then( async function (result) {
          listItemConfirm();
        })
        .catch(error => {
        });
    }
    else
      listItemConfirm();
  }

  const listItemConfirm = async () => {
    const timestamp = new Date().getTime();
    const timestampInSeconds = Math.trunc(timestamp / 1000);
    const listPriceToSend = Web3.utils.toWei(ListPrice, "ether");

    await marketplaceContract.methods
      .listItem(nftAddress, tokenid, ListingToken, ListQuantity, listPriceToSend, timestampInSeconds, "0x0000000000000000000000000000000000000000")
      .send({ from: myAdd });
  }

  const updateListing = async (newPricePerItem) => {
    await marketplaceContract.methods
      .updateListing(nftAddress, tokenid, 200)
      .send({ from: myAdd });
  };

  const cancelListing = async () => {
    if (!web3 || !userContext.state.sign || !web3Context.state.userConnected){
      alert("Please connect wallet and sign in")
      return;
    } 

    await marketplaceContract.methods
      .cancelListing(nftAddress, tokenid)
      .send({ from: myAdd });
  };

  const acceptOffer = async (offerOwnerAdd) => {
    if (!web3 || !userContext.state.sign || !web3Context.state.userConnected){
      alert("Please connect wallet and sign in")
      return;
    } 

    await marketplaceContract.methods
      .acceptOffer(nftAddress, tokenid, offerOwnerAdd)
      .send({ from: myAdd });
  };

  const createOffer = async () => {
    if (!web3 || !userContext.state.sign || !web3Context.state.userConnected){
      alert("Please connect wallet and sign in")
      return;
    } 

    const genericTokenContract = new web3.eth.Contract(GENERIC_TOKEN_ABI, offerToken);
    let currentAllowance = await genericTokenContract.methods.allowance(myAdd, MARKETPLACE_ADDRESS).call();
    const totalAmount = offerQuantity * offerPricePerItem;
    const totalAmountToSend =  Web3.utils.toWei(totalAmount.toString(), "ether");

    if(Number(currentAllowance) < Number(totalAmountToSend)){
        await genericTokenContract.methods.approve(MARKETPLACE_ADDRESS, totalAmountToSend)
        .send({
          from: myAdd
        })
        .then( async function (result) {
          createOfferConfirm();
        })
        .catch(error => {
        });
    }
    else
      createOfferConfirm();
  };

  const createOfferConfirm = async () => {
    const timestamp = new Date().getTime();
    const timestampInSeconds = Math.trunc(timestamp / 1000);
    var seconds = Number(timestampInSeconds) + (offerLength * 24 * 60 * 60);

    const offerPricePerItemToSend = Web3.utils.toWei(offerPricePerItem.toString(), "ether");

    await marketplaceContract.methods
      .createOffer(nftAddress, tokenid, offerToken ,offerQuantity, offerPricePerItemToSend, seconds)
      .send({ from: myAdd });
  };

  const cancelOffer = async () => {
    if (!web3 || !web3Context.state.userConnected) return;

    await marketplaceContract.methods
      .cancelOffer(nftAddress, tokenid)
      .send({ from: myAdd });
  };

  const buyItem = async (obj) => {
    if (!web3 || !userContext.state.sign || !web3Context.state.userConnected){
      alert("Please connect wallet and sign in")
      return;
    } 

    const genericTokenContract = new web3.eth.Contract(GENERIC_TOKEN_ABI, obj.payToken.payTokenAddress);
    let currentAllowance = await genericTokenContract.methods.allowance(myAdd, MARKETPLACE_ADDRESS).call();
    const totalPrice = obj.pricePerItem * obj.quantity;
    const amountToSend = Web3.utils.toWei(totalPrice.toString(), "ether");

    if(Number(currentAllowance) < Number(amountToSend)){
        await genericTokenContract.methods.approve(MARKETPLACE_ADDRESS, amountToSend)
        .send({ from: myAdd })
        .then( async function (result) {
            buyItemConfirm(obj);
        })
        .catch(error => {
        });
    }
    else
      buyItemConfirm(obj);
  };

  const buyItemConfirm = async (obj) => {
    const totalPrice = obj.pricePerItem * obj.quantity;
    const nftOwnerAdd = obj.owner;
    const amountToSend = Web3.utils.toWei(totalPrice.toString(), "ether");
    
    await marketplaceContract.methods.buyItem(nftAddress, tokenid, amountToSend, nftOwnerAdd)
      .send({ from: myAdd })
      .then( async function (result) {
        setShowPurchasedModal(true)
      })
        .catch(error => {
      });
  };

  useEffect(async () => {
    if (!web3) return;
    getTokenURI();
  }, [myAdd, web3]);

  useEffect(async () => {
    if (!web3) return;
    const accounts = await web3.eth.getAccounts();
    var myadd = accounts[0];
    setMyadd(myadd);
    setMarketplaceContract(
      new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS)
    );
  }, [web3]);

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  useEffect(async () => {
    setWeb3(web3Context.state.web3Data);

    const params = qs.parse(location.search, { ignoreQueryPrefix: true });

    if(params.listed === "true")
      setIsItemListed(true)
    else
      setIsItemListed(false)

    if(params.tokenid)
      setTokenId(params.tokenid)

    if(params.nftaddress)
      setNftAddress(params.nftaddress);
  
    }, []);

    const like = () => {
      isLoading(true);
  
      axios({
        method: "POST",
        url: `${appUrls.fomoHostApi}/api/services/app/UserLikes/Like?itemId=${tokenid}&itemType=0`,
        headers: {
          "Authorization": "Bearer " + userContext.state.accessToken + ""
        }
      })
      .then(function (response) {
        setHasLiked(true);
        // alert("You have liked this item!");
      })
      .catch(function (response) {
        console.log(response);
        alert("Unable to process request!");
      })
      .finally(function(){
        isLoading(false);
      });
    }
  
    const unLike = () => {
      isLoading(true);
  
      axios({
        method: "POST",
        url: `${appUrls.fomoHostApi}/api/services/app/UserLikes/UnLike?itemId=${tokenid}&itemType=0`,
        headers: {
          "Authorization": "Bearer " + userContext.state.accessToken + ""
        }
      })
      .then(function (response) {
        setHasLiked(false);
        // alert("You have unliked this item!");
      })
      .catch(function (response) {
        console.log(response);
        alert("Unable to process request!");
      })
      .finally(function(){
        isLoading(false);
      });
    }
  
    function onLike(e){
      e.preventDefault();
  
      if(!userContext.state.accessToken)
      {
        return;
      }

      like();
    }
  
    function onUnLike(e){
      e.preventDefault();
  
      if(!userContext.state.accessToken)
      {
        return;
      }
      
      unLike();
    }

    function isLoading(state){
      if(state){
        sharedContext.dispatch({
          type: "START_LOADING"
        })
      }
      else{
        sharedContext.dispatch({
          type: "STOP_LOADING"
        })
      }
    }

    const generateShortUrl = async (url) => {
      console.log('getting short url')

      const resp = await axios({
        method: "GET",
        url: `${appUrls.fomoHostApi}/ShareUrl/GetShortUrlForLongUrl?longUrl=${encodeURIComponent(url)}`
      })
      .then(function (response) {
        return response.data.result
      })
      .catch(function (response) {
        console.log('short URL resp');
        console.log(response);
        return null
      })

      return resp
    }
    
    function onCopyLink(e){
      e.preventDefault();
      
      copyToClipboard(shareUrl);
    }

    function copyToClipboard(text) {
      window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }
  
  // generate shortened share link
  useEffect(async () => {
    if (!web3) return

    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (!params.tokenid) return

    const url = `https://staging.theavenue.market${location.search}`;
    const urlTmp = await generateShortUrl(url)
    
    setShareUrl(urlTmp ? urlTmp : null)

  }, [web3])


  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="mt-10 md:grid md:grid-cols-3 gap-x-8">
          <div className="flex justify-center md:justify-end mb-5 md:mb-0">
            <div className="flex-1 max-w-sm">
              <div className="block aspect-w-10 aspect-h-12 rounded-lg bg-gray-100 focus:outline-none overflow-hidden shadow-lg">

                {nftVideoSrc ? (
                  <video
                    autoPlay
                    muted
                    controls
                    loop
                    src={nftVideoSrc}
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <img
                    src={nftImageSrc}
                    alt="nft"
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                )}
              </div>

              <div className="px-1 py-4 flex justify-between items-center">
                <div>
                  {userContext.state.accessToken ? (
                    <button
                      type="button"
                      onClick={(e) => hasLiked ? onUnLike(e) : onLike(e)}
                      className={classNames(
                        hasLiked
                         ? "bg-green-500 hover:bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900",
                         "relative inline-flex items-center justify-center px-3 py-1.5 -ml-1 border border-transparent text-sm font-medium rounded-full shadow-sm focus:outline-none"
                      )}
                    >
                      <span>{hasLiked ? "Unlike" : "Like"}</span>
                      <ThumbUpIcon className="h-5 w-5 ml-1 relative bottom-0.5" />
                    </button>
                  ) : null }
                </div>
                {shareUrl ? (
                  <div className="flex justify-center items-center gap-2">
                    <TwitterShareButton url={`Check out this item on The Avenue! ${shareUrl}`} hashtags={['TheAvenue','FomoLab','NFT','Crypto']} className="hover:opacity-80 transition-opacity shadow-lg rounded-full">
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                    <TelegramShareButton title="Check out this item on The Avenue!" url={shareUrl} className="hover:opacity-80 transition-opacity shadow-lg rounded-full">
                      <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>
                    <WhatsappShareButton title="Check out this item on The Avenue!" url={shareUrl} separator=" - " className="hover:opacity-80 transition-opacity shadow-lg rounded-full">
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                  </div>
                ) : null}
              </div>
              
            </div>
          </div>
          <div className="col-span-2">
            <h1 className="font-bold text-3xl text-center md:text-left mb-4">{nftName}</h1>

            {/* for this section we can check if the item is listed and show current price plus relevant button - e.g, buy now, place bid, make offer, etc */}
            {isItemListed ? (
              <div className="-mt-4 mb-4">
                {lowestSellerItem ? (
                    // <div className="flex gap-x-1 mb-3 justify-center md:justify-start">
                    //   <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-green-500 font-bold text-green-500 truncate pointer-events-none">{lowestSellerItem.pricePerItem} {lowestSellerItem.payToken?.payTokenName}</p>
                    // </div>
                    <div className="flex gap-x-1 mb-3 justify-center md:justify-start">
                      <p className="mt-2 block text-3xl inline font-extrabold text-green-500 pointer-events-none">{lowestSellerItem.pricePerItem} {lowestSellerItem.payToken?.payTokenName}</p>
                    </div>
                ) : null}
                <div className="flex justify-center md:justify-start gap-2">
                  {lowestSellerItem ? (
                    <button
                      type="button"
                      onClick={() => buyItem(lowestSellerItem)}
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none"
                    >
                      <span>Buy Now</span>
                    </button>
                  ) : null}
                  {false ? (
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none"
                    >
                      <span>Place Bid</span>
                    </button>
                  ) : null}
                  {isItemListed ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setMakeOfferModalOpen(true)}
                        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none"
                      >
                        <span>Make Offer</span>
                      </button>

                      {shareUrl ? (
                          <button
                            onClick={(e) => onCopyLink(e)}
                            className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm focus:outline-none sm:left-4"
                          >
                            <span>Copy link</span>
                            <ClipboardCopyIcon
                              className="-mr-1 ml-1 h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </button>
                        ) : null
                      }
                  </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {false ? (
                <div className="flex justify-center md:justify-start space-x-8">
                <div>
                  <p className="mb-2 text-center md:text-left font-bold">Created By</p>
                  <div className="relative flex items-center gap-x-2 mb-5 justify-center md:justify-start">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="min-w-0">
                      <Link to={`/user?id=${user.id}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.role}</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-center md:text-left font-bold">Owned By</p>
                  <div className="relative flex items-center gap-x-2 mb-5 justify-center md:justify-start">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="min-w-0">
                      <Link to={`/user?id=${user.id}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.role}</p>
                      </Link>
                    </div>
                  </div>
                </div>
                </div>
            ) : null}

            {nftDescription ? (
              <div className="pt-2">
                <p className="mb-1 text-center md:text-left font-bold">Description</p>
                <p className="mb-6 text-center md:text-left">{nftDescription}</p>
              </div>
            ) : null}


            {/* DYNAMICALLY SHOW EACH RELEVANT LISTING SECTION AS REQUIRED - E.G, HIDE BUY NOW IF BIDS ONLY SELECTED */}
            <Accordion>

              {/* <AccordionItem toggle="buy-now">Buy Now</AccordionItem>
              <AccordionPanel id="buy-now">
                <div className="px-2 mb-3">
                  <p className="mb-1 text-left font-bold">Price</p>
                  <div className="flex space-x-2 mb-3 items-center">
                    <p className="block text-xl font-bold text-gray-800 truncate pointer-events-none">2.45 BNB</p>
                    <p className="block text-md font-medium text-gray-400 truncate pointer-events-none">($744.20)</p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
              </AccordionPanel> */}

              <AccordionItem toggle="listings">Listings</AccordionItem>
              <AccordionPanel id="listings">
                <div className="px-0">
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="">
                              <tr>
                              <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                >
                                  Token
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                >
                                  Price per item
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                >
                                  From
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Actions</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {listings.map((item) => (
                                <tr key={item.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.payToken.payTokenName}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.pricePerItem}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><Link to={`/profile-info?userId=${item.ownerUserId}`}>{item.sellerName}</Link></td>
                                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><Link to={`/profile-info?userId=${item.ownerUserId}`}><img src={item.sellerProfilePic}/></Link></td> */}
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  {isOwner && item.owner?.toLowerCase() === myAdd?.toLowerCase() ? (
                                      <a onClick={() => cancelListing()} href="#" className="text-indigo-600 hover:text-indigo-900">
                                       Cancel Listing
                                     </a>
                                   ) : (
                                      <a onClick={() => buyItem(item)} href="#" className="font-bold text-indigo-600 hover:text-indigo-900">
                                        Buy Now
                                      </a>
                                   )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionPanel>

              <AccordionItem toggle="offers">Offers</AccordionItem>
              <AccordionPanel id="offers">
              <div className="px-0">
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {offers && offers.length ? (
                          <div className="overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="">
                                <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                  >
                                    Token
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                  >
                                    Price per item
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                  >
                                    Quantity
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                  >
                                    From
                                  </th>
                                  <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {offers.map((item) => (
                                  <tr key={item.creatorAddress}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.offerTokenName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.pricePerItem}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.creatorUsername}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {isOwner ? (
                                        <a onClick={() => acceptOffer(item.creatorAddress)} href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Accept
                                      </a>
                                    ) : null}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold p-2 text-gray-600 mb-2">No open offers for this item.</p>
                            {/* <button
                              type="button"
                              onClick={() => setMakeOfferModalOpen(true)}
                              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none"
                            >
                              <span>Make Offer</span>
                            </button> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-2 mb-4">
                  {false ? (
                    <div>
                      <p className="mb-2">This item is accepting offers. To make an offer use the button below:</p>
                      <button
                        type="button"
                        onClick={() => setMakeOfferModalOpen(true)}
                        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-indigo-600 shadow-sm hover:bg-green-600 focus:outline-none"
                      >
                        <span>Make Offer</span>
                      </button>
                    </div>
                  ) : (null
                    // <div>
                    //   <p className="mb-4">This item is not accepting offers.</p>
                    // </div>
                  )}
                </div>
              </AccordionPanel>
 
              {/* <AccordionItem toggle="price-history">Price History</AccordionItem>
              <AccordionPanel id="price-history">
                <div className="px-2">
                  <p className="mb-4">Price history content here.</p>
                </div>
              </AccordionPanel> */}

            </Accordion>

            {isOwner ? (
              <div className="py-5">
                {/* <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Listing type</p>
                  <Dropdown title="Fixed price" />
                </div> */}

                <div className="space-y-6 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      List Item
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Select from the options below to list your item
                    </p>
                  </div>
                  <div className="space-y-6 sm:space-y-5 border-b border-gray-200 pb-5">

                    {false ? (
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Listing Type
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <select
                                id="listing-type"
                                name="listing-type"
                                value={listingType}
                                onChange={(e) => setListingType(e.target.value)}
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              >
                                {listingTypes.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                    ) : null}

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Token
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                          value={ListingToken}
                          onChange={(e) => setListingToken(e.target.value)}
                          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        >
                          {tokenTypes.map((item) => (
                            <option key={item.tokenAddress} value={item.tokenAddress}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {["Fixed Price"].includes(listingType) ? (
                      
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Price per item
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="listprice"
                            id="listprice"
                            value={ListPrice}
                            onChange={(e) => setListPrice(e.target.value)}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    ) : null}

                    {["Fixed Price"].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Quantity (Available : {nftQuantityOwned})
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="number"
                            name="listquantity"
                            id="listquantity"
                            value={ListQuantity}
                            onChange={(e) => setListQuantity(e.target.value)}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    ) : null}

                    {["Timed Auction"].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Starting Price (BNB)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="start-price"
                            id="start-price"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    ) : null}

                    {["Open For Offers"].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Minimum Offer (BNB)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="min-price"
                            id="min-price"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    ) : null}

                    {["Fixed Price", "Timed Auction"].includes(listingType) && false ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Listing Length (days)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="listing-length"
                            name="listing-length"
                            value={listingLength}
                            onChange={(e) => setListingLength(e.target.value)}
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            {listingLengths.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : null}

                    {["Open For Offers"].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Listing Length (days)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="listing-length"
                            name="listing-length"
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            disabled
                          >
                            <option value="0">Until sold/cancelled</option>
                          </select>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-2 justify-start mt-5">
                  <button
                    onClick={listItem}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none"
                  >
                    <span>List Item</span>
                  </button>
                </div>
              </div>
            ) : null}

            <div className="border-b border-gray-200 mb-3">
              <div className="sm:flex sm:items-baseline">
                <div className="mt-10">
                  <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        href={tab.href}
                        onClick={() => setActiveTab(tab.name)}
                        className={classNames(
                          tab.name === activeTab
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {activeTab === 'Info' ? (
              <div>
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt className="text-sm font-bold text-gray-800">Contract Address</dt>
                    <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                      <a href="#">{nftAddress}</a>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt className="text-sm font-bold text-gray-800">Token ID</dt>
                    <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">{tokenid}</dd>
                  </div>
                  <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt className="text-sm font-bold text-gray-800">Blockchain</dt>
                    <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">BSC</dd>
                  </div>
                </dl>
              </div>
            ) : null}

            {activeTab === 'Creator' ? (
              <div className="pt-3">
                <h1 className="font-bold text-xl mb-3 text-center md:text-left">About CryptoChown</h1>
                <p className="mb-3 text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p className="text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            ) : null}

            {activeTab === 'History' ? (
              <div>
                <div>
                  <ul className="">

                  {history.map((item) => (
                    // console.log(item)
                    <ItemHistoryRow type={item.eventName} userId={item.address1OwnerId} date={item.blockNumber} />

                  ))}

                    {/* <ItemHistoryRow type="bid-accepted" price="1.87" currency="BNB" userId="0xa27be4084d7548d8019931877dd9bb75cc028696" date="17/07/2021, 09:42" />
                    <ItemHistoryRow type="minted" userId="0xa27be4084d7548d8019931877dd9bb75cc028696" date="12/07/2021, 12:12" /> */}
                  </ul>
                </div>
              </div>
            ) : null}

            {activeTab === 'Transfer' ? (
              isOwner ? (
                <div>
                  <p className="mb-3 text-center md:text-left">Transfer ownership of this item to another wallet.</p>
                  <Link
                    to={`/transfer-item?tokenid=${tokenid}&nftaddress=${nftAddress}`}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm"
                  >
                    Transfer
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="mb-3 text-center md:text-left text-sm pt-3">Only the owner of this item can transfer it.</p>
                </div>
              )
            ) : null}
           
          </div>
        </div>

        <Modal
          title="Make an Offer"
          open={makeOfferModalOpen}
          setOpen={(v) => setMakeOfferModalOpen(v)}
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-5">
                </p>
                <div className="flex items-center justify-center px-5 mb-3">
                  <div className="h-5 flex items-center">
                  <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      Token
                    </label>
                  </div>
                  <div className="ml-3 text-sm">
                    <select
                        value={offerToken}
                        onChange={(e) => setOfferToken(e.target.value)}
                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      >
                        {tokenTypes.map((item) => (
                          <option key={item.tokenAddress} value={item.tokenAddress}>
                           {item.name}
                          </option>
                        ))}
                      </select>
                  </div>
                </div>

                <div className="flex items-center justify-center px-5 mb-3">
                  <div className="h-5 flex items-center">
                  <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      Offer Duration
                    </label>
                  </div>
                  <div className="ml-3 text-sm">
                    <select
                        value={offerLength}
                        onChange={(e) => setOfferLength(e.target.value)}
                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      >
                        {listingLengths.map((item) => (
                          <option key={item} value={item}>
                            {item} Days
                          </option>
                        ))}
                      </select>
                  </div>
                </div>

                <div className="flex items-center justify-center px-5 mb-3">
                  <div className="h-5 flex items-center">
                  <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                  </div>
                  <div className="ml-3 text-sm">
                    <input
                        value={offerQuantity}
                        onChange={(e) => setOfferQuantity(e.target.value)}
                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                  </div>
                </div>
              
                <div className="flex items-center justify-center px-5 mb-3">
                  <div className="h-5 flex items-center">
                  <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      Price Per Item
                    </label>
                  </div>
                  <div className="ml-3 text-sm">
                    <input
                        value={offerPricePerItem}
                        onChange={(e) => setOfferPricePerItem(e.target.value)}
                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm"
              onClick={() => createOffer()}
            >
              Confirm
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
              onClick={() => setMakeOfferModalOpen(false)}
              // ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </Modal>

        <PurchasedModal
          title="Purchase Complete!"
          modalOpen={showPurchasedModal}
          setModalOpen={(v) => setShowPurchasedModal(v)}
        />

      </div>
    </div>
  );
}
