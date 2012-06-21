describe('ApplicationController', function () {
  var controller, $navigate;

  beforeEach(function () {
    $navigate = jasmine.createSpy('$navigate');
    controller = new rylc.ApplicationController($navigate);
  });

  it('should create new application controller', function () {
    expect(controller).not.toBeUndefined();
  });

  it('should have falsy username and password after create', function () {
    expect(controller.username).toBeFalsy();
    expect(controller.password).toBeFalsy();
  });

  it('should have an undefined customer after create', function () {
    expect(controller.customer).toBeUndefined();
  });

  it('should have undefined rentals after create', function () {
    expect(controller.rentals).toBeUndefined();
  });

  describe('loginPossible', function () {
    it('should return false when username or passwort is empty', function () {
      controller.username = "";
      controller.password = "";
      expect(controller.loginPossible()).toBeFalsy();
      controller.username = "someUsername";
      controller.password = "";
      expect(controller.loginPossible()).toBeFalsy();
      controller.username = "";
      controller.password = "somePassword";
      expect(controller.loginPossible()).toBeFalsy();
    });

    it('should return true when username and password is not empty', function () {
      controller.username = "someUsername";
      controller.password = "somePassword";
      expect(controller.loginPossible()).toBeTruthy();
    });
  });

  describe('login', function () {
    it('should navigate to the welcomePage', function () {
      controller.login();
      expect($navigate).toHaveBeenCalledWith("#welcomePage");
    });

    it('should set customer', function () {
      controller.username = "someUsername";
      controller.login();
      expect(controller.customer).toBeDefined();
      expect(controller.customer.name).toBe("someUsername");
    });
  });

  describe('totalPrice', function () {
    it('should calculate the total price for a given rental', function () {
      var rental = {
        car:{
          price:100
        },
        hireStartDate:new Date(2010, 0, 1),
        hireEndDate:new Date(2010, 0, 10)
      };
      expect(controller.totalPrice(rental)).toEqual(10 * 100);
    });
  });

  describe('searchRentals', function () {
    it('should navigate to the rentalPage2', function () {
      controller.searchRentals();
    });

    it('should define the rentals array', function () {
      controller.searchRentals();
      expect(controller.rentals).toBeDefined();
      expect(controller.rentals instanceof Array).toBeTruthy();
      expect(controller.rentals.length).toBeGreaterThan(0);
    });
  });

});