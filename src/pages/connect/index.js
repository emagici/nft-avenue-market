import React from 'react'
import { useToasts } from 'react-toast-notifications'
import SectionHeader from '../../components/section-header'

import WCLogo from '../../assets/img/logos/wc-logo.png'
import MMLogo from '../../assets/img/logos/mm-logo.png'

const people = [
  {
    name: 'MetaMask',
    desc: 'The most popular choice for connecting.',
    imageUrl: MMLogo,
  },
  {
    name: 'WalletConnect',
    desc: 'Connect using Trust Wallet, Rainbow and more',
    imageUrl: WCLogo
  },
]

export default function Connect() {
  const { addToast } = useToasts()
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-screen-2xl mx-auto py-10 px-4 sm:px-6">
        <SectionHeader title="Connect Wallet">
          <div className="flex justify-between">
            <p>Connect using one of the available wallet connections to use <span className="font-bold">The Avenue</span>.</p>
            <button
              type="button"
              onClick={() => alert('link to an article on wallets')}
              className='inline-flex items-center px-4 py-2 mx-1 rounded-full text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none'
            >
              What is a wallet?
            </button>
          </div>
        </SectionHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {people.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => alert(`connect to ${wallet.name}`)}
              className="block relative rounded-lg border border-gray-50 shadow-lg bg-white px-6 py-5 shadow-sm items-center flex space-x-3 hover:opacity-90 transition-opacity hover:border-gray-200"
            >
              <div className="flex-shrink-0">
                <img className="h-20 w-20 rounded-full" src={wallet.imageUrl} alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <a className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-lg text-left font-bold text-gray-900">{wallet.name}</p>
                  <p className="text-md text-left text-gray-600">{wallet.desc}</p>
                </a>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
