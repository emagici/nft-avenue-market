import React from 'react'
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
    id: '5',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT5,
  },
]

export default function PopularSection() {
  return (
    <div className="py-20">
      <div className="max-w-screen-2xl mx-auto">

        <SectionHeader title="Popular">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <TitleDropdown title="Auctions" />
            </div>
            <div>
              <Dropdown title="Today" />
            </div>
          </div>
        </SectionHeader>

        <CardList items={files} />
        
      </div>
    </div>
  )
}
