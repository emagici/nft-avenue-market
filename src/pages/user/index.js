import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CardDefault from "../../components/cards/item-card-default";
import SectionHeader from "../../components/section-header";
import AvatarList from "../../components/avatar/avatar-list";
import {
  LoginIcon,
  LogoutIcon,
  PencilAltIcon,
  PlusCircleIcon,
  StarIcon
} from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/outline";

import Web3 from "web3";
import axios from "axios";
import Modal from "../../components/modal";
import RatingModal from './rating-modal'

import { UserContext } from '../../context/user-context';
import { Web3Context } from '../../context/web3-context';
import { SharedContext } from '../../context/shared-context';

import AppUrls from '../../AppSettings';

const profile = {
  name: "CryptoChown",
  email: "ricardo.cooper@example.com",
  bio:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  avatar:
    "https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  backgroundImage:
    "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  fields: [
    ["Phone", "(555) 123-4567"],
    ["Email", "ricardocooper@example.com"],
    ["Title", "Senior Front-End Developer"],
    ["Team", "Product Development"],
    ["Location", "San Francisco"],
    ["Sits", "Oasis, 4th floor"],
    ["Salary", "$145,000"],
    ["Birthday", "June 8, 1990"],
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const appUrls = {
    fomoHost: AppUrls.fomoHost,
    fomoHostApi: AppUrls.fomoHostApi,
    fomoClient: AppUrls.fomoClient,
    fomoNodeAPI: AppUrls.fomoNodeAPI
};

export default function Profile() {
  const [web3, setWeb3] = useState();
  const [myActivies, setMyActivities] = useState([]);
  const [ownNfts, setOwnNfts] = useState([]);
  const [onSaleNfts, setOnSaleNfts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [displayName, setDisplayName] = useState(null);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("On Sale");
  const [seedWordsModalOpen, setSeedWordsModalOpen] = useState(false);
  const [seedWords, setSeedWords] = useState("");
  const tabs = [
    "On Sale",
    "Owned",
    "Created",
    // "Liked",
    "Following",
    "Followers",
    "Activity",
  ];

  const [ratingModalOpen, setRatingModalOpen] = useState(false)

  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);
  const sharedContext = useContext(SharedContext);


  useEffect(() => {
    init();
  }, []);


  useEffect(() => {
    if (userProfile) {
      try {
        if (userProfile.name.length > 15) {
          setDisplayName(`${userProfile.name.substr(0,6)}...${userProfile.name.substr(-4,4)}`)
        } else {
          setDisplayName(userProfile.name)
        }
      } catch(e) {
        setDisplayName(userProfile.name)
      }
    } else {
      setDisplayName(null)
    }
  }, [userProfile])


  function init(){
    let accessToken = getUrlAccessToken();
    if(accessToken){
      setAccessToken(accessToken);
      clearUrlAccessToken();
      setLoggedIn(true);
      loadProfile(accessToken);
      loadMyRegisteredWalletAddress(accessToken);
      //alert("you have successfully logged in!, get your accessToken in console log");
      console.warn("access token: ", accessToken);

      userContext.dispatch({
        type: "SET_ACCESS_TOKEN",
        payload: accessToken
      })
    }
  }

  const transformOnSaleObj = (onSaleObj) => {
    var obj = {
      Listed: onSaleObj.id > 0 ? true : false,
      TokenId: onSaleObj.tokenId,
      NftAddress: onSaleObj.nft,
      TokenName:  onSaleObj.tokenName,
      Image: onSaleObj.imageUrl,
      Video: onSaleObj.videoUrl
    };
    return obj;
  }

  const transformOwnNftObj = (ownObj) => {
    console.log(ownObj)
    var obj = {
      Listed: ownObj.id > 0 ? true : false,
      TokenId: ownObj.TokenId,
      NftAddress: ownObj.NftAddress,
      TokenName:  ownObj.TokenName,
      Image: ownObj.Image,
      Video: ownObj.TokenIPFSVideoPreview
    };
    return obj;
  }

  const loadMyRegisteredWalletAddress = (accessToken) => {
    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetMyWalletAddress`,
      headers: {
        "Authorization": "Bearer " + accessToken + ""
      }
    })
    .then(function (response) {
      console.log(response)
      userContext.dispatch({
        type: "SET_REGISTERED_ADDRESS",
        payload: response.data.result
       })
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  const loadProfile = (accessToken) => {
    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/User/GetProfile`,
      headers: {
        "Authorization": "Bearer " + accessToken + ""
      }
    })
    .then(function (response) {
      setUserProfile(response.data.result);
      userContext.dispatch({
        type: "UPDATE_DATA",
        payload: response.data.result
       })
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  const loadMyActivities = (accessToken) => {
    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetMyActivities`,
      headers: {
        "Authorization": "Bearer " + accessToken + ""
      }
    })
    .then(function (response) {
      console.log(response)
      setMyActivities(response.data.result);
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  const getOwnNfts = async (sign, myadd) => {

    sharedContext.dispatch({
      type: "START_LOADING"
    })

    var myListedNfts = await axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetNftInfoBySellerAddress?address=${myadd}`,
    })

    setOnSaleNfts(myListedNfts.data.result);

    if(sign){
      axios({
        method: "post",
        url: `${appUrls.fomoNodeAPI}`,
        data: JSON.stringify({ Signature: sign }),
      })
      .then(function (response) {
  
        var items = response.data.map((item, i) => {   
            var listedItem = myListedNfts.data.result.find(o => o.nft.tokenId === Number(item.TokenId) && o.nft.nft.toLowerCase() === item.TokenContractAddress.toLowerCase());
          
            var obj = {
              id: listedItem ? listedItem.nft.id : 0,
              TokenName: item.TokenName,
              Image: item.Image,
              TokenIPFSVideoPreview: item.TokenIPFSVideoPreview,
              TokenId: item.TokenId,
              NftAddress: item.TokenContractAddress,
              OwnedNftQuantity: item.Count
            };
            return obj;
        })
        setOwnNfts(items);
  
        userContext.dispatch({
          type: "SET_OWN_NFTS",
          payload: items
        })
  
        sharedContext.dispatch({
          type: "STOP_LOADING"
        })
      })
      .catch(function (response) {
        console.log(response);
      });
      
    } else {
      sharedContext.dispatch({
        type: "STOP_LOADING"
      })
    }
  }
  
  // const signAndGetUserData = async () => {
  //   const accounts = await web3.eth.getAccounts();
  //   var myadd = accounts[0];

  //   web3.eth.personal
  //     .sign(web3.utils.utf8ToHex("TheAvenue"), myadd)
  //     .then(async function (sign) {
  //       getAccessTokenAndLoadProfile(sign);
  //       getOwnNfts(sign, myadd);
  //     });
  // };

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  useEffect(async () => {
    console.log(web3)
    console.log(userContext.state.accessToken)
    if(web3 && userContext.state.accessToken){
      const accounts = await web3.eth.getAccounts();
      var myadd = accounts[0];
      
      if(userContext.state.name)
        setUserProfile(userContext.state);
      else
        loadProfile(userContext.state.accessToken)

      loadMyActivities(userContext.state.accessToken);


      getOwnNfts(userContext.state.sign, myadd)
      setLoggedIn(true);
    }else if (userContext.state.accessToken){

      //TODO: [Kugan] - whats the flow to get nfts if logged in via email
      if(userContext.state.accessToken){
        // const accounts = await web3.eth.getAccounts();
        // var myadd = accounts[0];
        
        // if(userContext.state.name)
        //   setUserProfile(userContext.state);
        // else
          loadProfile(userContext.state.accessToken);
          loadMyActivities(userContext.state.accessToken);
  
        // getOwnNfts(userContext.state.sign, myadd);
        setLoggedIn(true);
      }
    }
  }, [web3, userContext.state.accessToken]);

  function getUrlAccessToken(){
    let url_string = window.location.href;
    let url = new URL(url_string);
    let accessToken = url.searchParams.get("accessToken");

    return accessToken;
  }

  //reference: https://stackoverflow.com/a/22753103/4490058
  function clearUrlAccessToken(){
    window.history.pushState(
      "object or string", 
      "Title", 
      "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
  }

  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="relative">
          <img
            className="h-40 mt-5 shadow-xl w-full rounded-2xl object-cover md:h-60"
            src={loggedIn ? (userProfile && userProfile.bannerPictureUrl ? userProfile.bannerPictureUrl : profile.backgroundImage) : profile.backgroundImage}
            alt=""
          />
          <div className="block absolute top-3 right-3 z-10 gap-2">
            {loggedIn ? (
              <div className="">
                <Link
                  to="/settings"
                  className="inline-flex justify-center px-4 py-2 shadow-lg text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <span>Edit Profile</span>
                  <PencilAltIcon
                    className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="-mt-12 sm:-mt-16">
            <div className="flex flex-col items-center justify-center gap-3">
              
              <div>
                {loggedIn && userProfile ? (
                  <img
                    className="h-24 w-24 shadow-lg rounded-full ring-4 bg-gray-200 ring-white sm:h-32 sm:w-32"
                    src={userProfile.profilePictureUrl}
                    alt=""
                  />
                ) : (
                  <div className="h-24 w-24 shadow-lg rounded-full ring-4 ring-white bg-gray-200 sm:h-32 sm:w-32 bg-gray-100"></div>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-center sm:text-left text-gray-900 truncate">
                {loggedIn && userProfile ? displayName : "Sign in required"}
              </h1>

              {loggedIn && userProfile ? (
                <div className="text-center -mt-1">
                  <p>{userProfile.description}</p>
                </div>
              ) : null}

            </div>
          </div>
        </div>

        {loggedIn ? (
          <div className="py-5 sm:py-10">
            <div className="mt-3 sm:mt-0 sm:ml-4 text-center mb-20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={classNames(
                    activeTab === tab
                      ? "text-white bg-gray-900 hover:bg-gray-900"
                      : "text-gray-600 bg-white hover:bg-gray-100",
                    "inline-flex items-center px-4 py-2 m-1 border border-transparent rounded-full text-sm font-medium focus:outline-none"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "On Sale" ? (
              onSaleNfts && onSaleNfts.length ? (
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
                >
                  {onSaleNfts.map((item, index) => (
                    <CardDefault key={index} {...transformOnSaleObj(item.nft)} sellItem />
                  ))}
                </ul>
              ) : (
                <div className="text-center">
                  <h1 className="font-bold text-2xl mb-2">No items on sale</h1>
                  <p className="font-medium text-gray-600 mb-5">
                    View your owned items to list them for sale now
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("Owned")}
                    className="text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none"
                  >
                    View Owned
                  </button>
                </div>
              )
            ) : null}

            {activeTab === "Owned" ? (
              ownNfts && ownNfts.length ? (
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
                >
                  {ownNfts.map((item, index) => (
                    <CardDefault key={index} {...transformOwnNftObj(item)} />
                  ))}
                </ul>
              ) : (
                <div className="text-center">
                  <h1 className="font-bold text-2xl mb-2">No items owned</h1>
                  <p className="font-medium text-gray-600 mb-5">
                    Explore our marketplace to find items now.
                  </p>
                  <Link
                    to="/"
                    className="text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none"
                  >
                    Explore
                  </Link>
                </div>
              )
            ) : null}

            {activeTab === "Created" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No items created</h1>
                <p className="font-medium text-gray-600 mb-5">
                  Apply for verification for your chance to create and sell NFTs right here on the The Avenue
                </p>
              </div>
            ) : null}

            {activeTab === "Liked" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No liked items</h1>
                <p className="font-medium text-gray-600 mb-5">
                  Click like on items in the marketplace to save them here.
                </p>
                <Link
                  to="/"
                  className="text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none"
                >
                  Explore
                </Link>
              </div>
            ) : null}

            {activeTab === "Following" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">Explore The Avenue</h1>
                <p className="font-medium text-gray-600 mb-5">
                  Explore The Avenue and follow users to see them appear here.
                </p>
                <Link
                  to="/"
                  className="text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none"
                >
                  Explore
                </Link>
              </div>
            ) : null}

            {activeTab === "Followers" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No followers</h1>
                <p className="font-medium text-gray-600 mb-5">
                  Sell and like items to increase your followers.
                </p>
                <Link
                  to="/"
                  className="text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none"
                >
                  Explore
                </Link>
              </div>
            ) : null}

            {activeTab === "Activity" ? (
              myActivies && myActivies.length ? (
                <div className="text-center">
                   <ul className="">
                      {myActivies.map((item, index) => (
                        <li key={index} className="py-3 border-b">
                          <Link to={`/item-detail?listed=true&tokenid=${item.tokenId}&nftaddress=${item.nftAddress}`} className="underline hover:opacity-80 transition-opacity">{item.nftDetails?.name}</Link>
                          <p className="text-sm font-bold">{item.eventName}</p>
                          <p className="text-sm font-medium">tx hash : {item.txHash}</p>
                        </li>
                      ))}
                   </ul>
                </div>
              ) : (
                <div className="text-center">
                  <h1 className="font-bold text-2xl mb-2">No activity</h1>
                  <p className="font-medium text-gray-600 mb-5">
                    Your site activity will display here.
                  </p>
                </div>
              )
            ) : null}

          </div>
        ) : null}

        <Modal
          title="Wallet seed words"
          open={seedWordsModalOpen}
          setOpen={(v) => setSeedWordsModalOpen(v)}
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
                      A wallet has been created for you!
                    </label>
                  </div>
                </div>
                <br />
                <div className="flex items-center justify-center px-5 mb-3">
                  <div className="h-5 flex items-center">
                    <div className="italic">
                      Check your email inbox for your new wallet's seed words.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
              onClick={() => setSeedWordsModalOpen(false)}
            >
              Ok
            </button>
          </div>
        </Modal>


      </div>
    </div>
  );
}
