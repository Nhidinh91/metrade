import moment from "moment";

export const displaySellingStatusColor = (str) => {
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

export const displayPickupColor = (str) => {
  // console.log(str);
  switch (str) {
    case "Myllypuro":
      return "#ee0017";
    case "Karamalmi":
      return "#e67300";
    case "Myyrmäki":
      return "#009e54";
  }
};

export const diplayDate = (dateStr) => {
  const date = moment(dateStr).format("DD-MM-YYYY");
  return `${date}`;
};

export const convertToQueryString = (qrArr) => {
  let result = "";
  if (qrArr.length > 0) {
    result = "?" + qrArr.join("&");
  }
  return result;
};

export const findTotalPage = (total, limit) => {
  return Math.ceil(total / limit);
};

export const capitalizeStatusStr = (str) => {
  let result = str.trim().split("-");
  result = result.map((e) => e.charAt(0).toUpperCase() + e.slice(1));
  result = result.join(" ");
  return result;
};
