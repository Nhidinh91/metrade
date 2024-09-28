import { Modal, Button, Spinner } from "react-bootstrap";

// Success Modal Component
export const SuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center">
        <div style={{ fontSize: "60px", color: "green" }}>✔️</div>
        <h4>Product uploaded successfully!</h4>
        <Button
          variant="warning"
          onClick={handleClose}
          style={{
            backgroundColor: "#FF7F32",
            border: "none",
            marginTop: "20px",
          }}
          href="/selling-history"
        >
          INVENTORY
        </Button>
      </Modal.Body>
    </Modal>
  );
};

// Failure Modal Component
export const FailureModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center">
        <div style={{ fontSize: "60px", color: "red" }}>😞</div>
        <h4>Fail to upload product!</h4>
        <Button
          variant="success"
          onClick={handleClose}
          style={{
            backgroundColor: "#28a745",
            border: "none",
            marginTop: "20px",
          }}
          href="/new-product"
        >
          RETRY
        </Button>
      </Modal.Body>
    </Modal>
  );
};

// Loading Modal Component
export const LoadingModal = ({ show }) => {
  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Body className="text-center">
        <Spinner animation="border" variant="primary" />
        <h4 className="mt-3">Uploading product...</h4>
      </Modal.Body>
    </Modal>
  );
};