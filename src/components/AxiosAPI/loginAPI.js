import axios from "axios";

async function loginAPI(props) {
  let email = props.email;
  let password = props.password;
  let json = {
    email: email,
    password: password,
    returnSecureToken: true
  };

  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAr7uawUtRkM5YzG7w1W3nI96SYluf0gXQ",
      json,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("response", response);
    window.sessionStorage.setItem("idToken", response.data.idToken);
    console.log("idtoken", window.sessionStorage.getItem("idToken"));
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export default loginAPI;
