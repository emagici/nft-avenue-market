import React, { useState } from 'react'

import BG1 from '../../assets/img/bg/bg-pattern-1.jpeg'

const sections = [
  {
    title: "How do you get an NFT?",
    paragraphs: [
      "Before you rush to buy NFTs, there are four things you need to consider first:",
      "What marketplace do you intend to buy the NFTs from?",
      "What wallet do you need to download in order to connect with the platform and purchase NFTs(BSC, ERC20)?",
      "Which cryptocurrency do you need to fund the wallet with in order to complete the sale?",
    ]
  },
  {
    title: "Bridging the NFT and DeFi ecosystems",
    paragraphs: [
      "NFTs are exclusive – that’s the point. Their scarcity and uniqueness have been a big reason behind their massive growth. However, the lack of liquidity this creates could start to see NFTs remain within their own unique niche; as opposed to the widespread, cross-chain adoption of fungible tokens.",
    ]
  },
  {
    title: "What are the use cases for this cross-chain NFT liquidity gateway?",
    paragraphs: [
      "Artists and creators have the ability to own their own liquidity pools, representing the value of the pieces contained within the NFT. The more their NFT is traded, the more value is created.",
      "What might be an even more interesting application of this technology would be the tokenization of real-world assets. This broadens the scope to the entire artist and creator world; including museums and galleries.",
      "Cross chain represents maximum choice to the user as other platforms may seek certain benefits for creator or buyer. For example, BSC has cheaper fees compared to ERC. all is speculative to one's choice and giving the user the most. By tokenising a real-world asset/assets such as a new exhibition, or new collection, artists, galleries and museums gain an enormous new marketplace within the NFT space; but also access to exchanges through the cross-chain capabilities this technology presents.",
    ]
  },
  {
    title: "What is an NFT?",
    paragraphs: [
      "‘NFT’ stands for non-fungible token, but what does that mean?",
      "An NFT is a digital asset that exists completely in the digital universe—you can’t touch it, but you can own it. An NFT can be any type of digital file: Artwork, Virtual items within video games such as skins, virtual currency, weapons and avatars Music, Collectibles (e.g. digital trading cards). Tokenized real-world assets, from real estate and cars to racehorses and designer sneakers Virtual land Video footage of iconic sporting moments.",
    ]
  },
  {
    title: "How do you know your NFT is authentic?",
    paragraphs: [
      "NFT ownership is recorded on the blockchain, and that entry acts as a digital pink slip. Defining the blockchain is a whole ‘nother can of worms that you can read about here.",
      "Where is the blockchain? It’s decentralized, so it exists across many people’s computers in encrypted bits and pieces.",
    ]
  },
  {
    title: "Why should I buy an NFT?",
    paragraphs: [
      "There are many reasons to dive into the exciting world of NFTs. First off, you can support your favorite artists by buying and trading their work. Smart contracts allow artists to automatically get a percentage of all future sales, which opens up a world of opportunities for content creators to monetize their art. ",
      "Another reason why NFTs have exploded in popularity is because they are fun to trade on secondary markets. Many investors have been rewarded by purchasing up-and-coming NFT series before they hit the mainstream, then selling them for a profit. Countless artists can now support themselves with their art thanks to NFTs, and dedicated fans can also make an impact as NFT collectors and traders. ",
    ]
  },
  {
    title: "How do you join The Avenue as an artist/ creator?",
    paragraphs: [
      "Fomo Lab wants to create a platform that connects various different artists and creators. We will be launching a digital gallery partner program that allows these multi-talented individuals to work together collaboratively.",
    ]
  },
]

export default function AGuideToNFTs() {
  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="bg-white">
          <div className="max-w-7xl mx-auto">

            <div className="relative md:mb-20">
              <div className="h-40 md:h-60 shadow-xl w-full rounded-2xl bg-gray-100">
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={BG1}
                  alt=""
                />
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900">A Guide To NFTs</h2>
              </div>
            </div>

            <div className="mt-12">
              {sections.map((section, i) => (
                <div key={i} className="mb-16">
                  <h1 className="font-bold text-xl mb-3">{section.title}</h1>
                  {section.paragraphs.map((p,index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>  
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
