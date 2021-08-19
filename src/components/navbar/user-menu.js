import { Fragment, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { Popover, Transition } from '@headlessui/react'
import { LogoutIcon } from '@heroicons/react/outline'
import { UserIcon } from '@heroicons/react/solid'
import { Web3Context } from '../../context/web3-context'
import { UserContext } from '../../context/user-context'
import {
  getDefaultTokenAddress
} from "../../utilities/utils";
import axios from "axios";
import AppUrls from '../../AppSettings';

const menuItems = [
  // { name: 'Buy $FOMO', href: 'https://pancakeswap.finance/swap?outputCurrency=0x5eef8c4320e2bf8d1e6231a31500fd7a87d02985', target: '_blank' },
  { name: 'My Profile', href: '/user' },
  { name: 'Edit Profile', href: '/settings' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
  fomoNodeAPI: AppUrls.fomoNodeAPI
};

export default function UserMenu(props) {
  const { addToast } = useToasts()
  const web3Context = useContext(Web3Context);
  const userContext = useContext(UserContext);

  const [userName, setUserName] = useState("User");
  const [primaryTokenBalance, setPrimaryTokenBalance] = useState("0");
  const [secondaryTokenBalance, setSecondaryTokenBalance] = useState("0");
  const [accessToken, setAccessToken] = useState();

  useEffect(async() => {
    if(web3Context.state.web3Data == null) return

    const accounts = await web3Context.state.web3Data.eth.getAccounts();
    var myadd = accounts[0];

    if(!myadd) return

    web3Context.state.web3Data.eth.getBalance(myadd, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        try {
          const balArr = web3Context.state.web3Data.utils.fromWei(result, "ether").split('.')
          let balStr = balArr[0]
          setPrimaryTokenBalance(balArr.length == 1 ? balStr : `${balStr}.${balArr[1].substr(0,3)}`)
        } catch(e) {
          setPrimaryTokenBalance(0)
        }
      }
    })

    const minABI = [
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
    ];

    const contract = new web3Context.state.web3Data.eth.Contract(minABI, getDefaultTokenAddress(userContext.state.blockchainId));
    const result = await contract.methods.balanceOf(myadd).call();

    try {
      const balArr = web3Context.state.web3Data.utils.fromWei(result, "ether").split('.')
      let balStr = balArr[0]
      setSecondaryTokenBalance(balArr.length == 1 ? balStr : `${balStr}.${balArr[1].substr(0,1)}`)
    } catch(e) {
      setSecondaryTokenBalance(0)
    }

  }, [web3Context.state.web3Data]);

  function handleSignOut() {
    props.handleSignOut();
  }

  useEffect(() => {
    updateUserName();
  }, [userContext]);

  function updateUserName(){
    if(userContext.state.name){
      if (userContext.state.name.length > 15) {
        setUserName(`${userContext.state.name.substr(0,5)}...${userContext.state.name.substr(-4,4)}`);
      } else {
        setUserName(userContext.state.name)
      }
    }
  }

  const loadProfile = async (accessToken) => {
    await axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/User/GetProfile?blockchain=${userContext.state.blockchainId}`,
      headers: {
        "Authorization": "Bearer " + accessToken + ""
      }
    })
    .then(function (response) {

      userContext.dispatch({
        type: "UPDATE_DATA",
        payload: response.data.result
       })
    })
    .catch(function (response) {
      console.log(response);
    })
  }

  useEffect(() => {
      setAccessToken(userContext.state.accessToken);

      if(userContext.state.accessToken)
        loadProfile(userContext.state.accessToken)
  }, [userContext.state.accessToken]);

  return (
    <Popover className="sm:relative inline-flex">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 hover:bg-gray-200',
              'p-2 rounded-full flex justify-center items-center text-sm focus:outline-none shadow-sm'
            )}
          >
            <span>
              <UserIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-10 right-0 left-0 sm:left-auto sm:top-auto sm:bottom-auto mt-14 w-screen sm:w-max sm:w-auto"
            >
              <div className="relative rounded-lg w-full sm:w-72 shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden bg-white">
                <div className="border-b px-6 pt-5 pb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    {userContext.state.profilePictureUrl ? (
                      <img
                        className="inline-block h-8 w-8 rounded-full"
                        src={userContext.state.profilePictureUrl}
                        alt="user image"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 ring-1 ring-white"></div>
                    )}
                    <h2 className="font-bold sm:font-extrabold text-lg sm:text-lg">{userName}</h2>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-bold text-gray-500">{userContext.state.blockchainId == 0 ? "BNB" : "ETH"} Balance</p>
                    <p className="text-lg font-bold text-gray-800">{primaryTokenBalance} {userContext.state.blockchainId == 0 ? "BNB" : "ETH"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500">{userContext.state.blockchainId == 0 ? "FOMO" : "USDT"} Balance</p>
                    <p className="text-lg font-bold text-gray-800">{secondaryTokenBalance} {userContext.state.blockchainId == 0 ? "FOMO" : "USDT"}</p>
                  </div>
                  <div className="-mx-3 mt-3 -mb-2">
                    <a
                      href="https://pancakeswap.finance/swap?outputCurrency=0x5eef8c4320e2bf8d1e6231a31500fd7a87d02985" target="_blank"
                      className="py-2 my-1 flex items-center rounded-lg bg-gray-900 hover:bg-gray-800 transition ease-in-out duration-150"
                    >
                      <p className="flex-1 text-sm font-bold text-white text-center">Buy $FOMO</p>
                    </a>
                  </div>
                </div>
                <div className="p-2 pt-1">
                  {menuItems.map((item) => (
                    item.target ? (
                      <a
                        key={item.name}
                        href={item.href} target={item.target ? item.target : '_self'}
                        className="py-2 my-1 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <div className="ml-4">
                          <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        </div>
                      </a>
                    ) : (
                      <Popover.Button
                        as={Link}
                        key={item.name}
                        to={item.href}
                        className="py-2 my-1 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <div className="ml-4">
                          <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        </div>
                      </Popover.Button>
                    )
                  ))}
                  <a
                    href="javascript:void(0);"
                    onClick={() => handleSignOut()}
                    className="py-2 my-1 mb-0 flex items-start rounded-lg bg-red-50 hover:bg-red-100 transition ease-in-out duration-150"
                  >
                    <div className="ml-4">
                      <p className="text-sm font-bold text-red-500">Sign Out</p>
                    </div>
                  </a>
                </div>
                {/* <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                  {callsToAction.map((item) => (
                    <div key={item.name} className="flow-root">
                      <a
                        href={item.href}
                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">{item.name}</span>
                      </a>
                    </div>
                  ))}
                </div> */}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
