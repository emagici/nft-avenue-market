import {
  MARKETPLACE_ABI,
  MARKETPLACE_ADDRESS,
} from "../contracts/FomoMarketPlace";

export const tokenTypes = [
  { name: "Fomo", tokenAddress: "0xbbb9bda313708f7505347ae3b60232ed4a41e0b1" },
  { name: "BNB", tokenAddress: "abc" },
  { name: "BUSD", tokenAddress: "123" },
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

  console.log(listingDetails);

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
