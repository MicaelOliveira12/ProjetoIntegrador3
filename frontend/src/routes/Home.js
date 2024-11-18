import Styled from 'styled-components';
import Banner2 from '../Images/icons/Banner1.jpg';
import Banner1 from '../Images/icons/Banner2.jpg';
import Slider from '../component/Carousel/Carousel';
import { sliderImageUrl } from "../component/Carousel/dataCarousel";

import { Link } from 'react-router-dom';

const Container = Styled.div`
    margin: 0;
    padding: 0;    
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 2;
    gap: 10px;
`
const ContainerBanner1 = Styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    grid-row: 1;
    margin: 0;
    height: 100%;
`
const ContainerBanner2 = Styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    grid-row: 1;
    margin: 0;
    height: 100%;
    `
const Title = Styled.h1`
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #f5f5f7;
    font-size: 56px;
    line-height: 1.07143;
    font-weight: 600;
    letter-spacing: -.005em;
    font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
`
const ImageBanner = Styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 490px;
`
const StyledLink = Styled(Link)`
    position: absolute;
    top: 87%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    color: #0077ED;
    background: transparent;
    border: 2px solid #0077ED;
    border-radius: 50px;
    padding: 10px 30px !important;
    text-decoration: none !important;
    font-size: 17px;
    font-weight: 300;

    &:hover{
    background-color: #0077ED;
    color: #fff;
    }
`
const ContainerCarousel = Styled.div`
    width: 100%;
    grid-row: 2;
    grid-column: 1 / span 2;
    position: relative;
    margin: 50px 0;
`
const Text = Styled.h1`
    text-align: center;
    font-weight: bold;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    line-height: 1.07143;
    letter-spacing: .05em;
    margin: 50px 0;
`
const ArrowButton = Styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) ${(props) => props.rotate};
  padding: 15px;
  box-shadow: 4px -4px 0 1px gray inset;
  border: solid transparent;
  border-width: 0 0 2px 2px;
  background-color: transparent;
  color: gray;
  font-size: 20px;
  z-index: 999;

  &:hover {
    color: black;
  }
`
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};
function Home() {
    const image = sliderImageUrl.map((foto) => foto.url);

    const CustomArrow = ({ direction, onClick }) => (
        <ArrowButton
            onClick={onClick}
            style={direction === 'left' ? { left: '20px' } : { right: '20px' }}
            rotate={direction === 'left' ? 'rotate(45deg)' : 'rotate(225deg)'}>
        </ArrowButton>
    );

    return (
        <Container>
            <ContainerBanner1>
                <ImageBanner src={Banner1} />
                <Title>iPhone 16 Pro</Title>
                <StyledLink to="/store">Comprar</StyledLink>
            </ContainerBanner1>
            <ContainerBanner2>
                <ImageBanner src={Banner2} />
                <Title>iPhone 16</Title>
                <StyledLink to="/store">Comprar</StyledLink>
            </ContainerBanner2>
            <ContainerCarousel>
                <Text>Conheça as cores disponíveis</Text>
                <Slider
                    images={image}
                    responsive={responsive}
                    autoPlay={false}
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    infinite={true}
                    partialVisible={false}
                    autoPlaySpeed={2500}
                    customLeftArrow={<CustomArrow direction="left" />}
                    customRightArrow={<CustomArrow direction="right" />}
                    dotListClass="custom-dot-list-style"
                    customStyles={{
                        width: '100%',
                        borderRadius: '100px',
                    }} />
            </ContainerCarousel>
        </Container>
    )
}

export default Home;
