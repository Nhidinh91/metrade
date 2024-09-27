import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  FormControl,
  InputGroup,
  Pagination,
  Modal,
} from "react-bootstrap";
import Loading from "../Components/Loading";

const AdminProductComp = () => {
  const [products, setProducts] = useState([]); // State to hold products fetched from backend
  const [loading, setLoading] = useState(true); // Loading state
  const [page, setPage] = useState(1); // State to keep track of the current page
  const [error, setError] = useState(null); // Error state
  const limit = 8; // Limit of products to fetch per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [status, setStatus] = useState(null); // Status filter
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [counts, setCounts] = useState({ active: 0, processing: 0, sold: 0 }); // Counts for each status
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for action
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control success modal visibility
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    // Fetch products from backend
    const fetchProducts = async () => {
      setLoading(true); // Set loading when fetching new data
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/product?page=${page}&status=${
            status || ""
          }&search=${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          setProducts([]); // Set products to empty array if no products found
        }

        const data = await response.json();

        if (isMounted) {
          setProducts(data.products); // Get all products
          setTotalPages(Math.ceil(data.totalProducts / limit)); // Calculate total pages
        }
      } catch (error) {
        setError(error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        } // Set loading to false after fetching products
      }
    };

    // Fetch product counts from backend
    const fetchCounts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/product/counts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setCounts({
            all: data.allCount,
            active: data.activeCount,
            processing: data.processingCount,
            sold: data.soldCount,
          });
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
    fetchCounts();

    return () => {
      isMounted = false; // Cleanup function to track if the component is unmounted
    };
  }, [page, status, searchQuery]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // Handle status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1); // Reset to first page when status changes
  };

  // Handle search
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setSearchQuery(searchTerm);
    }
  };

  // Handle opening the modal with the selected product
  const handleActionClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Handle closing the success modal
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage("");
  };

  // Handle activating a product
  const handleActivateProduct = async () => {
    if (selectedProduct) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/product/activate/${selectedProduct._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === selectedProduct._id
                ? { ...product, status: "active" }
                : product
            )
          );
          handleCloseModal();
          setSuccessMessage("Product activated successfully!");
          setShowSuccessModal(true);
        } else {
          throw new Error("Failed to activate product");
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/product/delete/${selectedProduct._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter(
              (product) => product._id !== selectedProduct._id
            )
          );
          handleCloseModal();
          setSuccessMessage("Product deleted successfully!");
          setShowSuccessModal(true);
        } else {
          throw new Error("Failed to delete product");
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (error) {
    return (
      <>
        <h1>Error: {error}</h1>
        <Container style={{ height: "200px" }}></Container>
      </>
    );
  }

  if (loading) {
    return <Loading message="Loading..." />; // Show loading... while fetching data
  }

  return (
    <Container fluid className="p-4">
      {/* Status Cards */}
      <Row className="mb-4">
        <Col>
          <Card
            className="text-center"
            onClick={() => handleStatusChange(null)}
          >
            <Card.Body>
              <Card.Title>All Products</Card.Title>
              <Card.Text className="text-primary fs-2">{counts.all}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center"
            onClick={() => handleStatusChange("active")}
          >
            <Card.Body>
              <Card.Title>Active Products</Card.Title>
              <Card.Text className="text-success fs-2">
                {counts.active}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center"
            onClick={() => handleStatusChange("processing")}
          >
            <Card.Body>
              <Card.Title>Processing</Card.Title>
              <Card.Text className="text-warning fs-2">
                {counts.processing}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center"
            onClick={() => handleStatusChange("sold")}
          >
            <Card.Body>
              <Card.Title>Sold</Card.Title>
              <Card.Text className="text-success fs-2">{counts.sold}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="mb-3">
        <Col>
          <Container fluid className="d-flex">
            <FormControl
              placeholder="Search product id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <Button onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass" />
            </Button>
          </Container>
        </Col>
      </Row>

      {/* Product Table */}
      {products && products.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td
                  className={
                    product.status === "processing"
                      ? "text-warning"
                      : "text-success"
                  }
                >
                  {product.status}
                </td>
                <td>
                  <Button onClick={() => handleActionClick(product)}>
                    Action
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>No products found</h3>
      )}
      {totalPages > 1 && (
        <Container className="d-flex justify-content-center">
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === page}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Container>
      )}

      {/* Action Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Product ID: {selectedProduct?._id}</p>
          <p>Status: {selectedProduct?.status}</p>
          {selectedProduct?.status === "processing" ? (
            <>
              <Button
                variant="success"
                className="me-2"
                onClick={handleActivateProduct}
              >
                Activate
              </Button>
              <Button variant="danger" onClick={handleDeleteProduct}>
                Delete
              </Button>
            </>
          ) : (
            <Button variant="danger" onClick={handleDeleteProduct}>
              Delete
            </Button>
          )}
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{successMessage}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminProductComp;
