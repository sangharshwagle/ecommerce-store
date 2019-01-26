import React, { Component } from "react";
import {Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer} from "./Button";

export default class Navbar extends Component {
    render(){
        return (
            <NavWrapper className = "navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
                <Link to = "/">
                    <img src = {logo} 
                        alt = "is it working"
                        className = "navbar-brand"
                     />
                </Link>
                <ul className = "navbar-nav align-items-center">
                    <li className = "nav-item ml-5">
                        {/* over here where we normally write the name of our li items 
                        i want it to be a link so when someone clicks on it it goes to certain link */}
                        <Link to = "/" className = "nav-link">Products</Link>
                    </li>
                </ul>
                <Link to= "./cart" className = "ml-auto">
                        <ButtonContainer>
                            <span><i className = "fas fa-cart-plus"/></span>
                            My cart
                        </ButtonContainer>
                </Link>
            </NavWrapper>
        )
    }
}

// these are styled componenent. look them up


// since this variable takes the button html element. This variable will work like a button with all the custom css in it


const NavWrapper = styled.nav`
background: var(--mainBlue);
    .nav-link{
        color:var(--mainWhite)!important;
        font-size:1.3rem;
        text-transform: capitalize;   
     }

`;