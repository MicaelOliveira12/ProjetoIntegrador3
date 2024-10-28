import { useEffect, useState } from "react";
import { getProduct } from "../../services/homeService";
import Styled from "styled-components";

function Home() {

    const [products, setProducts] = useState([]);


    async function fetchProdutos() {
        const response = await getProduct();
        setProducts(response.content)
    }

    useEffect(() => {
        fetchProdutos()
    }, []);

    const ContainerPrincipal = Styled.div`
        display: block;
        width: 100%;
        min-width: 320px;
        overflow: hidden;
        unicode-bidi: isolate;
        font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
    `
    //===================Banner 1====================//

    const ContainerBanner = Styled.div`
        min-height: 248px;
        padding: 0 140px;
        position: relative;
        max-width: 100%;
        display: flex;
        flex-flow: row wrap;
        overflow: hidden;
        letter-spacing: -0.003em;
        line-height: 1.47059;
    `;

    const ContainerTextBanner = Styled.div`
        max-width: 640px;
        padding: 80px 0 64px;
        flex-basis: 66.6666666667%;
        box-sizing: border-box;
        margin: 0;
        min-width: 0;
        font-weight: 600;
        font-size: 48px;
    `;

    const TitleBanner = Styled.h1`
        display: inline;
        font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 48px;
        letter-spacing: -.003em;
        line-height: 1.1534933333;
        color: var(--text-color-secundary);
    `

    const SubtitleBanner = Styled.div`
        display: inline;
        font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
        letter-spacing: -.003em;
        line-height: 1.0834933333;
        color: var(--text-color-primary-opacity);
    `;

    const ContainerContactBanner = Styled.div`
        inset-inline-end: 0;
        position: relative;
        align-content: flex-end;
        display: flex;
        flex-flow: column wrap;
        padding: 90px 0 74px;
        flex-basis: 33.3333333333%;
        box-sizing: border-box;
        margin: 0;
        margin-left: auto;
        min-width: 0;
        unicode-bidi: isolate;
        font-weight: 500;
        font-size: 14px;
        font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
        letter-spacing: -.016em;
    `;

    const ContainerContactChat = Styled.div`
        display: flex;
        padding-bottom: 16px;
        flex-direction: column;     
        line-height: 1.4285914286;
        -webkit-text-size-adjust: none;
    `;

    const ContainerContactStore = Styled.div`
        display: flex;
        inline-flex-end: 0;
        flex-direction: column;
        line-height: 1.4285914286;
    `;

    const ContainerContactText = Styled.span``;

    const ContainerContactLink = Styled.a`
        color: #06c;
        font-weight: 400;
        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    `;

    //================================================//

    const ContainerProdutos = Styled.section`
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 2% auto;
        font-family: 'Inter';
    `

    const CardContainer = Styled.div`
        text-align: center;
        border: 4px solid #f1f1f1;
        width: calc(33.33% - 1rem);
        margin-bottom: 20px;
    `

    const Image = Styled.img`
        width: 100%;
        height: auto;
        object-fit: cover;
    `

    const Title = Styled.h1`
        text-transform: uppercase;
    `

    const Descricao = Styled.h4`
        width: 75%;
        margin: auto;
        padding: auto;
        word-break: normal;
    `

    const Preco = Styled.p`
        font-size: 18px;
        font-weight: bold;
    `

    const Estoque = Styled.p`
        font-size: 12px;
        font-weight: bold;
    `

    const Status = Styled.p`
        font-size: 12px;
        font-weight: bold;
        
    `

    return (
        <ContainerPrincipal>
            <ContainerBanner>
                <ContainerTextBanner>
                    <TitleBanner>Loja.</TitleBanner><SubtitleBanner> O melhor jeito de comprar o que você ama.</SubtitleBanner>
                </ContainerTextBanner>
                <ContainerContactBanner>
                    <ContainerContactChat>
                        <ContainerContactText>Precisa de ajuda para comprar?</ContainerContactText>
                        <ContainerContactLink>Fale com um especialista</ContainerContactLink>
                    </ContainerContactChat>
                    <ContainerContactStore>
                        <ContainerContactText>Visite uma Apple Store</ContainerContactText>
                        <ContainerContactLink>Procure uma loja perto de você </ContainerContactLink>
                    </ContainerContactStore>
                </ContainerContactBanner>
            </ContainerBanner>
            <ContainerProdutos>
                {
                    products.length !== 0 ? (
                        products.map(product => (
                            <CardContainer key={product.id}>
                                <Image src={product.imagemPrincipal} alt="" />
                                <Title> {product.nomeProduto} </Title>
                                <Descricao>{product.descricaoProduto}</Descricao>
                                <Preco>Preço: R${product.precoProduto.toFixed(2)}</Preco>
                                <Estoque>Estoque: {product.qtdEstoque}</Estoque>
                                <Status>Status: {product.ativoInativo}</Status>
                            </CardContainer>
                        ))) : (console.log(products))}

            </ContainerProdutos>
        </ContainerPrincipal>
    );
}

export default Home;