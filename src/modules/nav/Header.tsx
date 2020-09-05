import React from "react";
import logo from "../../common/icons/logo.svg";
import "./Header.scss";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = React.forwardRef((props, ref) => {
  return (
    <header className="App-header glass">
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="flex"></div>
    </header>
  );
});
