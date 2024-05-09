// re-usable variables
var deposit;
var withDraw;
var userInputValues = JSON.parse(localStorage.getItem("userData")) || [];
var currentUserIndex = 0;
document.addEventListener("DOMContentLoaded", function (e) {
  withDraw = document.querySelector("#withdraw");
  deposit = document.querySelector("#deposit");
  var setUserName = document.querySelector("#set-userName");
  var checkUserName = localStorage.getItem("userName");
  console.log("CheckUsername", checkUserName);
  setUserName.innerText = "Hi " + checkUserName;
  var currentAmount = document.querySelector("#current-amount");
  var checkUserCurrentAmount = localStorage.getItem("userAmount");
  currentAmount.innerText = checkUserCurrentAmount + "Rs";
  var checkLogIn = JSON.parse(localStorage.getItem("userLogin"));
  console.log("checkLogIn", checkLogIn);
  if (checkLogIn) {
    window.location.href("/");
  } else {
    window.location.replace("/Components/Log-in-user/login.html");
  }
});

var signUpPasswordfield = document.querySelector("#signup-password");
var signUpEmailfield = document.querySelector("#signup-email");
var userName = document.querySelector("#user-name");

// signup Function

function signUp() {
  userName.value;
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
  if (!signUpCheckUser) {
    userInputValues.push(newUserInputValues);
    window.location.href = "/Components/Log-in-user/login.html";
  } else {
    alert("you already have account");
  }
  localStorage.setItem("userData", JSON.stringify(userInputValues));
}

// login variables

var loginPasswordfield = document.querySelector("#login-password");
var loginEmailfield = document.querySelector("#login-email");
var userLogIn = false;

// login Function
function logIn() {
  var loginInputValues = [loginPasswordfield.value, loginEmailfield.value];
  if (loginInputValues[1]) {
    currentUserIndex = userInputValues.findIndex(function (user) {
      return user.email === loginInputValues[1];
    });
    var checkUser = userInputValues[currentUserIndex];
    if (checkUser) {
      if (checkUser.password === loginInputValues[0]) {
        userLogIn = true;
        if (userLogIn) {
          localStorage.setItem("userName", checkUser.userName);
          localStorage.setItem("userAmount", checkUser.amount);
          localStorage.setItem("userLogin", JSON.stringify(userLogIn));
          window.location.href = "/";
        }
      } else {
        alert("Invalid email or password");
      }
    }
    if (!checkUser) {
      alert("You Don't have account");
    }
  }
}
// deposit Function

function handleDeposit() {
  var inputValue = +deposit.value;
  if (inputValue > 0) {
    userInputValues[currentUserIndex].amount += inputValue;
    localStorage.setItem("userData", JSON.stringify(userInputValues));
    localStorage.setItem(
      "userAmount",
      userInputValues[currentUserIndex].amount
    );
    document.getElementById("current-amount").innerText =
      userInputValues[currentUserIndex].amount + "RS";
    deposit.value = null;
    alert("you have deposited " + inputValue + "RS");
  } else {
    alert("Please enter a valid amount.");
  }
}

// withdraw Function

function withdraw() {
  var inputValue = +withDraw.value;
  var currentUser = userInputValues[currentUserIndex];
  if (inputValue > 0 && inputValue <= currentUser.amount) {
    currentUser.amount -= inputValue;
    localStorage.setItem("userData", JSON.stringify(userInputValues));
    localStorage.setItem(
      "userAmount",
      userInputValues[currentUserIndex].amount
    );
    document.getElementById("current-amount").innerText =
      currentUser.amount + "RS";
    withDraw.value = null;
    alert("you have withdrawn " + inputValue + "RS");
  } else {
    alert("You Don't have  enough amount to withdraw");
  }
}

function logOut() {
  // localStorage.removeItem("userName");
  // localStorage.removeItem("userAmount");
  // console.log(userLogIn)
  checkLogIn = JSON.parse(localStorage.getItem("userLogin"));
  if (checkLogIn) {
    userLogIn = false;
    localStorage.setItem("userLogin", JSON.stringify(userLogIn));
    window.location.href = "/Components/Log-in-user/login.html";
  }
  // window.location.href = "/Components/Log-in-user/login.html";
}
