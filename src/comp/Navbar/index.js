import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import "./Navbar.css";
import { AiOutlineHome } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import image from "../../img/logo.png";

const Navbar = ({ lastDate }) => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <img alt="" className="logo-image" src={image}></img>
          <NavLink to="/">
            Home
            <AiOutlineHome
              size={"1.5em"}
              className="navbar-icon"
            ></AiOutlineHome>
          </NavLink>
          <NavLink to="/Graphs">
            Graphs
            <VscGraphLine size={"1.5em"} className="navbar-icon"></VscGraphLine>
          </NavLink>
          <NavLink to="/Settings">
            Settings
            <FiSettings size={"1.5em"} className="navbar-icon"></FiSettings>
          </NavLink>
        </NavMenu>
        <view className="date-container">
          <text className="date-text">
            Last Update Date: {lastDate.toLocaleString("en-GB")}
          </text>
        </view>
      </Nav>
    </>
  );
};

export default Navbar;
