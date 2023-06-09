import React, { useEffect, useState, useContext } from "react";
import Dropdown from '../../components/dropdown'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import axios from "axios";
import Web3 from "web3";
import { Web3Context } from '../../context/web3-context'
import { UserContext } from '../../context/user-context';
import Spinner from '../../components/loading-spinner/spinner';
import { classNames } from '../../utilities/utils'
import {
  getPayTokenFromListing, getPayTokenDetailByAddress, toFixed
} from "../../utilities/utils";

import AppUrls from '../../AppSettings';
const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};


export default function Discover() {
  const [web3, setWeb3] = useState();
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Featured', 'Music', 'Games', 'Art', 'Utility'];
  const tabsDropdown = [
    { title: 'All' },
    { title: 'Featured' },
    { title: 'Music' },
    { title: 'Games' },
    { title: 'Art' },
    { title: 'Utility' }
  ]
  
  const [filterText, setFilerText] = useState('');
  const [activeDropdown, setActiveDropdown] = useState('random');
  const [listedItems, setListedItems] = useState([]);
  const options = [
    { id: 'random', 'title': 'Inspire Me' },
    { id: 'popular', 'title': 'Most Liked' },
    { id: 'priceHightToLow', 'title': 'Price (High to Low)' },
    { id: 'priceLowToHigh', 'title': 'Price (Low to High)' },
  ];
  const [loading, setLoading] = useState(true);
  const web3Context = useContext(Web3Context);
  const userContext = useContext(UserContext);

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  useEffect(() => {
    if (!web3) return;  
    GetListedNfts();
  }, [web3, activeDropdown, activeTab]);

  function GetListedNfts(){
    setLoading(true);

    axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetListedNfts?nftNameFilter=${filterText}&categoryFilter=${normalizeCategoryFilter()}&sorting=${activeDropdown}&blockchain=${userContext.state.blockchainId ?? 0}`
    })
    .then(async function (response) {

      const allItems = response.data.result;

      console.log(allItems)

      var items = await Promise.all(allItems.map(async (item) => {
        const offersSorted = item.offers.sort(function(a, b) {return b.pricePerItemUsd - a.pricePerItemUsd;});
        const highestbidItem = offersSorted[0];

         var obj = {
          Listed: true,
          TokenId: item.tokenId,
          NftAddress: item.nft,
          TokenName:  item.tokenName,
          Image: item.imageUrl,
          Video: item.videoUrl,
          highestbid: highestbidItem ? Web3.utils.fromWei(toFixed(highestbidItem.pricePerItem), "ether") + " " + getPayTokenDetailByAddress(highestbidItem.payToken, userContext.state.blockchainId).payTokenName : "",
          price: Web3.utils.fromWei(toFixed(item.lowestValuePricePerItem), "ether") + " " + getPayTokenDetailByAddress(item.lowestValuePayToken, userContext.state.blockchainId).payTokenName,
          likes: item.numberOfLikes,
          sellers: item.sellers
        }
        return obj;
      }))

      // items = items.sort(function(a, b) {return b.likes - a.likes;});

      setListedItems(items);
    })
    .catch(function (response) {
      console.log(response);
    })
    .finally(function(){
      setLoading(false);
    });
  }

  function normalizeCategoryFilter() {
    if(activeTab == 'All')
      return '';

    return activeTab;
  }

  return (  
    <div className="">
      <SectionHeader title="Discover">
        <div className="grid md:grid-cols-4">
          <div className="flex md:col-span-3 items-center justify-center md:justify-start mb-3 md:mb-0">
            {tabs.map((tab, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={classNames(
                  activeTab === tab ? 'text-white bg-gray-900 hover:bg-gray-900' : 'text-gray-600 bg-white hover:bg-gray-100',
                  'hidden sm:inline-flex items-center px-4 py-2 mx-1 border border-transparent rounded-full text-sm font-medium focus:outline-none'
                )}
              >
                {tab}
              </button>
            ))}

            <div className="sm:hidden">
              <Dropdown
                options={tabsDropdown}
                active={activeTab}
                onChange={(v) => setActiveTab(v)}
                menuPosition='left'
              />
            </div>
          </div>
          <div className="text-center md:text-right">
            <Dropdown
              options={options}
              active={activeDropdown}
              onChange={(v) => setActiveDropdown(v)}
              menuPosition='right'
            />
          </div>
        </div>
      </SectionHeader>
      {/* {loading ? (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center capitalize">Loading</h1>
            <Spinner className="h-6 w-6 ml-2" />
          </div>
        ) : (
          <CardList items={listedItems} loading={loading} />
        )
      } */}
      <CardList items={listedItems} loading={loading} emptyMsg="Please try another category" />
    </div>
  )
}
