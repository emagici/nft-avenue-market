import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NFT1 from '../../assets/img/nft/nft1.png'
import Dropdown from '../../components/dropdown'
import qs from 'qs'
import { Fragment } from 'preact'

const tabs = [
  { name: 'Info', href: '#', current: true },
  { name: 'Owners', href: '#', current: false },
  { name: 'History', href: '#', current: false },
  { name: 'Bids', href: '#', current: false },
]

const listingTypes = ['Fixed Price', 'Timed Auction', 'Open For Offers']
const listingLengths = [1, 3, 7, 14, 30]

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

export default function ItemDetail(props) {
  const [activeTab, setActiveTab] = useState('Info');
  const [isOwner, setIsOwner] = useState(true);
  const [listingId, setListingId] = useState(false);
  const [listingType, setListingType] = useState('Fixed Price');
  const [listingLength, setListingLength] = useState(7);

  useEffect(() => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    // if (params.list == '1') setListingId(1)
  }, [])

  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        
        <div className="mt-10 md:grid md:grid-cols-3 gap-x-6">
          <div className="flex justify-center md:justify-end mb-5 md:mb-0">
            <div className="flex-1 max-w-sm">
              <div className="block aspect-w-10 aspect-h-12 rounded-lg bg-gray-100 focus:outline-none overflow-hidden shadow-lg">
                <img src={NFT1} alt="" className="object-cover pointer-events-none group-hover:opacity-90" />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <h1 className="font-bold text-3xl text-center md:text-left mb-2">#1 Fomo Lab NFT</h1>

            {listingId ? (
              <div className="flex gap-x-1 mb-3 justify-center md:justify-start">
                <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-green-500 font-bold text-green-500 truncate pointer-events-none">2.45 BNB</p>
                <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-gray-500 font-bold text-gray-500 truncate pointer-events-none">$744.20</p>
              </div>
            ) : null}

            <div className="relative flex items-center gap-x-2 mb-5 justify-center md:justify-start">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
              </div>
              <div className="min-w-0">
                <Link to={`/user?id=${user.id}`} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.role}</p>
                </Link>
              </div>
            </div>

            <p className="mb-6 text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            {!isOwner && listingId ? (
              <div className="flex gap-2 justify-center md:justify-start">
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
            ) : null}

            {isOwner && !listingId ? (
              <div className="py-5">
                
                {/* <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Listing type</p>
                  <Dropdown title="Fixed price" />
                </div> */}

                <div className="space-y-6 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">List Item</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Select from the options below to list your item</p>
                  </div>
                  <div className="space-y-6 sm:space-y-5 border-b border-gray-200 pb-5">

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Listing Type
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                          id="listing-type"
                          name="listing-type"
                          value={listingType}
                          onChange={(e) => setListingType(e.target.value)}
                          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        >
                          {listingTypes.map(item => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {['Fixed Price'].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Price (BNB)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    ) : null}

                    {['Timed Auction'].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Starting Price (BNB)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="start-price"
                            id="start-price"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    ) : null}

                    {['Open For Offers'].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Minimum Offer (BNB)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="min-price"
                            id="min-price"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    ) : null}

                    {['Fixed Price', 'Timed Auction'].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Listing Length (days)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="listing-length"
                            name="listing-length"
                            value={listingLength}
                            onChange={(e) => setListingLength(e.target.value)}
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            {listingLengths.map(item => (
                              <option key={item} value={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : null}

                    {['Open For Offers'].includes(listingType) ? (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Listing Length (days)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="listing-length"
                            name="listing-length"
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            disabled
                          >
                            <option value="0">Until sold/cancelled</option>
                          </select>
                        </div>
                      </div>
                    ) : null}

                  </div>
                </div>

                <div className="flex gap-2 justify-start mt-5">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none"
                  >
                    <span>List Item</span>
                  </button>
                </div>

              </div>
            ) : null}

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
