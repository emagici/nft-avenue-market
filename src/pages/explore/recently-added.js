import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppUrls from '../../AppSettings';
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

export default function RecentlyAddedSection() {
  const web3Context = useContext(Web3Context);
  const userContext = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState();
  const [items, setItems] = useState([]);

  useEffect(async () => {
    if (!web3) return;
    setLoading(true)

    await axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetListedNfts?nftNameFilter=&categoryFilter=&sorting=recent&blockchain=${userContext.state.blockchainId ?? 0}&maxResultCount=10`
    })
    .then(async function (response) {
      const allItems = response.data.result;

      var items = await Promise.all(allItems.map(async (item) => (
         {
          Listed: true,
          TokenId: item.tokenId,
          NftAddress: item.nft,
          TokenName:  item.tokenName,
          Image: item.imageUrl,
          Video: item.videoUrl,
          highestbid: item.latestOffer ? Web3.utils.fromWei(toFixed(item.latestOffer.pricePerItem), "ether") + " " + getPayTokenDetailByAddress(item.latestOffer.payToken, userContext.state.blockchainId).payTokenName : "",
          price: Web3.utils.fromWei(toFixed(item.lowestValuePricePerItem), "ether") + " " + getPayTokenDetailByAddress(item.lowestValuePayToken, userContext.state.blockchainId).payTokenName,
          likes: item.numberOfLikes
        }
      )))

      setItems(items && items.length ? items.filter((item,i) => i < 10) : items);
    })
    .catch(function (response) {
      // console.log(response);
    });
    setLoading(false)
  }, [web3]);

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  return (
    <div className="py-10">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader title="Recently Added" />
        <CardList items={items} loading={loading} />
        {!loading && items ? (
          <div className="flex justify-center mt-4">
            <Link
              to="/recently-added"
              className="inline-flex items-center px-6 py-2 border-4 border-indigo-600 rounded-full text-md font-bold text-indigo-600 hover:text-white bg-white hover:bg-indigo-600 focus:outline-none transition-all"
            >
              View All Recent
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
