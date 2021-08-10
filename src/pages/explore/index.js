import React, { useState, useEffect } from 'react'
import TextBanner from '../../components/banner/text-banner'
import VideoBanner from '../../components/banner/video-banner'
import HottestBidsSection from './hottest-bids'
import Discover from './discover'
import DiscoverSlider from './discover-slider'
import FeaturedArtists from './featured-artists'
import TopSellers from './top-sellers'
import Following from './following'
import GettingStartedSection from './getting-started'
import VerifiedArtistsSection from './verified-artists'


export default function Explore() {
  const [colorIndex, setColorIndex] = useState(0);
  const [promoColors, setPromoColors] = useState({ bgColor: "bg-blue-700", textColor: "text-white" })
  const colors = [
    { bgColor: "bg-green-500", textColor: "text-black" },
    { bgColor: "bg-red-500", textColor: "text-white" },
    { bgColor: "bg-yellow-400", textColor: "text-black" },
    { bgColor: "bg-indigo-600", textColor: "text-white" },
  ]

  useEffect(() => {
    const changeBanner = setInterval(() => {
      setColorIndex(prevState => (prevState+1) == colors.length ? 0 : prevState+1)
    }, 1000)

    return () => {
      clearInterval(changeBanner)
    }
  }, [])

  useEffect(() => {
    setPromoColors(colors[colorIndex])
  }, [colorIndex])


  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
      <div className="mb-20">
        <TextBanner
          title="The New Creative Economy"
          subtitle="Create, Explore, Collect Digital Art NFTs"
          {...promoColors}
        />
        {/* <VideoBanner   /> */}
        {/* <VideoBanner /> */}
      </div>
      <Discover/>
      {/* <DiscoverSlider/> */}
      <TopSellers/>
      <VerifiedArtistsSection/>
      {/* <FeaturedArtists/>
      <Following/> */}
      <HottestBidsSection/>
      <GettingStartedSection/>
    </div>
  )
}
