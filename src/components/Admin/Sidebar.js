import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.div`
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #181444;
  position: fixed;
  top: 60px;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  transition: left 0.3s ease;
  border-right: 1px solid #292929;
  z-index: 4;
`;

const SidebarButton = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin: 10px 0;

  &:hover {
    background-color: #1e99c0;
  }

  &.active {
    background-color: #1e99c0;
  }
`;

const ButtonText = styled.span`
  margin-left: 10px;
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false); // Fecha a sidebar
      }
    };

    // Adiciona o listener de click ao documento
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Remove o listener ao desmontar
    };
  }, [toggleSidebar]);

  return (
    <SidebarContainer ref={sidebarRef} isOpen={isOpen}>
      <SidebarButton to="/feed" activeClassName="active">
        <FontAwesomeIcon icon={faCalendar} size="lg" />
        <ButtonText>Agendar</ButtonText>
      </SidebarButton>
      <SidebarButton to="/gerenciar" activeClassName="active">
        <FontAwesomeIcon icon={faUser} size="lg" />
        <ButtonText>Gerenciar usuários</ButtonText>
      </SidebarButton>
    </SidebarContainer>
  );
};

export default Sidebar;
