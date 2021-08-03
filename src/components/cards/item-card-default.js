import { Fragment, useState } from 'react'
import { Link } from "react-router-dom"
import Modal from '../modal'
import { TagIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/solid'
import VideoBox from '../video-box'

export default function CardDefault(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Fragment>

      <li className="relative mb-8">
        <div className="group block w-full aspect-w-10 aspect-h-10 rounded-lg bg-gray-100 focus:outline-none overflow-hidden mb-4 shadow-lg">
      
          {props.Video ? (
            <video muted playsInline autoPlay loop src={props.Video} alt="" className="object-cover pointer-events-none group-hover:opacity-90 transition-opacity" />
          ) : (
            <img src={props.Image} alt="" className="object-cover pointer-events-none group-hover:opacity-90 transition-opacity" />
          )}

          {!props.nolink ? (
            <Link
              to={`/item-detail?listed=${props.Listed}&tokenid=${props.TokenId}&nftaddress=${props.NftAddress}`}
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {props.TokenName}</span>
            </Link>
          ) : null}
        </div>
        <div className="flex justify-between">
          <p className="mt-2 block text-md font-medium text-gray-900 truncate pointer-events-none">{props.TokenName}</p>
         {props.price ? (
           <p className="mt-2 block text-sm py-1 px-2 uppercase inline font-bold text-green-500 truncate pointer-events-none">{props.price}</p>
         ) : null} 
        </div>
        {/* <div className="flex justify-between items-end border-b border-gray-200 pb-3">
          {props.nolink ? (
            <div className="flex items-center">
              <img
                className="inline-block h-6 w-6 rounded-full"
                src="https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <p className="hidden sm:block text-xs ml-1.5 font-bold">CryptoChown</p>
            </div>
          ) : (
            <Link to="/user">
              <div className="flex items-center">
                <img
                  className="inline-block h-6 w-6 rounded-full"
                  src="https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                  alt=""
                />
                <p className="hidden sm:block text-xs ml-1.5 font-bold mt-1">CryptoChown</p>
              </div>
            </Link>
          )}
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{props.available}</p>
        </div> */}
        <div className="flex justify-between">
          {props.highestbid ? (
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none"><span className="font-light">Highest bid </span>{props.highestbid}</p>
          ) : null}
          {props.sellItem && false ? (
            // <p className="mt-2 block text-sm text-gray-900 truncate pointer-events-none font-light">New Bid</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex justify-center items-center px-2 py-1 mt-1 shadow-md text-xs font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              <span>Sell Item</span>
            </button>
          ) : null}
        </div>
      </li>

      <Modal title="Put On Sale" open={modalOpen} setOpen={(v) => setModalOpen(v)} hideFooter>
        <div>
          <div className="mt-3 text-center sm:mt-5">
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-5">Choose sale type</p>
              <div className="md:flex justify-center items-center mb-3">
                <button
                  onClick={() => alert('follow')}
                  className="flex md:flex-col justify-center items-center mb-3 px-4 py-2 w-full mx-1.5 md:w-32 md:h-40 shadow-lg text-sm font-bold rounded-2xl border border-gray-200 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  <div className="flex justify-center mb-1">
                    <TagIcon className="h-5 w-5 md:h-7 md:w-7 mr-1 md:mr-0 text-gray-700" aria-hidden="true" />
                  </div>
                  <p className="">Fixed Price</p>
                </button>
                <button
                  onClick={() => alert('follow')}
                  className="flex md:flex-col justify-center items-center mb-3 px-4 py-2 w-full mx-1.5 md:w-32 md:h-40 shadow-lg text-sm font-bold rounded-2xl border border-gray-200 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  <div className="flex justify-center mb-1">
                    <ClockIcon className="h-5 w-5 md:h-7 md:w-7 mr-1 md:mr-0 text-gray-700" aria-hidden="true" />
                  </div>
                  <p>Timed Auction</p>
                </button>
                <button
                  onClick={() => alert('follow')}
                  className="flex md:flex-col justify-center items-center mb-3 px-4 py-2 w-full mx-1.5 md:w-32 md:h-40 shadow-lg text-sm font-bold rounded-2xl border border-gray-200 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  <div className="flex justify-center mb-1">
                    <CurrencyDollarIcon className="h-5 w-5 md:h-7 md:w-7 mr-1 md:mr-0 text-gray-700" aria-hidden="true" />
                  </div>
                  <p>Open For Bids</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

    </Fragment>
  )
}