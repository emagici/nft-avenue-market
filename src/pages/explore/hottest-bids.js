import React, { useEffect, useState, useContext } from "react";
import Dropdown from '../../components/dropdown'
import axios from "axios";
import AppUrls from '../../AppSettings';
import TitleDropdown from '../../components/dropdown/title-dropdown'
import SectionHeader from '../../components/section-header'
import CardList from '../../components/cards/card-list'
import Web3 from "web3";
import { Web3Context } from '../../context/web3-context'
import { UserContext } from '../../context/user-context';
import {
  getPayTokenFromListing, getPayTokenDetailByAddress, toFixed
} from "../../utilities/utils";

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};

export default function HottestBidsSection() {
  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState();
  const [items, setItems] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState('auctions');
  const [activeFilterDropdown, setActiveFilterDropdown] = useState('today');
  const options = [
    { id: 'auctions', 'title': 'Auctions' },
    { id: 'collections', 'title': 'Collections' },
    { id: 'sellers', 'title': 'Sellers' },
  ]
  const filterOptions = [
    { id: 'today', 'title': 'Today' },
    { id: 'week', 'title': 'This Week' },
    { id: 'month', 'title': 'This Month' },
  ]
  const web3Context = useContext(Web3Context);
  const userContext = useContext(UserContext);

  useEffect(async () => {
    if (!web3) return;
    setLoading(true)

    await axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetHottestBids?blockchain=${userContext.state.blockchainId ?? 0}`
    })
    .then(async function (response) {
      var allItems = response.data.result;

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
       }
       return obj;
      }))

    //  items = items.sort(function(a, b) {return b.highestbidValue - a.highestbidValue;});

     setItems(items)
    })
    .catch(function (response) {
      console.log(response);
    });
    setLoading(false)
  }, [web3]);

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  return (
    <div className="py-10">
      <div className="max-w-screen-2xl mx-auto">

        <SectionHeader title="Hottest Bids">
          {/* <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <TitleDropdown
                options={options}
                active={activeDropdown}
                onChange={(v) => setActiveDropdown(v)}
                menuPosition='left'
              />
            </div>
            <div>
              <Dropdown
                options={filterOptions}
                active={activeFilterDropdown}
                onChange={(v) => setActiveFilterDropdown(v)}
                menuPosition='right'
              />
            </div>
          </div> */}
        </SectionHeader>

        <CardList items={items} loading={loading} />
        
      </div>
    </div>
  )
}
