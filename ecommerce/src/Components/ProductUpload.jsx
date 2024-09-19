import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Form,
  Button,
  InputGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { uploadProduct } from "../../../backend/controllers/productController";

const ProductUpload = () => {
  const { user, updateUser } = useAuthContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [keywords, setKeywords] = useState([""]);
  const [price, setPrice] = useState();
  const [pickUpPoint, setPickUpPoint] = useState("Choose a pick-up point");
  const [quantity, setQuantity] = useState(1);

  const uploadProduct = async () => {
    const product = {
      user_id: user._id,
      name: name,
      image:
        "https://www.utllibourne.com/wp-content/uploads/2023/09/yoga-pants-for-women-994hkt-1.jpg",
      photos: [
        "https://www.utllibourne.com/wp-content/uploads/2023/09/yoga-pants-for-women-994hkt-1.jpg",
        "https://i.dailymail.co.uk/1s/2022/02/22/10/54495789-0-image-a-4_1645525342880.jpg",
      ],
      description: description,
      price: price,
      pickup_point: pickUpPoint,
      category_id: { $oid: "66e341dd97aaa45c6b839f82" },
      stock_quantity: quantity,
      keywords: keywords.split(","),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/product/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Product uploaded successfully:", data);
    } catch (error) {
      console.log("Error uploading product:", error);
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1
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
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Marvel themed backpack"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="e.g. Featuring bold designs of your favorite Marvel characters..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      {/* Price */}
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>€</InputGroup.Text>
          <Form.Control
            type="number"
            placeholder="0,00"
            value={price}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setPrice(value >= 0 ? value : 0);
            }}
            min="0"
            step="0.01"
          />
        </InputGroup>
      </Form.Group>

      {/* Pick-up Point */}
      <Form.Group className="mb-3" controlId="pickUpPoint">
        <Form.Label>Pick-up point</Form.Label>
        <DropdownButton id="dropdown-pickup-point" title={pickUpPoint}>
          <Dropdown.Item onClick={() => handlePickUpPointChange("Myyrmäki")}>
            Myyrmäki
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlePickUpPointChange("Myllypuro")}>
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
        <Button variant="primary" onClick={uploadProduct}>
          Sell now
        </Button>
      </div>
    </Form>
  );
};

export default ProductUpload;
