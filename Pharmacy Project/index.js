$(document).ready(function () {
  $("#btnLogin").click(function () {
    var userName = $("#txtUserName").val();
    var password = $("#txtPassword").val();

    if (userName && password && userName === password) {
      alert("Login successful");
      localStorage.setItem("User", userName);
      window.location.href = "order.html";
    } else {
      alert('Please enter valid credentials');
    }
  });
});
