import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

import './Landing.css';
import drpepeailogo from '../assets/drpepeai-logo.svg';
import solanalogo from '../assets/solana_logo.svg';
import capsulepepe from '../assets/capsulepepe_landing.jpg';



const Landing = () => {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault(); // Prevent the default navigation behavior of <Link>

    // Create a fade-out animation for the entire container
    gsap.to(".landing_main_container", {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        navigate("/openai-chat"); // Trigger navigation after the animation completes
      },
    });
  };

  return (
    <div className="landing_main_container" style={{ opacity: 1 }}>


      {/* Main Title */}
      <h1>DrPepe.ai</h1>

      {/* Buy Section */}
      <div className="landing_buy_img_container">
        <h3>Buy on</h3>
        <img src={solanalogo} height={16} alt="solana logo" className="solana_logo" />
      </div>

      {/* Subtitle and Image */}
      <div className="landing_subtitle_image">
        <img src={capsulepepe} height={280} width={280} alt="drpepe logo" className="image_logo_landing" />
        <div>
          <h3>AN AI framework designed</h3>
          <h3>to help you live forever</h3>
        </div>
      </div>

      {/* Call-to-Action Button */}
      <div className="landing_cta_container">
        <Link to="/openai-chat" onClick={handleNavigate}>
          <button className="landing_cta_button">
            AGENT
          </button>
        </Link>
      </div>

      {/* Socials Section */}
      <div className="landing_socials_container">
        <div className="landing_socials_container_telegram">
          <div className="landing_socials_container_img_text">
            <img src={drpepeailogo} height={18} width={18} alt="drpepe logo" className="solana_logo_landing" />
            <h4>@drpepe.ai</h4>
          </div>
          <div className="landing_socials_name">
            <h4>Telegram</h4>
          </div>
        </div>

        <div className="landing_socials_container_docs">
          <div className="landing_socials_container_img_text">
            <img src={drpepeailogo} height={18} width={18} alt="drpepe logo" className="pepe_logo_profilepic" />
            <h4>@drpepe.ai_agent</h4>
          </div>
          <div className="landing_socials_name">
            <h4>Docs</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
