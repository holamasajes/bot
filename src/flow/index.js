// const flowOrder = require("./order/flow");
const flowRegister = require("./register/flow");
const flowThanks = require("./thank/flow");
const flowWelcome = require("./welcome/flow");

const flow = [flowWelcome, flowThanks, flowRegister];


module.exports = flow;
