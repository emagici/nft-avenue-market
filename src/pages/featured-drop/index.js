import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import qs from 'qs'
import PromoBanner from '../../components/banner/promo-banner'

export default function FeaturedDrop() {
  const location = useLocation()
  const [dropId, setDropId] = useState(null)

  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    setDropId(params.id ? params.id : null)
  }, [])

  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        {dropId ? (
          <h1 className="text-4xl font-bold text-center capitalize">{dropId}</h1>
        ) : null}
      </div>
    </div>
  )
}
