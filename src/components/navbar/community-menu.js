import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Popover, Transition } from '@headlessui/react'

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
  { name: 'Discussion', href: 'https://www.reddit.com/r/Fomo_Lab/', target: "_blank" },
  // { name: 'Subscribe', href: '/#subscribe' },
  { name: 'Suggest Feature', href: 'https://forms.gle/TYgFzj6rxfiDdrMt9', target: "_blank" },
  { name: 'Voting (Coming Soon)', href: '#' },
  { name: 'FAQ', href: '/faq' },
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
    href: 'https://www.t.me/FOMOlab',
    icon: (props) => (
      <FontAwesomeIcon icon={faTelegramPlane} size='lg' {...props} />
    ),
  },
]

export default function CommunityMenu() {
  

  return (
    <div className="md:flex-shrink-0 flex md:items-center">
      <Popover className="sm:relative inline-flex">
        {({ open }) => (
          <>
            <Popover.Button className="bg-gray-100 hover:bg-gray-200 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-full text-gray-900 shadow-sm focus:outline-none">
              <span className="lg:hidden">
                <FontAwesomeIcon icon={faEllipsisH} />
              </span>
              <span className="hidden lg:inline">Community</span>
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
                // className="origin-top-right absolute left-0 md:left-auto md:right-0 mt-2 w-full sm:w-72 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                className="absolute z-10 right-0 left-0 sm:left-auto sm:top-auto sm:bottom-auto mt-14 w-screen sm:w-max sm:w-auto"
              >
                <div className="relative rounded-lg w-full sm:w-72 shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden bg-white">
                  <div className="px-1">
                    {menuItems.map((item) => (
                      item.target ? (
                        <a
                          key={item.name}
                          href={item.href} target={item.target ? item.target : '_self'}
                          rel={item.target && item.target === "_blank" ? "noreferrer" : ""}
                          className="py-2 my-1 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                        >
                          <div className="sm:ml-4 flex-1">
                            <p className="text-sm font-bold text-gray-900 text-center sm:text-left">{item.name}</p>
                          </div>
                        </a>
                      ) : (
                        <Popover.Button
                          as={Link}
                          key={item.name}
                          to={item.href}
                          className="py-2 my-1 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150 appearance-none"
                        >
                          <div className="sm:ml-4 flex-1">
                            <p className="text-sm font-bold text-gray-900 text-center sm:text-left">{item.name}</p>
                          </div>
                        </Popover.Button>
                      )
                    ))}
                  </div>
                  <div className="px-2 py-3 border-t">
                    <div className="flex space-x-6 md:order-2 justify-center">
                      {socials.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">{item.name}</span>
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
