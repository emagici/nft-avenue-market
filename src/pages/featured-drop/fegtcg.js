import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import ReactPlayer from 'react-player'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import SectionTitle from '../../components/section-title'

import FegBg from '../../assets/img/feg/feg-bg.png'

const items = [
  {
    Video: "https://pvlacenftcollection.art/ipfs/Qmc2bDxHWUS24PKHEABbjNWovUQ1mWfRGQ6ovZQvt5qnbQ",
    NftAddress: "Qmc2bDxHWUS24PKHEABbjNWovUQ1mWfRGQ6ovZQvt5qnbQ",
    TokenName: "FEG NFP",
    price: "75 FOMO",
    TokenId: 1,
    Listed: false,
    sold: true
  },
]

export default function FegTcgDrop() {
  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto">

        <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-20 sm:mb-28">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src={FegBg}
            />
            <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" aria-hidden="true" />
          </div>
          <div className="relative max-w-6xl mx-auto py-12 px-4 sm:py-28 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">FEG Trading Card Game</h1>
            <p className="mt-1 text-lg sm:text-3xl font-medium sm:font-extrabold text-white"></p>
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="About The Drop" />
          <p className="mb-3 font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc non. Massa tincidunt dui ut ornare. Platea dictumst quisque sagittis purus. Lacus laoreet non curabitur gravida. Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Tempus egestas sed sed risus pretium quam.</p>
          <p className="mb-3 font-medium">Dolor morbi non arcu risus quis varius quam. Volutpat est velit egestas dui. Enim neque volutpat ac tincidunt. Est pellentesque elit ullamcorper dignissim.</p>
        </div>

        <div className="mb-20 sm:mb-28">
          <SectionHeader title="In The Collection" />
          <CardList items={items} />
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="Media" />
          <div className="flex item-center justify-center mb-8">
            <ReactPlayer url="https://youtu.be/CwrHrDz8Ufg" className="max-w-95 object-contain" />
          </div>
        </div>

      </div>
    </div>
  )
}
