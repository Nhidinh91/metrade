import React, { useEffect, useState } from "react";
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
} from "react-bootstrap";
import AdminOrderStats from "./AdminOrderStats";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  displaySellingStatusColor,
  capitalizeStatusStr,
  convertToQueryString,
  findTotalPage,
} from "../utils/transactionUtils";

const STATUS_LIST = ["processing", "await-pickup", "delivered", "cancelled"];

const AdminOrderComp = () => {
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

  const { user, updateUser, scheduleTokenRenewal } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState(initialProducts);
  const [orderItems, setOrderItems] = useState([]);
  const [pickupPlace, setPickUpPlace] = useState("");
  const [status, setStatus] = useState("");
  const [itemId, setItemId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [queryStrArr, setqueryStrArr] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  //refresh token
  useEffect(() => {
    if (user && user.token_expired_at) {
      scheduleTokenRenewal(user.token_expired_at);
    }
  }, [user, scheduleTokenRenewal]);

  //fetch stat stats
  useEffect(() => {
    const abortcontroller = new AbortController();
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/transactions/stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            signal: abortcontroller.signal,
          }
        );
        if (response.ok) {
          const statsData = await response.json();
          setStats((s) => statsData.data);
        }
      } catch (error) {
        if (error.name !== "AbortError")
          console.log("Error fetching stats", error.message);
      } finally {
        setLoading((l) => false);
      }
    };
    fetchStats();
    return () => {
      abortcontroller.abort();
    };
  }, [orderItems]);

  // fetch orderItems
  useEffect(() => {
    const abortcontroller = new AbortController();
    setOrderItems((od) => []);

    const fetchOrderItems = async () => {
      setLoading((l) => true);
      console.log(queryStrArr);
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL
          }/admin/transactions${convertToQueryString(queryStrArr)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            signal: abortcontroller.signal,
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log(findTotalPage(data.totalItems, data.limit));
          setOrderItems((ot) => data.data);
          setTotalPages((tp) => findTotalPage(data.totalItems, data.limit));
        } else {
          throw new Error("Cannot get data");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
      } finally {
        setLoading((l) => false);
      }
    };
    fetchOrderItems();
    return () => {
      abortcontroller.abort();
    };
  }, [queryStrArr]);

  //update querystring automatically
  useEffect(() => {
    const updateQueryStringArray = () => {
      // console.log("qryStrArr", queryStrArr);
      setqueryStrArr((qta) => {
        let newQueryStrArr = qta.filter((param) => !param.includes("status"));
        if (status) {
          newQueryStrArr.push(`selling_status=${status}`);
          setPage((p) => 1);
        }

        return newQueryStrArr;
      });
    };
    updateQueryStringArray();
  }, [status]);

  const changeSellingStatus = (str) => {
    setStatus((s) => str);
  };

  const displayAllOrderItem = () => {
    setqueryStrArr((qta) => []);
    setStatus((s) => "");
    setPage((p) => 1);
  };

  const updateQueryStringArrayWithPage = (pageNumber) => {
    setPage((p) => pageNumber);
    setqueryStrArr((qta) => {
      let updatedQueryStrArr = qta.filter((param) => !param.includes("page"));
      if (page) {
        updatedQueryStrArr.push(`page=${pageNumber}`);
      }
      return updatedQueryStrArr;
    });
  };

  const handlePageChange = (pageNumber) => {
    updateQueryStringArrayWithPage(pageNumber);
  };

  const handleItemId = (e) => {
    setItemId((ii) => e.target.value);
  };

  const updateQueryStringArrayWithId = () => {
    setqueryStrArr((qta) => {
      let updatedQueryStrArr = qta.filter(
        (param) => !param.includes("_id") && !param.includes("page")
      );
      if (itemId) {
        updatedQueryStrArr.push(`_id=${itemId}`);
        setPage((p) => 1);
      }
      return updatedQueryStrArr;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    updateQueryStringArrayWithId();
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      updateQueryStringArrayWithId();
    }
  };



  return (
    <Container fluid className="p-4">
      {/* Statistics Cards */}
      <AdminOrderStats
        stats={stats}
        statusList={STATUS_LIST}
        changeSellingStatus={changeSellingStatus}
      />

      {/* {orderId} */}
      {/* Search Bar */}
      <Row className="mb-3 d-flex justify-content-between">
        <Col className="col-2">
          <button
            type="button"
            class="btn btn-light"
            onClick={displayAllOrderItem}
          >
            All
          </button>
        </Col>
        <Col className="col-9 ">
          <InputGroup>
            <FormControl
              placeholder="Search order item id..."
              value={itemId}
              onChange={handleItemId}
              onKeyUp={handleKeyPress}
            />
            <Button onClick={handleSubmit}>
              <i className="fa-solid fa-magnifying-glass" />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Product Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Item Id</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td
                style={{
                  color: `${displaySellingStatusColor(item.selling_status)}`,
                }}
              >
                {item.selling_status}
              </td>
              <td>
                <Button variant="primary">Action</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Container className="d-flex justify-content-center">
        <Pagination className="order-page">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === page}
              onClick={() => handlePageChange(index + 1)}
              className="order-page-item"
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </Container>
  );
};

export default AdminOrderComp;
