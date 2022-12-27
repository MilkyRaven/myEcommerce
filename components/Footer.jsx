import React from 'react'
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'
export default function Footer() {
  return (
    <div className='footer-container'>
      <p>2022 Milky Notebooks All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram></AiFillInstagram>
        <AiOutlineTwitter></AiOutlineTwitter>
      </p>
    </div>
  )
}
