import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CardList from "../../components/cards/card-list"
import SectionHeader from "../../components/section-header"
import SectionTitle from "../../components/section-title"
import VideoBox from "../../components/video-box"
import PageTitle from "../../components/page-title"
import axios from "axios"

import JcBg from "../../assets/img/cps/cps-banner-1.png"
import FomoLogo from "../../assets/img/fomo/fomo-logo.png"
import CpsLogo from "../../assets/img/cps/cps-logo.png"
import PolygonLogo from "../../assets/img/logos/polygon-logo.png"

import AppUrls from "../../AppSettings"
import Spinner from "../../components/loading-spinner/spinner"

const collaborators = [
  {
    image: FomoLogo,
    url: "https://fomolab.io",
    name: "Fomo Lab",
  },
  {
    image: CpsLogo,
    url: "https://cremepieswapfinance.com/",
    name: "Creampie Swap",
  },
  {
    image: PolygonLogo,
    url: "https://polygon.technology/",
    name: "Polygon",
  },
]

const items = [
  {
    Video:
      "https://pvlacenftcollection.art/ipfs/Qmc2bDxHWUS24PKHEABbjNWovUQ1mWfRGQ6ovZQvt5qnbQ",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "FEG NFP",
    TokenId: 1000,
    Listed: false,
    sold: true,
  },
]

