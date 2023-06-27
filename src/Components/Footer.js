import React from 'react'
import './footer.css';
import logo from '../Images/logo.png'

export default function Footer() {
  return (
    <div className="row">
        <div className="col">
            <img src={logo} alt="logo" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti autem, illum, fuga dolor natus culpa atque vel iure consectetur ullam veniam quam, odit doloribus minus amet? Provident doloribus adipisci facere, culpa sint eaque ullam? Deleniti ducimus molestias at ad sequi nobis, iure quos saepe est accusamus fugiat commodi rem reiciendis.</p>
        </div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
    </div>
  )
}
