

import {  LocateOutline, LogoGithub, LogoInstagram, LogoLinkedin, LogoMedium, MailOutline, PhonePortraitOutline } from "react-ionicons";

import avatar from '../assets/images/meAsAvatar.svg';


export default function Sidebar(){
    return (
        <aside className="sidebar" data-sidebar>

        <div className="sidebar-info">
  
          <figure className="avatar-box">
          <img 
                        src={avatar.src} 
                        alt="Richard Hanrick" 
                        width={80} 
                        height={80}
                        
                    />
          </figure>
  
          <div className="info-content">
            <h1 className="name" title="Anas Bouzanbil">Anas Bouzanbil</h1>
  
            <p className="title">Software developer</p>
          </div>
        </div>
  
        <div className="sidebar-info_more">
  
          <div className="separator"></div>
  
          <ul className="contacts-list">
  
            <li className="contact-item">
  
              <div className="icon-box">
                <MailOutline color={"#000"} height="30px" width="30px" />

              </div>
  
              <div className="contact-info">
                <p className="contact-title">Email</p>
  
                <a href="mailto:richard@example.com" className="contact-link">anassbouznbil@gmail.com</a>
              </div>
  
            </li>
  
            <li className="contact-item">
  
              <div className="icon-box">

                <PhonePortraitOutline color={"#000"} height="30px" width="30px" />

              </div>
  
              <div className="contact-info">
                <p className="contact-title">Phone</p>
  
                <a href="tel:+212 614954076" className="contact-link">+212 614954076</a>
              </div>
  
            </li>

  
            <li className="contact-item">
  
              <div className="icon-box">
                <LocateOutline color={"#000"} height="30px" width="30px" />


              </div>
  
              <div className="contact-info">
                <p className="contact-title">Location</p>
  
                <address> Lot 660, Ben Guerir 43150</address>
              </div>
  
            </li>
            <li className="contact-item">
  
              <div className="icon-box">
                <LogoGithub color={"#000"} height="30px" width="30px" />


              </div>
  
              <div className="contact-info">
                <p className="contact-title">Github</p>
  
                <a href="https://github.com/AnasBouzanbil"  className="contact-link">https://github.com/AnasBouzanbil</a>
              </div>
  
            </li>
  
          </ul>
  
          <div className="separator"></div>
  
          <ul className="social-list">
  
           
  
            
  
            <li className="social-item">
              <a href="https://www.instagram.com/anas_bouzanbil/" className="social-link">
                <LogoInstagram color={"#000"} height="30px" width="30px" />

              </a>
            </li>

            <li className="social-item">
              <a href="https://medium.com/@Elhazin" className="social-link">
                <LogoMedium color={"#000"} height="30px" width="30px" />
              </a>
            </li>
            <li className="social-item">
              <a href="https://www.linkedin.com/in/anas-bouzanbil/" className="social-link">
                <LogoLinkedin color={"#000"} height="30px" width="30px" />
              </a>
            </li>
  
          </ul>
  
        </div>
  
      </aside>
    )
}