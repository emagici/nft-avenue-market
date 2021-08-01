import Avatar from "./index"
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AppUrls from '../../AppSettings';


const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient
};

export default function AvatarList() {
  const [items, setItems] = useState([]);
  
  useEffect(async () => {

    axios({
      method: "GET",
      url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetTopSellers`
    })
    .then(async function (response) {
      console.log(response.data.result)
      setItems(response.data.result)
    })
    .catch(function (response) {
      console.log(response);
    });
  }, []);

  return (
    <div className="">
      <div className="text-center">
        <div className="space-y-8 sm:space-y-12">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-8">
            {items.map((person, index) => (
              <li key={person.name}>
                <Avatar index={index} {...person} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
