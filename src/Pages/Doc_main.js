import React from 'react'
import Header from '../Components/header'
import Footer from '../Components/Footer'
import Doc_hero from '../Components/Doc_component/doc_hero'
import Doc_profile from '../Components/Doc_component/doc_profile'


export default function Doc_main() {
  return (
    <div>
        <Header/>
        <Doc_profile/>
        <Footer/>
    </div>
  )
}
