import Gifts from '@/components/Gift/Gifts'
import React from 'react'
import { Helmet } from 'react-helmet'

function GiftCard() {
  return (
    <>
         <Helmet>
            <title> Gift Card</title>
          </Helmet>
    <Gifts/>
    </>
  )
}

export default GiftCard