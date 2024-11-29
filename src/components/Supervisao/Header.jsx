import React from "react";
import styled from "styled-components";
import logoImage from "../../assets/Logo 1.png";
import profileImage from "../../assets/iconPerfil.png";
import { Link } from "react-router-dom";

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

const ProfileImage = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    position: absolute;
    right: 20px;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <LogoContainer as={Link} to="/agendar">
                <Logo src={logoImage} alt="Logo" />
            </LogoContainer>
            <ProfileImage src={profileImage} alt="Perfil" />
        </HeaderContainer>
    );
};

export default Header;
