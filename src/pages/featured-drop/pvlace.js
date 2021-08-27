import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import SectionTitle from '../../components/section-title'
import PageTitle from '../../components/page-title'
import axios from "axios";

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

import AppUrls from '../../AppSettings';
const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
};

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
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "Drake",
    TokenId: 472,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmVLeB2EttdHTstNe8MSKCRBQzimrVAtU6ftns6VF8PMCB",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "Jay Z",
    TokenId: 473,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmWqgJADysfjVnbsjER4sy4tRKMYVJbNn8RcksnzeNehj8",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "Kanye West",
    TokenId: 474,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmeFVDUav3smNQV5ReDovxRUCX795sy4pes3STfYkEug8o",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "Kendrick Lamar",
    TokenId: 457,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmNeRSeSf8mbRgDXTChMkLgqMLcvUUwEXdpc1sn2cWRQcv",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "Lauryn Hill",
    TokenId: 70,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmdGa3QU4dZqWWfXiTrJQrMMrSqno3DZce3HrkXDgisJV2",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "21 Savage",
    TokenId: 71,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmdWQxqbhjz5bxcnchefJyogujMD2eQrv9qP85qmhG4tWh",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "ASAP Rocky",
    TokenId: 72,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmSFPabdmdnzRCSopLAErb3dQzWWHLXjjVvfSQWXVpS2Vu",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "Cardi B",
    TokenId: 458,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmQUEsJedoPTHXxzCesZWGJrrx1Dir2k1Di4fw69KJ9iQU",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "Chief Keef",
    TokenId: 470,
    Listed: false,
    sold: true
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmcLRTyTdkYMvHckPAD4uL6qojS18ZXKxdLLSEJBk5m3S9",
    NftAddress: "0xec6b1abf83f184cdb390c8f95c0d568a6a4dbd80",
    TokenName: "Chris Brown",
    TokenId: 73,
    Listed: false,
    sold: true
  },
]

export default function PvlaceDrop() {
  const [floorPriceUsd, setFloorPriceUsd] = useState();
  const [floorPriceBnb, setFloorPriceBnb] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetFeaturedPageFloorPrice?page=PVLACE`
    })
    .then(function (response) {
  
      const item = response.data.result;

      if(item){
        const usdFloorPrice = item.floorPriceUsd.toString();
        const bnbFloorPrice = item.floorPriceBnb.toString();

        setFloorPriceUsd(usdFloorPrice.indexOf('.') < 0 ? usdFloorPrice : usdFloorPrice.substring(0, usdFloorPrice.indexOf('.') + 2));
        setFloorPriceBnb(bnbFloorPrice.indexOf('.') < 0 ? bnbFloorPrice : bnbFloorPrice.substring(0, bnbFloorPrice.indexOf('.') + 2));
      }
    })
    .catch(function (response) {
    })
  }, []);


  
  return (
    <div className="p-4 md:p-6">
      <PageTitle title="PVLACE x 808 MAFIA x GUNBOI" />

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
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <dl className="rounded-lg bg-white shadow-xl border-4 border-gray-700 sm:grid sm:grid-cols-3">
                    <div className="flex flex-col justify-center border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                      <dd className="text-2xl md:text-3xl lg:text-4xl mt-2 font-extrabold text-gray-900">367</dd>
                      <dt className="mt-1 md:mt-0.5 text-lg leading-6 font-medium text-gray-700">Items</dt>
                    </div>
                    <div className="flex flex-col relative justify-center border-t border-b border-gray-500 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                      <dd className="text-2xl md:text-3xl lg:text-4xl mt-2 font-extrabold text-gray-900">{floorPriceBnb} BNB</dd>
                      <dt className="mt-1 md:mt-0.5 text-lg leading-6 font-medium text-gray-700">Floor Price</dt>
                      <dd className="absolute left-1/2 top-1 transform -translate-x-1/2 font-medium text-sm sm:text-base text-gray-700">{floorPriceUsd} USD</dd>
                    </div>
                    <div className="flex flex-col justify-center border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                      <dd className="text-2xl md:text-3xl lg:text-4xl mt-2 font-extrabold text-gray-900">1.1k BNB</dd>
                      <dt className="mt-1 md:mt-0.5 text-lg leading-6 font-medium text-gray-700">Volume Traded</dt>
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
                <a href={item.url} target="_blank" rel="noreferrer">
                  <img className="h-24 sm:h-36 object-contain" src={item.image} alt={item.name} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="About The Drop" />
          <p className="mb-3 font-medium">Fomo Lab partners with PVLACE of 808 MAFIA and GUNBOI to drop their “FOR THE CULTURE” collection on Fomo Lab’s own NFT platform, The Avenue. This collection will contain 387 intrinsically rare collectibles of music in the form of “mystery boxes”, by PVLACE and GUNBOI, multi-platinum, billboard chart topping, industry leading producers who have made music for some of the biggest names in hip-hop history, including; Wiz Khalifa, Migos, Future, and many more.</p>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="As Featured In" />
          <img src={CTLogo} alt="forbes" className="h-14 mb-3 mx-auto mb-5" />
          <p><a className="font-bold text-indigo-700" href="https://cointelegraph.com/press-releases/fomo-lab-to-launch-for-the-culture-nft-collection-by-pvlace-and-gunboi" target="_blank" rel="noreferrer">Read the article</a> now to find out more.</p>
        </div>

        <div className="mb-20 sm:mb-28">
          <SectionHeader title="In The Collection" titleClasses="text-center" />
          <CardList items={items} />
          <div className="flex justify-center mt-4">
            <Link
              as="button"
              to='/collection/pvlace'
              className="inline-flex items-center px-6 py-2 border-4 border-indigo-600 rounded-full text-md font-bold text-indigo-600 hover:text-white bg-white hover:bg-indigo-600 focus:outline-none transition-all"
            >
              View Collection
            </Link>
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="In The News" />
          <div className="flex flex-wrap justify-center items-center">
            {newsArticles.map(item => (
              <div key={item.name} className="flex justify-center items-center p-5">
                <a href={item.url} target="_blank" rel="noreferrer">
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
                <a href={item.url} target="_blank" rel="noreferrer">
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
