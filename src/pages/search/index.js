import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import Spinner from '../../components/loading-spinner/spinner'
import CardList from '../../components/cards/card-list'
import qs from 'qs'

import { SearchIcon } from "@heroicons/react/outline";

export default function SearchPage() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [searchStr, setSearchStr] = useState(null)
  const [results, setResults] = useState(null)

  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    if (params.search) {
      setSearchStr(params.search)
    } else {
      setSearchStr(null)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!searchStr) return
    setLoading(false)
    // handle search string here, then set loading to false when ready

  }, [searchStr])

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
                    />
                  </div>
                </div>
              </div>
              <button className="mx-auto bg-indigo-600 border border-transparent rounded-full py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none">Search</button>
            </div>
          ) : (
            results ? (
              <div>
                <h1 className="text-4xl font-bold text-center capitalize">Search Results</h1>
                <div>
                  {/* search results here */}
                  {/* <CardList items={results} /> */}
                </div>
              </div>
            ) : (
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
                      />
                    </div>
                  </div>
                </div>
                <button className="mx-auto bg-indigo-600 border border-transparent rounded-full py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none">Search</button>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}
