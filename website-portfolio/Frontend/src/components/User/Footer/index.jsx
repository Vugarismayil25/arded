import React from 'react'
import logo from "../../../assets/Group 18157.png"
import './style.css'
function Footer() {          
  return (
    <footer>
      <div className="content">
       <div className="footer-wrapper">
       <div className="logo">
          <img src={logo} alt="logo" />
        </div> 
        <ul className='links'>
          <li><a href="#welcome">Здравствуйте</a></li>
          <li><a href="#portfolio">Портфолио</a></li>
          <li><a href="#service">Услуга</a></li>
          <li><a href="#contact">Контакт</a></li>
        </ul>
        <p className='foot-desc'>Авторское право 2025 | Ardeo Vision от 247 Studio. все права защищены.</p>
       </div>
      </div>
    </footer>
  )
}

export default Footer