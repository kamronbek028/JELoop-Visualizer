import React from "react";

import logo from "../../assets/logo.png";

import "./popup-welcome.styles.scss";

const PopupWelcome = ({ closePopup }) => (
  <div className="popup">
    <div className="popup__content">
      <h1 className="title">Welcome to JELoop Visualizer!</h1>
      <h2 className="description">
        This application visualizes how JavaScript Event Loop works behind the
        scenes.
      </h2>

      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <h3 className="source-code">
        If you want to see the source code for this application, check out my
        <a href="https://github.com/kamronbek028/JELoop-Visualizer"> github</a>.
      </h3>

      <div onClick={closePopup} className="close">
        &#10005;
      </div>
    </div>
  </div>
);

export default PopupWelcome;
