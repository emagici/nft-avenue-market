import { Fragment, useEffect, useState, useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline'
import { useWallet } from 'use-wallet'
import AvenueLogo from '../../assets/img/theavenue-logo.png'
import Routes from '../../routes'
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { UserContext } from '../../context/user-context'
import { Web3Context } from '../../context/web3-context'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const userContext = useContext(UserContext)
  const web3Context = useContext(Web3Context)

  const location = useLocation()
  // const { account, chainId, connect, error, reset, status } = useWallet()
  const [myAdd, setMyAdd] = useState(null)
  const [connected, setCommnected] = useState(false)
  const [errorStr, setErrorStr] = useState(null)

  useEffect(() => {
    // if (status !== 'connected') {
      connectWallet()
    // }
  }, [])

  async function connectWallet() {

    if(connected)
      return;

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            97:"https://data-seed-prebsc-1-s1.binance.org:8545" 
          }// required
        } 
      }
    };
    
    const web3Modal = new Web3Modal({
      providerOptions // required
    });

    const provider = await web3Modal.connect();

    if(provider.http){
      provider.chainId = 97;
      provider.http.url = "https://data-seed-prebsc-1-s1.binance.org:8545";
      provider.rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";
    }

     const web3 = new Web3(provider);

     console.log(web3)
     web3Context.dispatch({
      type: "SET_WEB3_DATA",
      payload: web3
    })

    const accounts = await web3.eth.getAccounts();
    var myadd = accounts[0];
    setMyAdd(myadd)
    setCommnected(true)

        // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      document.location.href="/";
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      document.location.href="/";
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      document.location.href="/";
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
                  <Link to='/'>
                    <img
                      className="hidden sm:block h-8 w-auto"
                      src={AvenueLogo}
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {Routes.filter(item => item.nav).map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={classNames(
                        item.path == location.pathname
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-700 hover:border-gray-500 hover:text-gray-900',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold'
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
                      <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
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
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Notification #1
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Notification #2
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Notification #3
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>

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
                  <button
                    type="button"
                    onClick={() => connectWallet()}
                    className="relative inline-flex items-center px-4 py-2 ml-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none"
                  >
                    <span>{myAdd ? myAdd.substr(0,6) + '...' : 'Connect Wallet'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="">
              {Routes.filter(item => item.nav).map((item, index) => (
                <Link
                  key={index}
                  onClick={() => open = false}
                  to={item.path}
                  className={classNames(
                    item.path == location.pathname
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 border-l-4'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                    'text-center block pl-3 pr-4 py-3 border-l-4 text-base font-medium sm:pl-5 sm:pr-6'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
