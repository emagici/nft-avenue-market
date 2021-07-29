import React, { useEffect, useState, useContext } from "react";
import Dropdown from '../../components/dropdown'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import axios from "axios";
import Web3 from "web3";
import AppUrls from '../../AppSettings';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};


export default function Discover() {
  const [activeTab, setActiveTab] = useState('All Items');
  const tabs = ['All Items', 'Featured', 'Art', 'Game'];
  
  const [filterText, setFilerText] = useState('');
  const [activeDropdown, setActiveDropdown] = useState('recent');
  const [listedItems, setListedItems] = useState([]);
  const options = [
    { id: 'recent', 'title': 'Recently added' },
    { id: 'popular', 'title': 'Popular' },
  ]

  useEffect(() => {
   
    axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetListedNfts?nftNameFilter=${filterText}`
    })
    .then(function (response) {

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
      ))

      setListedItems(items);
    })
    .catch(function (response) {
      console.log(response);
    });
  }, []);

  return (  
    <div className="">
      <SectionHeader title="Discover">
        <div className="grid md:grid-cols-4">
          <div className="flex md:col-span-3 items-center justify-center md:justify-start mt-3 md:mt-0">
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
          </div>
          <div className="text-center md:text-right order-first md:order-last">
            <Dropdown
              options={options}
              active={activeDropdown}
              onChange={(v) => setActiveDropdown(v)}
              menuPosition='right'
            />
          </div>
        </div>
      </SectionHeader>
      <CardList items={listedItems} />
    </div>
  )
}
