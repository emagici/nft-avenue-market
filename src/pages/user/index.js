import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import CardDefault from '../../components/cards/item-card-default'
import SectionHeader from '../../components/section-header'
import AvatarList from '../../components/avatar/avatar-list'
import { LoginIcon, LogoutIcon, PencilAltIcon, PlusCircleIcon } from '@heroicons/react/solid'

import NFT1 from '../../assets/img/nft/nft1.png'
import NFT2 from '../../assets/img/nft/nft2.jpeg'
import NFT3 from '../../assets/img/nft/nft3.jpeg'
import NFT4 from '../../assets/img/nft/nft4.png'
import NFT5 from '../../assets/img/nft/nft5.png'
import Modal from '../../components/modal'

const profile = {
  name: 'CryptoChown',
  email: 'ricardo.cooper@example.com',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  avatar:
    'https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  backgroundImage:
    'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  fields: [
    ['Phone', '(555) 123-4567'],
    ['Email', 'ricardocooper@example.com'],
    ['Title', 'Senior Front-End Developer'],
    ['Team', 'Product Development'],
    ['Location', 'San Francisco'],
    ['Sits', 'Oasis, 4th floor'],
    ['Salary', '$145,000'],
    ['Birthday', 'June 8, 1990'],
  ],
}

const files = [
  {
    id: '1',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT1,
  },
  {
    id: '2',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT2,
  },
  {
    id: '3',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT3,
  },
  {
    id: '4',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT4,
  },
  {
    id: '4',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT5,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('On Sale');
  const tabs = ['On Sale', 'Owned', 'Created', 'Liked', 'Following', 'Followers'];

  function handleConfirmSignIn() {
    setSignInModalOpen(false)
    setLoggedIn(true);
  }

  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="relative">
          <img className="h-42 mt-5 shadow-xl w-full rounded-2xl object-cover lg:h-60" src={profile.backgroundImage} alt="" />
          <div className="absolute bottom-5 right-5 z-10">
            {loggedIn ? (
              <div>
                <Link
                  to="/settings"
                  className="inline-flex justify-center px-4 py-2 mr-2 shadow-lg text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <span>Edit Profile</span>
                  <PencilAltIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => setLoggedIn(false)}
                  className="inline-flex justify-center px-4 py-2 mr-2 shadow-lg text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <span>Sign Out</span>
                  <LogoutIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                // onClick={() => setLoggedIn(true)}
                onClick={() => setSignInModalOpen(true)}
                className="inline-flex justify-center px-4 py-2 mr-2 shadow-lg text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <span>Sign In</span>
                <LoginIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5 mb-7">
            <div className="flex">
              {loggedIn ? (
                <img className="h-24 w-24 shadow-lg rounded-full ring-4 ring-white sm:h-32 sm:w-32" src={profile.avatar} alt="" />
              ) : (
                <div className="h-24 w-24 shadow-lg rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-gray-100"></div>
              )}
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">{loggedIn ? profile.name : "Sign in required"}</h1>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                {loggedIn ? (
                  <button
                    onClick={() => alert('follow')}
                    className="inline-flex justify-center px-4 py-2 mr-2 shadow-lg text-sm font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    <span>Follow</span>
                    <PlusCircleIcon className="-mr-1 ml-1 h-5 w-5 text-white" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="">
            {loggedIn ? (
              <div className="px-10">
                <h6 className="font-bold">Bio</h6>
                <p>{profile.bio}</p>
              </div>
            ) : null}
          </div>
          <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">{profile.name}</h1>
          </div>
        </div>

        {loggedIn ? (
          <div className="py-20">
            <div className="mt-3 sm:mt-0 sm:ml-4 text-center mb-20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={classNames(
                    activeTab === tab ? 'text-white bg-gray-900 hover:bg-gray-900' : 'text-gray-600 bg-white hover:bg-gray-100',
                    'inline-flex items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'On Sale' ? (
              <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
                {files.map((item, index) => (
                  <CardDefault key={index} {...item} />
                ))}
              </ul>
            ) : null}

            {activeTab === 'Owned' ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No items owned</h1>
                <p className="font-medium text-gray-600 mb-5">Explore our marketplace to find items now.</p>
                <Link
                  to="/"
                  className='text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none'
                >
                  Explore
                </Link>
              </div>
            ) : null}
            
            {activeTab === 'Created' ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No items created</h1>
                <p className="font-medium text-gray-600 mb-5">You can create NFTs to sell right here on The Avenue</p>
                <button
                  type="button"
                  onClick={() => alert('coming soon')}
                  className='text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none'
                >
                  Create NFT
                </button>
              </div>
            ) : null}
            
            {activeTab === 'Liked' ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No liked items</h1>
                <p className="font-medium text-gray-600 mb-5">Click like on items in the marketplace to save them here.</p>
                <Link
                  to="/"
                  className='text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none'
                >
                  Explore
                </Link>
              </div>
            ) : null}
            
            {activeTab === 'Following' ? (
              <div className="">
                <AvatarList />
              </div>
            ) : null}
            
            {activeTab === 'Followers' ? (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-2">No followers</h1>
                <p className="font-medium text-gray-600 mb-5">Sell and like items to increase your followers</p>
                <Link
                  to="/"
                  className='text-white bg-indigo-600 hover:bg-indigo-600 hover:bg-indigo-700 items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none'
                >
                  Explore
                </Link>
              </div>
            ) : null}

          </div>
        ) : null}

        <Modal open={signInModalOpen} setOpen={(v) => setSignInModalOpen(v)} onConfirm={() => handleConfirmSignIn()}/>

      </div>
    </div>
  )
}
