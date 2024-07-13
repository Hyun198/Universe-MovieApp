import React from 'react'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import './TvSlider.style.css';
import TvCard from '../TvCard/TvCard'

const TvSlider = ({ title, tvs, responsive }) => {
    return (
        <div>
            <h3 className="popular">{title}</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass="tv-slider p-1"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {tvs.map((tv, index) => (
                    <TvCard tv={tv} key={index} />
                ))}
            </Carousel>
        </div>
    )
}

export default TvSlider