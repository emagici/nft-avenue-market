import React, { useEffect, useState, useContext } from "react";
import Dropdown from '../../components/dropdown'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import axios from "axios";
import Web3 from "web3";
import { Web3Context } from '../../context/web3-context'
import AppUrls from '../../AppSettings';
import Spinner from '../../components/loading-spinner/spinner';
import {
  getPayTokenFromListing, getPayTokenDetailByAddress
} from "../../utilities/utils";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};


export default function Discover() {
  const [web3, setWeb3] = useState();
  const [activeTab, setActiveTab] = useState('Featured');
  const tabs = ['Featured', 'Music', 'Games', 'Art', 'Utility'];
  
  const [filterText, setFilerText] = useState('');
  const [activeDropdown, setActiveDropdown] = useState('recent');
  const [listedItems, setListedItems] = useState([]);
  const options = [
    { id: 'recent', 'title': 'Recently added' },
    { id: 'popular', 'title': 'Popular' },
  ];
  const [loading, setLoading] = useState(false);
  const web3Context = useContext(Web3Context)

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  useEffect(() => {
    if (!web3) return;
    
    GetListedNfts();
  }, [web3, activeDropdown]);

  function GetListedNfts(){
    setLoading(true);

    axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetListedNfts?nftNameFilter=${filterText}&sorting=${activeDropdown}`
    })
    .then(async function (response) {

      console.log(response.data.result)

      const allItems = response.data.result;

      var items = await Promise.all(allItems.map(async (item) => (
         {
          Listed: true,
          TokenId: item.tokenId,
          NftAddress: item.nft,
          TokenName:  item.tokenName,
          Image: item.imageUrl,
          Video: item.videoUrl,
          highestbid: item.latestOffer ? Web3.utils.fromWei(item.latestOffer.pricePerItem.toString(), "ether") + " " + getPayTokenDetailByAddress(item.latestOffer.payToken).payTokenName : "",
          price: Web3.utils.fromWei(item.price.toString(), "ether") + " " + (await getPayTokenFromListing(web3, item.nft, item.tokenId, item.ownerAddress)).payTokenName,
        }
      )))

      setListedItems(items);
    })
    .catch(function (response) {
      console.log(response);
    })
    .finally(function(){
      setLoading(false);
    });
  }
  
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
      {loading ? (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center capitalize">Loading</h1>
            <Spinner className="h-6 w-6 ml-2" />
          </div>
        ) : (
            <CardList items={listedItems} />
        )
      }
    </div>
  )
}
