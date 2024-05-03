// re-usable variables

var userInputValues = JSON.parse(localStorage.getItem("userData")) || [];
var dashboard = document.querySelector(".dashboard-container");
var userName = document.querySelector("#user-name");
var setUserName = document.querySelector(".set-user-name");
var currentUserIndex = 0;

// signup Link variable and onclick function

var signUpLink = document
  .querySelector("#sign-up-link")
  .addEventListener("click", function (e) {
    e.preventDefault();
    logInContainer.style.display = "none";
    signUpContainer.style.display = "block";
  });

// logIn Link variable and on onclick function

var logInLink = document
  .querySelector("#log-in-link")
  .addEventListener("click", function (e) {
    e.preventDefault();
    signUpContainer.style.display = "none";
    logInContainer.style.display = "block";
  });

// signup variables

var signUpContainer = document.querySelector(".signup-container");
var signUpPasswordfield = document.querySelector("#signup-password");
var signUpEmailfield = document.querySelector("#signup-email");

// signup Function

signUpContainer.addEventListener("submit", function (e) {
  e.preventDefault();
  signUpPasswordfield.value;
  signUpEmailfield.value;
  userName.value;
  // console.log("userName", userName.value);
  var signUpInputValues = [signUpPasswordfield.value, signUpEmailfield.value];
  var newUserInputValues = {
    email: signUpInputValues[1],
    password: signUpInputValues[0],
    amount: 0,
    userName: userName.value,
  };
  var signUpCheckUser;
  signUpCheckUser = userInputValues.find(function (user) {
    return user.email === signUpInputValues[1];
  });
  // console.log("signUpCheckUser", signUpCheckUser);

  if (!signUpCheckUser) {
    userInputValues.push(newUserInputValues);
    logInContainer.style.display = "block";
    signUpContainer.style.display = "none";
  } else {
    alert("you already have account");
  }
  localStorage.setItem("userData", JSON.stringify(userInputValues));
});

// login variables

var logInContainer = document.querySelector(".login-container");
var loginPasswordfield = document.querySelector("#login-password");
var loginEmailfield = document.querySelector("#login-email");
var userLogIn = false;

// login Function

logInContainer.addEventListener("submit", function (e) {
  e.preventDefault();
  deposit.value = null;
  loginPasswordfield.value;
  loginEmailfield.value;
  var loginInputValues = [loginPasswordfield.value, loginEmailfield.value];
  if (loginInputValues[1]) {
    currentUserIndex = userInputValues.findIndex(function (user) {
      return user.email === loginInputValues[1];
    });
    // console.log("currentUserIndex", currentUserIndex);
    var checkUser = userInputValues[currentUserIndex];
    if (checkUser) {
      if (checkUser.password === loginInputValues[0]) {
        userLogIn = true;
        if (userLogIn) {
          logInContainer.style.display = "none";
          dashboard.style.display = "block";
          document.getElementById("current-amount").innerText =
            checkUser.amount + "RS";
          setUserName.innerText = "Hi " + checkUser.userName;
        }
      } else {
        alert("Invalid email or password");
      }
    }
    if (!checkUser) {
      alert("You Don't have account");
    }
  }
});

// deposit variables

var deposit = document.querySelector("#deposit");
var depositButton = document.querySelector("#deposit-button");

// deposit Function

depositButton.addEventListener("click", function () {
  var inputValue = +deposit.value;
  if (inputValue > 0) {
    userInputValues[currentUserIndex].amount += inputValue;
    localStorage.setItem("userData", JSON.stringify(userInputValues));
    document.getElementById("current-amount").innerText =
      userInputValues[currentUserIndex].amount + "RS";
    deposit.value = null;
    alert("you have deposited " + inputValue + "RS");
  } else {
    alert("Please enter a valid amount.");
  }
});

// withdraw variables

var withDraw = document.querySelector("#withdraw");
var withDrawButton = document.querySelector("#withdraw-button");

// withdraw Function

withDrawButton.addEventListener("click", function () {
  var inputValue = +withDraw.value;
  var currentUser = userInputValues[currentUserIndex];
  if (inputValue > 0 && inputValue <= currentUser.amount) {
    currentUser.amount -= inputValue;
    localStorage.setItem("userData", JSON.stringify(userInputValues));
    document.getElementById("current-amount").innerText =
      currentUser.amount + "RS";
    withDraw.value = null;
    alert("you have withdrawn " + inputValue + "RS");
  } else {
    alert("You Don't have  enough amount to withdraw");
  }
});

// logOut variable and on click function

var logOut = document
  .querySelector(".logOut")
  .addEventListener("click", function (e) {
    e.preventDefault();
    loginPasswordfield.value = null;
    loginEmailfield.value = null;
    signUpPasswordfield.value = null;
    signUpEmailfield.value = null;
    signUpContainer.style.display = "none";
    dashboard.style.display = "none";
    logInContainer.style.display = "block";
  });
