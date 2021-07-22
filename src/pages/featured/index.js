import React from 'react'
import PromoBanner from '../../components/banner/promo-banner'
import PvlaceImg from '../../assets/img/pvlace/pvlace-lg.jpeg'
import FegImg from '../../assets/img/feg/feg-bg.png'

export default function Featured() {
  return (
    <div className="p-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <PromoBanner
          title="FEG Trading Card Game"
          subtitle="First ever Play-to-Earn NFT Based Digital Game"
          text="The highly anticipated FEG Trading Card Game is nearly upon us. FEG have teamed up with Fomo Lab to bring you the first of it's kind digital NFT trading card game. Get your NFP now to gain access to the drop, coming soon."
          image={FegImg}
          link="https://fegnft.games"
        />
        <PromoBanner
          title="Mark Cavendish"
          subtitle="Official Tour de France NFT Series"
          text="Fomo Lab have teamed up with Mark Cavendish to bring you an exclusive, limited edition NFT collection"
          image="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1323x615:1325x613)/origin-imgresizer.eurosport.com/2021/06/27/3161852-64792768-2560-1440.jpg"
          link="/featured-drop?id=cavendish"
        />
        <PromoBanner
          title="PVLACE 808 MAFIA X GUNBOI"
          subtitle="For The Culture NFT Drop"
          text="This unique NFT experience offers 387 Tokens that are each attached to a 1 of 1 unique musical composition composed by multi-platinum and chart topping producers and a selection of 3D, Low Polygon items that each represent significant aspects of Hip Hop Culture."
          image={PvlaceImg}
          link="/featured-drop?id=pvlace"
        />
        <PromoBanner
          title="Porsche 911 NFT Auction"
          subtitle="Hand-painted by Rich B. Caliente & Signed by Rick Ross"
          text="The first of a series of forthcoming newly created luxury artwork as minted high-end art NFT’s, the NFT #RBC9ELEVEN Porsche will bring the first luxury art car on the market as a minted high-end NFT."
          image={"https://rennlist.com/wp-content/uploads/2021/05/Porsche-911-Carrera-Rich-B-Caliene-Rick-Ross-1-e1622224637548.jpg"}
          link="/featured-drop?id=porsche911"
        />
      </div>
    </div>
  )
}
