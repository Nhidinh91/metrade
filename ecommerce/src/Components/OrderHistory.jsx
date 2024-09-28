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
import {
  displayButtonColor,
  displayPickupColor,
  diplayDate,
  convertToQueryString,
} from "../utils/transactionUtils";

const STATUS_LIST = ["processing", "await-pickup", "delivered", "cancelled"];
const PICKUP_LIST = ["Myllypuro", "Karamalmi", "Myyrmäki"];

const displayStatus = (str) => {
  let result = str.trim().split("-");
  result = result.map((e) => e.charAt(0).toUpperCase() + e.slice(1));
  result = result.join(" ");
  return result;
};

const OrderHistory = () => {
  const { user, updateUser, scheduleTokenRenewal } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [queryStrArr, setqueryStrArr] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [pickUpPlace, setPickUpPlace] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setOrderItems((od) => []);

    let isMounted = true;
    const fetchOrderItems = async () => {
      if (!user) {
        return;
      }
      // console.log("fetch detail", queryStrArr);
      try {
        setLoading((l) => true);
        console.log("Start fetching order details");
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
          const { totalOrder, limit, orderItemList } = orderData.data;
          console.log(orderItemList);
          if (orderData && isMounted) {
            setOrderItems((od) => [...od, ...orderItemList]);
            setTotalPages((tp) => Math.ceil(totalOrder / limit));
          }
        } else {
          setTotalPages((tp) => 0);
          // setPage(tp)
        }
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
    return () => {
      isMounted = false;
    };
  }, [queryStrArr]);

  useEffect(() => {
    if (user && user.token_expired_at) {
      scheduleTokenRenewal(user.token_expired_at);
    }
  }, [user, scheduleTokenRenewal]);

  useEffect(() => {
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
          setPage((p) => 1);
        }
        if (status) {
          newQueryStrArr.push(`status=${status}`);
          setPage((p) => 1);
        }
        // if (page) {
        //   newQueryStrArr.push(`page=${page}`);
        // }
        return newQueryStrArr;
      });
    };
    updateQueryStringArray();
  }, [pickUpPlace, status]);

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
      let updatedQueryStrArr = qtr.filter(
        (param) => !param.includes("id") && !param.includes("page")
      );
      if (id) {
        updatedQueryStrArr.push(`id=${id}`);
        setPage((p) => 1);
      }
      // console.log(updateQueryStringArrayWithId);
      return updatedQueryStrArr;
    });
  };

  const updateQueryStringArrayWithPage = (pageNumber) => {
    // setPage
    setPage((p) => pageNumber);
    setqueryStrArr((qtr) => {
      let updatedQueryStrArr = qtr.filter((param) => !param.includes("page"));
      if (page) {
        updatedQueryStrArr.push(`page=${pageNumber}`);
      }
      console.log(updatedQueryStrArr);
      // console.log(updateQueryStringArrayWithId);
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
    // console.log(pageNumber);
    // setPage((p) => pageNumber);
    // setPage(pageNumber);
    // e.preventDefault();
    updateQueryStringArrayWithPage(pageNumber);
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
        <div className="spinner-border spinner-order" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : totalPages == 0 ? (
        <div>
          <p>Cannot find any order.</p>
        </div>
      ) : (
        <div className="orders-container">
          {orderItems.map((detail) => (
            <div className="order-item" key={detail._id}>
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
                <p
                  style={{
                    color: `${displayPickupColor(detail.pickup_point)}`,
                  }}
                >
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
