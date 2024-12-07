import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTimes,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../assets/Logo 1.png";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const MenuToggle = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 24px;
    z-index: 1001;
`;

const AvatarContainer = styled.div`
    position: relative;
    cursor: pointer;
`;

const Avatar = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #00bfff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    background-color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    z-index: 1002;
    overflow: hidden;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 14px;
            color: #333;

            &:hover {
                background-color: #f5f5f5;
            }

            svg {
                margin-right: 8px;
            }
        }
    }
`;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const sidebarRef = useRef(null);
    const dropdownRef = useRef(null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userName = storedUser?.nome || "Usuário";
    const userInitial = userName.charAt(0);

    const handleMenuToggle = (event) => {
        event.stopPropagation();
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    const handleAvatarClick = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            !event.target.closest("button")
        ) {
            setIsMenuOpen(false);
        }
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        console.log("Logout realizado!");
        navigate("/login");
    };

    useEffect(() => {
        if (isMenuOpen || isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, isDropdownOpen]);

    return (
        <>
            <HeaderContainer>
                <MenuToggle onClick={handleMenuToggle}>
                    <FontAwesomeIcon
                        icon={isMenuOpen ? faTimes : faBars}
                        size="1x"
                    />
                </MenuToggle>
                <LogoContainer as={Link} to="/agendar">
                    <Logo src={logoImage} alt="Logo" />
                </LogoContainer>
                <AvatarContainer ref={dropdownRef} onClick={handleAvatarClick}>
                    <Avatar>{userInitial}</Avatar>
                    {isDropdownOpen && (
                        <DropdownMenu>
                            <ul>
                                <li onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    Logout
                                </li>
                            </ul>
                        </DropdownMenu>
                    )}
                </AvatarContainer>
            </HeaderContainer>
            <Sidebar isOpen={isMenuOpen} sidebarRef={sidebarRef} />
        </>
    );
};

export default Header;
