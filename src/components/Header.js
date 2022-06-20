import React from 'react';
import logo from '../img/logo.svg';


export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
    </header>
  )
}