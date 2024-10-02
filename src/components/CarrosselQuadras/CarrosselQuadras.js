import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import quadraCoberta from "../../assets/Quadra coberta.jpg";
import quadraDescoberta from "../../assets/Quadra descoberta.jpg";
import campoFutebol from "../../assets/Campo de futebol.jpg";
import quadraAreia1 from "../../assets/Quadra de areia 1.jpg";
import quadraAreia2 from "../../assets/Quadra de areia 2.jpg";
import quadraAreia3 from "../../assets/Quadra de areia 3.jpg";
import pistaAtletismo from "../../assets/Pista de atletismo.jpeg";
import QuadraCard from "./QuadraCard";

function SampleNextArrow(props) {
    const { className, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faChevronRight} style={{ color: "#000", fontSize: "24px" }} />
        </div>
    );
}

const SamplePrevArrow = (props) => {
    const { className, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#000", fontSize: "24px" }} />
        </div>
    );
}

const CarouselContainer = styled.div`
  width: 85%;
  margin: 0 auto;

  .slick-prev, .slick-next {
  font-size: 15px !important;
}

 .slick-prev:before, .slick-next:before  {
  content: '' !important;
}
`;

const quadras = [
    { name: "Quadra Coberta", image: quadraCoberta },
    { name: "Quadra Descoberta", image: quadraDescoberta },
    { name: "Campo de Futebol", image: campoFutebol },
    { name: "Quadra de Areia 1", image: quadraAreia1 },
    { name: "Quadra de Areia 2", image: quadraAreia2 },
    { name: "Quadra de Areia 3", image: quadraAreia3 },
    { name: "Pista de Atletismo", image: pistaAtletismo },
];

function CarouselQuadras() {
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
                {quadras.map((quadra, index) => (
                    <div key={index}>
                        <QuadraCard
                            image={quadra.image}
                            name={quadra.name}
                            onClick={() => console.log(quadra.name)}
                        />
                    </div>
                ))}
            </Slider>
        </CarouselContainer>
    );
}

export default CarouselQuadras;
