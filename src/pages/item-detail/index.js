import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NFT1 from '../../assets/img/nft/nft1.png'

const tabs = [
  { name: 'Info', href: '#', current: true },
  { name: 'Owners', href: '#', current: false },
  { name: 'History', href: '#', current: false },
  { name: 'Bids', href: '#', current: false },
]

const user = {
  id: '1',
  name: 'CryptoChown',
  email: 'lesliealexander@example.com',
  role: 'Power Seller',
  imageUrl: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ItemDetail() {
  const [activeTab, setActiveTab] = useState('Info');

  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        
        <div className="mt-10 grid md:grid-cols-3 gap-x-6">
          <div className="">
            <div className="block w-full aspect-w-10 aspect-h-12 rounded-lg bg-gray-100 focus:outline-none overflow-hidden shadow-lg">
              <img src={NFT1} alt="" className="object-cover pointer-events-none group-hover:opacity-90" />
            </div>
          </div>
          <div className="col-span-2">
            <h1 className="font-bold text-3xl">#1 Fomo Lab NFT</h1>
            <div className="flex gap-x-1 mb-5">
              <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-green-500 font-bold text-green-500 truncate pointer-events-none">2.45 BNB</p>
              <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-gray-500 font-bold text-gray-500 truncate pointer-events-none">$744.20</p>
            </div>

            <div className="relative flex items-center gap-x-2 mb-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/profile?id=${user.id}`} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.role}</p>
                </Link>
              </div>
            </div>

            <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <div className="flex gap-2">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none"
              >
                <span>Buy Now</span>
              </button>
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none"
              >
                <span>Place Bid</span>
              </button>
            </div>

            <div className="border-b border-gray-200 mb-6">
              <div className="sm:flex sm:items-baseline">
                <div className="mt-10">
                  <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        href={tab.href}
                        onClick={() => setActiveTab(tab.name)}
                        className={classNames(
                          tab.name === activeTab
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {activeTab === 'Info' ? (
              <h1 className="font-bold text-2xl">Info</h1>
            ) : null}

            {activeTab === 'Owners' ? (
              <h1 className="font-bold text-2xl">Owners</h1>
            ) : null}

            {activeTab === 'History' ? (
              <h1 className="font-bold text-2xl">History</h1>
            ) : null}

            {activeTab === 'Bids' ? (
              <h1 className="font-bold text-2xl">Bids</h1>
            ) : null}

          </div>
        </div>

      </div>
    </div>
  )
}
