import React, { useEffect, useState } from 'react'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import SectionTitle from '../../components/section-title'
import VideoBox from '../../components/video-box'
import PageTitle from '../../components/page-title'

import FegBg from '../../assets/img/feg/feg-bg.png'
import FomoLogo from '../../assets/img/fomo/fomo-logo.png'
import FegLogo from '../../assets/img/logos/feg-logo.png'

const collaborators = [
  {
    image: FomoLogo,
    url: "https://fomolab.io",
    name: "Fomo Lab"
  },
  {
    image: FegLogo,
    url: "https://fegtoken.com/",
    name: "FEG"
  }
]

const items = [
  {
    Video: "https://pvlacenftcollection.art/ipfs/Qmc2bDxHWUS24PKHEABbjNWovUQ1mWfRGQ6ovZQvt5qnbQ",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "FEG NFP",
    price: "75 FOMO",
    TokenId: 1000,
    Listed: false,
    sold: true
  },
]

export default function FegTcgDrop() {
  return (
    <div className="p-6">
      <PageTitle title="FEG Trading Card Game" />

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
          <p className="mb-3 font-medium">The FEG NFT Based trading card game is the first ever Play-to-earn game that uses NFTs to build a completely unique game experience.</p>
          <p className="mb-3 font-medium">The FEG NFT Game is set in a land far, far away… After the collapse of the FIAT currency system the humans started to disappear and the civilization of the Apes, Gorillas and monkeys that were smart enough to HODL their assets in FEG tokens now run the new world. Gorillas, monkeys and the royal factions that control each of the four lands (North, South, East & West) are now locked  in a never ending war for resources (Feg Bananas) territory (Land parcels) & Weapons to protect themselves from attack from other play controlled warring factions in the FEG Metaverse.</p>
        </div>

        <div className="mb-20 sm:mb-28">
          <SectionHeader title="In The Collection" />
          <CardList items={items} />
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="Media" />
          <VideoBox
            url="https://youtu.be/CwrHrDz8Ufg"
            containerClasses="max-w-2xl"
            playsinline={true}
            controls={true}
          />
        </div>

      </div>
    </div>
  )
}
