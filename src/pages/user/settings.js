import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import SectionHeader from "../../components/section-header";
import Security from './security';
import { UserContext } from '../../context/user-context';
import { Web3Context } from '../../context/web3-context';
import { SharedContext } from '../../context/shared-context';
import axios from "axios";
import AppUrls from '../../AppSettings';
import Wallet from './wallet';
import { useHistory } from "react-router-dom";

// var profileImageDefault = 'https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80';
// const coverImageDefault = 'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};

export default function UserSettings() {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);
  const sharedContext = useContext(SharedContext);

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();

    isLoading(true);

    let formData = new FormData();

    if(profileImage && profileImage.file)
      formData.append("ProfleImage", profileImage.file, profileImage.file.name);
      
    if(coverImage && coverImage.file)
      formData.append("ProfileBanner", coverImage.file, coverImage.file.name);

      formData.append("Name", displayName ?? "");
      formData.append("Description", description ?? "");
      formData.append("FacebookUrl", facebookUrl ?? "");
      formData.append("InstagramUrl", instagramUrl ?? "");
      formData.append("TwitterUrl", twitterUrl ?? "");
      formData.append("DiscordUrl", discordUrl ?? "");

    axios({
      method: "post",
      url: `${appUrls.fomoHostApi}/api/services/app/User/UpdateProfile`,
      data: formData,
      headers: {
        "Authorization": "Bearer " + userContext.state.accessToken + "",
        'content-type': 'multipart/form-data'
      },
    })
      .then(function (response) {
        isLoading(false)
        console.log(response)
        userContext.dispatch({
          type: "UPDATE_DATA",
          payload: response.data.result
        })

        history.push('/user')
      })
      .catch(function (response) {
        isLoading(false)
        console.log(response);
      });
  };

  const onProfileImageChange = (e) => {
    const obj = {
      imageUrl: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0]
    }
    setProfileImage(obj)
  };

  const onCoverImageChange = (e) => {
    const obj = {
      imageUrl: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0]
    }
    setCoverImage(obj)
  };

  useEffect(async () => {
    console.log(userContext.state)
    if(userContext.state){
      if(userContext.state.profilePictureUrl) setProfileImage({imageUrl: userContext.state.profilePictureUrl});
      if(userContext.state.bannerPictureUrl) setCoverImage({imageUrl: userContext.state.bannerPictureUrl});
      setDisplayName(userContext.state.name);
      setDescription(userContext.state.description);
      setFacebookUrl(userContext.state.facebookUrl);
      setTwitterUrl(userContext.state.twitterUrl);
      setDiscordUrl(userContext.state.discordUrl);
      setInstagramUrl(userContext.state.instagramUrl);
    }
  }, []);

  const [accessToken, setAccessToken] = useState();
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
      setAccessToken(userContext.state.accessToken);
      if(userContext.state.accessToken){
        setHasLoggedIn(true);
      }
  }, [userContext.state.accessToken]);

  return (
    <div className="max-w-screen-lg mx-auto py-10 px-4 sm:px-6">

      <SectionHeader title="Edit Profile" />

      <form onSubmit={handleSubmit} id="data" enctype="multipart/form-data" className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 sm:pb-5">
              <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                Display Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center my-5">
              <label htmlFor="photo" className="block text-sm font-bold text-gray-700">
                Profile Photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  {profileImage ? (
                    <img src={profileImage.imageUrl} className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 shadow-lg" />
                  ) : (
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 shadow-lg"></div>
                  )}
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer focus-within:outline-none"
                  >
                    <span className="ml-5 py-2 px-4 rounded-full shadow-lg text-sm leading-4 font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">Change</span>
                    <input id="file-input-profile" onChange={onProfileImageChange} id="file-upload" name="file-upload" accept="image/*" type="file" className="sr-only" />
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
              <label htmlFor="cover_photo" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                Cover photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center h-28 bg-gray-100 rounded-xl mb-4 overflow-hidden shadow-md">
                  {coverImage ? (
                    <img src={coverImage.imageUrl} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full object-cover"></div>
                  )}
                </div>
                <label
                  htmlFor="coverfile-upload"
                  className="relative cursor-pointer focus-within:outline-none"
                >
                  <span className="py-2 px-4 rounded-full shadow-lg text-sm leading-4 font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">Change</span>
                  <input id="file-input-banner" onChange={onCoverImageChange} id="coverfile-upload" name="coverfile-upload" type="file" accept="image/*" className="sr-only" />
                </label>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
              <label htmlFor="about" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                Bio
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
              </div>
            </div>
          </div>
          
            <div className="space-y-6 sm:space-y-5">

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
                <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                  Twitter Username
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  <p className="mt-2 text-sm text-gray-500">E.g. fomo_lab</p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                  Discord Invite URL
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={discordUrl}
                    onChange={(e) => setDiscordUrl(e.target.value)}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  <p className="mt-2 text-sm text-gray-500">E.g. https://discord.gg/kb9djm</p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="last_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                  Instagram Username
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  <p className="mt-2 text-sm text-gray-500">E.g. fomo_lab</p>
                </div>
              </div>


              {false ? (
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Portfolio / Website URL
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ) : null}

            </div>

            {false ? (
                  <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">Notifications</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      We can send you marketplace notifications via email.
                    </p>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                      Email
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="mt-2 text-sm text-gray-500">To enable email notifications you must <a href="#" className="font-bold text-indigo-600">sign message</a> first.</p>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                    <div className="pt-6 sm:pt-5">
                      <div role="group" aria-labelledby="label-notifications">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                          <div>
                            <div
                              className="text-base font-bold text-gray-900 sm:text-sm sm:text-gray-700"
                              id="label-notifications"
                            >
                              Notification Level
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <div className="max-w-lg">
                              <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                  <input
                                    id="push_everything"
                                    name="push_notifications"
                                    type="radio"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    selected
                                  />
                                  <label htmlFor="push_everything" className="ml-3 block text-sm font-bold text-gray-700">
                                    Off
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    id="push_email"
                                    name="push_notifications"
                                    type="radio"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  />
                                  <label htmlFor="push_email" className="ml-3 block text-sm font-bold text-gray-700">
                                    Most important
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    id="push_nothing"
                                    name="push_notifications"
                                    type="radio"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  />
                                  <label htmlFor="push_nothing" className="ml-3 block text-sm font-bold text-gray-700">
                                    Everything
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
            ) : null}

          {hasLoggedIn ? (
            <>
            <Wallet accessToken={accessToken}></Wallet>
            <Security></Security>
            </>
          ) : null}
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link
              to="/user"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none "
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
