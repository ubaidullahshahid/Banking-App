var signUpContainer = document.querySelector(".signup-container");
// console.log("signUpContainer", signUpContainer);
var logInContainer = document.querySelector(".login-container");
// console.log("logInContainer", logInContainer);
var dashboard = document.querySelector(".dashboard-container");
// console.log("dashboard", dashboard);
var loginPasswordfield = document.querySelector("#login-password");
var loginEmailfield = document.querySelector("#login-email");
var signUpPasswordfield = document.querySelector("#signup-password");
var signUpEmailfield = document.querySelector("#signup-email");
var userInputValues = [];
var userLogIn = false;
var signUpLink = document
  .querySelector("#sign-up-link")
  .addEventListener("click", function (e) {
    e.preventDefault();
    logInContainer.style.display = "none";
    signUpContainer.style.display = "block";
  });

var logInLink = document
  .querySelector("#log-in-link")
  .addEventListener("click", function (e) {
    e.preventDefault();
    signUpContainer.style.display = "none";
    logInContainer.style.display = "block";
  });

var logOut = document
  .querySelector(".logOut")
  .addEventListener("click", function (e) {
    e.preventDefault();
    loginPasswordfield.value = null;
    loginEmailfield.value = null;
    signUpContainer.style.display = "none";
    dashboard.style.display = "none";
    logInContainer.style.display = "block";
  });
  // console.log(logOut);
  var userName = document.querySelector("#user-name");
  var setUserName = document.querySelector(".set-user-name");

signUpContainer.addEventListener("submit", function (e) {
  e.preventDefault();
  signUpPasswordfield.value;
  signUpEmailfield.value;
  userName.value;
  console.log("userName", userName.value);
  var signUpInputValues = [signUpPasswordfield.value, signUpEmailfield.value];
  // console.log("signup input values", signUpInputValues);
  var newUserInputValues = {
    email: signUpInputValues[1],
    password: signUpInputValues[0],
    amount: "0",
  };
  console.log("newUser", newUserInputValues);
  var signUpCheckUser;
  signUpCheckUser = userInputValues.find(function (user) {
    return user.email === signUpInputValues[1];
  });
  if (!signUpCheckUser) {
    userInputValues.push(newUserInputValues);
    // console.log("user input values", userInputValues);
    logInContainer.style.display = "block";
    signUpContainer.style.display = "none";
    // console.log("correct");
  } else {
    alert("you already have account");
    // console.log("wrong");
  }
});
logInContainer.addEventListener("submit", function (e) {
  e.preventDefault();
  if (userName) {
    console.log("done")
    setUserName.innerText = "Hi " + userName.value;
  }
  // console.log("setuserName", setUserName);
  loginPasswordfield.value;
  loginEmailfield.value;
  var loginInputValues = [loginPasswordfield.value, loginEmailfield.value];
  // console.log("loginInputValues", loginInputValues);
  if (loginInputValues[1]) {
    var checkUser;
    checkUser = userInputValues.find(function (user) {
      return user.email === loginInputValues[1];
    });
    // console.log(checkUser);
    if (checkUser) {
      if (checkUser.password === loginInputValues[0]) {
        userLogIn = true;
        if (userLogIn) {
          // console.log("condition true horhi h");
          logInContainer.style.display = "none";
          dashboard.style.display = "block";
          // console.log("correct1");
        }
      } else {
        // console.log("wrong");
        alert("Invalid email or password");
      }
    }
    if (!checkUser) {
      alert("First create your account and then login");
    }
  }
});
