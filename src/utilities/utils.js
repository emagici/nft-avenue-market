import {
  MARKETPLACE_ABI,
  MARKETPLACE_ADDRESS,
} from "../contracts/FomoMarketPlace";


export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export const tokenTypes = [
  { name: "Fomo", tokenAddress: "0xbbb9bda313708f7505347ae3b60232ed4a41e0b1" },
  { name: "BNB", tokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },
  { name: "BUSD", tokenAddress: "0x8301f2213c0eed49a7e28ae4c3e91722919b8b47" },
];

export const fomoTokenAddress = "0xbbb9bda313708f7505347ae3b60232ed4a41e0b1";

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
