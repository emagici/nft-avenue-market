import React, { useState } from 'react'
import TextBanner from '../../components/banner/text-banner'
import Sellers from './popular'
import Discover from './discover'
import FeaturedArtists from './featured-artists'
import TopSellers from './top-sellers'


export default function Explore() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
      <TextBanner/>
      <Discover/>
      <TopSellers/>
      <FeaturedArtists/>
      <Sellers/>
    </div>
  )
}
