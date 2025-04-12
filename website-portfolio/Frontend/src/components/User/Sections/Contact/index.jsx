import React from 'react'

import './style.css'
import { FaGoogle, FaInstagram, FaWhatsapp,FaLinkedin  } from "react-icons/fa";

function Contact() {
  return (
    <section id="Контакт" className="section">
      <div className='content'>
    <div className="contact-section">
    <div className="contact-left">
          <h3>КАК МЫ РАБОТАЕМ?</h3> 
          <ul>
            <li>Присылайте свой бриф</li>
            <li>Обеспечьте обратную связь</li>
            <li>Получите окончательную 3D-визуализацию</li>
          </ul>
        </div>
        <div className="contact-right">
          <h3>Контакт</h3>
          <ul>
            <li>
              <a href='https://www.google.com/' target='_blank'><FaGoogle /></a>
            </li>
            <li>
              <a href='https://az.linkedin.com/' target='_blank'><FaLinkedin /></a>
            </li>
            <li>
              <a href='https://www.whatsapp.com/' target='_blank'><FaWhatsapp /></a>
            </li>
            <li>
              <a href='https://www.instagram.com/' target='_blank'><FaInstagram /></a>
            </li>
          </ul>
        </div>
    </div>
      </div>
    </section>
  )
}

export default Contact