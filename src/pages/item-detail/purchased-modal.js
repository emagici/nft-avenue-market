import React, { useEffect, useState, useContext, Fragment } from "react";
import Modal from "../../components/modal";
import ConfettiBg from '../../assets/video/confetti-bg.mp4'
import YayBalloon from '../../assets/img/misc/yay-balloons.png'
import PartyEmoji from '../../assets/img/misc/party-emoji.png'
import { useHistory } from "react-router";

import {
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function PurchasedModal(props) {
  const history = useHistory()

  function showProfile() {
    props.setModalOpen(false)
    setTimeout(() => {
      history.push('/user')
    }, 300)
  }

  return (
    <Modal title="Purchase Complete!" open={props.modalOpen} setOpen={(v) => props.setModalOpen(v)} hideFooter hideTitle hideClose>
      <video src={ConfettiBg} autoPlay muted playsInline loop controls={false} className="absolute -top-10 bottom-0 right-0 left-0 object-cover z-1" />
      <div className="relative">  

        <div className="pt-5 pb-10 z-10">
          <img src={PartyEmoji} className="h-44 w-44 mx-auto mb-2 object-contain -mt-8" />
          <h1 className="text-2xl font-bold text-center mb-5 ">Congratulations!</h1>
          <p className="text-center px-4">You just purchased an NFT on The Avenue Marketplace. Your item will now be visible in your profile.</p>
        </div>

        <div className="mb-12">
          <p className="text-center font-bold mb-2">Share Your Purchase</p>
          <div className="flex justify-center items-center gap-2">
            <TwitterShareButton url={`I just purchased an NFT on The Avenue! https://theavenue.market`} hashtags={['TheAvenue','FomoLab','NFT','Crypto']} className="hover:opacity-80 transition-opacity shadow-lg rounded-full">
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <TelegramShareButton title="I just purchased an NFT on The Avenue!" url="https://theavenue.market" className="hover:opacity-80 transition-opacity shadow-lg rounded-full">
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
            <WhatsappShareButton title="I just purchased an NFT on The Avenue!" url="https://theavenue.market" separator=" - " className="hover:opacity-80 transition-opacity shadow-lg rounded-full">
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button
            type="button"
            onClick={() => props.setModalOpen(false)}
            className={"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm"}
          >
            Continue
          </button>
          <button
            type="button"
            onClick={() => showProfile()}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
          >
            View Profile
          </button>
        </div>

      </div>
    </Modal>
  );
}
