import React from 'react'
import PromoBanner from '../../components/banner/promo-banner'
import MCBanner from '../../assets/img/cavendish/mc-banner-trans.png'

export default function Featured() {
  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <PromoBanner/>
        {/* <div className="max-w-5xl mx-auto mt-10">
          <img src={MCBanner} className="" />
        </div> */}
      </div>
    </div>
  )
}
