import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/userContext';
import productService from '../../services/productService';
import styled, { keyframes } from 'styled-components';
import Slider from '../../component/Carousel/Carousel';

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`
const DonutContainer = styled.div`
width:100%;
height:100%;
min-height: 500px;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0;
padding: 0;
`
const Donut = styled.div`
  width: 3rem;
  height: 3rem;
  margin: auto;
  border-radius: 50%;
  border: 0.3rem solid rgba(0, 144, 247, 0.3); 
  border-top-color: #0090f7;
  border-bottom-color: #0090f7;
  animation: 1.8s ${spin} infinite linear;
`
const ArrowButton = styled.button`
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
const ProductViewer = styled.div`
  width: 80%;
  display: grid;
  grid-template-column: 60% 40%;
  grid-template-row: 1;
  align-items: center;
  min-height: 660px;
  margin: 20px;
`
const ImageViewer = styled.div`
padding: 0;
width: 100%;
height: 100%;
display: flex;
grid-column: 1;
align-items: center;
justify-content: center;
`
const DataProduct = styled.div`
text-align: center;
grid-column: 2;
 border: 2px solid green;
`

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function ShowProduct() {
  const { selectedProductId } = useUser();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduto() {
      if (!selectedProductId) return;
      try {
        const data = await productService.getProductCompleto(selectedProductId);
        setProduto(data);
      } catch (error) {
        setError('Não foi possível carregar os detalhes do produto.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduto();
  }, [selectedProductId]);

  if (loading) return <DonutContainer><Donut></Donut></DonutContainer>;
  if (error) return <p>{error}</p>;

  const images = produto?.fotosProdutoRecord.map((foto) => foto.urlFoto);

  const CustomArrow = ({ direction, onClick }) => (
    <ArrowButton
      onClick={onClick}
      style={direction === 'left' ? { left: '10px' } : { right: '10px' }}
      rotate={direction === 'left' ? 'rotate(45deg)' : 'rotate(225deg)'}>
    </ArrowButton>
  );

  return (
    <ProductContainer>
      {produto && (
        <ProductViewer>
          <ImageViewer>
              <Slider
                images={images}
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
                  width: '500px',
                  borderRadius: '100px',
                }} />
          </ImageViewer>
          <DataProduct>
            <h1>{produto.produto.nomeProduto}</h1>
            <p>{produto.produto.descricaoProduto}</p>
            <p>{produto.produto.precoProduto}</p>
          </DataProduct>
        </ProductViewer>

      )}
    </ProductContainer>
  );
}

export default ShowProduct;
