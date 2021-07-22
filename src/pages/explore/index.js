import React, { useState } from 'react'
import TextBanner from '../../components/banner/text-banner'
import Sellers from './popular'
import Discover from './discover'
import FeaturedArtists from './featured-artists'
import TopSellers from './top-sellers'
import Following from './following'


export default function Explore() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
      <div className="mb-20">
        <TextBanner
          title="The New Creative Economy"
          subtitle="Create, Explore, Collect Digital Art NFTs"
        />
      </div>
      <Discover/>
      {/* <TopSellers/>
      <FeaturedArtists/>
      <Following/>
      <Sellers/> */}
    </div>
  )
}
