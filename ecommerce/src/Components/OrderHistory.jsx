import moment from "moment";

import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  Pagination,
} from "react-bootstrap";
import "../Styles/OrderHistory.css";
import Coin from "../assets/star.png";

const STATUS_LIST = ["processing", "await-pickup", "delivered", "cancelled"];
const PICKUP_LIST = ["Myllypuro", "Karamalmi", "Myyrmäki"];

const displayStatus = (str) => {
  let result = str.trim().split("-");
  result = result.map((e) => e.charAt(0).toUpperCase() + e.slice(1));
  result = result.join(" ");
  return result;
};

const displayButtonColor = (str) => {
  switch (str) {
    case "processing":
      return "#ffc41f";
    case "await-pickup":
      return "#f37c25";
    case "delivered":
      return "#3f9c36";
    case "cancelled":
      return "#b43f3f";
  }
};

const displayColor = (str) => {
  // console.log(str);
  switch (str) {
    case "Myllypuro":
      return "#3f9c36";
    case "Karamalmi":
      return "#b43f3f";
    case "Myyrmäki":
      return "#f37c25";
  }
};

const diplayDate = (dateStr) => {
  const date = moment(dateStr).format("DD-MM-YYYY");
  // console.log(date);
  return `${date}`;
};

const convertToQueryString = (qrArr) => {
  let result = "";
  if (qrArr.length > 0) {
    result = "?" + qrArr.join("&");
  }
  return result;
};

const OrderHistory = () => {
  const { user, updateUser, scheduleTokenRenewal } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [queryStrArr, setqueryStrArr] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [pickUpPlace, setPickUpPlace] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);


  useEffect(() => {
    setOrderDetails((od) => []);

    let isMounted = true;
    const fetchOrderDetails = async () => {
      setLoading((l) => true);
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL
          }/orders/order-history${convertToQueryString(queryStrArr)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const orderData = await response.json();
          const { totalOrder, limit, orderDetailList } = orderData.data;
          if (orderData && isMounted) {
            setOrderDetails((od) => [...od, ...orderDetailList]);
            setTotalPages((tp) => Math.ceil(totalOrder / limit));
          }
        }
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
    return () => {
      isMounted = false;
    };
  }, [user, queryStrArr, page]);

  useEffect(() => {

    console.log("updating picking ");
    const updateQueryStringArray = () => {
      setqueryStrArr((qtr) => {
        let newQueryStrArr = qtr.filter(
          (param) =>
            !param.includes("pickup") &&
            !param.includes("status") &&
            !param.includes("page")
        );
        if (pickUpPlace) {
          newQueryStrArr.push(`pickup=${pickUpPlace}`);
        }
        if (status) {
          newQueryStrArr.push(`status=${status}`);
        }
        if (page) {
          newQueryStrArr.push(`page=${page}`);
        }
        console.log(newQueryStrArr);
        return newQueryStrArr;
      });
    };
    updateQueryStringArray();
  }, [pickUpPlace, status, page]);

  const displayAll = () => {
    setqueryStrArr((qtr) => []);
    setPickUpPlace("");
    setStatus("");
    setId("");
    setPage(1);
  };

  const handlePickUp = (e) => {
    setPickUpPlace((p) => e.target.value);
  };
  const handleStatus = (e) => {
    setStatus((s) => e.target.value);
  };
  const handleId = (e) => {
    setId((i) => e.target.value);
  };
  const updateQueryStringArrayWithId = () => {
    setqueryStrArr((qtr) => {
      let updatedQueryStrArr = qtr.filter((param) => !param.includes("id"));
      if (id) {
        updatedQueryStrArr.push(`id=${id}`);
      }
      console.log(updateQueryStringArrayWithId);
      return updatedQueryStrArr;
    });
  };
  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      updateQueryStringArrayWithId();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateQueryStringArrayWithId();
  };

  const handlePageChange = (pageNumber) => {
    setPage((p) => pageNumber);
  };

  return (
    <div className="order-history-container">
      <h2>Filter</h2>
      <div className="filter-container">
        <div className="filter-item">
          <button type="click" onClick={displayAll} id="all-order-detail">
            All
          </button>
        </div>
        <div className="filter-item">
          <div className="search-container">
            <input
              type="text"
              name="pickup"
              className="order-item-input"
              value={id}
              onChange={handleId}
              onKeyUp={handleKeyPress}
              placeholder="Type Order Number"
            />
            <i
              className="fa-solid fa-magnifying-glass"
              id="magnify"
              onClick={handleSubmit}
            ></i>
          </div>
        </div>
        <div className="filter-item">
          <select
            name="pickup"
            id="pickup"
            value={pickUpPlace}
            onChange={(e) => handlePickUp(e)}
          >
            <option value="" disabled>
              Pick Up Place
            </option>
            {PICKUP_LIST.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <select
            name="status"
            className="filter-dropdown"
            value={status}
            // placeholder="Order Status"
            onChange={(e) => handleStatus(e)}
          >
            <option value="" disabled>
              Order Status
            </option>
            {STATUS_LIST.map((status, index) => (
              <option key={index} value={status}>
                {displayStatus(status)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div class="spinner-border spinner-order" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="orders-container">
          {orderDetails.map((detail) => (
            <div
              className="order-item"
              key={detail._id}
              // style={{ border: "1px solid black" }}
            >
              <div className="order-item-image">
                <img src={detail.image} alt={detail.name} />
              </div>
              <div className="order-item-info">
                <h4>{detail.product_name}</h4>
                {/* <>{detail.</p> */}
                <p id="order-item-date">{diplayDate(detail.created_at)}</p>
                <p id="order-item-orderno">
                  Order no:
                  <br />
                  <span>{detail.order_id}</span>
                </p>
              </div>
              <div className="order-item-pickup">
                <h4>Pickup</h4>
                <p style={{ color: `${displayColor(detail.pickup_point)}` }}>
                  {detail.pickup_point}{" "}
                </p>
              </div>
              <div className="order-item-quanlity">
                <p>
                  Quantity: <span>{detail.sold_quantity}</span>
                </p>
              </div>
              <div className="order-item-status-balance">
                <button
                  id="order-item-status"
                  disabled
                  style={{
                    background: `${displayButtonColor(detail.selling_status)}`,
                  }}
                >
                  {displayStatus(detail.selling_status)}
                </button>

                <span id="coin">
                  <img src={Coin} alt="Metra Coin" />
                  {detail.sub_total ? detail.sub_total : 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
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
    </div>
  );
};
export default OrderHistory;
