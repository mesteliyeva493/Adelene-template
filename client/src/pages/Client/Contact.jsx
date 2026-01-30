import ContactM from '@/components/Contact/ContactM'
import React from 'react'
import { Helmet } from 'react-helmet'

function Contact() {
  return (
    <>
         <Helmet>
        <title> Contact</title>
      </Helmet>
    <ContactM/>
    </>
  )
}

export default Contact