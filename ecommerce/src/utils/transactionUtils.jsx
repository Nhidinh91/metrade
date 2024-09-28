import moment from "moment";

export const displayButtonColor = (str) => {
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
      return "#3f9c36";
    case "Karamalmi":
      return "#b43f3f";
    case "Myyrmäki":
      return "#f37c25";
  }
};

export const diplayDate = (dateStr) => {
  const date = moment(dateStr).format("DD-MM-YYYY");
  // console.log(date);
  return `${date}`;
};

export const convertToQueryString = (qrArr) => {
  let result = "";
  if (qrArr.length > 0) {
    result = "?" + qrArr.join("&");
  }
  return result;
};