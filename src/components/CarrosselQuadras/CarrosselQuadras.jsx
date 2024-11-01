import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import QuadraCard from "./QuadraCard";
import quadraCoberta from "../../assets/Quadra coberta.jpg";
import quadraDescoberta from "../../assets/Quadra descoberta.jpg";
import campoFutebol from "../../assets/Campo de futebol.jpg";
import quadraAreia1 from "../../assets/Quadra de areia 1.jpg";
import quadraAreia2 from "../../assets/Quadra de areia 2.jpg";
import quadraAreia3 from "../../assets/Quadra de areia 3.jpg";
import pistaAtletismo from "../../assets/Pista de atletismo.jpeg";

const CarouselContainer = styled.div`
    width: 85%;
    margin: 0 auto;
    margin-top: 20px;
`;

const quadras = [
    {
        id: "4151eb9f-89d2-491d-815a-f9a0f106c9ed",
        name: "Quadra Coberta",
        image: quadraCoberta,
    },
    {
        id: "b9ce2718-6794-4be2-b3d4-96f22f3e7e31",
        name: "Quadra Descoberta",
        image: quadraDescoberta,
    },
    {
        id: "3474b0af-dd89-445c-be7d-fe6e1f85a913",
        name: "Campo de Futebol",
        image: campoFutebol,
    },
    {
        id: "d21c9bb4-4d40-4beb-a8ea-c68185722dad",
        name: "Quadra de Areia 1",
        image: quadraAreia1,
    },
    {
        id: "384cc450-7a14-4174-91aa-7782b5cda22e",
        name: "Quadra de Areia 2",
        image: quadraAreia2,
    },
    {
        id: "1db2cb93-79ef-4599-a580-256932a98bb8",
        name: "Quadra de Areia 3",
        image: quadraAreia3,
    },
    {
        id: "e0ce9f55-de95-4788-9576-6a53b62dc30a",
        name: "Pista de Atletismo",
        image: pistaAtletismo,
    },
];

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: "#000", fontSize: "24px" }}
            />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#000", fontSize: "24px" }}
            />
        </div>
    );
}

function CarouselQuadras({ onQuadraSelect }) {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <CarouselContainer>
            <Slider {...settings}>
                {quadras.map((quadra) => (
                    <div key={quadra.id}>
                        <QuadraCard
                            image={quadra.image}
                            name={quadra.name}
                            onClick={() => onQuadraSelect(quadra.id)}
                        />
                    </div>
                ))}
            </Slider>
        </CarouselContainer>
    );
}

export default CarouselQuadras;
