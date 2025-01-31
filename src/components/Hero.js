import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

import "./hero.css";
import capsulepepe_gif from "../assets/capsulepepe_gif.gif";
import squarearrow from "../assets/up-right-arrow-grey.svg";
import squarearrowgrey from "../assets/up-right-arrow-grey-opaque.svg";
import l_bottom_left from "../assets/l_bottom_left.svg";
import l_bottom_right from "../assets/l_bottom_right.svg";
import l_top_right from "../assets/l_top_right.svg";
import l_top_left from "../assets/l_top_left.svg";
import drpepeai_title from "../assets/drpepea_title_vipnagorgialla.svg";
import TypewriterEffect from "./TypewriterEffect";
import drpepelogowired from "../assets/drpepelogo-wired.svg";
import solanalogo_circle from "../assets/solanalogo_circle.svg"

const Hero = () => {
  const gridRef = useRef(null);
  const navigate = useNavigate();



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

  const handleNavigate = (e) => {
    e.preventDefault(); // Prevent the default navigation behavior of <Link>

    // Create a fade-out animation for the entire container
    gsap.to(".container", {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        navigate("/openai-chat"); // Trigger navigation after the animation completes
      },
    });
  };




  return (
    <div className="container">


      {/* Grid */}
      <div ref={gridRef} className="elastic-grid">
        {[...Array(64)].map((_, index) => (
          <div key={index} className="grid-item" />
        ))}
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
      {/* Top desktop */}
      <div className="container-top-desktop">

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
                <Link to="/openai-chat" onClick={handleNavigate}>
                  <div className="overlay-text-subtitle-three">Human Agent v.0 1</div>
                </Link>
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
      </div>
      {/* Bottom desktop */}
      <div className="landing-cta-container">




        <div className="socials-ambassador-docs-container">
                <div className="footer-socials-container">
                  <div  className="footer-link-text ">﹝Join Telegram﹞</div>

                  <div className="footer-link-text">﹝X @drpepeai﹞</div>
                </div>

                <div className="footer-ambassador-docs-container">
                        <div className="footer-link-text">﹝Become an Ambassador﹞</div>
                        <div className="footer-link-text">﹝Docs﹞</div>
                </div>
        </div>



        <div  className="footer-ca-solana-container">
          <div className="solana-logo-buy-container">

            <img src={solanalogo_circle} alt="solana logo" height={22} />
            <div className="">Buy on Solana</div>

          </div>

          <div>CA: BrYANThKaAbjZZH5XWLrw26NzMbfUNmBwbZiMe4Fj5Mk</div>
        </div>


      </div>

      {/* Top mobile */}
      <div className="container-top-mobile">
          <div className="mobile-logo-wired-container">
            <img src={drpepelogowired} alt="drpepe logo" width={35} />
          </div>
          <TypewriterEffect />


        <div className="">

          <div className="mobile-title-subtitle-container">

            <div className="mobile-title"> 
              <img src={drpepeai_title} alt="drpepe title" width={200} />
            </div>

            <div className="mobile-subtitle">
              An AI-Powered Smart Agent designed to help you live forever
            </div>
            
          </div>


          <div className=" mobile-pepe-capsule-container">
            <img src={capsulepepe_gif} alt="capsulepepe" className="mobile-capsule" />
          </div>


          <div className="agents-container">

            <div className="mobile-agent-text-arrow-container">
              <div className="agent-text-mobile">Human Agent v.0 1</div>
              <img src={squarearrow} alt="squarearrow" className="" width={10} />
              ↗
            </div>

            <div className="mobile-agent-text-arrow-container">
              <div className="agent-text-mobile animal-text-mobile">Dog Agent v.0 1</div>
              <img src={squarearrowgrey} alt="squarearrow" className="" width={10} />
              ↗
            </div>

            <div className="mobile-agent-text-arrow-container">
              <div className="agent-text-mobile animal-text-mobile">Cat Agent v.0 1</div>
              <img src={squarearrowgrey} alt="squarearrow" className="" width={10} />
              ↗
            </div>

          </div>

        </div>

      </div>

      {/* Bottom mobile */}
      <div className="landing-cta-mobile-container">

      <div className="cta-container-mobile-first">
            <div  className="text-cta-mobile parenthesis-text">﹝Buy on Solana﹞</div>
            <div  className="text-cta-mobile parenthesis-text">﹝Follow on X @drpepeai﹞</div>
            <div className="text-cta-mobile parenthesis-text">﹝Join Telegram﹞</div>
            <div  className="text-cta-mobile parenthesis-text">﹝Become an Ambassador﹞</div>
      </div>



      <div className="ca-container-mobile">
        <div  className="text-cta-mobile ca-mobile">CA:BrYANThKaAbjZZH5XWLrw26NzMbfUNmBwbZiMe4Fj5Mk</div>
      </div>

      <div  className="text-cta-mobile cta-docs-mobile">﹝Docs﹞</div>
      </div>

    </div>
  );
};

export default Hero;
