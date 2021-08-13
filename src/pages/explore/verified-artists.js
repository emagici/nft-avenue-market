import React, { useEffect, useState, useContext } from "react";
import Dropdown from '../../components/dropdown'
import SectionHeader from '../../components/section-header'
import AvatarList from '../../components/avatar/avatar-list'
import axios from "axios";

import AppUrls from '../../AppSettings';
const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};

export default function VerifiedArtistsSection() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    getVerifiedArtists()
  }, []);

  async function getVerifiedArtists() {
    await axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetVerifiedArtists`
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
        <SectionHeader title="Verified Artists" />
        <AvatarList items={items} loading={loading} />
      </div>
    </div>
  )
}
