import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import SectionTitle from '../../components/section-title'

import PvlaceImg from '../../assets/img/pvlace/pvlace-lg.jpeg'
import CTLogo from '../../assets/img/logos/cointelegraph.png'

const items = [
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmVsR6hEmS6WSUqepvoH9bJQy1UuRA6ZNzhBUWrid3yavC",
    NftAddress: "QmQxhFQuBnRvoyBWy9AjqhRE5jfmou4nxPydYmegVyqXRj",
    TokenName: "Drake",
    price: "3 BNB",
    TokenId: 1,
    Listed: false,
    sold: true
  },
  {
    Image: "https://pvlacenftcollection.art/ipfs/QmVLeB2EttdHTstNe8MSKCRBQzimrVAtU6ftns6VF8PMCB",
    NftAddress: "QmbBES8sUjV78FVobpaXU8jCWZmpiTh1NiVvjKBLkjHrDw",
    TokenName: "Jay Z",
    price: "3 BNB",
    TokenId: 2,
    Listed: false,
    sold: true
  },
  {
    Image: "https://pvlacenftcollection.art/ipfs/QmWqgJADysfjVnbsjER4sy4tRKMYVJbNn8RcksnzeNehj8",
    NftAddress: "QmXyxkjcyqyCk7qvrdWXuRe7AXequCyWoNRrCQBLY97U6e",
    TokenName: "Kanye West",
    price: "3 BNB",
    TokenId: 3,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmeFVDUav3smNQV5ReDovxRUCX795sy4pes3STfYkEug8o",
    NftAddress: "QmaVhjbmAhwCv9AzwAG4rW8gAqeXJwTZv5pV3qsJNkK1Fv",
    TokenName: "Kendrick Lamar",
    price: "3 BNB",
    TokenId: 4,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmNeRSeSf8mbRgDXTChMkLgqMLcvUUwEXdpc1sn2cWRQcv",
    NftAddress: "QmPM6gAL1NhiSrBek87ckhAACE4GCC9tDMfnyAKdhyMqUX",
    TokenName: "Lauryn Hill",
    price: "3 BNB",
    TokenId: 5,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmdGa3QU4dZqWWfXiTrJQrMMrSqno3DZce3HrkXDgisJV2",
    NftAddress: "QmcVeXBSV9pEaE1kBiVaD2owzywE3A5Batf31oZQZGD8t2",
    TokenName: "21 Savage",
    price: "3 BNB",
    TokenId: 6,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmdWQxqbhjz5bxcnchefJyogujMD2eQrv9qP85qmhG4tWh",
    NftAddress: "QmYQXS4hGR9sg3BGgzvjbmSmxUhLThrJkd9PaEYRiSrqLX",
    TokenName: "ASAP Rocky",
    price: "3 BNB",
    TokenId: 7,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmSFPabdmdnzRCSopLAErb3dQzWWHLXjjVvfSQWXVpS2Vu",
    NftAddress: "QmcgeCXsNeeHUMHzatQa47Ek4H91Y23jrU3cmrcqbQvZ7B",
    TokenName: "Cardi B",
    price: "3 BNB",
    TokenId: 8,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmQUEsJedoPTHXxzCesZWGJrrx1Dir2k1Di4fw69KJ9iQU",
    NftAddress: "QmNtngbQKP5jgrUoCHyhxQmi3w6tordc2TaEDrK2DB6fUM",
    TokenName: "Chief Keef",
    price: "3 BNB",
    TokenId: 9,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmcLRTyTdkYMvHckPAD4uL6qojS18ZXKxdLLSEJBk5m3S9",
    NftAddress: "QmRfvHtEdZTkCAjCovi8uQD49cAnVi9XV5Xk2VaUSvVok5",
    TokenName: "Chris Brown",
    price: "3 BNB",
    TokenId: 10,
    Listed: false,
    sold: true
  },
]

export default function PvlaceDrop() {
  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto">

        <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-20">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src={PvlaceImg}
            />
            <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" aria-hidden="true" />
          </div>
          <div className="relative max-w-6xl mx-auto py-12 px-4 sm:py-28 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">PVLACE 808 MAFIA x GUNBOI</h1>
            <p className="mt-1 text-lg sm:text-3xl font-medium sm:font-extrabold text-white">For The Culture NFT Drop</p>
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-24">
          <SectionTitle title="About The Drop" />
          <p className="mb-3 font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc non. Massa tincidunt dui ut ornare. Platea dictumst quisque sagittis purus. Lacus laoreet non curabitur gravida. Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Tempus egestas sed sed risus pretium quam.</p>
          <p className="mb-3 font-medium">Dolor morbi non arcu risus quis varius quam. Volutpat est velit egestas dui. Enim neque volutpat ac tincidunt. Est pellentesque elit ullamcorper dignissim.</p>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-20">
          <SectionTitle title="As Featured In" />
          <img src={CTLogo} alt="forbes" className="h-14 mb-3 mx-auto mb-5" />
          <p><a className="font-bold text-indigo-700" href="https://cointelegraph.com/press-releases/fomo-lab-to-launch-for-the-culture-nft-collection-by-pvlace-and-gunboi" target="_blank">Read the article</a> now to find out more.</p>
        </div>

        <div className="mb-20">
          <SectionHeader title="In The Collection" />
          <CardList items={items} />
        </div>

      </div>
    </div>
  )
}
