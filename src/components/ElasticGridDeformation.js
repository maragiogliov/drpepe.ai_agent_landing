import React, { useRef, useEffect } from "react";
import './elastic-grid.css';
import capsulepepe_gif from '../assets/capsulepepe_gif.gif';
import squarearrow from '../assets/square-arrow.svg';
import neonpepe from '../assets/Neon-pepe.png';

const ElasticGridDeformation = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const gridItems = gridRef.current.querySelectorAll(".grid-item");

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
            </div>

            <div className="landing-text-container">
              <div className="overlay-text-title">
              DrPepe.ai
              </div>
              <div className="overlay-text-subtitle-one">
              An AI-Powered Smart Agent designed to help you live forever 
              </div>
              <div className="overlay-text-subtitle-two">
     
              </div>
            <div className="square-arrow-text-container">
                <div className="overlay-text-subtitle-three">
                    Agent v.0 1
                </div>
                <img src={squarearrow} alt="squarearrow" className="squarearrow" />
            </div>
            </div>



      

      {/* 4 Corner Words */}
      <div className="corner-text top-left">Docs</div>
      <div className="corner-text top-right"> <img src={neonpepe} alt="neon pepe" height={70} /> </div>


      <div className="corner-text bottom-left">Telegram</div>
      <div className="corner-text bottom-left-two">X</div>

      <div className="corner-text bottom-right">BrYANThKaAbjZZH5XWLrw26NzMbfUNmBwbZiMe4Fj5Mk</div>

      <div ref={gridRef} className="elastic-grid">
        {[...Array(64)].map((_, index) => (
          <div key={index} className="grid-item" />
        ))}
      </div>

    </div>
  );
};

export default ElasticGridDeformation;
