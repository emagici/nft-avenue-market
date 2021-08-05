import { Fragment, useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useWallet } from "use-wallet";
import AvenueLogo from "../../assets/img/theavenue-logo.png";
import Routes from "../../routes";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import SignInRegisterModal from "./SignInRegisterModal";

import { UserContext, initialState } from "../../context/user-context";
import { Web3Context } from "../../context/web3-context";
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useAsync } from 'react-async-hook';
import useConstant from 'use-constant';
import UserMenu from "./user-menu";
import axios from "axios";
import AppUrls from '../../AppSettings';
import moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

//reference: https://stackoverflow.com/a/28046731
// Generic reusable hook
const useDebouncedSearch = (searchFunction) => {

  // Handle the input text state
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 1000)
  );

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(
    async () => {
      if (inputText.length === 0) {
        return [];
      } else {
        return debouncedSearchFunction(inputText);
      }
    },
    [debouncedSearchFunction, inputText]
  );

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  };
};

function goToSearchPage(text){
  document.location.href = `/search?search=${text}&auto=1`;
}

const useSearch = () => useDebouncedSearch(text => goToSearchPage(text));

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
  fomoNodeAPI: AppUrls.fomoNodeAPI
};


export default function Navbar() {
  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const location = useLocation();
  // const { account, chainId, connect, error, reset, status } = useWallet()
  const [myAdd, setMyAdd] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [walletSigned, setWalletSigned] = useState(false);
  const [errorStr, setErrorStr] = useState(null);
  //const { inputText, setInputText, searchResults } = useSearch();
  const [inputText, setInputText] = useState(null);
  const [accessToken, setAccessToken] = useState();
  const [notifications, setNotifications] = useState([]);

  // const walletSignIn = () => {
  //   connectWallet(() => setMetamaskSignInModalOpen(true));
  // };

  const signMetamask = async () => {
    web3Context.state.web3Data.eth.personal
      .sign(web3Context.state.web3Data.utils.utf8ToHex("TheAvenue"), myAdd)
      .then(async function (sign) {
        userContext.dispatch({
          type: "SET_SIGN",
          payload: sign,
        });
      });
  };

  function handleSignOut() {
    console.log('signing out');
    web3Context.dispatch({
      type: "RESET_ALL"
    });
    userContext.dispatch({
      type: "RESET_ALL"
    });
    signout();
  }

  const signout = () => {

    if(!userContext.state.accessToken) return

    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/TokenAuth/LogOut`,
      headers: {
        "Authorization": "Bearer " + accessToken + ""
      }
    })
    .then(function (response) {
      document.location.href = `/`;
    })
    .catch(function (response) {
      console.log(response);
      alert("Unable to process request!");
    });
  }

  useEffect(() => {
    const checkConnection = async () => {

        web3Context.dispatch({
          type: "SET_USER_DISCONNECTED"
        });

        let web3;
        if (window.ethereum) {

            web3 = new Web3(window.ethereum);
            web3Context.dispatch({
              type: "SET_WEB3_DATA",
              payload: web3,
            });

            web3.eth.getAccounts()
            .then(async (addr) => {
              if(addr.toString()){
                setMyAdd(addr.toString());
                web3Context.dispatch({
                  type: "SET_USER_CONNECTED"
                });
              }
            });
        } else if (window.web3) {

            web3 = new Web3(window.web3.currentProvider);
            web3Context.dispatch({
              type: "SET_WEB3_DATA",
              payload: web3,
            });

            web3.eth.getAccounts()
            .then(async (addr) => {
              if(addr.toString()){
                setMyAdd(addr.toString());
                web3Context.dispatch({
                  type: "SET_USER_CONNECTED"
                });
              }
            });
        };

        if(!window.web3){
          web3 = new Web3("https://bsc-dataseed.binance.org");

          web3Context.dispatch({
            type: "SET_WEB3_DATA",
            payload: web3,
          });
        }
    };
    checkConnection();
  }, []);

  useEffect(() => {
    setLoggedIn(userContext.state.accessToken ? true : false);
    
    if(userContext.state.accessToken)
    {
      setAccessToken(userContext.state.accessToken);
    }

  }, [userContext.state.accessToken]);

  useEffect(() => {
    if(accessToken)
    {
      getNotifications();
    }
  }, [accessToken]);

  useEffect(() => {
    setWalletSigned(userContext.state.sign ? true : false);
  }, [userContext.state.sign]);


  useEffect(() => {
    if(userContext.state.registeredWalletAddress && myAdd){
      if(userContext.state.registeredWalletAddress.toLowerCase() != myAdd.toLowerCase()){
        alert("Please use the wallet sent to email during registration.")
        handleSignOut();
      }else if(!userContext.state.sign){
        signMetamask();
      }
    }
  }, [userContext.state.registeredWalletAddress, myAdd]);

  async function connectWallet(callback) {
    // if (connected) return;

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: "https://bsc-dataseed.binance.org",
          },
          network: 'binance'
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions, // required
    });

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    web3Context.dispatch({
      type: "SET_WEB3_DATA",
      payload: web3,
    });

    const accounts = await web3.eth.getAccounts();
    var myadd = accounts[0];
    setMyAdd(myadd);
    web3Context.dispatch({
      type: "SET_USER_CONNECTED"
    });

    if (callback) callback();

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      document.location.href = "/";
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      document.location.href = "/";
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      document.location.href = "/";
    });
  }

  //reference: https://stackoverflow.com/a/11365682/4490058
  function onEnter(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    
    if (keyCode == 'Enter' || 
        keyCode == 'NumpadEnter'){
      // Enter pressed
      goToSearchPage(e.target.value);
    }
  }

  const getNotifications = () => {

    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetNotifications?take=10`,
      headers: {
        "Authorization": "Bearer " + accessToken + ""
      }
    })
    .then(function (response) {
        console.log(response);
        if(response.data.result){
            setNotifications(response.data.result);
        }
    })
    .catch(function (response) {
      console.log(response);
    });
}


  // useEffect(() => {
  //   console.log(status)
  //   if (status === 'connected') {
  //     setErrorStr(null)
  //   }
  // }, [status])

  // useEffect(() => {
  //   if (error) {
  //     console.log(error.name)
  //     setErrorStr(error.name === 'ChainUnsupportedError' ? 'Unsupported Network' : null)
  //   } else {
  //     setErrorStr(null)
  //   }
  // }, [error])

  // function updateUserContext(data) {
  //   userContext.dispatch({
  //     type: "UPDATE_DATA",
  //     payload: data
  //   })
  // }
  // function connectUser() {
  //   web3Context.dispatch({
  //     type: "SET_USER_CONNECTED"
  //   })
  // }
  // function disconnectUser() {
  //   web3Context.dispatch({
  //     type: "SET_USER_DISCONNECTED"
  //   })
  // }
  // function disconnectUser(data) {
  //   web3Context.dispatch({
  //     type: "SET_WEB3_DATA",
  //     payload: data
  //   })
  // }

  // function howToAccessState() {
  //   const description = userContext.state.description;
  //   // etc etc
  // }

  return (
    <Disclosure as="nav" className="bg-white shadow sticky top-0 navbar">
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
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
                    <img
                      className="hidden sm:block h-8 w-auto"
                      src={AvenueLogo}
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {Routes.filter((item) => item.nav).map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={classNames(
                        item.path == location.pathname
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-700 hover:border-gray-500 hover:text-gray-900",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 hidden lg:flex">
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
              <div className="flex items-center">
                {loggedIn ? (
                  <div className="hidden md:mr-2 md:flex-shrink-0 md:flex md:items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-gray-100 p-2 rounded-full flex justify-center items-center text-sm hover:bg-gray-200 focus:outline-none shadow-sm">
                              <span className="sr-only">View notifications</span>
                              <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                              className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <div className="px-4 py-3">
                                <h1 className="font-bold mb-2">Notifications</h1>
                                {notifications && notifications.length ? (
                                  notifications.map((notification) => (
                                    <Menu.Item 
                                      as="a" 
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700 text-center">
                                        {notification.eventName.replace(/([A-Z])/g, " $1")}

                                        <Menu.Item 
                                          as="span"
                                          className="block text-xs text-right">
                                          {moment(notification.dateCreated).fromNow()}
                                        </Menu.Item>
                                    </Menu.Item>
                                  ))
                                ) : (
                                  <div className="">
                                    <p className="text-sm font-medium">No notifications to display.</p>
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

                <div className="flex-shrink-0">
                  <Fragment>
                    {loggedIn ? (
                      <UserMenu />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSignInModalOpen(true)}
                        className="relative inline-flex items-center px-4 py-2 ml-2 border border-transparent text-sm font-medium rounded-full text-white shadow-sm focus:outline-none bg-indigo-600 hover:bg-indigo-700"
                      >
                        <span>Sign In / Register</span>
                      </button>
                    )}
                    <SignInRegisterModal
                      modalOpen={signInModalOpen}
                      setModalOpen={(v) => setSignInModalOpen(v)}
                    />
                  </Fragment>

                  {myAdd ? (
                    <Menu as="div" className="inline-flex relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="relative inline-flex items-center px-4 py-2 ml-2 border border-transparent text-sm font-medium rounded-full text-white shadow-sm focus:outline-none bg-green-500 hover:bg-green-600">
                              <span className="sr-only">Wallet</span>
                              {myAdd.substr(0,6) + "..."}
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
                                onClick={() => alert('disconnect')}
                                className="py-2 mb-0 flex items-start rounded-lg bg-red-50 hover:bg-red-100 transition ease-in-out duration-150"
                              >
                                <div className="ml-4">
                                  <p className="text-sm font-bold text-red-500">Disconnect</p>
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
                      className="bg-indigo-600 hover:bg-indigo-700 relative inline-flex items-center px-4 py-2 ml-2 border border-transparent text-sm font-medium rounded-full text-white shadow-sm focus:outline-none"
                    >
                      <span>Connect Wallet</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="border-t">
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
                    "text-center block pl-3 pr-4 py-3 text-base font-medium sm:pl-5 sm:pr-6"
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
  );
}
