import React from 'react'
import TextBanner from '../../components/banner/text-banner'
import PromoBanner from '../../components/banner/promo-banner'
import Dropdown from '../../components/dropdown'
import { AdjustmentsIcon } from '@heroicons/react/solid'

const files = [
  {
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
]

export default function Discover() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
      <PromoBanner />
      <div className="pt-20 pb-5 mb-10 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-5">Discover</h3>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <Dropdown />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium text-white bg-gray-900 hover:bg-gray-900 focus:outline-none"
            >
              All Items
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium text-gray-600 bg-white hover:bg-gray-100 focus:outline-none"
            >
              Art
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium text-gray-600 bg-white hover:bg-gray-100 focus:outline-none"
            >
              Game
            </button>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center px-6 py-2 border border-transparent rounded-full text-md font-medium text-white bg-indigo-600 hover:bg-indigo-600 focus:outline-none"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <div>
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {files.map((file) => (
            <li key={file.source} className="relative">
              <div className="group block w-full aspect-w-10 aspect-h-12 rounded-lg bg-gray-100 focus:outline-none overflow-hidden mb-4 shadow-lg">
                <img src={file.source} alt="" className="object-cover pointer-events-none group-hover:opacity-90" />
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for {file.title}</span>
                </button>
              </div>
              <div className="flex justify-between">
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.title}</p>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.price}</p>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none"></p>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.available}</p>
              </div>
              <div className="flex justify-between">
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{`Highest bid ${file.highestbid}`}</p>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">New Bid</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
