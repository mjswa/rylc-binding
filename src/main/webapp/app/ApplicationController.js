(function (rylc) {

  function ApplicationController(navigate) {
    this.username = "";
    this.password = "";

    this.login = function () {
      this.customer = {
        name:this.username
      };
      navigate("#welcomePage");
    };

    this.loginPossible = function () {
      return this.username && this.password;
    };

    this.searchRentals = function () {
      this.rentals = [
        {"car":{"description":"Meriva", "id":988, "manufacturer":"Opel", "price":25.24}, "hireEndDate":new Date(2011, 10, 07), "hireStartDate":new Date(2011, 10, 07), "id":178},
        {"car":{"description":"Golf", "id":995, "manufacturer":"VW", "price":80.00}, "hireEndDate":new Date(2011, 10, 07), "hireStartDate":new Date(2011, 10, 07), "id":179},
        {"car":{"description":"Golf", "id":1008, "manufacturer":"VW", "price":100.00}, "hireEndDate":new Date(2011, 10, 07), "hireStartDate":new Date(2011, 10, 07), "id":180}
      ];
    };

    this.totalPrice = function (rental) {
      return rental.car.price * (1 + (rental.hireEndDate - rental.hireStartDate) / 1000 / 60 / 60 / 24);
    };
  }

  rylc.ApplicationController = ApplicationController;

})(window.rylc);
