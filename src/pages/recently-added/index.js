import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import { Web3Context } from '../../context/web3-context'
import { UserContext } from '../../context/user-context';
import Spinner from '../../components/loading-spinner/spinner'
import CardList from '../../components/cards/card-list'
import axios from "axios";
import Web3 from "web3";
import { getPayTokenFromListing, getPayTokenDetailByAddress } from "../../utilities/utils";

import AppUrls from '../../AppSettings';
const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
};

export default function RecentlyAddedPage() {
  const location = useLocation();
  const web3Context = useContext(Web3Context);
  const userContext = useContext(UserContext);

  const [web3, setWeb3] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  useEffect(() => {
    if (!web3) return;  
    GetListedNfts();
  }, [web3]);


  async function GetListedNfts(){
    if (loading) return
    setLoading(true);

    await axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetListedNfts?nftNameFilter=&categoryFilter=&sorting=recent&blockchain=${userContext.state.blockchainId ?? 0}`
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
          highestbid: item.latestOffer ? Web3.utils.fromWei(item.latestOffer.pricePerItem.toString(), "ether") + " " + getPayTokenDetailByAddress(item.latestOffer.payToken).payTokenName : "",
          price: Web3.utils.fromWei(item.price.toLocaleString("en-GB").replaceAll(',',''), "ether") + " " + (await getPayTokenFromListing(web3, item.nft, item.tokenId, item.ownerAddress)).payTokenName,
          likes: item.numberOfLikes
        }
      )))

      // items = items.sort(function(a, b) {return b.likes - a.likes;});
      setResults(items);
    })
    .catch(function (response) {
      // console.log(response);
    })

    setLoading(false)
  }

  
  return (
    <div className="py-6 px-4">
      <div className="max-w-screen-2xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center capitalize">Loading</h1>
            <Spinner className="h-6 w-6 ml-2" />
          </div>
        ) : (
          <div>
            {results && results.length ? (
              <div>
                <h1 className="text-4xl font-bold text-center capitalize mb-10">Recently Added</h1>
                <div>
                  <CardList items={results} />
                </div>
              </div>
            ) : (
              <div>
                <div className="pb-10">
                  <h1 className="text-4xl font-bold text-center capitalize">Error loading feed. Please try again shortly.</h1>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
