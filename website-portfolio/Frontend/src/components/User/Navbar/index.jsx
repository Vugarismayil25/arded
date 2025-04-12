import React, { useState, useEffect } from 'react';
import './style.css';
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-scroll';
  
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState("Портфолио");
  const [animate, setAnimate] = useState(false);

  const toggleMenu = () => { 
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section');

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop - window.innerHeight / 3 &&
          scrollPosition < sectionTop + sectionHeight - window.innerHeight / 3
        ) {
          if (scroll !== section.id) {
            setAnimate(true);
            setTimeout(() => setScroll(section.id), 100);
            setTimeout(() => setAnimate(false), 500);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scroll]);

  return (
    <header className='header'>
      <div className="content">
        <div className="navbar">
          <nav>
            <ul className={menuOpen ? "mobile-menu" : ""}>
              <li>
                <Link activeClass="active" smooth spy to="Здравствуйте" onClick={() => setScroll("Здравствуйте")}>Здравствуйте</Link>
              </li>
              <li>
                <Link activeClass="active" smooth spy to="Портфолио" onClick={() => setScroll("Портфолио")}>Портфолио</Link>
              </li>
              <li className="main-title-item">
                <span className={`main-title ${animate ? "fade-up" : ""}`}>{scroll}</span>
              </li>
              <li>
                <Link activeClass="active" smooth spy to="Услуга" onClick={() => setScroll("Услуга")}>Услуга</Link>
              </li>
              <li>
                <Link activeClass="active" smooth spy to="Контакт" onClick={() => setScroll("Контакт")}>Контакт</Link>
              </li>
            </ul>
            <div className="nav-menu" onClick={toggleMenu}>
              {menuOpen ? <IoMdClose /> : <FaBars />}
            </div>
          </nav>
          {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
