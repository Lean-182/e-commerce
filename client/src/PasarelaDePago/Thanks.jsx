import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Thanks.css";

export class Thanks extends Component {
  render() {
    return (
      <div className="thanksContainer">
        <div>
          <label className="titleCreate txtThanks">THANKS FOR BUY</label>
        </div>
        <div>
          <a href="/">
            <button className="btnGlobal btnThanks">Back to home</button>
          </a>
        </div>
      </div>
    );
  }
}
//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default Thanks;
