import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../assets/Logo 1.png";
import profileImage from "../../assets/iconPerfil.png";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    //background-color: #181444;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 1000;
`;

const LogoContainer = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const Logo = styled.img`
    height: 25px;
    width: auto;
`;

const ProfileImage = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
`;

const MenuToggle = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 24px;
    z-index: 1001;
`;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sidebarRef = useRef(null);

    const handleMenuToggle = (event) => {
        event.stopPropagation();
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            !event.target.closest("button")
        ) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <>
            <HeaderContainer>
                <MenuToggle onClick={handleMenuToggle}>
                    <FontAwesomeIcon
                        icon={isMenuOpen ? faTimes : faBars}
                        size="1.5x"
                    />
                </MenuToggle>
                <LogoContainer as={Link} to="/agendar">
                    <Logo src={logoImage} alt="Logo" />
                </LogoContainer>
                <ProfileImage src={profileImage} alt="Perfil" />
            </HeaderContainer>
            <Sidebar isOpen={isMenuOpen} sidebarRef={sidebarRef} />
        </>
    );
};

export default Header;
