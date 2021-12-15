import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import qs from "qs"

import CavendishDrop from "./cavendish"
import MiamiDrop from "./miamicrypto"
import PvlaceDrop from "./pvlace"
import FegTcgDrop from "./fegtcg"
import JunkieCatzDrop from "./junkiecatz"

export default function FeaturedDrop() {
  const location = useLocation()
  const [dropId, setDropId] = useState(null)

  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    setDropId(params.id ? params.id : null)
  }, [])

  const DropInfo = () => {
    if (dropId) {
      switch (dropId) {
        case "cavendish":
          return <CavendishDrop />

        case "miamicrypto":
          return <MiamiDrop />

        case "pvlace":
          return <PvlaceDrop />

        case "fegtcg":
          return <FegTcgDrop />

        case "junkiecatz":
          return <JunkieCatzDrop />

        default:
          return (
            <div className="flex flex-col items-center">
              <h1 className="text-2xl sm:text-4xl font-bold text-center capitalize mt-4 mb-3">
                Page Not Found
              </h1>
              <Link to="/" className="text-indigo-600 font-bold">
                Return to Home
              </Link>
            </div>
          )
      }
    } else {
      return (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-center capitalize mt-4 mb-3">
            Page Not Found
          </h1>
          <Link to="/" className="text-indigo-600 font-bold">
            Return to Home
          </Link>
        </div>
      )
    }
  }

  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto">
        <DropInfo />
      </div>
    </div>
  )
}
