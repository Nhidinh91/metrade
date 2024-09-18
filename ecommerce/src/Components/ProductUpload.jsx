import { useState } from "react";
import {Form, Button, InputGroup, Dropdown, DropdownButton} from "react-bootstrap";

const ProductUpload = () => {
  const [quantity, setQuantity] = useState(1);
  const [pickUpPoint, setPickUpPoint] = useState("Choose a pick-up point");

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev - 1 > 0 ? prev - 1 : 1
    );
  };

  const handlePickUpPointChange = (point) => {
    setPickUpPoint(point);
  };

  return (
    <Form
      className="p-4"
      style={{
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <h3>Sell your product</h3>

      {/* Image Upload */}
      <Form.Group className="mb-3 text-center" controlId="formFileMultiple">
        <Form.Label
          className="d-block border border-secondary p-5 rounded"
          style={{ cursor: "pointer", borderStyle: "dashed" }}
        >
          Add photos (up to 4)
        </Form.Label>
        <Form.Control type="file" multiple hidden />
      </Form.Group>

      {/* Product Title */}
      <Form.Group className="mb-3" controlId="productTitle">
        <Form.Label>Product title</Form.Label>
        <Form.Control type="text" placeholder="e.g. Marvel themed backpack" />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="productDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="e.g. Featuring bold designs of your favorite Marvel characters..."
        />
      </Form.Group>

      {/* Category */}
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <DropdownButton id="dropdown-category" title="Select a category">
          <Dropdown.Item href="#/action-1">Category 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Category 2</Dropdown.Item>
        </DropdownButton>
      </Form.Group>

      {/* Sub-category */}
      <Form.Group className="mb-3" controlId="subCategory">
        <Form.Label>Sub-category</Form.Label>
        <DropdownButton
          id="dropdown-sub-category"
          title="Select a sub-category"
        >
          <Dropdown.Item href="#/action-1">Sub-category 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Sub-category 2</Dropdown.Item>
        </DropdownButton>
      </Form.Group>

      {/* Keywords */}
      <Form.Group className="mb-3" controlId="keywords">
        <Form.Label>Keywords</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="e.g. fashion, style, healthcare, vintage"
          />
        </InputGroup>
      </Form.Group>

      {/* Price */}
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>€</InputGroup.Text>
          <Form.Control type="number" placeholder="0.00" />
        </InputGroup>
      </Form.Group>

      {/* Pick-up Point */}
      <Form.Group className="mb-3" controlId="pickUpPoint">
        <Form.Label>Pick-up point</Form.Label>
        <DropdownButton id="dropdown-pickup-point" title={pickUpPoint}>
          <Dropdown.Item onClick={() => handlePickUpPointChange("Myyrmäki")}>
            Myyrmäki
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlePickUpPointChange("Myllypurro")}>
            Myllypurro
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlePickUpPointChange("Karamalmi")}>
            Karamalmi
          </Dropdown.Item>
        </DropdownButton>
      </Form.Group>

      {/* Quantity */}
      <Form.Group className="mb-3" controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <InputGroup>
          <Button
            variant="outline-secondary"
            onClick={() => handleQuantityChange("decrease")}
          >
            -
          </Button>
          <Form.Control type="text" value={quantity} readOnly />
          <Button
            variant="outline-secondary"
            onClick={() => handleQuantityChange("increase")}
          >
            +
          </Button>
        </InputGroup>
      </Form.Group>

      {/* Actions */}
      <div className="d-flex justify-content-between">
        <Button variant="outline-secondary">Cancel</Button>
        <Button variant="primary">Sell now</Button>
      </div>
    </Form>
  );
};

export default ProductUpload;
