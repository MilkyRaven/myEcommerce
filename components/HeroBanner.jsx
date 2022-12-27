import React from 'react'
import Link from 'next/link';
import { urlFor } from '../lib/client'

export default function HeroBanner( {heroBanner} ) {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>
          {heroBanner.smallText}
        </p>
        <h3>{heroBanner.midText}</h3>
        <img src={urlFor(heroBanner.image)} alt="product" className='hero-banner-image'></img>
      </div>
      <Link href={`/product/${heroBanner.product}`}>
        <button type='button'>
          {heroBanner.buttonText}
        </button>
      </Link>
      <div>
        <h5>Description</h5>
        <p>{heroBanner.desc}</p>
      </div>
    </div>
  )
}
