import React, { useState } from 'react'
import Dropdown from '../../components/dropdown'
import CardList from '../../components/cards/card-list'
import ItemCardSlider from '../../components/cards/item-card-slider'
import SectionHeader from '../../components/section-header'
import Slider from '../../components/slider'

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
  {
    id: '6',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT2,
  },
  {
    id: '7',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT4,
  },
  {
    id: '8',
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

export default function DiscoverSlider() {
  const [activeTab, setActiveTab] = useState('All Items');
  const tabs = ['All Items', 'Featured', 'Art', 'Game'];
  
  const [activeDropdown, setActiveDropdown] = useState('recent');
  const options = [
    { id: 'random', 'title': 'Randomised' },
    { id: 'popular', 'title': 'Popular (most likes)' },
    { id: 'priceHightToLow', 'title': 'Price (high to low)' },
    { id: 'priceLowToHigh', 'title': 'Price (low to high)' },
  ];

  return (  
    <div className="">
      <SectionHeader title="Discover">
        <div className="grid md:grid-cols-4">
          <div className="flex md:col-span-3 items-center justify-center md:justify-start mt-3 md:mt-0">
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
          <div className="text-center md:text-right order-first md:order-last">
            <Dropdown
              options={options}
              active={activeDropdown}
              onChange={(v) => setActiveDropdown(v)}
              menuPosition='right'
            />
          </div>
        </div>
      </SectionHeader>
      <Slider
        slidesToShow={5}
        slidesToScroll={1}
        autoplay={true}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]}
      >
        {files.map(item => (
          <ItemCardSlider key={item.id} {...item} />
        ))}
      </Slider>
    </div>
  )
}
