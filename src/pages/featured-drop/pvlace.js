import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import SectionTitle from '../../components/section-title'

import PvlaceImg from '../../assets/img/pvlace/pvlace-lg.jpeg'
import CTLogo from '../../assets/img/logos/cointelegraph.png'

import FomoLogo from '../../assets/img/fomo/fomo-logo.png'
import PvlaceLogo from '../../assets/img/logos/pvlace-logo.jpeg'
import GunboiLogo from '../../assets/img/logos/gunboi-logo.png'
import ThisIs50 from '../../assets/img/logos/thisis50.png'
import CryptoDaily from '../../assets/img/logos/cryptodaily-logo.jpeg'
import CryptoPys from '../../assets/img/logos/cryptosys-logo.jpeg'
import UsaNewsLab from '../../assets/img/logos/usanewslab-logo.png'
import ALPLogo from '../../assets/img/logos/alp-logo.png'
import NewsbreakLogo from '../../assets/img/logos/newsbreak-logo.png'
import DiscogsLogo from '../../assets/img/logos/discogs-logo.jpeg'
import GeniusLogo from '../../assets/img/logos/genius-logo.jpeg'

const collaborators = [
  {
    image: FomoLogo,
    url: "https://fomolab.io",
    name: "Fomo Lab"
  },
  {
    image: PvlaceLogo,
    url: "https://www.instagram.com/pvlace808mafia/?hl=en",
    name: "Pvlace"
  },
  {
    image: GunboiLogo,
    url: "https://www.instagram.com/gunboi/?hl=en",
    name: "Gunboi"
  },
]

const newsArticles = [
  {
    image: ThisIs50,
    url: "https://thisis50.com/2021/06/07/interview-808-mafias-pvlace-gunboi-talks-for-the-culture-collection-on-fomo-labs-own-nft-platform/",
    name: "This Is 50"
  },
  {
    image: CryptoDaily,
    url: "https://cryptodaily.co.uk/2021/05/Fomo-Lab-Partners-with-PVLACE-of-808-MAFIA-and-Gunboi-to-drop",
    name: "Crypto Daily"
  },
  {
    image: CryptoPys,
    url: "https://cryptopys.com/2021/05/17/fomo-lab-partners-with-pvlace-of-808-mafia-and-gunboi-to-drop-their-for-the-culture-collection/",
    name: "Cryptopys"
  },
  {
    image: UsaNewsLab,
    url: "https://usanewslab.com/crypto-news/fomo-lab-partners-with-pvlace-of-808-mafia-and-gunboi-to-drop-for-the-culture-collection/",
    name: "USA News Lab"
  },
  {
    image: ALPLogo,
    url: "https://www.alp.com/news/fomo-lab-and-pvlace-are-going-to-drop-an-nft-collection",
    name: "ALP"
  },
  {
    image: NewsbreakLogo,
    url: "https://www.newsbreak.com/news/2252535617048/fomo-lab-partners-with-pvlace-of-808-mafia-and-gunboi-to-drop-for-the-culture-collection",
    name: "Newsbreak"
  }, 
]

const mediaLinks = [
  {
    image: GeniusLogo,
    url: "https://genius.com/artists/Pvlace",
    name: "Genius"
  },
  {
    image: DiscogsLogo,
    url: "https://www.discogs.com/artist/6145473-PVLACE",
    name: "Discogs"
  },
]

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
    Video: "https://pvlacenftcollection.art/ipfs/QmVLeB2EttdHTstNe8MSKCRBQzimrVAtU6ftns6VF8PMCB",
    NftAddress: "QmbBES8sUjV78FVobpaXU8jCWZmpiTh1NiVvjKBLkjHrDw",
    TokenName: "Jay Z",
    price: "3 BNB",
    TokenId: 2,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmWqgJADysfjVnbsjER4sy4tRKMYVJbNn8RcksnzeNehj8",
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

        <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-20 sm:mb-28">
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

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <div className="mt-10 pb-12 bg-white sm:pb-16">
            <div className="relative">
              <div className="hidden sm:block absolute inset-0 h-4 bg-indigo-600 rounded-md top-1/2 transform -translate-y-1/2" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <dl className="rounded-lg bg-white shadow-xl border-4 border-indigo-700 sm:grid sm:grid-cols-3">
                    <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                      <dt className="order-2 mt-1 md:mt-2 text-lg leading-6 font-medium text-gray-500">Items</dt>
                      <dd className="order-1 text-2xl md:text-4xl lg:text-5xl font-extrabold text-indigo-600">367</dd>
                    </div>
                    <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                      <dt className="order-2 mt-1 md:mt-2 text-lg leading-6 font-medium text-gray-500">Floor Price</dt>
                      <dd className="order-1 text-2xl md:text-4xl lg:text-5xl font-extrabold text-indigo-600">3 BNB</dd>
                    </div>
                    <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                      <dt className="order-2 mt-1 md:mt-2 text-lg leading-6 font-medium text-gray-500">Volume Traded</dt>
                      <dd className="order-1 text-2xl md:text-4xl lg:text-5xl font-extrabold text-indigo-600">1.1k BNB</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="Collaborators" />
          <div className="flex flex-wrap justify-center items-center">
            {collaborators.map(item => (
              <div key={item.name} className="flex justify-center items-center p-5">
                <a href={item.url} target="_blank">
                  <img className="h-24 sm:h-36 object-contain" src={item.image} alt={item.name} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="About The Drop" />
          <p className="mb-3 font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc non. Massa tincidunt dui ut ornare. Platea dictumst quisque sagittis purus. Lacus laoreet non curabitur gravida. Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Tempus egestas sed sed risus pretium quam.</p>
          <p className="mb-3 font-medium">Dolor morbi non arcu risus quis varius quam. Volutpat est velit egestas dui. Enim neque volutpat ac tincidunt. Est pellentesque elit ullamcorper dignissim.</p>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="As Featured In" />
          <img src={CTLogo} alt="forbes" className="h-14 mb-3 mx-auto mb-5" />
          <p><a className="font-bold text-indigo-700" href="https://cointelegraph.com/press-releases/fomo-lab-to-launch-for-the-culture-nft-collection-by-pvlace-and-gunboi" target="_blank">Read the article</a> now to find out more.</p>
        </div>

        <div className="mb-20 sm:mb-28">
          <SectionHeader title="In The Collection" titleClasses="text-center" />
          <CardList items={items} />
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="In The News" />
          <div className="flex flex-wrap justify-center items-center">
            {newsArticles.map(item => (
              <div key={item.name} className="flex justify-center items-center p-5">
                <a href={item.url} target="_blank">
                  <img className="h-24 w-24 sm:h-36 sm:w-36 object-contain" src={item.image} alt={item.name} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="Media" />
          <div className="flex flex-wrap justify-center items-center">
            {mediaLinks.map(item => (
              <div key={item.name} className="flex justify-center items-center p-5">
                <a href={item.url} target="_blank">
                  <img className="h-32 w-32 sm:h-44 sm:w-44 object-contain" src={item.image} alt={item.name} />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