export default function JunkieCatzDrop() {
  const [loadingCollection, setLoadingCollection] = useState(true)
  const [collection, setCollection] = useState(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    // getStats()
    getCollection()
  }, [])

  // async function getStats() {
  //   await axios({
  //     method: "get",
  //     url: `${AppUrls.fomoHostApi}/api/services/app/Nft/GetFeaturedPageAnalytics?page=FEGTCG`,
  //   })
  //     .then(function (response) {
  //       const data = response.data.result

  //       if (data) {
  //         const floorPrice =
  //           data.floorPriceUsd > 100
  //             ? `$${Number(data.floorPriceUsd / 1000).toFixed(1)}k`
  //             : `$${data.floorPriceUsd.toFixed(2)}`
  //         const tradeVolume =
  //           data.volumeUsd > 100
  //             ? `$${Number(data.volumeUsd / 1000).toFixed(1)}k`
  //             : `$${data.volumeUsd.toFixed(1)}`
  //         const holders =
  //           data.noOfUniqueUsers > 1000
  //             ? `${Number(data.noOfUniqueUsers / 1000).toFixed(1)}k`
  //             : data.noOfUniqueUsers

  //         setStats({
  //           floorPrice,
  //           tradeVolume,
  //           holders,
  //         })
  //       }
  //     })
  //     .catch(function (response) {})

  //   setLoadingStats(false)
  // }

  async function getCollection() {
    await axios({
      method: "get",
      url: `${AppUrls.fomoHostApi}/api/services/app/Nft/GetFeaturedPageInfo?page=FEGTCG`,
    })
      .then(async function (response) {
        const allItems = response.data.result

        var items = await Promise.all(
          allItems.map(async (item) => ({
            TokenId: item.tokenId,
            NftAddress: item.nft,
            TokenName: item.tokenName,
            Image: item.imageUrl,
            Video: item.videoUrl,
            // highestbid: item.latestOffer ? Web3.utils.fromWei(item.latestOffer.pricePerItem.toString(), "ether") + " " + getPayTokenDetailByAddress(item.latestOffer.payToken, userContext.state.blockchainId).payTokenName : "",
            // price: Web3.utils.fromWei(item.lowestValuePricePerItem.toLocaleString("en-GB").replaceAll(',',''), "ether") + " " + getPayTokenDetailByAddress(item.lowestValuePayToken, userContext.state.blockchainId).payTokenName,
            likes: item.numberOfLikes,
          })),
        )

        setCollection(items)
      })
      .catch(function (response) {
        // console.log(response);
      })

    setLoadingCollection(false)
  }

  return (
    <div className="p-4 md:p-6">
      <PageTitle title="FEG Trading Card Game" />

      <div className="max-w-screen-2xl mx-auto">
        <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-20 sm:mb-28">
          <div className="absolute inset-0">
            <img className="w-full h-full object-cover" src={JcBg} />
            <div
              className="absolute inset-0 bg-gray-600 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>
          <div className="relative max-w-6xl mx-auto py-12 px-4 sm:py-28 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Junkie Catz
            </h1>
            <p className="mt-1 text-lg sm:text-3xl font-medium sm:font-extrabold text-white"></p>
          </div>
        </div>

        {false && !loadingStats && !stats ? (
          <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
            <div className="mt-10 pb-12 bg-white sm:pb-16">
              <div className="relative">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    <dl className="rounded-lg bg-white shadow-xl border-4 border-gray-700 sm:grid sm:grid-cols-3">
                      <div className="flex flex-col justify-center border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                        {loadingStats ? (
                          <div className="flex items-center justify-center">
                            <Spinner className="h-6 w-6" />
                          </div>
                        ) : (
                          <dd className="text-2xl md:text-3xl lg:text-4xl mt-2 font-extrabold text-gray-900">
                            {stats ? stats.holders : ""}
                          </dd>
                        )}
                        <dt className="mt-1 md:mt-0.5 text-lg leading-6 font-medium text-gray-700">
                          Holders
                        </dt>
                      </div>
                      <div className="flex flex-col relative justify-center border-t border-b border-gray-500 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                        {loadingStats ? (
                          <div className="flex items-center justify-center">
                            <Spinner className="h-6 w-6" />
                          </div>
                        ) : (
                          <dd className="text-2xl md:text-3xl lg:text-4xl mt-2 font-extrabold text-gray-900">
                            {stats ? stats.floorPrice : ""}
                          </dd>
                        )}
                        <dt className="mt-1 md:mt-0.5 text-lg leading-6 font-medium text-gray-700">
                          Floor Price
                        </dt>
                      </div>
                      <div className="flex flex-col justify-center border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                        {loadingStats ? (
                          <div className="flex items-center justify-center">
                            <Spinner className="h-6 w-6" />
                          </div>
                        ) : (
                          <dd className="text-2xl md:text-3xl lg:text-4xl mt-2 font-extrabold text-gray-900">
                            {stats ? stats.tradeVolume : ""}
                          </dd>
                        )}
                        <dt className="mt-1 md:mt-0.5 text-lg leading-6 font-medium text-gray-700">
                          Volume Traded
                        </dt>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="Collaborators" />
          <div className="flex flex-wrap justify-center items-center">
            {collaborators.map((item) => (
              <div
                key={item.name}
                className="flex justify-center items-center p-5"
              >
                <a href={item.url} target="_blank" rel="noreferrer">
                  <img
                    className="h-24 sm:h-36 object-contain"
                    src={item.image}
                    alt={item.name}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="About The Drop" />
          <p className="mb-3 font-medium">
            Junkie Catz is a creative, artistic depiction of some misfortunate,
            feline junkies - created by a team of NFT fanatics.
          </p>
          <p className="mb-3 font-medium">
            Minted on the Polygon Network, the artwork is unique and tells the
            dramatic story of how a group of once ordinary house cats became
            degenerate, addicted, Junkie Catz.
          </p>
          <p className="mb-3 font-medium">
            Owning a Junkie Cat is not just about having a rare piece of digital
            art or a personalized avatar, of course that's part of it, but
            really it's about gaining access to a vibrant and successful
            COMMUNITY.
          </p>
        </div>

        <div className="mb-20 sm:mb-28">
          <SectionHeader title="In The Collection" />
          <CardList items={[]} loading={loadingCollection} hideShowMore />
          {false &&
          !loadingCollection &&
          collection &&
          collection.length > 10 ? (
            <div className="flex justify-center mt-4">
              <Link
                as="a"
                to="/collection/FEGTCG"
                className="inline-flex items-center px-6 py-2 border-4 border-indigo-600 rounded-full text-md font-bold text-indigo-600 hover:text-white bg-white hover:bg-indigo-600 focus:outline-none transition-all"
              >
                View Full Collection
              </Link>
            </div>
          ) : null}
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="Media" />
          <VideoBox
            url="https://res.cloudinary.com/fomo-lab/video/upload/ac_none,c_scale,h_600,w_600/v1635467095/cps/jc-promo-720_ps4ena.mp4"
            containerClasses="max-w-2xl"
            playsinline={true}
            controls={true}
            muted={true}
            loop={true}
            playing={true}
          />
        </div>
      </div>
    </div>
  )
}
