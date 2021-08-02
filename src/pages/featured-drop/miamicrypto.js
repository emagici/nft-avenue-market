import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import ReactPlayer from 'react-player'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'

import ForbesLogo from '../../assets/img/logos/forbes-logo.png'


const items = [
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmcaU1u6HLT6gGCmNCnRhg67cB1YozxpChBr3UfaWhHF8S",
    NftAddress: "QmV4m7vE2oHEXwWkM3uj8F2j6PayaFcKYPtVkP6baRGdsU",
    TokenName: "Porsche 911",
    price: "735 BNB",
    TokenId: 1,
    Listed: false,
    sold: true
  },
  {
    Image: "https://fomolabnft.mypinata.cloud/ipfs/QmTmhtQCWo4e9rw7HKiQz4n2UnnJG7hGTsatrj3n6F18NW",
    NftAddress: "QmYdaGRJYGh2rKfpTiGKcqMM3Q25VeDDn7DGWRsDjUA7Zf",
    TokenName: "Rocketship",
    price: "5 BNB",
    TokenId: 2,
    Listed: false,
    sold: true
  },
  {
    Image: "https://fomolabnft.mypinata.cloud/ipfs/QmazJf4uRTCryUHWmgE2DWeQrSpNj3qogYqKLC5xfwLhv6",
    NftAddress: "QmTTvLUSGAuhFinKBYxgxPaa4tCUZayWTCBZne5tpY8keT",
    TokenName: "Xibot Miami",
    price: "35 BNB",
    TokenId: 3,
    Listed: false,
    sold: true
  },
  {
    Video: "https://bafybeibyr5jynbtczhymbzfdzficc5tfvy7rxv6p7q3l57zkgde666mcje.ipfs.dweb.link/",
    NftAddress: "QmeZ4q5kuBqpVqyKv63MvuHj67quyYAgkhxRtcJMbsd4EY",
    TokenName: "Miami Gotchi Dreams",
    price: "1175 BNB",
    TokenId: 4,
    Listed: false,
    sold: true
  },
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmS6D2YD6YpNGHctB3TjXsAXe6bnEYeASZhBn665PhcKd7",
    NftAddress: "QmR5gwF5tBaqDtugfoB2rdX5sKN8GmAUj5Cp5tvksSbCqG",
    TokenName: "Miami Oasis",
    price: "5 BNB",
    TokenId: 5,
    Listed: false,
    sold: true
  },
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmfPeKqMgstznHTxVYX5kGUeN33i6HVwc2vS7aR7YQP49n",
    NftAddress: "QmUCGbdbL9MLpiGNaqJ3ihbHVbQDBYJzk5wnxzqxfXANn7",
    TokenName: "MC PICASSO",
    price: "4 BNB",
    TokenId: 6,
    Listed: false,
    sold: true
  },
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmfBpxjV1RwnJPoHnH2WRjHchkFitADDev5UHQ6xhwULTo",
    NftAddress: "QmSuACoTR7Pyx2C4rzKgFTxc5Moq289QE4fNLsv94d4Zrk",
    TokenName: "Soil of my soul",
    price: "6 BNB",
    TokenId: 7,
    Listed: false,
    sold: true
  },
  {
    Video: "https://bafybeiabtmut2sfregvylbgtfvsiczx5aiqprdp6sibgmfckdl7pqupxeu.ipfs.dweb.link/",
    NftAddress: "QmQSgUYEX2ANhdW6QRTSGX3hiB53HBB29HYNTLSsTp7kB7",
    TokenName: "SBlum/Bitbang",
    price: "5 BNB",
    TokenId: 8,
    Listed: false,
    sold: true
  },
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmZe2TcfuuBR9Db4VuGWiMR4CWKg5YdsSfspAC9pFms5wJ",
    NftAddress: "QmSX2PXYkTBenp5qcfjeqr6RNkjcFv8cXA4zhJwq93LDkd",
    TokenName: "1st Issue!",
    price: "10 BNB",
    TokenId: 9,
    Listed: false,
    sold: true
  },
]

export default function MiamiDrop() {
  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto">

        <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-20">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="https://rennlist.com/wp-content/uploads/2021/05/Porsche-911-Carrera-Rich-B-Caliene-Rick-Ross-1-e1622224637548.jpg"
            />
            <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" aria-hidden="true" />
          </div>
          <div className="relative max-w-6xl mx-auto py-12 px-4 sm:py-28 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">Miami Crypto</h1>
            <p className="mt-1 text-lg sm:text-3xl font-medium sm:font-extrabold text-white"></p>
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-20">
          <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">About The Drop</h3>
          <p className="mb-3 font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc non. Massa tincidunt dui ut ornare. Platea dictumst quisque sagittis purus. Lacus laoreet non curabitur gravida. Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Tempus egestas sed sed risus pretium quam.</p>
          <p className="mb-3 font-medium">Dolor morbi non arcu risus quis varius quam. Volutpat est velit egestas dui. Enim neque volutpat ac tincidunt. Est pellentesque elit ullamcorper dignissim.</p>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-20">
          <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">As Featured In</h3>
          <img src={ForbesLogo} alt="forbes" className="h-14 mb-3 mx-auto mb-5" />
          <p><a className="font-bold text-indigo-700" href="https://www.forbes.com/sites/andreabossi/2021/06/04/porsche-911-nft-made-by-rick-ross-caliente-startup-auctions-in-miami/" target="_blank">Read the article</a> now to find out more.</p>
        </div>

        <div className="mb-20">
          <SectionHeader title="In The Collection" />
          <CardList items={items} />
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-20">
          <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-8">Media</h3>
          <div className="flex item-center justify-center mb-8">
            <ReactPlayer url="https://youtu.be/X8nttfxQ6_c" className="max-w-95 object-contain" />
          </div>
          <div className="flex item-center justify-center">
            <ReactPlayer url="https://youtu.be/cYE-H3fxsSc" className="max-w-95 object-contain" />
          </div>
        </div>

      </div>
    </div>
  )
}
