import React, { useState } from 'react'
import TextBanner from '../../components/banner/text-banner'
// import PromoBanner from '../../components/banner/promo-banner'
import Sellers from './sellers'
import Discover from './discover'


export default function Explore() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
      <TextBanner />
      <Discover />
      <Sellers/>
    </div>
  )
}
