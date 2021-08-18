import React from 'react'

import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import SectionTitle from '../../components/section-title'
import PageTitle from '../../components/page-title'

import FomoLogo from '../../assets/img/fomo/fomo-logo.png'
import BlakMadreLogo from '../../assets/img/logos/blkmadre-logo.jpeg'
import FutureTechLogo from '../../assets/img/logos/futuretech-logo.png'
import FutureProofLogo from '../../assets/img/logos/futurproof-logo.png'

const collaborators = [
  {
    image: FomoLogo,
    url: "https://fomolab.io",
    name: "Fomo Lab"
  },
  {
    image: FutureTechLogo,
    url: "https://wearefuturetech.com/",
    name: "Future Tech"
  },
  {
    image: FutureProofLogo,
    url: "https://www.futurproof.io/",
    name: "Futur Proof"
  },
  {
    image: BlakMadreLogo,
    url: "https://blackmadre.com/",
    name: "Black Madre"
  },
]

const items = [
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmTb3E5tfmEyuSDsqY6WZfgbd23eVT6RTx3yRAe7eGE72Q",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "30 STAGE WINS (1 OF 1)",
    TokenId: 100,
    price: "182.2",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmTNa3xk8DUcJtte2B7C53fpEDsjxyNSiGuMAR7ARVAsCa",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "30 STAGE WINS (30x)",
    TokenId: 1,
    price: "3.66",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmXBoj8emvCcMQQyvDZB1zRvWVJQkYVhcRG2uzFxFqF6Yi",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "FOUR IN A ROW (100x)",
    TokenId: 101,
    price: "0.9",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmS5upXS87pmmvoxwf7DnRbnTqqnNFF5HeqTqXCNcT4GqL",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "2016 UTAH BEACH (100x)",
    TokenId: 102,
    price: "0.9",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmdGoR7si1QWnNNvgiGukjuRJRRfcFmXAcq5Qeas1ZkjZh",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "2008 Breakthrough Tour Victory (100x)",
    TokenId: 103,
    price: "0.9",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmRKASHk2A8G56iCeYGr6NQXczn4XcqmjyXtR13XkQHBaD",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "The Sprint King Prevails In Brive (100x)",
    TokenId: 104,
    price: "0.9",
    Listed: false,
  },
  {
    Video: "https://pvlacenftcollection.art/ipfs/QmRJ3HitRwJGNViYmgjWqGt7YLkHHm4ArDMPxcQJgSPpzu",
    NftAddress: "0x429b37477dfAD86369503567994b2e548E2F0e0d",
    TokenName: "Wins In Style In La Grand-Motte (100x)",
    TokenId: 105,
    price: "0.9",
    Listed: false,
  },
]

export default function CavendishDrop() {
  return (
    <div className="p-6">
      <PageTitle title="Mark Cavendish" />
      <div className="max-w-screen-2xl mx-auto">

        <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-20 sm:mb-28">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1323x615:1325x613)/origin-imgresizer.eurosport.com/2021/06/27/3161852-64792768-2560-1440.jpg"
              alt="mark cavendish"
            />
            <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" aria-hidden="true" />
          </div>
          <div className="relative max-w-6xl mx-auto py-12 px-4 sm:py-28 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">Mark Cavendish</h1>
            <p className="mt-1 text-lg sm:text-3xl font-medium sm:font-extrabold text-white">Official Tour de France NFT Series</p>
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
          <p className="mb-3 font-medium">The Avenue by FOMO Lab are proud to debut the Mark Cavendish Limited Edition, Tour de France 2021 NFT Series in collaboration with Futurproof.</p>
          <p className="mb-3 font-medium">The NFT Collection is a digital non-fungible token (NFT) that commemorates CAVs thirty historic Official Tour de France stage wins. It is launching with SIX limited edition NFT trading cards with different exclusive versions to celebrate the Mark Cavendish success & historic moments to date. Each card is a unique piece of memorabilia. Limited to just 30 & 100 editions of each card, each edition will be minted on the blockchain and the series will never be replicated.</p>
        </div>

        <div className="mb-20 sm:mb-28">
          <SectionHeader title="In The Collection" titleClasses="text-center" />
          <CardList items={items} />
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="Find Out More" />
          <p>To find out more about this drop you can <a className="font-bold text-indigo-700" href="https://thefomolab.medium.com/mark-cavendish-tour-de-france-series-nft-collection-faq-dccee086a4c4" target="_blank" rel="noreferrer">read the article on Medium</a> now.</p>
        </div>

      </div>
    </div>
  )
}
