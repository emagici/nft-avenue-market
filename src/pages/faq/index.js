import React, { useState } from 'react'
import SectionHeader from "../../components/section-header"

const faqs = {
  General: [
    {
      id: 1,
      question: "NFT? ERC-721 tokens?",
      answer:
        "NFT stands for non-fungible tokens like ERC-721 (a smart contract standard) tokens which are hosted on Ethereum’s own blockchain. NFTs are unique digital items such as collectibles or artworks or game items. As an artist, by tokenizing your work you both ensure that it is unique and brand it as your work. The actual ownership is blockchain-managed.",
    },
    {
      id: 2,
      question: "Can I create my own NFTs on The Avenue?",
      answer:
        "Unfortunately minting access is for verified users only, you can mint directly on the avenue if you are successful with our Verified artist program. To apply for verification please use the link at the bottom of this page.",
    },
    {
      id: 3,
      question: "What is verification?",
      answer:
        "Verified badges are granted to creators and collectors that show enough proof of authenticity and active dedication to the marketplace. We are looking at multiple factors such as active social media presence and following, dialogue with community members,number of minted and sold items.",
    },
    {
      id: 4,
      question: "It's been a while and I did not get verified. Why?",
      answer:
        "If you're not verified within a week since submitting your request, most likely you didn't provide enough information, or your Avenue account is not active enough. Please note that the team reserves the right to not grant the verified badges without further explanation, as we receive hundreds of requests on a daily basis. However, don't let it discourage you! The verified badge is not the key to success on the marketplace. Fill in your profiles, make more sales or purchases, and try once you have consistently used your account and built up your NFT collection!",
    },
    {
      id: 5,
      question: "Can I list an NFT I purchased from a Fomo Lab drop on the avenue?",
      answer:
        "Absolutely, you can list any NFT that has been in a Fomo Lab drop and soon functionality will allow you to list NFTs outside of Fomo Lab specific drops.",
    },
    {
      id: 6,
      question: "What is a Dual Chain marketplace, Can I only use Binance smart chain?",
      answer:
        "The avenue isn’t specific to Binance smart chain alone. You can also list NFT’s from the ethereum blockchain that are from other platforms such as opensea or rarible and sell them on the Avenue!",
    },
    {
      id: 7,
      question: "How does the NFT token bridge work?",
      answer:
        "To ensure truly decentralized marketplace activity and give users the option to choose which chain they would like to list or store their NFTs The avenue has included a cross chain bridge that enables you to transfer NFT assets from Ethereum to binance smart chain with the click of a button! You will be able to list ETH native NFTs on BSC and vice versa. There is more documentation on the Token bridge in the Fomo Lab Gitbook.",
    },
    {
      id: 8,
      question: "How do I view my NFT Collection?",
      answer:
        "Simply connect your web3 wallet to the avenue marketplace and sign in/create an account to be able to view the NFTs you own and the unlockable content.",
    },
    {
      id: 9,
      question: "What does “burn a token” mean?",
      answer:
        "The ERC-721 standard does not only allow the creation of NFTs, but also includes a possibility to destroy them - i.e. burning the token. If for some reason you are sent some spam NFTs or even if you want to increase the scarcity of the NFTs you have purchased. You have the option to burn these NFTs forever.",
    },
    {
      id: 10,
      question: "Do you have an OpenSea integration?",
      answer:
        "Yes, you can view the collectibles you have created on OpenSea and view them here as well. Additionally, it is possible to list your collectibles from OpenSea not only in ETH but also in BNB.",
    },
    {
      id: 11,
      question: "What is 'unlockable content'?",
      answer:
        "As a content creator, you can add unlockable content to your collectibles that only becomes visible after a transfer of ownership (i.e. selling or gifting your NFT). Artists use this feature to include high resolution files, making ofs. videos, secret messages etc.",
    },
    {
      id: 12,
      question: "How do I suggest additional features?",
      answer:
        "You can do this via the community menu at the top of this page or via the contact link in the footer below.",
    },
    {
      id: 13,
      question: "Can I report an artwork or collectible?",
      answer:
        "Yes, go on the detail page of the token you want to report, click on the “...” button and select “Report”.",
    },
  ],
  // Buying: [
  //   {
  //     id: 2,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  //   {
  //     id: 3,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  //   {
  //     id: 4,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  //   {
  //     id: 5,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  // ],
  // Selling: [
  //   {
  //     id: 3,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  //   {
  //     id: 4,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  //   {
  //     id: 6,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  // ],
  // Support: [
  //   {
  //     id: 3,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  //   {
  //     id: 4,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  //   {
  //     id: 5,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  //   {
  //     id: 6,
  //     question: "What's the best thing about Switzerland?",
  //     answer:
  //       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  //   },
  // ]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState('General');
  // const tabs = ['General', 'Buying', 'Selling', 'Support'];
  const tabs = ['General'];

  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto py-10 px-4 sm:px-6">
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Frequently asked questions</h2>
            <SectionHeader>
              {/* <div className="text-center mt-3 sm:mt-0 sm:ml-4">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={classNames(
                      activeTab === tab ? 'text-white bg-gray-900 hover:bg-gray-900' : 'text-gray-600 bg-white hover:bg-gray-100',
                      'inline-flex items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div> */}
            </SectionHeader>
            <div className="mt-12">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-12 lg:grid-cols-1">
                {faqs[activeTab].map((faq) => (
                  <div key={faq.id}>
                    <dt className="text-lg leading-6 font-medium text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
