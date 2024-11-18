import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sucesso!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Suas informações foram atualizadas com sucesso!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
