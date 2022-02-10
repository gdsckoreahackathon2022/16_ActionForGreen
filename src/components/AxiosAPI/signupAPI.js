import axios from "axios";

/*
const json = JSON.stringify({
    
    email: "testkkk@abc.com",
    password: "test@1234",
    returnSecureToken: true
});
*/

function signupAPI(props) {
  let email = props.email;
  let password = props.password;
  let hasLoginFailed = true;

  let json = JSON.stringify({
    email: email,
    password: password,
    returnSecureToken: true
  });

  console.log(json);

  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAr7uawUtRkM5YzG7w1W3nI96SYluf0gXQ",
      json,
      { headers: { "Content-Type": "application/json" } }
    )
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        hasLoginFailed = false;
        return;
      }
    })
    .catch(function (error) {
      console.log(error);
      return true;
    });

  return hasLoginFailed;
}

export default signupAPI;
