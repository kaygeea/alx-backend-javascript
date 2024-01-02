/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
const sinon = require('sinon');
const expect = require('chai').expect;
const utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it("Stub the Utils.calculateNumber function", () => {
    const stub = sinon.stub(utils, "calculateNumber");
    const spy = sinon.spy(console, "log");

    stub.withArgs('SUM', 100, 20).returns(10);

    sendPaymentRequestToApi(100, 20);

    expect(stub.calledWith('SUM', 100, 20)).to.be.true;
    expect(spy.calledWith('The total is: 10')).to.be.true;
    
    stub.restore();
    spy.restore();
  });
});
