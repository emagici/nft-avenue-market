import { Fragment, useState } from 'react'
import { Link } from "react-router-dom"
import Modal from '../modal'
import { TagIcon, ClockIcon, CurrencyDollarIcon, HeartIcon } from '@heroicons/react/solid'

export default function CardDefault(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Fragment>

      <li className="relative mb-8">
        <div className="relative group block w-full aspect-w-10 aspect-h-10 rounded-lg bg-gray-100 focus:outline-none overflow-hidden mb-4 shadow-lg">
      
          {props.Video ? (
            <video muted playsInline autoPlay loop src={props.Video} alt="" className="object-cover pointer-events-none group-hover:opacity-90 transition-opacity" />
          ) : (
            <img src={props.Image} alt="" className="object-cover pointer-events-none group-hover:opacity-90 transition-opacity" />
          )}

          {props.likes? (
            <div className="absolute top-2 bottom-2 ml-2">
              <div className="flex items-center justify-center bg-white h-6 w-10 rounded-xl ring-2 ring-black">
                <HeartIcon
                  className="h-4 w-4 text-gray-400 text-red-600"
                  aria-hidden="true"
                />
                <span className="text-xs font-bold relative top-0.5 ml-0.5">
                  {props.likes} 
                </span>
              </div>
            </div>
          ) : null}

          {/* IF ITEM HAS SELLERS NEED TO LOOP THROUGH AND DISPLAY HERE - MAX 3 AVATARS */}
          <div className="absolute flex items-end justify-end p-2">
            <div className="flex -space-x-1 relative z-0">

              {props.sellers &&
                  props.sellers.slice(0, 3).map((item) => (
                      <img
                        className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src={item.profilePictureUrl}
                        alt=""
                      />
                  ))
              }

            </div>
          </div>

          {!props.nolink ? (
            <Link
              to={`/item-detail?tokenid=${props.TokenId}&nftaddress=${props.NftAddress}`}
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {props.TokenName}</span>
            </Link>
          ) : null}
        </div>
        <div className="grid gap-2">
          <p className="block text-md font-bold text-gray-900 truncate">{props.TokenName}</p>

          {props.highestbid ? (
            <p className="block text-sm font-medium text-gray-900"><span className="font-light">Highest bid: </span>{props.highestbid}</p>
          ) : null}

          {props.price ? (
            <p className="block text-sm uppercase font-bold text-green-500">{props.price}</p>
          ) : null} 

        </div>

        {props.Audio ? (
          <div className="flex justify-between items-end border-b border-gray-200 pb-3">
            <audio controls src={props.Audio}></audio>
          </div>
         ) : null} 

        <div className="flex justify-between">
          {/* {props.Quantity ? (
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none"><span className="font-light">Quantity </span>{props.Quantity}</p>
          ) : null} */}
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