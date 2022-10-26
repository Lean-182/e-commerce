import React from "react";
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";
import "./footer.css";
// import logo_wooly from "../../assets/logo_wooly.png";
// import logo from "../image/logo.png";

export default function Footer() {
  return (
    <footer >
      <div className="footerContainer">
        <div className="footerLinks">
          <Link to={"/contact"} className="btnFooterEffect">
            CONTACT
          </Link>
          {/* <Link to={"/"} >
                    <h4 className={Style.linkOne}>Home </h4>
                </Link>
  
                <Link to={"/products"} >
                    <h4>Products </h4>
                </Link>

                <Link to={"/contact"} >
                    <h4>Contact</h4>
                </Link> */}
        </div>
      

      <div className="footerLinks">
        <div>
          <Link to="/" >
            <img src={logo} alt="" className="logoFooter"/>
          </Link>
        </div>
      </div>

      <div className="footerLinks">
        <Link to={"/about"}className="btnFooterEffect">
          ABOUT
        </Link>
        {/* <p className={Style.footerCompanyAbout}> */}
        {/* <span>ABOUT OUR TEAM</span>
                    <br />
                    Aut ipsam autem sed velit assumenda ea magnam porro 
                    et laborum velit vel omnis alias ut neque eligendi 
                    ea voluptate eaque. Qui provident omnis ut quia 
                    voluptas ut rerum autem nam voluptate iste id modi. */}
        {/* contact us */}
        {/* </p> */}
      </div>
      </div>
    </footer>
  );
}
