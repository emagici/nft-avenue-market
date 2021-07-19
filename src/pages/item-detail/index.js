import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NFT1 from "../../assets/img/nft/nft1.png";
import Dropdown from "../../components/dropdown";
import qs from "qs";
import Web3 from "web3";
import axios from "axios";
import { Fragment } from "preact";
import {
  MARKETPLACE_ABI,
  MARKETPLACE_ADDRESS,
} from "../../contracts/FomoMarketPlace";
import {GENERICTOKENURI_ABI} from "../../contracts/GenericTokenURI";

const tabs = [
  { name: "Info", href: "#", current: true },
  { name: "Owners", href: "#", current: false },
  { name: "History", href: "#", current: false },
  { name: "Bids", href: "#", current: false },
];

// const listingTypes = ["Fixed Price", "Timed Auction", "Open For Offers"];
const listingTypes = ["Fixed Price"];
const listingLengths = [1, 3, 7, 14, 30];

const user = {
  name: "",
  profilePictureUrl: "",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ItemDetail(props) {
  const [tokenid, setTokenId] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftOwnerAdd, setNftOwnerAdd] = useState("");
  const [nftOwnerDetails, setNftOwnerDetails] = useState(user);
  const [nftDescription, setNftDescription] = useState("");
  const [nftSrc, setNftSrc] = useState("");
  const [NftPrice, setNftPrice] = useState("");
  const [nftListedQuantity, setNftListedQuantity] = useState(1);
  const [web3, setWeb3] = useState();
  const [marketplaceContract, setMarketplaceContract] = useState();
  const [myAdd, setMyadd] = useState();
  const [activeTab, setActiveTab] = useState("Info");
  const [isOwner, setIsOwner] = useState(false);
  const [ListPrice, setListPrice] = useState(0);
  const [ListQuantity, setListQuantity] = useState(0);
  const [listingId, setListingId] = useState(0);
  const [listingType, setListingType] = useState("Fixed Price");
  const [listingLength, setListingLength] = useState(7);

  function epoch (date) {
    return Date.parse(date)
  }

  const getTokenURI = async () => {
    if (web3.givenProvider == null) return;

    if(listingId > 0){
      axios({
        method: "get",
        url: "https://0.0.0.0:44301/api/services/app/Nft/GetNftInfoById?id="+listingId+"",
      })
      .then(function (nftListingResponse) {
        console.log(nftListingResponse)
        const nftDetails = nftListingResponse.data.result.nft;
        const nftSellerDetails = nftListingResponse.data.result.seller;
        const priceInBNB = Web3.utils.fromWei(nftDetails.pricePerItem.toString(), "ether");
        setNftPrice(priceInBNB);
        setNftListedQuantity(nftDetails.quantity);
        setNftSrc(nftDetails.imageUrl)
        setNftDescription(nftDetails.description)
        setNftName(nftDetails.tokenName)
        setNftOwnerAdd(nftDetails.owner)
        setNftOwnerDetails(nftSellerDetails)

        if(nftDetails.owner.toLowerCase()  === myAdd.toLowerCase())
          setIsOwner(true);
      })
      .catch(function (response) {
        console.log(response);
      });
    }
    else{
      setIsOwner(true);

      axios({
        method: "get",
        url: "https://0.0.0.0:44301/api/services/app/Nft/GetExternalNftInfo?TokenId="+tokenid+"&ContractAddress="+nftAddress+"",
      })
        .then(function (response) {
          const nftDetails = response.data.result;
          setNftSrc(nftDetails.imageUrl)
          setNftDescription(nftDetails.description)
          setNftName(nftDetails.tokenName)
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  const listItem = async () => {
    if (web3.givenProvider == null) return;

    if(ListPrice <= 0 || ListQuantity <= 0){
      alert("Please enter price and quantity more than 0");
      return;
    }

    const timestamp =  epoch(new Date())
    const listPriceToSend = Web3.utils.toWei(ListPrice, "ether");

    await marketplaceContract.methods
      .listItem(nftAddress, tokenid, ListQuantity, listPriceToSend, 1626598502, "0x0000000000000000000000000000000000000000")
      .send({ from: myAdd });
  };

  const updateListing = async (newPricePerItem) => {
    if (web3.givenProvider == null) return;

    await marketplaceContract.methods
      .updateListing(nftAddress, tokenid, 200)
      .send({ from: myAdd });
  };

  const cancelListing = async () => {
    if (web3.givenProvider == null) return;

    await marketplaceContract.methods
      .cancelListing(nftAddress, tokenid)
      .send({ from: myAdd });
  };

  const acceptOffer = async () => {
    if (web3.givenProvider == null) return;

    await marketplaceContract.methods
      .acceptOffer(nftAddress, tokenid, myAdd)
      .send({ from: myAdd });
  };

  const createOffer = async (payTokenAddress ,quantity, pricePerItem, deadline) => {
    if (web3.givenProvider == null) return;

    await marketplaceContract.methods
      .createOffer(nftAddress, tokenid, "0x5eef8c4320e2bf8d1e6231a31500fd7a87d02985" ,1, 100, 1626354627, "0x0000000000000000000000000000000000000000")
      .send({ from: myAdd });
  };

  const cancelOffer = async () => {
    if (web3.givenProvider == null) return;

    await marketplaceContract.methods
      .cancelOffer(nftAddress, tokenid)
      .send({ from: myAdd });
  };

  const buyItem = async () => {
    if (web3.givenProvider == null) return;

    const totalPrice = NftPrice * nftListedQuantity;
    const amountToSend = Web3.utils.toWei(totalPrice.toString(), "ether");
    
    await marketplaceContract.methods
      .buyItem(nftAddress, tokenid, nftOwnerAdd)
      .send({ from: myAdd, value: amountToSend });
  };

  useEffect(async () => {
    if (!web3) return;
    getTokenURI();
  }, [myAdd]);

  useEffect(async () => {
    if (!web3) return;
    const accounts = await web3.eth.getAccounts();
    var myadd = accounts[0];
    setMyadd(myadd);
    setMarketplaceContract(
      new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS)
    );
  }, [web3]);

  useEffect(async () => {
    if (Web3.givenProvider != null) {
      var newWeb3 = new Web3(Web3.givenProvider);
      setWeb3(newWeb3);
    }

    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    if(params.id > 0)
      setListingId(params.id)
    else
      setListingId(0)

    if(params.tokenid)
      setTokenId(params.tokenid)

    if(params.nftaddress)
      setNftAddress(params.nftaddress);

    }, []);

  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="mt-10 md:grid md:grid-cols-3 gap-x-6">
          <div className="flex justify-center md:justify-end mb-5 md:mb-0">
            <div className="flex-1 max-w-sm">
              <div className="block aspect-w-10 aspect-h-12 rounded-lg bg-gray-100 focus:outline-none overflow-hidden shadow-lg">
                <img
                  src={nftSrc}
                  alt=""
                  className="object-cover pointer-events-none group-hover:opacity-90"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <h1 className="font-bold text-3xl text-center md:text-left mb-2">
             {nftName}
            </h1>

            {listingId > 0 ? (
              <div className="flex gap-x-1 mb-3 justify-center md:justify-start">
                <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-green-500 font-bold text-green-500 truncate pointer-events-none">
                  {NftPrice} BNB
                </p>
                {/* <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-gray-500 font-bold text-gray-500 truncate pointer-events-none">
                  $744.20
                </p> */}
              </div>
            ) : null}

            <div className="relative flex items-center gap-x-2 mb-5 justify-center md:justify-start">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={nftOwnerDetails.profilePictureUrl}
                  alt=""
                />
              </div>
              <div className="min-w-0">
                <Link to={`/user?id=${nftOwnerDetails.id}`} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    {nftOwnerDetails.name}
                  </p>
                  {/* <p className="text-sm text-gray-500 truncate">{nftOwnerDetails.role}</p> */}
                </Link>
              </div>
            </div>

            <p className="mb-6 text-center md:text-left">
             {nftDescription}
            </p>

            {!isOwner && listingId > 0 ? (
              <div className="flex gap-2 justify-center md:justify-start">
                <button
                  onClick={buyItem}
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none"
                >
                  <span>Buy Now</span>
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none"
                >
                  <span>Place Bid</span>
                </button>
              </div>
            ) : null}

            {isOwner && listingId == 0 ? (
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

                    {["Fixed Price"].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Price (BNB)
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
                          Quantity
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

                    {["Fixed Price", "Timed Auction"].includes(listingType) ? (
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

            <div className="border-b border-gray-200 mb-6">
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

            {activeTab === "Info" ? (
              <h1 className="font-bold text-2xl">Info</h1>
            ) : null}

            {activeTab === "Owners" ? (
              <h1 className="font-bold text-2xl">Owners</h1>
            ) : null}

            {activeTab === "History" ? (
              <h1 className="font-bold text-2xl">History</h1>
            ) : null}

            {activeTab === "Bids" ? (
              <h1 className="font-bold text-2xl">Bids</h1>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
