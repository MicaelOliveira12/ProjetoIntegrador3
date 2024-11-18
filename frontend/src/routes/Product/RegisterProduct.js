import React, { useState } from "react";
import styled from "styled-components";
import BlobStorageViewer from "../../Images/icons/StorageBlob/BlobStorageViewer";
import ProductService from "../../services/productService";

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
`
const Title = styled.h1`
  color: #333;
  text-align: center;
  font-weight: 500;
`
const TitlePhoto = styled.h2`
    text-align: center;
    font-weight: 500;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 740px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`
const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`
const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  min-height: 100px;
  resize: vertical;
  &:focus {
    border-color: #007bff;
  }
`
const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`
const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`
const PhotoContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`
const PhotoCard = styled.div`
  width: 120px;
  text-align: center;
`
const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`
const PhotoName = styled.p`
  font-size: 14px;
  color: #555;
`
function RegisterProduct () {
  const [produto, setProduto] = useState({
    nomeProduto: "",
    descricaoProduto: "",
    precoProduto: "",
    qtdEstoque: "",
    ativoInativo: "Ativo",
    imagemPrincipal: "",
  });

  const [fotosProduto, setFotosProduto] = useState([]);
  const [nomeFoto, setNomeFoto] = useState("");

  const handleProdutoChange = (e) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: value,
    });
  };

  const handleAddFoto = (urlFoto) => {
    setFotosProduto([
      ...fotosProduto,
      {
        nomeFoto: nomeFoto,
        urlFoto: urlFoto,
        flagImg: "x",
      },
    ]);
    setNomeFoto("");
  };

  const handleRemoveFoto = (url) => {
    setFotosProduto(fotosProduto.filter((foto) => foto.urlFoto !== url));
  };

  const handleSelectImagemPrincipal = (url) => {
    setProduto({
      ...produto,
      imagemPrincipal: url,
    });
    setFotosProduto(fotosProduto.map(foto => ({
      ...foto,
      flagImg: foto.urlFoto === url ? "p" : "x",
    })));
  };

  const resetForm = () => {
    setProduto({
      nomeProduto: "",
      descricaoProduto: "",
      precoProduto: "",
      qtdEstoque: "",
      ativoInativo: "Ativo",
      imagemPrincipal: "",
    });
    setFotosProduto([]);
    setNomeFoto(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const produtoComFotos = {
      produto,
      fotosProdutoRecord: fotosProduto.map(foto => ({
        idProduto: null,
        nomeFoto: foto.nomeFoto,
        urlFoto: foto.urlFoto,
        flagImg: foto.flagImg || "x",
      })),
    };
    console.log(produtoComFotos);

    try {
      const result = await ProductService.salvarProduto(produtoComFotos);
      console.log("Produto salvo com sucesso:", result);
      alert("Produto salvo com sucesso");
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar produto: ", error);
      alert("Erro ao salvar o produto.");
    }
  };

  return (
    <Container>
      <Title>Cadastrar Produto</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nomeProduto"
          placeholder="Nome do Produto"
          value={produto.nomeProduto}
          onChange={handleProdutoChange}
        />
        <Textarea
          name="descricaoProduto"
          placeholder="Descrição do Produto"
          value={produto.descricaoProduto}
          onChange={handleProdutoChange}
        />
        <Input
          type="number"
          name="precoProduto"
          placeholder="Preço do Produto"
          value={produto.precoProduto}
          onChange={handleProdutoChange}
        />
        <Input
          type="number"
          name="qtdEstoque"
          placeholder="Quantidade em Estoque"
          value={produto.qtdEstoque}
          onChange={handleProdutoChange}
        />
        <Select
          name="ativoInativo"
          value={produto.ativoInativo}
          onChange={handleProdutoChange}
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </Select>

        <TitlePhoto>Adicionar Fotos do Produto</TitlePhoto>

        <BlobStorageViewer onFotoSelecionada={handleAddFoto} />

        <PhotoContainer>
          {fotosProduto.map((foto, index) => (
            <PhotoCard key={index}>
              <ImagePreview src={foto.urlFoto} alt={foto.nomeFoto} />
              <PhotoName>{foto.nomeFoto}</PhotoName>
              <Button type="button" onClick={() => handleRemoveFoto(foto.urlFoto)}>
                Remover
              </Button>
              <div>
                <input
                  type="radio"
                  name="imagemPrincipal"
                  value={foto.urlFoto}
                  checked={foto.urlFoto === produto.imagemPrincipal}
                  onChange={() => handleSelectImagemPrincipal(foto.urlFoto)}
                />
                <label>Imagem Principal</label>
              </div>
            </PhotoCard>
          ))}
        </PhotoContainer>

        <Button type="submit">Salvar Produto</Button>
      </Form>
    </Container>
  );
};

export default RegisterProduct;
