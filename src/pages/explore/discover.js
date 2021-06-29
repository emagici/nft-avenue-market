import React, { useState } from 'react'
import Dropdown from '../../components/dropdown'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'

import NFT1 from '../../assets/img/nft/nft1.png'
import NFT2 from '../../assets/img/nft/nft2.jpeg'
import NFT3 from '../../assets/img/nft/nft3.jpeg'
import NFT4 from '../../assets/img/nft/nft4.png'
import NFT5 from '../../assets/img/nft/nft5.png'

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
    source: NFT5,
  },
  {
    id: '3',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT2,
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
    id: '5',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT3,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Discover() {
  const [activeTab, setActiveTab] = useState('All Items');
  const tabs = ['All Items', 'Art', 'Game'];

  return (  
    <div className="pb-10">
      <SectionHeader title="Discover">
        <div className="sm:grid sm:grid-cols-5">
          <div>
            <Dropdown title="Recently added" />
          </div>
          <div className="col-span-3 text-center mt-3 sm:mt-0 sm:ml-4">
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
          <div className="text-right">
            <button
              type="button"
              className="inline-flex items-center px-6 py-2 border border-transparent rounded-full text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              Filter
            </button>
          </div>
        </div>
      </SectionHeader>
      <CardList items={files} />
    </div>
  )
}
