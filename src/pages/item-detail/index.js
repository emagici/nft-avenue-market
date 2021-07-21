import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NFT1 from '../../assets/img/nft/nft1.png'
import Dropdown from '../../components/dropdown'
import qs from 'qs'
import { Accordion, AccordionItem, AccordionPanel } from '../../components/accordion'

const tabs = [
  { name: 'Info', href: '#', current: true },
  { name: 'Creator', href: '#', current: false },
  { name: 'History', href: '#', current: false },
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
  const [isOwner, setIsOwner] = useState(false);
  const [listingId, setListingId] = useState(1);
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
            <h1 className="font-bold text-3xl text-center md:text-left mb-4">#1 Fomo Lab NFT</h1>

            {/* for this section we can check if the item is listed and show current price plus relevant button - e.g, buy now, place bid, make offer, etc */}
            {listingId ? (
              <div class="-mt-4 mb-4">
                <div className="flex gap-x-1 mb-3 justify-center md:justify-start">
                  <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-green-500 font-bold text-green-500 truncate pointer-events-none">2.45 BNB</p>
                  <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-gray-500 font-bold text-gray-500 truncate pointer-events-none">$744.20</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            ) : null}

            <div className="flex space-x-8">
              <div>
                <p className="mb-2 text-center md:text-left font-bold">Owned By</p>
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
              </div>
              <div>
                <p className="mb-2 text-center md:text-left font-bold">Created By</p>
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
              </div>
            </div>
            

            <p className="mb-2 text-center md:text-left font-bold">Description</p>
            <p className="mb-6 text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>


            {/* DYNAMICALLY SHOW EACH RELEVANT LISTING SECTION AS REQUIRED - E.G, HIDE BUY NOW IF BIDS ONLY SELECTED */}
            <Accordion>

              <AccordionItem toggle="buy-now">Buy Now</AccordionItem>
              <AccordionPanel id="buy-now">
                <div className="px-2 mb-3">
                  <p className="mb-1 text-center md:text-left font-bold">Price</p>
                  <div className="flex space-x-2 mb-3 items-center">
                    <p className="block text-xl font-bold text-gray-800 truncate pointer-events-none">2.45 BNB</p>
                    <p className="block text-md font-medium text-gray-400 truncate pointer-events-none">($744.20)</p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
              </AccordionPanel>

              <AccordionItem toggle="listings">Listings</AccordionItem>
              <AccordionPanel id="listings">
                <div className="px-2">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
              </AccordionPanel>

              <AccordionItem toggle="offers">Offers</AccordionItem>
              <AccordionPanel id="offers">
                <div className="px-2">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
              </AccordionPanel>

              <AccordionItem toggle="price-history">Price History</AccordionItem>
              <AccordionPanel id="price-history">
                <div className="px-2">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
              </AccordionPanel>

            </Accordion>

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

            <div className="border-b border-gray-200 mb-3">
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
              <div>
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt className="text-sm font-medium text-gray-800">Contract Address</dt>
                    <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                      <a href="#">0x066f...c0e5</a>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt className="text-sm font-medium text-gray-800">Token ID</dt>
                    <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">180</dd>
                  </div>
                  <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt className="text-sm font-medium text-gray-800">Blockchain</dt>
                    <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">BSC</dd>
                  </div>
                </dl>
              </div>
            ) : null}

            {activeTab === 'Creator' ? (
              <div>
                <h1 className="font-bold text-xl mb-3">About CryptoChown</h1>
                <p className="mb-3 text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p className="text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            ) : null}

            {activeTab === 'History' ? (
              <div>
                <h1 className="font-bold text-2xl">History</h1>
              </div>
            ) : null}

          </div>
        </div>

      </div>
    </div>
  )
}
