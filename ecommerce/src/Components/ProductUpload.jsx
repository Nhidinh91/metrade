import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Form,
  Button,
  InputGroup,
  Dropdown,
  DropdownButton,
  Alert,
} from "react-bootstrap";

const ProductUpload = () => {
  const { user, updateUser } = useAuthContext();

  //Form state to track product details
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 1,
    pickUpPoint: "Choose a pick-up point",
    keywords: "",
    selectedCategory: null,
    selectedSubCategory: null,
    selectedSubSubCategory: null,
  });

  //State to store categories consider using useContext later to avoid fetching categories multiple times
  const [categories, setCategories] = useState([]);

  //State for validation errors
  const [errors, setErrors] = useState([]);

  //State for showing alert
  const [showAlert, setShowAlert] = useState(false);

  //Handle all changes in product details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //Handle chosen category dropdown
  const handleDropdownChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "selectedCategory" && {
        selectedSubCategory: null,
        selectedSubSubCategory: null,
      }),
      ...(field === "selectedSubCategory" && { selectedSubSubCategory: null }),
    }));
  };

  //Handle quantity
  const handleQuantityChange = (type) => {
    setForm((prev) => ({
      ...prev,
      quantity:
        type === "increase"
          ? prev.quantity + 1
          : Math.max(prev.quantity - 1, 1),
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = [];
    if (!form.name) newErrors.push("Product name is required");
    if (!form.description) newErrors.push("Description is required");
    if (!form.price || form.price <= 0)
      newErrors.push("Price must be greater than 0");
    if (!form.pickUpPoint || form.pickUpPoint === "Choose a pick-up point")
      newErrors.push("Pick-up point is required");
    if (!form.selectedCategory) newErrors.push("Category is required");

    setErrors(newErrors);
    setShowAlert(newErrors.length > 0); //alert if there are errors
    return newErrors.length === 0;
  };

  //Function to upload product to database
  const uploadProduct = async () => {
    if (!validateForm()) return; //Stop if any missing details

    const categoryId =
      form.selectedSubSubCategory?._id ||
      form.selectedSubCategory?._id ||
      form.selectedCategory?._id;

    const product = {
      user_id: user._id,
      name: form.name,
      image:
        "https://www.utllibourne.com/wp-content/uploads/2023/09/yoga-pants-for-women-994hkt-1.jpg",
      photos: [
        "https://www.utllibourne.com/wp-content/uploads/2023/09/yoga-pants-for-women-994hkt-1.jpg",
        "https://i.dailymail.co.uk/1s/2022/02/22/10/54495789-0-image-a-4_1645525342880.jpg",
      ],
      description: form.description,
      price: form.price,
      pickup_point: form.pickUpPoint,
      category_id: categoryId,
      stock_quantity: form.quantity,
      keywords: form.keywords.split(","),
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

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("Product uploaded successfully:", data);

      // Check if user's role is "user", then update it to "seller"
      if (user.role === "user") {
        await updateUserRole();
      }

    } catch (error) {
      console.log("Error uploading product:", error);
    }
  };

  //Function to update user role to "seller"
  const updateUserRole = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/changeRole/${user._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: "seller" }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Update user context with new role
        updateUser({ ...user, role: "seller" });
        console.log("User role updated to seller");
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/categories/main-category/main-relationship`
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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

      {/* Show missing fields */}
      {errors.length > 0 && showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>
                <span className="me-2">❌</span> {error}
              </li>
            ))}
          </ul>
        </Alert>
      )}

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

      {/* Product Name */}
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Marvel themed backpack"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="e.g. Featuring bold designs of your favorite Marvel characters..."
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Category Dropdowns */}
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <DropdownButton
          id="dropdown-category"
          title={
            form.selectedCategory
              ? form.selectedCategory.name
              : "Select a category"
          }
        >
          {categories.map((category) => (
            <Dropdown.Item
              key={category._id}
              onClick={() => handleDropdownChange("selectedCategory", category)}
            >
              {category.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Form.Group>

      {form.selectedCategory?.children?.length > 0 && (
        <Form.Group className="mb-3" controlId="subCategory">
          <Form.Label>Sub-category</Form.Label>
          <DropdownButton
            id="dropdown-sub-category"
            title={
              form.selectedSubCategory
                ? form.selectedSubCategory.name
                : "Select a sub-category"
            }
          >
            {form.selectedCategory.children.map((subCategory) => (
              <Dropdown.Item
                key={subCategory._id}
                onClick={() =>
                  handleDropdownChange("selectedSubCategory", subCategory)
                }
              >
                {subCategory.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Form.Group>
      )}

      {form.selectedSubCategory?.children?.length > 0 && (
        <Form.Group className="mb-3" controlId="subSubCategory">
          <Form.Label>Sub-sub-category</Form.Label>
          <DropdownButton
            id="dropdown-sub-sub-category"
            title={
              form.selectedSubSubCategory
                ? form.selectedSubSubCategory.name
                : "Select a sub-sub-category"
            }
          >
            {form.selectedSubCategory.children.map((subSubCategory) => (
              <Dropdown.Item
                key={subSubCategory._id}
                onClick={() =>
                  handleDropdownChange("selectedSubSubCategory", subSubCategory)
                }
              >
                {subSubCategory.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Form.Group>
      )}

      {/* Keywords */}
      <Form.Group className="mb-3" controlId="keywords">
        <Form.Label>Keywords</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="e.g. fashion, style, healthcare, vintage"
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
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
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </InputGroup>
      </Form.Group>

      {/* Pick-up Point */}
      <Form.Group className="mb-3" controlId="pickUpPoint">
        <Form.Label>Pick-up point</Form.Label>
        <DropdownButton id="dropdown-pickup-point" title={form.pickUpPoint}>
          {["Myyrmäki", "Myllypuro", "Karamalmi"].map((point) => (
            <Dropdown.Item
              key={point}
              onClick={() => handleDropdownChange("pickUpPoint", point)}
            >
              {point}
            </Dropdown.Item>
          ))}
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
          <Form.Control type="text" value={form.quantity} readOnly />
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
