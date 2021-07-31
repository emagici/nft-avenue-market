import React, { useState } from 'react'
import TextBanner from '../../components/banner/text-banner'
import VideoBanner from '../../components/banner/video-banner'
import Sellers from './popular'
import Discover from './discover'
import DiscoverSlider from './discover-slider'
import FeaturedArtists from './featured-artists'
import TopSellers from './top-sellers'
import Following from './following'
import FeaturedSlider from './featured-slider'


export default function Explore() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
      <div className="mb-20">
        <TextBanner
          title="The New Creative Economy"
          subtitle="Create, Explore, Collect Digital Art NFTs"
        />
        {/* <VideoBanner /> */}
      </div>
      <FeaturedSlider/>
      <Discover/>
      {/* <DiscoverSlider/>
      <TopSellers/>
      <FeaturedArtists/>
      <Following/>
      <Sellers/> */}
    </div>
  )
}
