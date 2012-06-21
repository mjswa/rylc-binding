(function (rylc) {

  var navigate = function (target) {
    $.mobile.changePage(target);
  };
  var controller = new rylc.ApplicationController(navigate);

  // ------------------------------------
  // LoginPage
  // ------------------------------------
  var loginPageSelector = "#loginPage";
  var loginButtonSelector = loginPageSelector + " .login";
  var usernameFieldSelector = loginPageSelector + " #loginPage_username";
  var passwordFieldSelector = loginPageSelector + " #loginPage_password";
  var doc = $(document);

  function updateLoginButtonEnabled() {
    var btn = $(loginButtonSelector);
    btn.attr('disabled', !controller.loginPossible());
    btn.button("refresh");
  }

  doc.delegate(loginPageSelector, "pagebeforeshow", function () {
    updateLoginButtonEnabled();
  });

  doc.delegate(usernameFieldSelector, "keyup change", function () {
    var field = $(usernameFieldSelector);
    controller.username = field.val();
    updateLoginButtonEnabled();
  });

  doc.delegate(passwordFieldSelector, "keyup change", function () {
    var field = $(passwordFieldSelector);
    controller.password = field.val();
    updateLoginButtonEnabled();
  });

  doc.delegate(loginButtonSelector, "click", function (e) {
    e.preventDefault();
    controller.login();
  });

  // ------------------------------------
  // WelcomePage
  // ------------------------------------
  var welcomePageSelector = "#welcomePage";
  var welcomeGreetingSelector = welcomePageSelector + " .greeting";
  doc.delegate(welcomePageSelector, "pagebeforeshow", function () {
    $(welcomeGreetingSelector).text("Hello " + controller.customer.name);
  });

  // ------------------------------------
  // RentalHistoryPage
  // ------------------------------------
  var rentalHistoryPageSelector = '#rentalHistoryPage';
  var customerNameSelector = rentalHistoryPageSelector + " .customer";
  doc.delegate(rentalHistoryPageSelector, "pagebeforeshow", function () {
    $(customerNameSelector).text(controller.customer && controller.customer.name);

    controller.searchRentals();
    var list = $("#rentalHistoryPage_list");
    list.html('');
    for (var i = 0; i < controller.rentals.length; i++) {
      var rental = controller.rentals[i];
      list.append('<li class="rental">' +
        '  <h4><span class="manufacturer">' + rental.car.manufacturer + '</span> <span class="description">' + rental.car.description + '</span></h4>' +
        '  <p><span class="startDate">' + formatDate(rental.hireStartDate) + '</span> - <span class="endDate">' + formatDate(rental.hireEndDate) + '</span></p>' +
        '  <p class="ui-li-aside">Total: <span class="totalPrice">€' + controller.totalPrice(rental) + '</span></p>' +
        '</li>');
    }
    list.listview('refresh');
  });

  function formatDate(date) {
    return formatNumber(date.getDate(), 2) + '.' + formatNumber((date.getMonth() + 1), 2) + '.' + date.getFullYear();
  }

  function formatNumber(n, leadingZeros) {
    var res = '' + n;
    while (res.length < leadingZeros) {
      res = '0' + res;
    }
    return res;
  }

})(window.rylc);