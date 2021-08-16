import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { useToasts } from 'react-toast-notifications'
import Spinner from '../../components/loading-spinner/spinner'
import CardList from '../../components/cards/card-list'
import qs from 'qs'

import { SearchIcon } from "@heroicons/react/outline";
import AppUrls from '../../AppSettings';
import axios from "axios";
import Web3 from "web3";

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
  fomoNodeAPI: AppUrls.fomoNodeAPI
};

export default function SearchPage() {
  const location = useLocation();
  const { addToast } = useToasts()
  
  const [loading, setLoading] = useState(true);
  const [searchStr, setSearchStr] = useState(null);
  const [results, setResults] = useState(null);
  const [isAutoSearch, setIsAutoSearch] = useState(false);

  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (params.search) {
      if(+params.auto){
        setIsAutoSearch(true);
      }
      setSearchStr(params.search);
    } else {
      setSearchStr(null);
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (!searchStr) return;
    setLoading(false);
    // handle search string here, then set loading to false when ready
    
    if(isAutoSearch){
      setUrlAutoSearchParameterToDefault();
      setIsAutoSearch(false);
      searchNft();
    }
  }, [searchStr]);

   //reference: https://stackoverflow.com/a/22753103/4490058
   function setUrlAutoSearchParameterToDefault(){
    window.history.pushState(
      "object or string", 
      "Title", 
      "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.lastIndexOf('&'))+ "&auto=0");
  }

  function onSearch(e){
    e.preventDefault();
    if (!searchStr){
      return;
    }  
    searchNft();
  }

  //reference: https://stackoverflow.com/a/11365682/4490058
  function onEnter(e){
      if (!e) e = window.event;
      var keyCode = e.code || e.key;
      
      if (keyCode == 'Enter' || 
          keyCode == 'NumpadEnter'){
        // Enter pressed
        onSearch(e);
      }
  }

  function searchNft(){
    setLoading(true);
    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetListedNfts?nftNameFilter=${searchStr}`
    })
    .then(function (response) {

      if(response.data.result && response.data.result.length > 0)
      {
          console.log(response.data.result)
        
          const allItems = response.data.result;
        
          var items = allItems.map((item) => (
            {
              Listed: true,
              TokenId: item.tokenId,
              NftAddress: item.nft,
              TokenName:  item.tokenName,
              Image: item.imageUrl,
              Video: item.videoUrl,
              highestbid: item.latestOffer ? Web3.utils.fromWei(item.latestOffer.pricePerItem.toString(), "ether") : "",
              price: item.latestOffer ? Web3.utils.fromWei(item.price.toString(), "ether") + " BNB": "",
            }
          ));
          
          setResults(items);
      }
      else
      {
        setResults([]);
      }
    })
    .catch(function (response) {
      // console.log(response);
      addToast("Error while searching.", {
        appearance: 'error',
        autoDismiss: true,
      })
    })
    .finally(function(){
      setLoading(false);
    });
  }

  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center capitalize">Searching</h1>
            <Spinner className="h-6 w-6 ml-2" />
          </div>
        ) : (
          !searchStr ? (
            <div>
              <h1 className="text-4xl font-bold text-center capitalize mb-3">Search</h1>
              <div className="flex-1 flex items-center justify-center px-2 mb-3">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter search phrase"
                      type="search"
                      onChange={(e) => setSearchStr(e.target.value)}
                      value={searchStr}
                      onKeyPress={(e) => onEnter(e)}
                    />
                  </div>
                </div>
              </div>
              <button 
                className="mx-auto bg-indigo-600 border border-transparent rounded-full py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                onClick={(e) => onSearch(e)}
              >Search</button>
            </div>
          ) : (
            results && results.length > 0 ? (
              <div>
                <h1 className="text-4xl font-bold text-center capitalize">Search Results</h1>
                <br />
                <br />
                <div>
                  {/* search results here */}
                  <CardList items={results} />
                </div>
              </div>
            ) : results && results.length == 0 ? (
              <div>
                <div className="border-b pb-5">
                  <h1 className="text-4xl font-bold text-center capitalize">No Results</h1>
                </div>
                <div className="flex-1 flex items-center justify-center pt-7 px-2 mb-3">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter search phrase"
                        type="search"
                        onChange={(e) => setSearchStr(e.target.value)}
                        value={searchStr}
                        onKeyPress={(e) => onEnter(e)}
                      />
                    </div>
                  </div>
                </div>
                <button 
                  className="mx-auto bg-indigo-600 border border-transparent rounded-full py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                  onClick={(e) => onSearch(e)}
                  >Search</button>
              </div>
            ) : (
              <div>
                <h1 className="text-4xl font-bold text-center capitalize mb-3">Search</h1>
                <div className="flex-1 flex items-center justify-center pt-7 px-2 mb-3">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter search phrase"
                        type="search"
                        onChange={(e) => setSearchStr(e.target.value)}
                        value={searchStr}
                        onKeyPress={(e) => onEnter(e)}
                      />
                    </div>
                  </div>
                </div>
                <button 
                  className="mx-auto bg-indigo-600 border border-transparent rounded-full py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                  onClick={(e) => onSearch(e)}
                  >Search</button>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}
