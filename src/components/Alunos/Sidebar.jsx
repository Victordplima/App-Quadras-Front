import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHistory,
    faCalendar,
    faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.div`
    width: 250px;
    height: calc(100vh - 60px);
    background-color: #209cc4;
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
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #17718f;
    }

    &.active {
        background-color: #17718f;
    }
`;

const ButtonText = styled.span`
    margin-left: 10px;
`;

const Sidebar = ({ isOpen, sidebarRef }) => {
    return (
        <SidebarContainer ref={sidebarRef} isOpen={isOpen}>
            <SidebarButton to="/agendar" activeClassName="active">
                <FontAwesomeIcon icon={faCalendar} size="lg" />
                <ButtonText>Agendar</ButtonText>
            </SidebarButton>
            <SidebarButton to="/historico" activeClassName="active">
                <FontAwesomeIcon icon={faHistory} size="lg" />
                <ButtonText>Histórico</ButtonText>
            </SidebarButton>
            <SidebarButton to="/faq" activeClassName="active">
                <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
                <ButtonText>FAQ</ButtonText>
            </SidebarButton>
        </SidebarContainer>
    );
};

export default Sidebar;
