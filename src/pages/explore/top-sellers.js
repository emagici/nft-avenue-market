import React, { useEffect, useState, useContext } from "react";
import Dropdown from '../../components/dropdown'
import SectionHeader from '../../components/section-header'
import AvatarList from '../../components/avatar/avatar-list'
import axios from "axios";

import { UserContext } from '../../context/user-context';

import AppUrls from '../../AppSettings';
const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};

export default function TopSellers() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  
  const userContext = useContext(UserContext);

  useEffect(() => {
    getTopSellers()
  }, []);

  async function getTopSellers() {
    await axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetTopSellers?blockchain=${userContext.state.blockchainId ?? 0}`
    })
    .then(async function (response) {
      console.log(response.data.result)
      setItems(response.data.result)
    })
    .catch(function (response) {
      console.log(response);
    });

    setLoading(false)
  }


  return (
    <div className="py-20">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader title="Top Sellers" />
        <AvatarList items={items} rank={true} loading={loading} />
      </div>
    </div>
  )
}
