'use strict';

describe('Service: tcFactory', function () {

  // load the service's module
  beforeEach(module('wwwApp'));

  // instantiate service
  var tcFactory;
  beforeEach(inject(function (_tcFactory_) {
    tcFactory = _tcFactory_;
  }));

  it('should do something', function () {
    expect(!!tcFactory).toBe(true);
  });

});
