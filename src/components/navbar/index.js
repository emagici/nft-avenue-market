import { Fragment, useEffect, useState, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { useToasts } from "react-toast-notifications"
import { BellIcon, MenuIcon, XIcon, SearchIcon } from "@heroicons/react/outline"
import { useWallet } from "use-wallet"
import AvenueLogoGif from "../../assets/img/fomo/the-avenue-v2.gif"
import Routes from "../../routes"
import Web3 from "web3"
import Web3Modal, { getProviderInfo } from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import SignInRegisterModal from "./SignInRegisterModal"

import { UserContext, initialState } from "../../context/user-context"
import { Web3Context } from "../../context/web3-context"
import { WalletContext } from "../../context/wallet-context"
import AwesomeDebouncePromise from "awesome-debounce-promise"
import { useAsync } from "react-async-hook"
import useConstant from "use-constant"
import UserMenu from "./user-menu"
import axios from "axios"
import AppUrls from "../../AppSettings"
import moment from "moment"
import CommunityMenu from "./community-menu"
import ChainMenu from "./chain-menu"
import {
  ExternalLinkIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid"

import {
  MARKETPLACE_ABI,
  getMarketplaceContractAddress,
} from "../../contracts/FomoMarketPlace"

import { setupSignalRConnection } from "../../signalr"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

//reference: https://stackoverflow.com/a/28046731
// Generic reusable hook
const useDebouncedSearch = (searchFunction) => {
  // Handle the input text state
  const [inputText, setInputText] = useState("")

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 1000),
  )

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(async () => {
    if (inputText.length === 0) {
      return []
    } else {
      return debouncedSearchFunction(inputText)
    }
  }, [debouncedSearchFunction, inputText])

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  }
}

function goToSearchPage(text) {
  document.location.href = `/search?search=${text}&auto=1`
}

const useSearch = () => useDebouncedSearch((text) => goToSearchPage(text))

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
  fomoNodeAPI: AppUrls.fomoNodeAPI,
  fomoHubHostApi: AppUrls.fomoHubHostApi,
}

const userNotificationConnectionHub = `${appUrls.fomoHubHostApi}/signalr-user-notification`

const hub = setupSignalRConnection(userNotificationConnectionHub)

