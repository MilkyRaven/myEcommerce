import React from "react"

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner} from '../components'

export default function Home({ products, bannerData}) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}> 
      </HeroBanner>
      {console.log(products)}
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Stuffs</p>
      </div>
      <div className="products-container">
        {['product 1', 'product2'].map((product) => product)}
      </div>

      <FooterBanner></FooterBanner>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {bannerData, products}
  }
}
