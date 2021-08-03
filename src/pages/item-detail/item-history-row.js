import React from "react";
import { Link } from "react-router-dom";


export default function ItemHistoryRow(props) {

  switch(props.type) {
    case "minted":
      return (
        <li className="py-3 border-b">
          <p className="text-sm font-bold">Minted by <Link to={`/profile-info?userId=${props.userId}`} className="underline hover:opacity-80 transition-opacity">{`${props.userId.substr(0,6)}...${props.userId.substr(-4,4)}`}</Link></p>
          <p className="text-sm font-medium">{props.date}</p>
        </li>
      );

    case "bid":
      return (
        <li className="py-3 border-b">
          <p className="text-sm font-bold">{`Bid ${props.price} ${props.currency}`}</p>
          <p className="text-sm font-medium">by <Link to={`/profile-info?userId=${props.userId}`} className="underline hover:opacity-80 transition-opacity">{`${props.userId.substr(0,6)}...${props.userId.substr(-4,4)}`}</Link> {props.date}</p>
        </li>
      );

    case "bid-accepted":
      return (
        <li className="py-3 border-b">
          <p className="text-sm font-bold">{`Bid accepted ${props.price} ${props.currency}`}</p>
          <p className="text-sm font-medium">by <Link to={`/profile-info?userId=${props.userId}`} className="underline hover:opacity-80 transition-opacity">{`${props.userId.substr(0,6)}...${props.userId.substr(-4,4)}`}</Link> {props.date}</p>
        </li>
      );

    case "bid-cancelled":
      return (
        <li className="py-3 border-b">
          <p className="text-sm font-bold">Bid cancelled by <Link to={`/profile-info?userId=${props.userId}`} className="underline hover:opacity-80 transition-opacity">{`${props.userId.substr(0,6)}...${props.userId.substr(-4,4)}`}</Link></p>
          <p className="text-sm font-medium">{props.date}</p>
        </li>
      );

    default:
      return (
        <li className="py-3 border-b">
          <p className="text-sm font-bold">{`${props.type}`}</p>
          <p className="text-sm font-medium">by <Link to={`/profile-info?userId=${props.userId}`} className="underline hover:opacity-80 transition-opacity">{`${props.userId}`}</Link> Block: {props.date}</p>
        </li>
      );
  }
}
