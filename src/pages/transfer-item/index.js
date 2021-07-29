import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import { UserContext } from '../../context/user-context'
import { Web3Context } from '../../context/web3-context'


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TransferItem(props) {
  const [tokenid, setTokenId] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftVideoSrc, setVideoNftSrc] = useState("");
  const [nftImageSrc, setImageNftSrc] = useState("");
  const [web3, setWeb3] = useState();
  const [isItemListed, setIsItemListed] = useState(false);

  const userContext = useContext(UserContext)
  const web3Context = useContext(Web3Context)

  const [qty, setQty] = useState(1);
  const [toAddress, setToAddress] = useState("");


  useEffect(async () => {
    setWeb3(web3Context.state.web3Data);

    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    if(params.listed)
      setIsItemListed(true)
    else
      setIsItemListed(false)

    if(params.tokenid)
      setTokenId(params.tokenid)

    if(params.nftaddress)
      setNftAddress(params.nftaddress);

    }, []);

  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="mt-10 md:grid md:grid-cols-3 gap-x-6">
          <div className="flex justify-center md:justify-end mb-5 md:mb-0">
            <div className="flex-1 max-w-sm">
              <div className="block aspect-w-10 aspect-h-12 rounded-lg bg-gray-100 focus:outline-none overflow-hidden shadow-lg">
                {nftVideoSrc ? (
                  <video
                    autoPlay muted
                    src={nftVideoSrc}
                    className="object-cover pointer-events-none group-hover:opacity-90"
                  />
                ) : (
                  <img
                    src={nftImageSrc}
                    alt="nft"
                    className="object-cover pointer-events-none group-hover:opacity-90"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <h1 className="font-bold text-3xl text-center md:text-left mb-1">Transfer</h1>
            <p className="mb-6 text-center md:text-left">Complete the details below to transfer ownership of your item to another wallet.</p>
            
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                  Quantity
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                  Wallet Address
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:border-t pt-2 sm:pt-5 text-right">
                <button
                  type="button"
                  onClick={() => console.log('confirm transfer')}
                  className="inline-flex justify-center w-full sm:w-auto py-3 sm:py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
                >
                  Confirm Transfer
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
