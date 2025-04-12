import React from "react";
import "./style.css";

function Hero() {
  return (
    <section id="Здравствуйте" className="section welcome-section hero">
      <div className="scroll-wrapper">
        <div className="scroll-text">
          <span>ARDEO VISION</span>
        </div>
      </div>
      <p>Распечатайте листы, содержащие отрывки из lorem ipsum.</p>
    </section>
  );
}

export default Hero;