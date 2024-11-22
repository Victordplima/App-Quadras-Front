import React from "react";
import styled from "styled-components";

const StatusTag = styled.span`
    padding: 5px 10px;
    border-radius: 4px;
    background-color: ${(props) =>
        props.status === "Ativo" ? "#28a745" : "#6c757d"};
    color: white;
    font-size: 14px;
`;

const Status = ({ status }) => {
    return <StatusTag status={status}>{status}</StatusTag>;
};

export default Status;
