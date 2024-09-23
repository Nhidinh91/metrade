import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const STATUS_LIST = ["processing", "await-pickup", "delivered", "cancelled"];
const PICKUP_LIST = ["Myllypuro", "Karamalmi", "Myyrmäki"];

const displayStatus = (str) => {
  let result = str.trim().split("-");
  result = result.map((e) => e.charAt(0).toUpperCase() + e.slice(1));
  result = result.join(" ");
  return result;
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

  //   console.log(useAuthContext());

  // /api/user/profile/detail/66ede2bc236b34ad58e35567/orders?pickup=Myllypuro
  // /api/user/profile/detail/66ede2bc236b34ad58e35567/orders?pickup=Myllypuuro
  useEffect(() => {
    setOrderDetails((od) => []);
    // console.log(user);
    let isMounted = true;
    const fetchOrderDetails = async () => {
      setLoading((l) => true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/profile/detail/${
            user._id
          }/orders${convertToQueryString(queryStrArr)}`,
          {
            method: "GET",
            headers: {},
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data && isMounted) {
            setOrderDetails((od) => [...od, ...data.data.orderDetailList]);
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
    // setUserId((u) => user.id);
  }, [user, queryStrArr]);

  useEffect(() => {
    // let updatedQryStr = "";
    // let isFilter = false;
    console.log("updating picking ");
    const updateQueryStringArray = () => {
      setqueryStrArr((qtr) => {
        let newQueryStrArr = qtr.filter(
          (param) => !param.includes("pickup") && !param.includes("status")
        );
        if (pickUpPlace) {
          newQueryStrArr.push(`pickup=${pickUpPlace}`);
        }
        if (status) {
          newQueryStrArr.push(`status=${status}`);
        }
        console.log(newQueryStrArr);
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
  };

  const handlePickUp = (e) => {
    setPickUpPlace((p) => e.target.value);
  };
  const handleStatus = (e) => {
    setStatus((s) => e.target.value);
  };

  const handleId = (e) => {
    // console.log(e.target.value);
    setId((i) => e.target.value);
    console.log(id);
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

  return (
    <div className="order-history-container">
      <h2>Filter</h2>
      <div className="filter-container">
        <div className="filter-item">
          <button type="click" onClick={displayAll}>
            All
          </button>
        </div>
        <div className="filter-item">
          <label htmlFor="pickup" className="order-item-label">
            Order number
          </label>
          <input
            type="text"
            name="pickup"
            className="order-item-input"
            value={id}
            onChange={handleId}
            onKeyUp={handleKeyPress}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
        <div className="filter-item">
          <label htmlFor="pickup" className="order-item-label">
            Pickup Location
          </label>
          <select
            name="pickup"
            id="pickup"
            value={pickUpPlace}
            onChange={(e) => handlePickUp(e)}
          >
            <option value="" disabled>
              Select...
            </option>
            {PICKUP_LIST.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="status" className="order-item-label">
            Order Status
          </label>
          <select
            name="status"
            id="pickup"
            value={status}
            onChange={(e) => handleStatus(e)}
          >
            <option value="" disabled>
              Select...
            </option>
            {STATUS_LIST.map((status, index) => (
              <option key={index} value={status}>
                {displayStatus(status)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="orders-container">
        {orderDetails.map((detail) => (
          <div
            className="order-item"
            key={detail._id}
            style={{ border: "1px solid black" }}
          >
            <p>{detail.order_id}</p>
            <p>{detail.product_name}</p>
            <p>{detail.sold_quantity}</p>
            <p>{detail.pickup_point}</p>
            <p>{displayStatus(detail.selling_status)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderHistory;
