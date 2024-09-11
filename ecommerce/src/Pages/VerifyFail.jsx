import { useLocation } from "react-router-dom";

const Resend = () => {
  const location = useLocation(); // to get path info
  console.log(location);
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);
  const email = queryParams.get("email");
  const emailObj = { email };
  console.log(emailObj);
  const message = queryParams.get("message");

  // console.log(`email: ${email}`);
  // console.log(`message ${message}`);
  const handleClick = async () => {
    console.log("sending");
    const response = await fetch(
      "http://127.0.0.1:3000/api/auth/register/resend",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailObj),
      }
    );
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <h1>Verification Failed</h1>
      <p>Please click resend and try again!</p>
      <p>email: {email}</p>
      <button onClick={handleClick}>RESEND</button>
    </div>
  );
};
export default Resend;
