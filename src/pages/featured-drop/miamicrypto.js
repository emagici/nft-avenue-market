import React, { useEffect, useState } from 'react'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import SectionTitle from '../../components/section-title'
import VideoBox from '../../components/video-box'

import ForbesLogo from '../../assets/img/logos/forbes-logo.png'
import FomoLogo from '../../assets/img/fomo/fomo-logo.png'
import MiamiCryptoLogo from '../../assets/img/logos/miamicrypto-logo.png'


const collaborators = [
  {
    image: FomoLogo,
    url: "https://fomolab.io",
    name: "Fomo Lab"
  },
  {
    image: MiamiCryptoLogo,
    url: "https://expcrypto.io",
    name: "Miami Crypto"
  }
]

const items = [
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmcaU1u6HLT6gGCmNCnRhg67cB1YozxpChBr3UfaWhHF8S",
    NftAddress: "QmV4m7vE2oHEXwWkM3uj8F2j6PayaFcKYPtVkP6baRGdsU",
    TokenName: "Porsche 911",
    price: "735 BNB",
    TokenId: 1,
    Listed: false,
    sold: true
  },
  {
    Image: "https://fomolabnft.mypinata.cloud/ipfs/QmTmhtQCWo4e9rw7HKiQz4n2UnnJG7hGTsatrj3n6F18NW",
    NftAddress: "QmYdaGRJYGh2rKfpTiGKcqMM3Q25VeDDn7DGWRsDjUA7Zf",
    TokenName: "Rocketship",
    price: "5 BNB",
    TokenId: 2,
    Listed: false,
    sold: true
  },
  {
    Image: "https://fomolabnft.mypinata.cloud/ipfs/QmazJf4uRTCryUHWmgE2DWeQrSpNj3qogYqKLC5xfwLhv6",
    NftAddress: "QmTTvLUSGAuhFinKBYxgxPaa4tCUZayWTCBZne5tpY8keT",
    TokenName: "Xibot Miami",
    price: "35 BNB",
    TokenId: 3,
    Listed: false,
    sold: true
  },
  {
    Video: "https://bafybeibyr5jynbtczhymbzfdzficc5tfvy7rxv6p7q3l57zkgde666mcje.ipfs.dweb.link/",
    NftAddress: "QmeZ4q5kuBqpVqyKv63MvuHj67quyYAgkhxRtcJMbsd4EY",
    TokenName: "Miami Gotchi Dreams",
    price: "1175 BNB",
    TokenId: 4,
    Listed: false,
    sold: true
  },
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmS6D2YD6YpNGHctB3TjXsAXe6bnEYeASZhBn665PhcKd7",
    NftAddress: "QmR5gwF5tBaqDtugfoB2rdX5sKN8GmAUj5Cp5tvksSbCqG",
    TokenName: "Miami Oasis",
    price: "5 BNB",
    TokenId: 5,
    Listed: false,
    sold: true
  },
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmfPeKqMgstznHTxVYX5kGUeN33i6HVwc2vS7aR7YQP49n",
    NftAddress: "QmUCGbdbL9MLpiGNaqJ3ihbHVbQDBYJzk5wnxzqxfXANn7",
    TokenName: "MC PICASSO",
    price: "4 BNB",
    TokenId: 6,
    Listed: false,
    sold: true
  },
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmfBpxjV1RwnJPoHnH2WRjHchkFitADDev5UHQ6xhwULTo",
    NftAddress: "QmSuACoTR7Pyx2C4rzKgFTxc5Moq289QE4fNLsv94d4Zrk",
    TokenName: "Soil of my soul",
    price: "6 BNB",
    TokenId: 7,
    Listed: false,
    sold: true
  },
  {
    Video: "https://bafybeiabtmut2sfregvylbgtfvsiczx5aiqprdp6sibgmfckdl7pqupxeu.ipfs.dweb.link/",
    NftAddress: "QmQSgUYEX2ANhdW6QRTSGX3hiB53HBB29HYNTLSsTp7kB7",
    TokenName: "SBlum/Bitbang",
    price: "5 BNB",
    TokenId: 8,
    Listed: false,
    sold: true
  },
  {
    Video: "https://fomolabnft.mypinata.cloud/ipfs/QmZe2TcfuuBR9Db4VuGWiMR4CWKg5YdsSfspAC9pFms5wJ",
    NftAddress: "QmSX2PXYkTBenp5qcfjeqr6RNkjcFv8cXA4zhJwq93LDkd",
    TokenName: "1st Issue!",
    price: "10 BNB",
    TokenId: 9,
    Listed: false,
    sold: true
  },
]

