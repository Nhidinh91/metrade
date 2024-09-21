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

  const [categories, setCategories] = useState([]);//State to store categories consider using useContext later to avoid fetching categories multiple times
  const [errors, setErrors] = useState([]);//State for validation errors
  const [showAlert, setShowAlert] = useState(false);//State for showing alert
  const [selectedFiles, setSelectedFiles] = useState([]); //state to store photos
  const [previewUrls, setPreviewUrls] = useState([]); //state to store preview before uploading

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

  //Handle uploading images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 4) {
      alert("You can only upload up to 4 images"); //alert if more than 4 images
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]); //add new photo to array

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...urls]); //add preview
  };

  //Handle removing images
  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
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

    //get smallest category id
    const categoryId =
          form.selectedSubSubCategory?._id ||
          form.selectedSubCategory?._id ||
          form.selectedCategory?._id;

    try {
      const formData = new FormData(); //form data to send photos to backend for upload to cloudinary
      for (const file of selectedFiles) {
        formData.append('files', file);
      }
      
      //Upload images to cloudinary
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/product/imageUpload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { urls } = data; //retrieve image urls after successful upload
      const image = urls[0]; //set main image as first image
      const photos = urls; //save photos' urls to send to database

      const product = {
        user_id: user._id,
        name: form.name,
        image: image,
        photos: photos,
        description: form.description,
        price: form.price,
        pickup_point: form.pickUpPoint,
        category_id: categoryId,
        stock_quantity: form.quantity,
        keywords: form.keywords.split(","),
      };

      //Upload product to database
      const productResponse = await fetch(
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

      if (!productResponse.ok) throw new Error("Network response was not ok");
      const productData = await response.json();
      console.log("Product uploaded successfully:", productData);

    } catch (error) {
      console.log("Error uploading product:", error);
    }
  };

  // Fetch categories may use useContext to avoid fetching categories multiple times
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
        <Form.Control type="file" multiple hidden onChange={handleFileChange} />
      </Form.Group>

      {/* Image Previews */}
      <div>
        {previewUrls.map((url, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              position: "relative",
              margin: "10px",
            }}
          >
            <img
              src={url}
              alt={`Preview ${index}`}
              style={{ width: "100px", height: "100px" }}
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                color: "red",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

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
