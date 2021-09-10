import {
  MARKETPLACE_ABI,
  getMarketplaceContractAddress,
} from "../contracts/FomoMarketPlace"

import { BitlyClient } from "bitly"

export const defaultAvatar =
  "https://api.theavenue.market/img/avatars/avatar-83.png"

export async function shortenLink(url) {
  const bitly = new BitlyClient("f2364f5c80a64f3f8500d1a2f4ba9d91b2111425", {})
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
  return classes.filter(Boolean).join(" ")
}

export function toFixed(x) {
  return x.toLocaleString("en-GB").replaceAll(",", "")
}

export const getTokenTypes = (blockchainId) => {
  if (blockchainId === 0) {
    return [
      {
        name: "Fomo",
        tokenAddress: "0x5EEF8c4320e2Bf8D1e6231A31500FD7a87D02985",
      },
      {
        name: "WBNB",
        tokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      },
      {
        name: "BUSD",
        tokenAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      },
    ]
  }
  if (blockchainId === 1) {
    return [
      {
        name: "ETH",
        tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      {
        name: "USDT",
        tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      },
    ]
  }
}

export const getDefaultTokenAddress = (blockchainId) => {
  if (blockchainId === 0) {
    return "0x5EEF8c4320e2Bf8D1e6231A31500FD7a87D02985"
  }
  if (blockchainId === 1) {
    return "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  }
}

export const fomoTokenAddress = "0x5EEF8c4320e2Bf8D1e6231A31500FD7a87D02985"
export const listingFeeTokenBsc = "0x5EEF8c4320e2Bf8D1e6231A31500FD7a87D02985"

export const getPayTokenFromListing = async (
  web3,
  chkAddress,
  chkTokenId,
  chkOwnerAdd,
  blockchainId,
) => {
  var contract = new web3.eth.Contract(
    MARKETPLACE_ABI,
    getMarketplaceContractAddress(blockchainId),
  )

  const listingDetails = await contract.methods
    .listings(chkAddress, chkTokenId, chkOwnerAdd)
    .call()

  return getPayTokenDetailByAddress(listingDetails.payToken, blockchainId)
}

export const getPayTokenDetailByAddress = (tokenAddress, blockchainId) => {
  if (!tokenAddress)
    return {
      payTokenName: "",
      payTokenAddress: "",
    }

  var tokenDetail = getTokenTypes(blockchainId).find(
    (x) => x.tokenAddress.toLowerCase() === tokenAddress.toLowerCase(),
  )

  if (!tokenDetail)
    return {
      payTokenName: "",
      payTokenAddress: "",
    }

  return {
    payTokenName: tokenDetail.name,
    payTokenAddress: tokenAddress,
  }
}

export const getUserFomoBalance = async (myadd, web) => {
  const minABI = [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      type: "function",
    },
  ]

  const contract = new web.eth.Contract(minABI, fomoTokenAddress)
  const result = await contract.methods.balanceOf(myadd).call()

  try {
    const balArr = web.utils.fromWei(result, "ether").split(".")
    let balStr = balArr[0]
    return balArr.length == 1 ? balStr : `${balStr}.${balArr[1].substr(0, 1)}`
  } catch (e) {
    return 0
  }
}

export const getTokenBalance = async (myadd, tokenAddress, web) => {
  const minABI = [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      type: "function",
    },
  ]

  const contract = new web.eth.Contract(minABI, tokenAddress)
  const result = await contract.methods.balanceOf(myadd).call()

  try {
    const balArr = web.utils.fromWei(result, "ether").split(".")
    let balStr = balArr[0]
    return balArr.length == 1 ? balStr : `${balStr}.${balArr[1].substr(0, 1)}`
  } catch (e) {
    return 0
  }
}
