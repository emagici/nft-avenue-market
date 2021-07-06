import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { Link } from 'react-router-dom'
import SectionHeader from "../../components/section-header"
import CardDefault from "../../components/cards/item-card-default"

import NFT1 from '../../assets/img/nft/nft1.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Create() {
  const [itemFile, setItemFile] = useState(null)
  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [onSale, setOnSale] = useState(false)
  const [onSalePrice, setOnSalePrice] = useState('')
  const [instantSale, setInstantSale] = useState(false)
  const [instantSalePrice, setInstantSalePrice] = useState('')
  const [unlockContent, setUnlockContent] = useState(false)

  const [itemData, setItemData] = useState({
    title: '',
    available: '1 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT1,
  })

  useEffect(() => {
    setItemData({
      title: itemName ? itemName : 'Enter Item Name',
      available: '1 in stock',
      price: onSalePrice ? `${onSalePrice} BNB` : '??? BNB',
      highestbid: '0.5 BNB',
      source: itemFile ? itemFile : NFT1,
    })
  }, [
    itemFile,
    itemName,
    itemDesc,
    onSale,
    onSalePrice,
    instantSale,
    instantSalePrice,
  ])

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6">

      <div className="grid grid-cols-3 space-x-4">
        <div className="col-span-3 lg:col-span-2">
          <SectionHeader title="Create Collectible" />
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 sm:pb-5">
                  <label htmlFor="cover_photo" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Upload File
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex justify-center items-center h-28 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                      <div>
                        <p className="text-xs font-medium text-gray-500">PNG, GIF, WEBP, MP4 or MP3</p>
                      </div>
                      {/* <img src={coverImage} className="h-full w-full object-cover" /> */}
                    </div>
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer focus-within:outline-none"
                    >
                      <span className="py-2 px-4 rounded-full shadow-lg text-sm leading-4 font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">Upload</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => console.log(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 sm:py-5">
                  <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Item Name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="item_name"
                      id="item_name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="about" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Item Description
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    On Sale
                    <p className="mt-2 text-xs font-medium text-gray-500">You'll receive bids on this item</p>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Switch
                      checked={onSale}
                      onChange={setOnSale}
                      className={classNames(
                        onSale ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          onSale ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
              {onSale ? (
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 sm:py-5">
                  <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    On Sale Price
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="on_sale_price"
                      id="on_sale_price"
                      value={onSalePrice}
                      onChange={(e) => setOnSalePrice(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ) : null}
              
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Instant Sale
                    <p className="mt-2 text-xs font-medium text-gray-500">Enter the price for which the item will be instantly sold</p>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Switch
                      checked={instantSale}
                      onChange={setInstantSale}
                      className={classNames(
                        instantSale ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          instantSale ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
              {instantSale ? (
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 sm:py-5">
                  <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Instant Sale Price
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="instant_sale_price"
                      id="instant_sale_price"
                      value={instantSalePrice}
                      onChange={(e) => instantSalePrice(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ) : null}

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Unlock After Purchase
                    <p className="mt-2 text-xs font-medium text-gray-500">Content will be unlocked after successful purchase</p>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Switch
                      checked={unlockContent}
                      onChange={setUnlockContent}
                      className={classNames(
                        unlockContent ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          unlockContent ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                      />
                    </Switch>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <Link
                  to="/user"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none "
                >
                  Cancel
                </Link>
                <Link
                  to="/user"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
                >
                  Preview
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="pl-10 hidden lg:block">
          <ul className="mb-10">
            <CardDefault {...itemData} nolink />
          </ul>
        </div>
      </div>

    </div>
  )
}
