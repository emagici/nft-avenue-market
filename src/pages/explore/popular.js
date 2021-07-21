import React, { useState, useEffect } from 'react'
import Dropdown from '../../components/dropdown'
import TitleDropdown from '../../components/dropdown/title-dropdown'
import SectionHeader from '../../components/section-header'
import CardList from '../../components/cards/card-list'

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
    Image: NFT1,
  },
  {
    id: '2',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT2,
  },
  {
    id: '3',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT3,
  },
  {
    id: '4',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT4,
  },
  {
    id: '5',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT5,
  },
]

export default function PopularSection() {
  const [activeDropdown, setActiveDropdown] = useState('auctions');
  const [activeFilterDropdown, setActiveFilterDropdown] = useState('today');
  const options = [
    { id: 'auctions', 'title': 'Auctions' },
    { id: 'collections', 'title': 'Collections' },
    { id: 'sellers', 'title': 'Sellers' },
  ]
  const filterOptions = [
    { id: 'today', 'title': 'Today' },
    { id: 'week', 'title': 'This Week' },
    { id: 'month', 'title': 'This Month' },
  ]

  return (
    <div className="py-10">
      <div className="max-w-screen-2xl mx-auto">

        <SectionHeader title="Popular">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <TitleDropdown
                options={options}
                active={activeDropdown}
                onChange={(v) => setActiveDropdown(v)}
                menuPosition='left'
              />
            </div>
            <div>
              <Dropdown
                options={filterOptions}
                active={activeFilterDropdown}
                onChange={(v) => setActiveFilterDropdown(v)}
                menuPosition='right'
              />
            </div>
          </div>
        </SectionHeader>

        <CardList items={files} />
        
      </div>
    </div>
  )
}
