/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChartBarIcon,
  CursorClickIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  LogoutIcon
} from '@heroicons/react/outline'

const menuItems = [
  { name: 'My Items', href: '/user' },
  { name: 'Edit Profile', href: '/settings' },
]

const callsToAction = [
  { name: 'Sign Out', href: '#', icon: LogoutIcon },
  // { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Popover className="sm:relative inline-flex">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-700',
              'relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white shadow-sm focus:outline-none'
            )}
          >
            <span>Account</span>
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
              <div className="relative rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden bg-white">
                <div className="border-b px-6 pt-5 pb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <img
                      className="inline-block h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                      alt=""
                    />
                    <h2 className="font-bold sm:font-extrabold text-lg sm:text-lg">CryptoChown</h2>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500">Balance</p>
                    <p className="text-lg font-bold text-gray-800">5.86 BNB</p>
                  </div>
                </div>
                <div className="p-2 pt-1">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href ? item.href : "javascript:void(0);"}
                      onClick={item.onClick ? item.onClick : null}
                      className="py-2 my-1 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <div className="ml-4">
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                      </div>
                    </a>
                  ))}
                  <a
                    href="javascript:void(0);"
                    onClick={() => console.log('sign out')}
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
