import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../../assets/Logo 1.png';
import profileImage from '../../assets/iconPerfil.png';
import Sidebar from './Sidebar';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181444;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; 
  z-index: 1000; 
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
`;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <HeaderContainer>
                <MenuToggle onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} size="1.5x" />
                </MenuToggle>
                <Logo src={logoImage} alt="Logo" />
                <ProfileImage src={profileImage} alt="Perfil" />
            </HeaderContainer>
            <Sidebar isOpen={isMenuOpen} toggleSidebar={setIsMenuOpen} />
        </>
    );
};

export default Header;
