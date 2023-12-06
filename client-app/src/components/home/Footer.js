import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={classes["footer-container"]}>
        <div className={classes.column}>
          <ul>
            <li>
              <h3>CUSTOMER SERVICES</h3>
            </li>
            <li>
              <a href="#">Help $ Contact Us</a>
            </li>
            <li>
              <a href="#">Returns & Refunds</a>
            </li>
            <li>
              <a href="#">Online Stores</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div className={classes.column}>
          <ul>
            <li>
              <h3>COMPANY</h3>
            </li>
            <li>
              <a href="#">What We Do</a>
            </li>
            <li>
              <a href="#">Available Services</a>
            </li>
            <li>
              <a href="#">Latest Posts</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>
        <div className={classes.column}>
          <ul>
            <li>
              <h3>SOCIAL MEDIA</h3>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Pinterest</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
