import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import CardDefault from "../../components/cards/item-card-default";
import {
  PlusCircleIcon,
  StarIcon
} from "@heroicons/react/solid";
import axios from "axios";
import RatingModal from '../user/rating-modal';

import { UserContext } from '../../context/user-context';
import { Web3Context } from '../../context/web3-context';
import { SharedContext } from '../../context/shared-context';

import AppUrls from '../../AppSettings';
import qs from 'qs';

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

export default function ProfileInfo() {
  const location = useLocation();
  const [web3, setWeb3] = useState();
  const [ownNfts, setOwnNfts] = useState([]);
  const [onSaleNfts, setOnSaleNfts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [activeTab, setActiveTab] = useState("On Sale");
  const tabs = [
    "On Sale",
    "Owned",
    "Created",
    "Liked",
    "Following",
    "Followers",
    "Activity",
  ];

  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);
  const sharedContext = useContext(SharedContext);
  const [loggedInUserId, setLoggedInUserId] = useState();


  useEffect(() => {
    init();
  }, []);

  function init(){
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (params.userId) {
      loadProfile(+params.userId);
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

  const loadProfile = (userId) => {
    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/User/GetProfileForView?userId=${userId}`
    })
    .then(function (response) {
      setUserProfile(response.data.result);
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
            NftAddress: item.TokenContractAddress
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
  }
  
  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  useEffect(() => {
    if(userContext.state.id > 0){
        setLoggedInUserId(userContext.state.id);
        setLoggedIn(true);
    }
  }, [userContext.state.id]);

  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="relative">
          <img
            className="h-40 mt-5 shadow-xl w-full rounded-2xl object-cover md:h-60"
            src={userProfile && userProfile.bannerPictureUrl ? userProfile.bannerPictureUrl : profile.backgroundImage}
            alt=""
          />
          <div className="hidden sm:block absolute bottom-5 right-5 z-10">
            
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5 mb-7">
            <div className="flex justify-center lg:justify-start">
              {userProfile ? (
                <img
                  className="h-24 w-24 shadow-lg rounded-full ring-4 bg-white ring-white sm:h-32 sm:w-32"
                  src={userProfile.profilePictureUrl}
                  alt=""
                />
              ) : (
                <div className="h-24 w-24 shadow-lg rounded-full ring-4 ring-white bg-white sm:h-32 sm:w-32 bg-gray-100"></div>
              )}
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-center sm:text-left text-gray-900 truncate">
                  {userProfile ? `${userProfile.name.substr(0,6)}...${userProfile.name.substr(38,4)}` : "User"}
                </h1>
              </div>

              {userProfile ? (
                <div className="text-center sm:hidden pt-5">
                  <p>{userProfile.description}</p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                {loggedIn && userProfile ? (
                  <div className="flex flex-col sm:block space-y-3 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => setRatingModalOpen(true)}
                      className="inline-flex justify-center px-4 py-2 shadow-lg text-sm font-medium rounded-full text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                    >
                      <span>Rate User</span>
                      <StarIcon
                        className="-mr-1 ml-1 h-5 w-5 text-gray-900"
                        aria-hidden="true"
                      />
                    </button>
                    <RatingModal
                      modalOpen={ratingModalOpen}
                      setModalOpen={(v) => setRatingModalOpen(v)}
                      receiverUserId={userProfile.id}
                      giverUserId={loggedInUserId}
                    />

                    <button
                      onClick={() => alert("follow")}
                      className="inline-flex justify-center px-4 py-2 shadow-lg text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                      <span>Follow</span>
                      <PlusCircleIcon
                        className="-mr-1 ml-1 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="">
            {userProfile && userProfile.description ? (
              <div className="hidden sm:block lg:px-10 text-center md:text-left">
                <h6 className="font-bold hidden md:block">Bio</h6>
                <p>{userProfile.description}</p>
              </div>
            ) : null}
          </div>
          <div className="hidden lg:hidden mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {profile.name}
            </h1>
          </div>
        </div>

        {true ? (
          <div className="py-10 lg:py-20">
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

            {activeTab === "On Sale" && onSaleNfts.length == 0 && (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No items on sale from this user</h1>
              </div>
            )}

            {activeTab === "On Sale" && onSaleNfts.length > 0 && (
              <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
              >
                {onSaleNfts.map((item, index) => (
                  <CardDefault key={index} {...transformOnSaleObj(item.nft)} sellItem />
                ))}
              </ul>
            )}

            {activeTab === "Owned" && ownNfts.length == 0 && (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No items owned by this user</h1>
              </div>
            )}

            {activeTab === "Owned" && ownNfts.length > 0 && (
              <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
              >
                {ownNfts.map((item, index) => (
                  <CardDefault key={index} {...transformOwnNftObj(item)} />
                ))}
              </ul>
            )}

            {activeTab === "Created" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No items created by this user</h1>
              </div>
            ) : null}

            {activeTab === "Liked" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No liked items by this user</h1>
              </div>
            ) : null}

            {activeTab === "Following" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No users followed by this user</h1>
              </div>
            ) : null}

            {activeTab === "Followers" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No followers for this user</h1>
              </div>
            ) : null}

            {activeTab === "Activity" ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No activity from this user</h1>
              </div>
            ) : null}

          </div>
        ) : null}

      </div>
    </div>
  );
}
