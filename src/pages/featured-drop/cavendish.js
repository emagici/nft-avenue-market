import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"

import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'

const items = [
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmTb3E5tfmEyuSDsqY6WZfgbd23eVT6RTx3yRAe7eGE72Q",
    NftAddress: "QmTb3E5tfmEyuSDsqY6WZfgbd23eVT6RTx3yRAe7eGE72Q",
    TokenName: "30 STAGE WINS (1 OF 1)",
    price: "182.2",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmTNa3xk8DUcJtte2B7C53fpEDsjxyNSiGuMAR7ARVAsCa",
    NftAddress: "QmTNa3xk8DUcJtte2B7C53fpEDsjxyNSiGuMAR7ARVAsCa",
    TokenName: "30 STAGE WINS (30x)",
    price: "3.66",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmXBoj8emvCcMQQyvDZB1zRvWVJQkYVhcRG2uzFxFqF6Yi",
    NftAddress: "QmXBoj8emvCcMQQyvDZB1zRvWVJQkYVhcRG2uzFxFqF6Yi",
    TokenName: "FOUR IN A ROW (100x)",
    price: "0.9",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmS5upXS87pmmvoxwf7DnRbnTqqnNFF5HeqTqXCNcT4GqL",
    NftAddress: "QmS5upXS87pmmvoxwf7DnRbnTqqnNFF5HeqTqXCNcT4GqL",
    TokenName: "2016 UTAH BEACH (100x)",
    price: "0.9",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmdGoR7si1QWnNNvgiGukjuRJRRfcFmXAcq5Qeas1ZkjZh",
    NftAddress: "QmdGoR7si1QWnNNvgiGukjuRJRRfcFmXAcq5Qeas1ZkjZh",
    TokenName: "2008 Breakthrough Tour Victory (100x)",
    price: "0.9",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmRKASHk2A8G56iCeYGr6NQXczn4XcqmjyXtR13XkQHBaD",
    NftAddress: "QmRKASHk2A8G56iCeYGr6NQXczn4XcqmjyXtR13XkQHBaD",
    TokenName: "The Sprint King Prevails In Brive (100x)",
    price: "0.9",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmRJ3HitRwJGNViYmgjWqGt7YLkHHm4ArDMPxcQJgSPpzu",
    NftAddress: "QmRJ3HitRwJGNViYmgjWqGt7YLkHHm4ArDMPxcQJgSPpzu",
    TokenName: "Wins In Style In La Grand-Motte (100x)",
    price: "0.9",
    Listed: false,
  },
]

export default function CavendishDrop() {
  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto">

        <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-20">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1323x615:1325x613)/origin-imgresizer.eurosport.com/2021/06/27/3161852-64792768-2560-1440.jpg"
              alt="mark cavendish"
            />
            <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" aria-hidden="true" />
          </div>
          <div className="relative max-w-6xl mx-auto py-12 px-4 sm:py-28 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">Mark Cavendish</h1>
            <p className="mt-1 text-lg sm:text-3xl font-medium sm:font-extrabold text-white">Official Tour de France NFT Series</p>
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-20">
          <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">About The Drop</h3>
          <p className="mb-3 font-medium">The Avenue by FOMO Lab are proud to debut the Mark Cavendish Limited Edition, Tour de France 2021 NFT Series in collaboration with Futurproof.</p>
          <p className="mb-3 font-medium">The NFT Collection is a digital non-fungible token (NFT) that commemorates CAVs thirty historic Official Tour de France stage wins. It is launching with SIX limited edition NFT trading cards with different exclusive versions to celebrate the Mark Cavendish success & historic moments to date. Each card is a unique piece of memorabilia. Limited to just 30 & 100 editions of each card, each edition will be minted on the blockchain and the series will never be replicated.</p>
        </div>

        <div className="mb-20">
          <SectionHeader title="In The Collection" />
          <CardList items={items} />
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-20">
          <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-8">Find Out More</h3>
          <p>To find out more about this drop you can <a className="font-bold text-indigo-700" href="https://thefomolab.medium.com/mark-cavendish-tour-de-france-series-nft-collection-faq-dccee086a4c4">read the article on Medium</a> now.</p>
        </div>

      </div>
    </div>
  )
}
