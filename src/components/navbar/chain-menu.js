import { Fragment, useState, useContext, useEffect } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { classNames } from '../../utilities/utils'

import BnbLogo from '../../assets/img/logos/bnb-64.png'
import EthLogo from '../../assets/img/logos/eth-64.png'

import { UserContext } from '../../context/user-context';

const menuItems = [
  { name: 'BSC', image: BnbLogo, id: 0 },
  { name: 'Ethereum', image: EthLogo, id: 1 }
]

export default function ChainMenu(props) {
  const userContext = useContext(UserContext);

  let blockchain = menuItems[userContext.state.blockchainId];
  const [activeNetwork, setActiveNetwork] = useState(blockchain? blockchain : { name: 'BSC', image: BnbLogo, id: 0 });

  useEffect(() => {
    userContext.dispatch({
      type: "SET_BLOCKCHAIN_ID",
      payload: activeNetwork.id
    });
  }, [activeNetwork]);

  function networkSelected(item) {
    setActiveNetwork(item);
    props.disconnect();
    // goToMainPage()
  }

  function goToMainPage(text){
    document.location.href = `/`;
  }

  return (
    <div className="md:flex-shrink-0 flex md:items-center">
      <Popover as="div" className="relative">
        {({ open }) => (
          <>
            <div className="flex items-center justify-center">
              <Popover.Button className="relative inline-flex items-center text-sm font-bold rounded-full text-gray-900 shadow-sm focus:outline-none">
                <span className="">
                  <img src={activeNetwork.image} className="h-9 w-9 rounded-full" />
                </span>
              </Popover.Button>
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
              <Popover.Panel
                static
                className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-2">
                  {menuItems.map((item) => (
                    <Popover.Button
                      // as="a"
                      key={item.name}
                      className={classNames(
                        item.name === activeNetwork.name
                          ? 'bg-gray-100' : 'hover:bg-gray-100',
                          "w-full py-2 my-1 flex items-start rounded-lg transition ease-in-out duration-150"
                      )}
                    >
                      <a href="javascript:void(0);" onClick={() => networkSelected(item)} className="w-full">
                        <div className="ml-4 flex justify-between">
                          <div className="flex items-center">
                            <img src={item.image} className="h-7 w-7 rounded-full mr-2" />
                            <p className="text-sm text-left font-bold text-gray-900">{item.name}</p>
                          </div>
                          {item.name === activeNetwork.name ? (
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faCheckCircle} className="mr-4 text-gray-800" />
                            </div>
                          ) : null}
                        </div>
                      </a>
                    </Popover.Button>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
