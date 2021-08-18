import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import CardList from "../../components/cards/card-list";
import CardDefault from "../../components/cards/item-card-default";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { PlusCircleIcon, StarIcon, MinusCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";


import axios from "axios";
import RatingModal from '../user/rating-modal';

import { UserContext } from '../../context/user-context';
import { Web3Context } from '../../context/web3-context';
import { SharedContext } from '../../context/shared-context';

import AppUrls from '../../AppSettings';
import qs from 'qs';

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
  const { addToast } = useToasts()

  const [web3, setWeb3] = useState();
  const [loading, setLoading] = useState(false);
  const [ownNfts, setOwnNfts] = useState([]);
  const [onSaleNfts, setOnSaleNfts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [displayName, setDisplayName] = useState(null);
  const [activeTab, setActiveTab] = useState("On Sale");
  const tabs = [
    "On Sale",
    "Owned",
  ];

  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);
  const sharedContext = useContext(SharedContext);
  const [loggedInUserId, setLoggedInUserId] = useState();
  
  const [hasBeenFollowing, setHasBeenFollowing] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const [averageRating, setAverageRating] = useState(0);
  const ratings = [1,2,3,4,5];

  useEffect(() => {
    init();
  }, []);

  function init(){
    let userId = getUrlUserId();
    if (userId) {
      getUserNfts(userId);
    }
  }



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



  const transformOnSaleObj = (onSaleObj) => {
    var obj = {
      Listed: true,
      TokenId: onSaleObj.tokenId,
      NftAddress: onSaleObj.nft,
      TokenName:  onSaleObj.tokenName,
      Image: onSaleObj.imageUrl,
      Video: onSaleObj.videoUrl
    };
    return obj;
  }

  const transformOwnNftObj = (ownObj) => {
    var obj = {
      Listed: ownObj.listed,
      TokenId: ownObj.TokenId,
      NftAddress: ownObj.NftAddress,
      TokenName:  ownObj.TokenName,
      Image: ownObj.Image,
      Video: ownObj.TokenIPFSVideoPreview,
      Quantity: ownObj.OwnedNftQuantity
    };
    return obj;
  }

  const loadProfile = (userId, viewerUserId) => {

    let url = `${appUrls.fomoHostApi}/api/services/app/User/GetProfileForView?userId=${userId}`;

    if (viewerUserId){
      url += `&viewerUserId=${viewerUserId}`;
    }

    axios({
      method: "GET",
      url: url
    })
    .then(function (response) {
      setUserProfile(response.data.result);
      setAverageRating(response.data.result.userRate);
      if(response.data.result.hasBeenFollowing){
        setHasBeenFollowing(response.data.result.hasBeenFollowing);
      }
    })
    .catch(function (response) {
      console.log(response);
      addToast("Error loading profile.", {
        appearance: 'error',
        autoDismiss: true,
      })
    });
  }

  const getUserNfts = async (userId) => {
    if (loading) return
    setLoading(true)
    
    // sharedContext.dispatch({
    //   type: "START_LOADING"
    // })

    var nftResponse = await axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetNftsOwnedByUser?userId=${userId}&blockchain=${userContext.state.blockchainId}`,
    })

    const nftItem = nftResponse.data.result;

    setOnSaleNfts(nftItem.nftsListed);

    var items = nftItem.nftsOwned.map((item, i) => {   
      var listedItem = nftItem.nftsListed.find(o => o.tokenId === Number(item.tokenid) && o.nft.toLowerCase() === item.tokenContractAddress.toLowerCase());
    
      var obj = {
        listed: listedItem ? true : false,
        TokenName: item.tokenName,
        Image: item.image,
        TokenIPFSVideoPreview: item.tokenIPFSVideoPreview,
        TokenId: item.tokenid,
        NftAddress: item.tokenContractAddress,
        OwnedNftQuantity: item.count,
      };
      return obj;
    })

    setOwnNfts(items);
    setLoading(false)

    // sharedContext.dispatch({
    //   type: "STOP_LOADING"
    // })
  }

  const follow = (userId) => {
    isLoading(true);

    axios({
      method: "POST",
      url: `${appUrls.fomoHostApi}/api/services/app/UserFollowers/Follow?followeeUserId=${userId}`,
      headers: {
        "Authorization": "Bearer " + accessToken + ""
      }
    })
    .then(function (response) {
      setHasBeenFollowing(true);
      addToast("User followed!", {
        appearance: 'success',
        autoDismiss: true,
      })
    })
    .catch(function (response) {
      // console.log(response);
      addToast("Error following user.", {
        appearance: 'error',
        autoDismiss: true,
      })
    })
    .finally(function(){
      isLoading(false);
    });
  }

  const unFollow = (userId) => {
    isLoading(true);

    axios({
      method: "POST",
      url: `${appUrls.fomoHostApi}/api/services/app/UserFollowers/UnFollow?followeeUserId=${userId}`,
      headers: {
        "Authorization": "Bearer " + accessToken + ""
      }
    })
    .then(function (response) {
      setHasBeenFollowing(false);
      addToast("User unfollowed.", {
        appearance: 'success',
        autoDismiss: true,
      })
    })
    .catch(function (response) {
      // console.log(response);
      addToast("Error unfollowing user.", {
        appearance: 'error',
        autoDismiss: true,
      })
    })
    .finally(function(){
      isLoading(false);
    });
  }

  function onFollow(e){
    e.preventDefault();

    if(!accessToken)
    {
      return;
    }

    let userId = getUrlUserId();
    if(userId){
      follow(userId);
    }
  }

  function onUnFollow(e){
    e.preventDefault();

    if(!accessToken)
    {
      return;
    }
    
    let userId = getUrlUserId();
    if(userId){
      unFollow(userId);
    }
  }

  function getUrlUserId(){
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    return +params.userId;
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

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  useEffect(() => {
    if(userContext.state.id > 0){
        setLoggedInUserId(userContext.state.id);
        setLoggedIn(true);

        let userId = getUrlUserId();
        let viewerUserId = userContext.state.id;
        if(userId){
          loadProfile(userId, viewerUserId);
        }
    }else{
      let userId = getUrlUserId();
      if(userId){
        loadProfile(userId);
      }
    }
  }, [userContext.state.id]);

  useEffect(() => {
    setAccessToken(userContext.state.accessToken);
  }, [userContext.state.accessToken]);

  useEffect(() => {
    if(!ratingModalOpen) return;
    let userId = getUrlUserId();
    if (userId) {
      loadProfile(userId);
    }
  }, [ratingModalOpen]);

  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="relative">
          {userProfile && userProfile.bannerPictureUrl ? (
            <img
              className="h-40 mt-5 shadow-xl w-full rounded-2xl object-cover md:h-60"
              src={userProfile.bannerPictureUrl}
              alt=""
            />
          ) : (
            <div className="h-40 mt-5 shadow-xl w-full rounded-2xl object-cover md:h-60"></div>
          )}
          <div className="absolute top-3 left-3 right-3 z-10">
            {loggedIn && userProfile ? (
              <div className="flex justify-between sm:justify-end flex-row space-x-2">
                <button
                  onClick={() => setRatingModalOpen(true)}
                  className="inline-flex justify-center px-4 py-2 shadow-lg w-auto sm:w-32 text-sm font-medium rounded-full text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
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

                {hasBeenFollowing ? (
                        <button
                          onClick={(e) => onUnFollow(e)}
                          className="inline-flex justify-center px-4 py-2 shadow-lg text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                          <span>Unfollow</span>
                          <MinusCircleIcon
                            className="-mr-1 ml-1 h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => onFollow(e)}
                          className="inline-flex justify-center px-4 py-2 shadow-lg text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                          <span>Follow</span>
                          <PlusCircleIcon
                            className="-mr-1 ml-1 h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      )
                  }

              </div>
            ) : null}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="-mt-12 sm:-mt-16 sm:items-end sm:space-x-5 mb-7">
            <div className="flex flex-col items-center justify-center gap-3">
              
              <div className="">
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

              <div className="block">
                <div className="flex items-center">
                  {ratings.map((val,i) => (
                    <StarIcon
                      key={i}
                      className={classNames(
                        val <= averageRating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5"
                      )}
                    />
                  ))}
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-center sm:text-left text-gray-900 truncate sm:pl-1 inline-flex">
                {userProfile ? displayName : "User"} {userProfile && userProfile.hasVerified? <CheckCircleIcon class="w-6 h-6 text-green-400" />  : null}
              </h1>

              {userProfile ? (
                <div className="text-center">
                  <p>{userProfile.description}</p>
                </div>
              ) : null}

              <div className="flex items-center justify-center gap-3 text-gray-800">
                {userProfile && userProfile.twitterUrl ? (
                  <a href={`https://twitter.com/${userProfile.twitterUrl}`} target="_blank" rel="noreferrer" className="p-3 hover:text-blue-500 transition-all">
                    <FontAwesomeIcon icon={faTwitter} size='2x' />
                  </a>
                ) : null}
                {userProfile && userProfile.instagramUrl ? (
                  <a href={`https://instagram.com/${userProfile.instagramUrl}`} target="_blank" rel="noreferrer" className="p-3 hover:text-pink-600 transition-all">
                    <FontAwesomeIcon icon={faInstagram} size='2x' />
                  </a>
                ) : null}
                {userProfile && userProfile.discordUrl ? (
                  <a href={userProfile.discordUrl} target="_blank" rel="noreferrer" className="p-3 hover:text-purple-600 transition-all">
                    <FontAwesomeIcon icon={faDiscord} size='2x' />
                  </a>
                ) : null}
              </div>

            </div>
              
          </div>
        </div>

        {true ? (
          <div className="py-2 lg:py-8">
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
              loading ? (
                <CardList loading={true} />
              ) : (
                onSaleNfts && onSaleNfts.length ? (
                  <CardList loading={loading} items={onSaleNfts.map(item => {
                    return {
                      ...transformOnSaleObj(item)
                    }
                  })} />
                ) : (
                  <div className="text-center">
                    <h1 className="font-bold text-2xl mb-2">No items on sale</h1>
                  </div>
                )
              )
            ) : null}

            {activeTab === "Owned" ? (
              loading ? (
                <CardList loading={true} />
              ) : (
                ownNfts && ownNfts.length ? (
                  <CardList loading={loading} items={ownNfts.map(item => {
                    return {
                      ...transformOwnNftObj(item)
                    }
                  })} />
                ) : (
                  <div className="text-center">
                    <h1 className="font-bold text-2xl mb-2">No owned items</h1>
                  </div>
                )
              )
            ) : null}

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
