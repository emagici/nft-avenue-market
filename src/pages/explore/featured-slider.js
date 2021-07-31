import React, { useState } from 'react'
import SectionHeader from '../../components/section-header'
import Slider from '../../components/slider'

import NFT1 from '../../assets/img/nft/nft1.png'
import NFT2 from '../../assets/img/nft/nft2.jpeg'
import NFT3 from '../../assets/img/nft/nft3.jpeg'
import NFT4 from '../../assets/img/nft/nft4.png'
import NFT5 from '../../assets/img/nft/nft5.png'
import CollectionCard from '../../components/cards/collection-card'

const files = [
  {
    id: 'cavendish',
    title: 'Mark Cavendish',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT1,
  },
  {
    id: 'fegtcg',
    title: 'FEG NFP',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT5,
  },
  {
    id: 'pvlace',
    title: 'PVLACE 808 Mafia',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT2,
  },
  {
    id: 'porsche911',
    title: 'Porsche 911',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT4,
  },
  {
    id: 'fegtcg',
    title: 'FEG TCG',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    source: NFT3,
  },
]


export default function FeaturedSlider() {
  return (  
    <div className="mb-10">
      <SectionHeader title="Featured Drops">
      <p className="-mt-3">Browse our exclusive featured drops collection.</p>
      </SectionHeader>
      <div className="-mx-3">
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
            <CollectionCard key={item.id} {...item} />
          ))}
        </Slider>
      </div>
    </div>
  )
}
