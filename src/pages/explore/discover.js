import React, { useEffect, useState, useContext } from "react";
import Dropdown from '../../components/dropdown'
import CardList from '../../components/cards/card-list'
import SectionHeader from '../../components/section-header'
import axios from "axios";

import NFT1 from '../../assets/img/nft/nft1.png'
import NFT2 from '../../assets/img/nft/nft2.jpeg'
import NFT3 from '../../assets/img/nft/nft3.jpeg'
import NFT4 from '../../assets/img/nft/nft4.png'
import NFT5 from '../../assets/img/nft/nft5.png'

const files = [
  {
    id: '1',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT1,
  },
  {
    id: '2',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT5,
  },
  {
    id: '3',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT2,
  },
  {
    id: '4',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT4,
  },
  {
    id: '5',
    title: 'Amazing digital art',
    available: '3 in stock',
    price: '2.45 BNB',
    highestbid: '0.5 BNB',
    Image: NFT3,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Discover() {
  const [activeTab, setActiveTab] = useState('All Items');
  const tabs = ['All Items', 'Featured', 'Art', 'Game'];
  
  const [activeDropdown, setActiveDropdown] = useState('recent');
  const [listedItems, setListedItems] = useState([]);
  const options = [
    { id: 'recent', 'title': 'Recently added' },
    { id: 'popular', 'title': 'Popular' },
  ]


  useEffect(() => {
   
    axios({
      method: "get",
      url: "https://0.0.0.0:44301/api/services/app/Nft/GetListedNfts"
    })
    .then(function (response) {

      console.log(response.data.result)

      var items = response.data.result.map((item) => (
         {
          id: item.nft.id,
          TokenId: item.nft.tokenId,
          NftAddress: item.nft.nft,
          TokenName:  item.nft.tokenName,
          Image: item.nft.videoUrl,
          highestbid: '0.5 BNB',
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
