import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faInstagram,
  faTiktok,
  faMedium,
  faTelegramPlane,
} from '@fortawesome/free-brands-svg-icons'
import { faCommentDots, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

const menuItems = [
  { name: 'Discussion', href: '/' },
  { name: 'Suggest Feature', href: '/' },
  { name: 'Subscribe', href: '/' },
]

const socials = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/fomo_lab',
    icon: (props) => (
      <FontAwesomeIcon icon={faTwitter} size='lg' {...props} />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/fomo_lab/',
    icon: (props) => (
      <FontAwesomeIcon icon={faInstagram} size='lg' {...props} />
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@fomolab',
    icon: (props) => (
      <FontAwesomeIcon icon={faTiktok} size='lg' {...props} />
    ),
  },
  {
    name: 'Medium',
    href: 'https://thefomolab.medium.com/',
    icon: (props) => (
      <FontAwesomeIcon icon={faMedium} size='lg' {...props} />
    ),
  },
  {
    name: 'Telegram',
    href: 'https://github.com/TheFomolab',
    icon: (props) => (
      <FontAwesomeIcon icon={faTelegramPlane} size='lg' {...props} />
    ),
  },
]

export default function CommunityMenu() {
  

  return (
    <div className="mr-2 md:flex-shrink-0 flex md:items-center">
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="bg-gray-100 hover:bg-gray-200 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-full text-gray-900 shadow-sm focus:outline-none">
                <span className="lg:hidden">
                  <FontAwesomeIcon icon={faEllipsisH} size='md' />
                </span>
                <span className="hidden lg:inline">Community</span>
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
                className="origin-top-right absolute left-0 md:left-auto md:right-0 mt-2 w-60 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="p-2 pt-1 border-b">
                  {menuItems.map((item) => (
                    <Menu.Button
                      as={Link}
                      key={item.name}
                      to={item.href}
                      className="py-2 my-1 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <div className="ml-4">
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                      </div>
                    </Menu.Button>
                  ))}
                </div>
                <div className="px-2 py-3">
                  <div className="flex space-x-6 md:order-2 justify-center">
                    {socials.map((item) => (
                      <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
