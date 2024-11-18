import React from "react";
import Styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DivParent = Styled.div`
  width: 100%;
`
const DivSlider = Styled.div`
  width:100%;
  display: flex;
  justify-content: center;
`
const Image = Styled.img`
  width: 80%;
  height: auto;
  border-radius: 30px;
`
/**
 * Componente Slider para exibir imagens.
 * @param {Array} images
 */
const Slider = ({ images, autoPlay, infinite, customStyles, responsive, customLeftArrow, customRightArrow }) => {
  if (!images || images.length === 0) return null;

  return (
    <DivParent style={customStyles}>
      <Carousel
        responsive={responsive}
        autoPlay={autoPlay}
        swipeable={false}
        draggable={true}
        showDots={false}
        infinite={infinite}
        partialVisible={false}
        autoPlaySpeed={2500}
        customLeftArrow={customLeftArrow }
        customRightArrow={customRightArrow}
        dotListClass="custom-dot-list-style"
      >
        {images.map((imageUrl, index) => (
          <DivSlider key={index}>
            <Image src={imageUrl} alt={`Image ${index + 1}`} />
          </DivSlider>
        ))}
      </Carousel>
    </DivParent>
  );
};

export default Slider;