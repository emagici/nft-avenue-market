import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom"
import { UserContext } from '../../context/user-context';
import Spinner from '../../components/loading-spinner/spinner'
import CardList from '../../components/cards/card-list'
import PageTitle from '../../components/page-title'
import axios from "axios";

import AppUrls from '../../AppSettings';
const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
};

export default function CollectionPage() {
  const params = useParams()
  const userContext = useContext(UserContext)

  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState(null)
  const [collectionId, setCollectionId] = useState(null)


  useEffect(() => {
    if (!params || !params.id) {
      setLoading(false)
    } else {
      const { id } = params;
      if (!id) {
        setLoading(false)
      } else {
        setCollectionId(id)
        getCollection(id)
      }
    }

    getCollection();
  }, []);


  async function getCollection(id){
    if(!id) return;
    setLoading(true);

    await axios({
      method: "get",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetFeaturedPageInfo?page=${id}`
    })
    .then(async function (response) {

      const allItems = response.data.result;

      var items = await Promise.all(allItems.map(async (item) => (
         {
          TokenId: item.tokenId,
          NftAddress: item.nft,
          TokenName:  item.tokenName,
          Image: item.imageUrl,
          Video: item.videoUrl,
          // highestbid: item.latestOffer ? Web3.utils.fromWei(item.latestOffer.pricePerItem.toString(), "ether") + " " + getPayTokenDetailByAddress(item.latestOffer.payToken, userContext.state.blockchainId).payTokenName : "",
          // price: Web3.utils.fromWei(item.lowestValuePricePerItem.toLocaleString("en-GB").replaceAll(',',''), "ether") + " " + getPayTokenDetailByAddress(item.lowestValuePayToken, userContext.state.blockchainId).payTokenName,
          likes: item.numberOfLikes
        }
      )))

      setResults(items);
    })
    .catch(function (response) {
      // console.log(response);
    })

    setLoading(false)
  }

  
  return (
    <div className="py-6 px-4">
      <PageTitle title="Recently Added" />
      <div className="max-w-screen-2xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center capitalize">Loading</h1>
            <Spinner className="h-6 w-6 ml-2" />
          </div>
        ) : (
          <div>
            {!collectionId ? (
              <h1 className="text-4xl font-bold text-center capitalize">No collection found with this id</h1>
            ) : (
              results && results.length ? (
                <div>
                  <h1 className="text-4xl font-bold text-center capitalize mb-10">{"Collection Name"}</h1>
                  <div>
                    <CardList items={results} />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="pb-10">
                    <h1 className="text-4xl font-bold text-center capitalize">No items found in this collection</h1>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
