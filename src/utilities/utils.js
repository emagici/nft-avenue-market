import {
  MARKETPLACE_ABI,
  MARKETPLACE_ADDRESS,
} from "../contracts/FomoMarketPlace"

import { BitlyClient } from 'bitly'


export async function shortenLink(url) {
  const bitly = new BitlyClient('f2364f5c80a64f3f8500d1a2f4ba9d91b2111425', {})
  if (!url) return
  
  let result
  try {
    result = await bitly.shorten(url)
  } catch (e) {
    // console.log(e)
  }

  // console.log(result)

  if (result && result.link) {
    return result.link
  } else {
    return
  }
}


export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export const tokenTypes = [
  { name: "Fomo", tokenAddress: "0x5EEF8c4320e2Bf8D1e6231A31500FD7a87D02985" },
  { name: "BNB", tokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },
  { name: "BUSD", tokenAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
];

export const fomoTokenAddress = "0x5EEF8c4320e2Bf8D1e6231A31500FD7a87D02985";
export const listingFeeToken = "0x5EEF8c4320e2Bf8D1e6231A31500FD7a87D02985";

export const getPayTokenFromListing = async (
  web3,
  chkAddress,
  chkTokenId,
  chkOwnerAdd
) => {
  var contract = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS);
  const listingDetails = await contract.methods
    .listings(chkAddress, chkTokenId, chkOwnerAdd)
    .call();

  return getPayTokenDetailByAddress(listingDetails.payToken);
};

export const getPayTokenDetailByAddress = (tokenAddress) => {
  if (!tokenAddress)
    return { payTokenName: "", payTokenAddress: "" };

  var tokenDetail = tokenTypes.find(
    (x) => x.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
  );

  if (!tokenDetail)
    return { payTokenName: "", payTokenAddress: "" };

  return { payTokenName: tokenDetail.name, payTokenAddress: tokenAddress };
};