export default function MiamiDrop() {
  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto">

        <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-20">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="https://rennlist.com/wp-content/uploads/2021/05/Porsche-911-Carrera-Rich-B-Caliene-Rick-Ross-1-e1622224637548.jpg"
            />
            <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" aria-hidden="true" />
          </div>
          <div className="relative max-w-6xl mx-auto py-12 px-4 sm:py-28 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">Miami Crypto</h1>
            <p className="mt-1 text-lg sm:text-3xl font-medium sm:font-extrabold text-white"></p>
          </div>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="Collaborators" />
          <div className="flex flex-wrap justify-center items-center">
            {collaborators.map(item => (
              <div key={item.name} className="flex justify-center items-center p-5">
                <a href={item.url} target="_blank">
                  <img className="h-24 sm:h-36 object-contain" src={item.image} alt={item.name} />
                </a>
              </div>
            ))}
          </div>
        </div>


        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="About The Drop" />
          <p className="mb-3 font-bold">The Miami Crypto Experience was one of the most exclusive NFT/Crypto events in the 2021 Calendar!</p>
          <p className="mb-3 font-medium">With collaborations from Rick Ross, Rich B Caliente, Ali Spagnola, Aavegotchi and many others the Miami Crypto EXP was truly a landmark event for blockchain and a sign of things to come for the crypto communities growth in Miami.</p>
          <p className="mb-3 font-medium">The star of the show was the incredible RBC9ELEVEN NFT, The worlds first Porsche 911 Auction available on the blockchain, powered by fomo lab. The owner of this NFT would also gain full ownership of the actual art-car itself!</p>
          <p className="mb-3 font-medium">Visit the <a className="font-bold text-indigo-600" target="_blank" href="https://expcrypto.io">expcrypto.io</a> website for more information on the event.</p>
          <p className="mb-3 font-medium">For more information on the NFTs and the RBC 9 Eleven scroll down to see more content below.</p>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-20 sm:mb-28">
          <SectionTitle title="As Featured In" />
          <img src={ForbesLogo} alt="forbes" className="h-14 mb-3 mx-auto mb-5" />
          <p><a className="font-bold text-indigo-700" href="https://www.forbes.com/sites/andreabossi/2021/06/04/porsche-911-nft-made-by-rick-ross-caliente-startup-auctions-in-miami/" target="_blank">Read the article</a> now to find out more.</p>
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-20">
          <SectionTitle title="The RBC 9 Eleven NFT" />
          <VideoBox
            url="https://fomolabnft.mypinata.cloud/ipfs/QmcaU1u6HLT6gGCmNCnRhg67cB1YozxpChBr3UfaWhHF8S"
            containerClasses="max-w-3xl"
            playing={true}
            playsinline={true}
            muted={true}
            loop={true}
            controls={true}
          />

          <p className="mb-3 font-medium">Abstract artist and world renown luxury car designer Rich B. Caliente is honored to unveil the NFT #RBC9ELEVEN Porsche for auction beginning June 4th.</p>
          <p className="mb-3 font-medium">The first of a series of forthcoming newly created luxury artwork as minted high-end art NFT’s, the NFT #RBC9ELEVEN Porsche will bring the first luxury art car on the market as a minted high-end NFT with the digital artwork of a customized 2021 Porsche 911 hand-painted by Caliente in collaboration with Grammy award-winning recording artist Rick Ross. For the first time on the NFT market, the purchaser of this unique NFT will acquire the digital artwork of the Porsche 911 as well as receive the physical car with its title embedded in the NFT. This first of its kind NFT provides the metadata, storage, and legal standards that have been virtually absent from artwork and luxury items associated with non-fungible tokens until now.</p>
          <p className="mb-3 font-medium">A portion of proceeds from the sale of the art NFT will benefit the Irie Foundation, an organization dedicated to empowering the lives of at-risk youth in South Florida through mentorship programs, cultural experiences and scholarship opportunities.</p>
          <p className="mb-3 font-medium">The auction was open for bidding between June 4 – June 14.</p>
        </div>

        <div className="mb-20">
          <SectionHeader title="In The Collection" titleClasses="text-center" />
          <CardList items={items} />
        </div>

        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-20">
          <SectionTitle title="Media" />
          <VideoBox
            url="https://youtu.be/X8nttfxQ6_c"
            containerClasses="max-w-2xl"
            playsinline={true}
            controls={true}
          />
          <VideoBox
            url="https://youtu.be/cYE-H3fxsSc"
            containerClasses="max-w-2xl"
            playsinline={true}
            controls={true}
          />
        </div>

      </div>
    </div>
  )
}
