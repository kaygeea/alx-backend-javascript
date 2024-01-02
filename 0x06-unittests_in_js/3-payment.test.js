/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
const sinon = require('sinon');
const expect = require('chai').expect;
const utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it("Spy the usage of the Utils function", () => {
    const spy = sinon.spy(utils, "calculateNumber");

    sendPaymentRequestToApi(100, 20);

    expect(spy.called).to.be.true;

    spy.restore();
  });
});