export default function Navbar() {
  const userContext = useContext(UserContext)
  const web3Context = useContext(Web3Context)
  const walletContext = useContext(WalletContext)

  const location = useLocation()
  const { addToast } = useToasts()

  const [signInModalOpen, setSignInModalOpen] = useState(false)
  // const { account, chainId, connect, error, reset, status } = useWallet()
  const [myAdd, setMyAdd] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [walletSigned, setWalletSigned] = useState(false)
  const [errorStr, setErrorStr] = useState(null)
  //const { inputText, setInputText, searchResults } = useSearch()
  const [inputText, setInputText] = useState("")
  const [accessToken, setAccessToken] = useState()
  const [notifications, setNotifications] = useState([])
  const [newNotificationCount, setNewNotificationCount] = useState(0)
  const [provider, setProvider] = useState()

  const changeNetworkHandle = () => {
    walletContext.dispatch({
      type: "RESET_ALL",
    })
    web3Context.dispatch({
      type: "RESET_ALL",
    })
    userContext.dispatch({
      type: "RESET_PROFILE",
    })
    document.location.href = `/`
  }

  const disconnect = async () => {
    if (!provider) return

    setMyAdd(null)
    walletContext.dispatch({
      type: "RESET_ALL",
    })
    if (provider.close) {
      await provider.close()
    }
    setProvider(null)
  }

  const signMetamask = async () => {
    web3Context.state.web3Data.eth.personal
      .sign(web3Context.state.web3Data.utils.utf8ToHex("TheAvenue"), myAdd)
      .then(async function (sign) {
        userContext.dispatch({
          type: "SET_SIGN",
          payload: sign,
        })
        userContext.dispatch({
          type: "SET_SIGN_ADDRESS",
          payload: myAdd,
        })
      })
  }

  function handleSignOut() {
    console.log("signing out")
    walletContext.dispatch({
      type: "RESET_ALL",
    })
    web3Context.dispatch({
      type: "RESET_ALL",
    })
    userContext.dispatch({
      type: "RESET_PROFILE",
    })
    signout()
  }

  const signout = () => {
    if (!userContext.state.accessToken) return

    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/TokenAuth/LogOut`,
      headers: {
        Authorization: "Bearer " + accessToken + "",
      },
    })
      .then(function (response) {
        document.location.href = `/`
      })
      .catch(function (response) {
        // console.log(response);
        addToast("Error signing out.", {
          appearance: "error",
          autoDismiss: true,
        })
      })
  }

  useEffect(() => {
    console.log(userContext.state)
    loadMyOwnNfts()
  }, [userContext.state.sign])

  const loadMyOwnNfts = () => {
    if (!userContext.state.sign) return

    axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetUserOwnedNftsBySign?sign=${userContext.state.sign}&blockchain=${userContext.state.blockchainId}`,
    })
      .then(function (response) {
        var items = response.data.result.nftsOwned.map((item, i) => {
          var obj = {
            id: 0,
            TokenName: item.tokenName,
            Image: item.image,
            TokenIPFSVideoPreview: item.tokenIPFSVideoPreview,
            TokenId: item.tokenId,
            NftAddress: item.tokenContractAddress,
            OwnedNftQuantity: item.count,
            TokenIPFSAudioPreview: item.wavAudioFile,
          }
          return obj
        })

        userContext.dispatch({
          type: "SET_OWN_NFTS",
          payload: items,
        })
      })
      .catch(function (response) {
        console.log(response)
      })
  }

  useEffect(() => {
    const checkConnection = async () => {
      if (walletContext.state.userConnected) {
        connectWallet()
      } else {
        walletContext.dispatch({
          type: "RESET_ALL",
        })

        let web3

        if (userContext.state.blockchainId == 0)
          web3 = new Web3("https://bsc-dataseed.binance.org")
        else if (userContext.state.blockchainId == 1)
          web3 = new Web3(
            "https://mainnet.infura.io/v3/77aa95711a704e63ba95d1061a9a08b4",
          )
        else if (userContext.state.blockchainId == 2)
          web3 = new Web3(
            "https://polygon-mainnet.infura.io/v3/80769ff91aca4c8ab65867b9b1f0d027",
          )

        web3Context.dispatch({
          type: "SET_WEB3_DATA",
          payload: web3,
        })
      }
    }
    checkConnection()
  }, [])

  useEffect(() => {
    setLoggedIn(userContext.state.accessToken ? true : false)

    if (userContext.state.accessToken) {
      setAccessToken(userContext.state.accessToken)
    }
  }, [userContext.state.accessToken])

  useEffect(() => {
    if (accessToken) {
      getNotifications()
    }
  }, [accessToken])

  useEffect(() => {
    setWalletSigned(userContext.state.sign ? true : false)
  }, [userContext.state.sign])

  useEffect(() => {
    if (userContext.state.registeredWalletAddress && myAdd) {
      if (
        userContext.state.registeredWalletAddress.toLowerCase() !=
        myAdd.toLowerCase()
      ) {
        addToast("Please use the wallet sent to email during registration.", {
          appearance: "error",
          autoDismiss: true,
        })
        handleSignOut()
      } else if (!userContext.state.sign) {
        signMetamask()
      }
    }
  }, [userContext.state.registeredWalletAddress, myAdd])

  async function connectWallet(callback) {
    // if (connected) return;

    let providerOptions

    if (userContext.state.blockchainId == 0)
      providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              56: "https://bsc-dataseed.binance.org",
            },
            network: "binance",
          },
        },
      }
    else if (userContext.state.blockchainId == 1)
      providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "77aa95711a704e63ba95d1061a9a08b4",
          },
        },
      }
      else if (userContext.state.blockchainId == 2)
      providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "80769ff91aca4c8ab65867b9b1f0d027",
          },
        },
      }
    const web3Modal = new Web3Modal({
      providerOptions, // required
    })

    let provider
    if (walletContext.state.walletId) {
      provider = await web3Modal.connectTo(walletContext.state.walletId)
    } else {
      provider = await web3Modal.connect()
    }

    const web3 = new Web3(provider)

    const chainId = await web3.eth.getChainId()

    if (userContext.state.blockchainId == 0 && chainId != 56) {
      addToast("Please connect wallet to Binance Smart Chain Mainnet", {
        appearance: "error",
        autoDismiss: true,
      })
      return
    } else if (userContext.state.blockchainId == 1 && chainId != 1) {
      addToast("Please connect wallet to Ethereum Mainnet", {
        appearance: "error",
        autoDismiss: true,
      })
      return
    } else if (userContext.state.blockchainId === 2 && chainId != 137) {
      addToast("Please connect wallet to Polygon Mainnet", {
        appearance: "error",
        autoDismiss: true,
      })
      return

    }

    web3Context.dispatch({
      type: "SET_WEB3_DATA",
      payload: web3,
    })

    var providerInfo = getProviderInfo(provider)

    const accounts = await web3.eth.getAccounts()
    var myadd = accounts[0]
    setMyAdd(myadd)
    walletContext.dispatch({
      type: "SET_USER_CONNECTED",
    })

    walletContext.dispatch({
      type: "SET_WALLET_ID",
      payload: providerInfo.id,
    })

    if (userContext.state.signAddress?.toLowerCase() != myadd?.toLowerCase()) {
      userContext.dispatch({
        type: "RESET_PROFILE",
      })
    }

    const myContract = new web3.eth.Contract(
      MARKETPLACE_ABI,
      getMarketplaceContractAddress(userContext.state.blockchainId),
    )

    myContract.events
      .allEvents()
      .on("data", async function (event) {
        if (event.event == "ItemSold") {
          const item = event.returnValues
          if (
            item.seller.toLowerCase() == myadd ||
            item.buyer.toLowerCase() == myadd
          ) {
            loadMyOwnNfts()
          }
        }

        console.log(event)
      })
      .on("error", console.error)

    setProvider(provider)

    if (callback) callback()

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      changeNetworkHandle()
    })

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      changeNetworkHandle()
    })

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      changeNetworkHandle()
    })
  }

  //reference: https://stackoverflow.com/a/11365682/4490058
  function onEnter(e) {
    if (!e) e = window.event
    var keyCode = e.code || e.key

    if (keyCode == "Enter" || keyCode == "NumpadEnter") {
      // Enter pressed
      goToSearchPage(e.target.value)
    }
  }

  const getNotifications = () => {
    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetNotifications?take=10`,
      headers: {
        Authorization: "Bearer " + accessToken + "",
      },
    })
      .then(function (response) {
        console.log(response)
        if (response.data.result) {
          console.log(response.data.result)
          setNotifications(response.data.result)
          setNewOrUnreadNotificationCount(response.data.result)
        }
      })
      .catch(function (response) {
        console.log(response)
      })
  }

  const setNewOrUnreadNotificationCount = (notifications) => {
    let newOrUnreadNotificationCount = notifications.filter(
      (x) => !x.hasRead,
    ).length

    setNewNotificationCount(newOrUnreadNotificationCount)
  }

  const markNotificationsAsRead = (notificationIds) => {
    let ids = []

    if (notificationIds) {
      ids = notificationIds
    } else if (notifications.length == 0) {
      return
    } else {
      ids = notifications.map((x) => x.id)
    }

    axios({
      method: "POST",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/MarkNotificationsAsRead`,
      headers: {
        Authorization: "Bearer " + accessToken + "",
      },
      data: { notificationIds: ids },
    })
      .then(function (response) {
        getNotifications()
      })
      .catch(function (response) {
        console.log(response)
      })
  }

  //need to remove previous event handler on component re-render
  hub.off("ReceiveMessage")

  hub.on("ReceiveMessage", (userId, message) => {
    if (userContext.state.id == userId) {
      addToast(message, {
        appearance: "info",
        autoDismiss: true,
      })
      getNotifications()
    }
  })

  return (
    <Disclosure as="nav" className="bg-white shadow sticky top-0 navbar">
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden z-10">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    {/* <img
                      className="hidden sm:block h-8 w-auto"
                      src={AvenueLogo}
                      alt="Workflow"
                    /> */}
                    <img
                      className="hidden sm:block h-16 object-contain w-auto -mx-4"
                      src={AvenueLogoGif}
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="hidden md:ml-2 md:flex md:space-x-5">
                  {Routes.filter((item) => item.nav).map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={classNames(
                        item.path == location.pathname
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-700 hover:border-gray-500 hover:text-gray-900",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 hidden xl:flex">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      onChange={(e) => setInputText(e.target.value)}
                      value={inputText}
                      onKeyPress={(e) => onEnter(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CommunityMenu />

                <div className="flex-1 flex items-center justify-center hidden md:flex xl:hidden">
                  <Link
                    as="a"
                    to="/search"
                    className="relative bg-gray-100 p-2 rounded-full flex justify-center items-center text-sm hover:bg-gray-200 focus:outline-none shadow-sm"
                  >
                    <SearchIcon className="h-6 w-6" />
                    <span className="sr-only">Search</span>
                  </Link>
                </div>

                {myAdd && loggedIn ? (
                  <div className="flex-shrink-0 flex items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="sm:relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="relative bg-gray-100 p-2 rounded-full flex justify-center items-center text-sm hover:bg-gray-200 focus:outline-none shadow-sm">
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className={
                                  newNotificationCount
                                    ? "h-6 w-6 align-text-top animate-swing origin-top"
                                    : "h-6 w-6"
                                }
                                aria-hidden="true"
                              />
                              {/* {newNotificationCount > 0 && (<sup>{newNotificationCount}</sup>)} */}
                              {newNotificationCount ? (
                                <span class="absolute top-0 right-0 flex h-3 w-3">
                                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                  <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                </span>
                              ) : null}
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              // className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              className="absolute z-10 left-0 right-0 sm:left-auto sm:top-auto sm:bottom-auto mt-3 w-screen sm:w-max sm:w-auto"
                            >
                              <div className="max-h-96 overflow-y-scroll relative rounded-lg w-full sm:min-w-92 shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden bg-white">
                                <h1 className="font-bold my-2 px-4">
                                  Notifications
                                </h1>
                                {notifications && notifications.length ? (
                                  <a
                                    className="block mb-2 mt-0.5 px-4 text-sm underline"
                                    href="#"
                                    onClick={() => markNotificationsAsRead()}
                                  >
                                    Mark all as read
                                  </a>
                                ) : null}
                                {notifications && notifications.length ? (
                                  notifications.map((item, index) => (
                                    <Menu.Item
                                      key={index}
                                      as={"span"}
                                      className={
                                        item.hasRead
                                          ? "block py-2 font-medium text-gray-700 hover:bg-gray-100 mx-2 px-2 rounded-lg mb-1 mt-1"
                                          : "block py-2 font-medium mx-2 px-2 rounded-lg mb-1 mt-1 hover:bg-blue-100 bg-blue-50 text-blue-700"
                                      }
                                      onClick={() =>
                                        markNotificationsAsRead([item.id])
                                      }
                                    >
                                      <div className="flex items-center py-5">
                                        <div className="mr-3 h-16 w-16 bg-gray-100 rounded-xl overflow-hidden">
                                          <Link
                                            to={`/item-detail?tokenid=${item.tokenId}&nftaddress=${item.nftAddress}`}
                                            className="hover:opacity-90"
                                          >
                                            {item.nftDetails &&
                                            item.nftDetails.imageUrl ? (
                                              <img
                                                src={item.nftDetails.imageUrl}
                                                className="w-full h-full object-cover"
                                              />
                                            ) : null}
                                            {item.nftDetails &&
                                            item.nftDetails.videoUrl ? (
                                              <video
                                                src={item.nftDetails.videoUrl}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                              />
                                            ) : null}
                                            {item.userLike &&
                                            item.userLike.userFk
                                              .profilePictureUrl ? (
                                              <img
                                                src={
                                                  item.userLike.userFk
                                                    .profilePictureUrl
                                                }
                                                className="w-full h-full object-cover"
                                              />
                                            ) : null}
                                            {item.userFollower &&
                                            item.userFollower.followerUserFk
                                              .profilePictureUrl ? (
                                              <img
                                                src={
                                                  item.userFollower
                                                    .followerUserFk
                                                    .profilePictureUrl
                                                }
                                                className="w-full h-full object-cover"
                                              />
                                            ) : null}
                                            {!item.nftDetails ? (
                                              <div className="h-full w-full flex items-center justify-center">
                                                <QuestionMarkCircleIcon className="h-8 w-8 text-gray-600" />
                                              </div>
                                            ) : null}
                                          </Link>
                                        </div>
                                        <div className="max-w-lg">
                                          {(() => {
                                            if (
                                              item.eventName ==
                                                "UserFollowed" &&
                                              item.userFollower
                                            )
                                              return (
                                                <p className="text-md font-bold">
                                                  {item.userFollower
                                                    .followerUserFk.name
                                                    .length > 12
                                                    ? item.userFollower.followerUserFk.name.substr(
                                                        0,
                                                        10,
                                                      ) + "..."
                                                    : item.userFollower
                                                        .followerUserFk
                                                        .name}{" "}
                                                  is following you
                                                </p>
                                              )
                                            else if (
                                              item.eventName == "ItemLiked" &&
                                              item.userLike
                                            )
                                              return (
                                                <p className="text-md font-bold">
                                                  {item.userLike.userFk.name}{" "}
                                                  liked your NFT
                                                </p>
                                              )
                                            else
                                              return (
                                                <p className="text-md font-bold">
                                                  {item.eventName.replace(
                                                    /([A-Z])/g,
                                                    " $1",
                                                  )}
                                                </p>
                                              )
                                          })()}
                                          <Link
                                            to={`/item-detail?tokenid=${item.tokenId}&nftaddress=${item.nftAddress}`}
                                            className="block text-xs hover:opacity-90 font-medium transition-opacity"
                                          >
                                            <span>{item.nftDetails?.name}</span>
                                          </Link>
                                          {item.txHash ? (
                                            <a
                                              href={`https://bscscan.com/tx/${item.txHash}`}
                                              target="_blank"
                                              className="block text-sm underline mt-0.5"
                                            >
                                              <span>
                                                tx:{" "}
                                                {`${item.txHash.substr(
                                                  0,
                                                  4,
                                                )}...${item.txHash.substr(
                                                  -6,
                                                  6,
                                                )}`}
                                              </span>
                                              <ExternalLinkIcon
                                                className="inline ml-1 h-4 w-4 opacity-80"
                                                aria-hidden="true"
                                              />
                                            </a>
                                          ) : null}
                                          {item.eventName == "UserFollowed" &&
                                          item.userFollower ? (
                                            <a
                                              href={`${appUrls.fomoClient}/profile-info?userId=${item.userFollower.followerUserId}`}
                                              target="_self"
                                              className="block text-sm underline mt-0.5"
                                            >
                                              <span>view profile</span>
                                              <ExternalLinkIcon
                                                className="inline ml-1 h-4 w-4 opacity-80"
                                                aria-hidden="true"
                                              />
                                            </a>
                                          ) : null}
                                          <span className="text-xs">
                                            {moment(item.dateCreated).fromNow()}
                                          </span>
                                        </div>
                                      </div>

                                      {/* {notification.eventName.replace(
                                        /([A-Z])/g,
                                        " $1"
                                      )}
                                      <span className="block text-xs">
                                        {moment(
                                          notification.dateCreated
                                        ).fromNow()}
                                      </span> */}
                                    </Menu.Item>
                                  ))
                                ) : (
                                  <div className="">
                                    <p className="text-sm font-medium px-4 pb-2">
                                      No notifications to display.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                ) : null}

                {false && myAdd ? (
                  <div className="flex-shrink-0 hidden md:block">
                    <Link
                      to="/create"
                      className="relative inline-flex items-center px-4 py-2 ml-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none"
                    >
                      <span>Create</span>
                    </Link>
                  </div>
                ) : null}

                {myAdd ? (
                  loggedIn ? (
                    <UserMenu handleSignOut={handleSignOut} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSignInModalOpen(true)}
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-full text-white shadow-sm focus:outline-none bg-gray-100 hover:bg-gray-200 text-gray-900"
                    >
                      <span className="">Sign In</span>
                      {/* <span className="hidden md:inline">Sign In / Register</span> */}
                    </button>
                  )
                ) : null}

                <SignInRegisterModal
                  modalOpen={signInModalOpen}
                  setModalOpen={(v) => setSignInModalOpen(v)}
                />

                <div className="flex-shrink-0">
                  {myAdd ? (
                    <Menu as="div" className="inline-flex relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white shadow-sm focus:outline-none bg-green-500 hover:bg-green-600">
                              <span className="sr-only">Wallet</span>
                              {myAdd.substr(0, 6) + "..."}
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-12 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => disconnect()}
                                className="py-2 mb-0 flex items-start rounded-lg bg-red-50 hover:bg-red-100 transition ease-in-out duration-150"
                              >
                                <div className="ml-4">
                                  <p className="text-sm font-bold text-red-500">
                                    Disconnect
                                  </p>
                                </div>
                              </a>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  ) : (
                    <button
                      type="button"
                      onClick={() => connectWallet()}
                      className="bg-indigo-600 hover:bg-indigo-700 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white shadow-sm focus:outline-none"
                    >
                      <span>Connect Wallet</span>
                    </button>
                  )}
                </div>
                <ChainMenu disconnect={changeNetworkHandle} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="border-t">
              <Disclosure.Button
                as={Link}
                to="/search"
                className={classNames(
                  location.pathname == "/search"
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                  "text-center block pl-3 pr-4 py-3 text-base font-medium sm:pl-5 sm:pr-6 appearance-none",
                )}
              >
                Search
              </Disclosure.Button>
              {Routes.filter((item) => item.nav).map((item, index) => (
                <Disclosure.Button
                  as={Link}
                  key={index}
                  // onClick={() => close}
                  to={item.path}
                  className={classNames(
                    item.path == location.pathname
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                    "text-center block pl-3 pr-4 py-3 text-base font-medium sm:pl-5 sm:pr-6 appearance-none",
                  )}
                >
                  {item.title}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
