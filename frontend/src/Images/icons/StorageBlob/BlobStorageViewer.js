import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const Option = styled.option``;

const ImagePreviewContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 300px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const BlobStorageViewer = ({ onFotoSelecionada }) => {
  const [containers, setContainers] = useState([]);
  const [blobs, setBlobs] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [selectedBlob, setSelectedBlob] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const sasUrl = "https://storageimagepi.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-10T23:31:08Z&st=2024-11-10T15:31:08Z&spr=https,http&sig=kYpOHLmltC8L0owmB%2FB7RZrVR95IxzfPhELSfOadkcU%3D";

  const blobServiceClient = useMemo(() => {
    return new BlobServiceClient(sasUrl);
  }, [sasUrl]);

  const listarContainers = useCallback(async () => {
    const containerClient = blobServiceClient.listContainers();
    const containerList = [];
    for await (const container of containerClient) {
      containerList.push(container.name);
    }
    setContainers(containerList);
  }, [blobServiceClient]);

  const listarBlobs = useCallback(async (containerName) => {
    if (!containerName) return;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobList = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      blobList.push(blob.name);
    }
    setBlobs(blobList);
  }, [blobServiceClient]);

  const mostrarImagem = (blobName, containerName) => {
    if (!blobName || !containerName) return;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    setImageUrl(blobClient.url);
  };

  useEffect(() => {
    listarContainers();
  }, [listarContainers]);

  useEffect(() => {
    if (selectedContainer) {
      listarBlobs(selectedContainer);
    } else {
      setBlobs([]);
    }
  }, [selectedContainer, listarBlobs]);

  const handleContainerChange = (e) => {
    const containerName = e.target.value;
    setSelectedContainer(containerName);
    setSelectedBlob("");
    setImageUrl(null);
  };

  const handleBlobChange = (e) => {
    const blobName = e.target.value;
    setSelectedBlob(blobName);
    mostrarImagem(blobName, selectedContainer);
  };

  const handleAdicionarFoto = () => {
    if (imageUrl) {
      onFotoSelecionada(imageUrl);
      setImageUrl(null);
      setSelectedBlob("");
    }
  };

  return (
    <>
      <Container>
        <Title>Pasta</Title>
        <Select onChange={handleContainerChange} value={selectedContainer}>
          <Option value="">Selecione uma pasta</Option>
          {containers.map((container, index) => (
            <Option key={index} value={container}>
              {container}
            </Option>
          ))}
        </Select>

        {selectedContainer && (
          <>
            <Title>Escolha a imagem</Title>
            <Select onChange={handleBlobChange} value={selectedBlob}>
              <Option value="">Selecione uma imagem</Option>
              {blobs.map((blob, index) => (
                <Option key={index} value={blob}>
                  {blob}
                </Option>
              ))}
            </Select>

            {imageUrl && (
              <ImagePreviewContainer>
                <h3>Prévia:</h3>
                <ImagePreview src={imageUrl} alt={selectedBlob} />
                <Button type="button" onClick={handleAdicionarFoto}>
                  Adicionar Foto
                </Button>
              </ImagePreviewContainer>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default BlobStorageViewer;
