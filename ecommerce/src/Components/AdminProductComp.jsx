import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";

const AdminProductComp = () => {
  // Sample data
  const initialProducts = [
    { id: "#2345", status: "Processing" },
    { id: "#5667", status: "Processing" },
    { id: "#1998", status: "Processing" },
    { id: "#1245", status: "Processing" },
    { id: "#1234", status: "Active" },
    { id: "#1236", status: "Active" },
    { id: "#1237", status: "Active" },
    { id: "#1239", status: "Active" },
    { id: "#2345", status: "Active" },
    { id: "#5678", status: "Active" },
    { id: "#7890", status: "Active" },
  ];
  const activeProducts = 7539;
  const soldProducts = 1663;
  const processingProducts = 65;
  const deletedProducts = 4;

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering logic
  const filteredProducts = products.filter((product) =>
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="p-4">
      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Active products</Card.Title>
              <Card.Text className="text-success fs-2">
                {activeProducts}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Processing</Card.Title>
              <Card.Text className="text-warning fs-2">
                {processingProducts}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Sold</Card.Title>
              <Card.Text className="text-success fs-2">
                {soldProducts}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Deleted</Card.Title>
              <Card.Text className="text-danger fs-2">
                {deletedProducts}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="Search product id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>
              <i className="fa-solid fa-magnifying-glass" />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Product Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td
                className={
                  product.status === "Processing" ? "text-warning" : "text-success"
                }
              >
                {product.status}
              </td>
              <td>
                <Button variant="primary">Action</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminProductComp;
