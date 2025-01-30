import React, { useRef, useEffect } from "react";

import "./elastic-grid.css";
import capsulepepe_gif from "../assets/capsulepepe_gif.gif";
import squarearrow from "../assets/square-arrow.svg";
import squarearrowgrey from "../assets/square-arrow-grey.svg";
import l_bottom_left from "../assets/l_bottom_left.svg";
import l_bottom_right from "../assets/l_bottom_right.svg";
import l_top_right from "../assets/l_top_right.svg";
import l_top_left from "../assets/l_top_left.svg";
import drpepeai_title from "../assets/drpepea_title_vipnagorgialla.svg";
import TypewriterEffect from "./TypewriterEffect;";
import drpepelogowired from "../assets/drpepelogo-wired.svg";

const ElasticGridDeformation = () => {
  const gridRef = useRef(null);


  useEffect(() => {


    const gridItems = gridRef.current.querySelectorAll(".grid-item");

    // Elastic grid animation
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      gridItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const distanceX = clientX - (rect.left + rect.width / 2);
        const distanceY = clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(distanceX, distanceY);

        const maxDistance = 200;
        const intensity = 1 - Math.min(distance / maxDistance, 1);

        const translateX = -intensity * (distanceX / distance) * 20;
        const translateY = -intensity * (distanceY / distance) * 20;

        item.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };

    const handleMouseLeave = () => {
      gridItems.forEach((item) => {
        item.style.transform = "translate(0, 0)";
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

 

 

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    
    };
  }, []);

  return (
    <div className="container">

      <div className="capsule-image-container">
        <img src={capsulepepe_gif} alt="capsulepepe" className="capsulepepe" />
        <TypewriterEffect />
      </div>

      <div className="landing-text-container">

        <div className="logo-wired">
          <img src={drpepelogowired} alt="drpepe logo" width={70} />
        </div>

        <div className="overlay-text-title">
          <img src={drpepeai_title} alt="drpepe title" />
        </div>

        <div className="overlay-text-subtitle-one">
          An AI-Powered Smart Agent designed to help you live forever
        </div>


        <div className="agents-container">

          <div className="square-arrow-text-container">
            <div className="overlay-text-subtitle-three">Human Agent v.0 1</div>
            <img src={squarearrow} alt="squarearrow" className="squarearrow" />
          </div>

          <div className="square-arrow-text-container">
            <div className="overlay-text-subtitle-three animal-text">Dog Agent v.0 1</div>
            <img src={squarearrowgrey} alt="squarearrow" className="squarearrow animal-arrow" />
          </div>

          <div className="square-arrow-text-container">
            <div className="overlay-text-subtitle-three animal-text">Cat Agent v.0 1</div>
            <img src={squarearrowgrey} alt="squarearrow" className="squarearrow animal-arrow" />
          </div>

        </div>

      </div>

      {/* 4 Corner Words */}
      <div className="corner-text bottom-left">
        <img src={l_bottom_left} alt="l" height={15} />
      </div>
      <div className="corner-text bottom-right">
        <img src={l_bottom_right} alt="l" height={15} />
      </div>
      <div className="corner-text top-left">
        <img src={l_top_left} alt="l" height={15} />
      </div>
      <div className="corner-text top-right">
        <img src={l_top_right} alt="l" height={15} />
      </div>

      <div ref={gridRef} className="elastic-grid">
        {[...Array(64)].map((_, index) => (
          <div key={index} className="grid-item" />
        ))}
      </div>

      <div className="landing-cta-container">
        <div>﹝Join Telegram﹞</div>
        <div>﹝Follow on X @drpepeai﹞</div>
        <div>﹝Become an Ambassador﹞</div>
        <div>﹝Docs﹞</div>
        <div> Buy on Solana</div>
        <div>CA: BrYANThKaAbjZZH5XWLrw26NzMbfUNmBwbZiMe4Fj5Mk</div>
      </div>
    </div>
  );
};

export default ElasticGridDeformation;
