const queryResolvers = require("./queryResolvers");
const mutationResolvers = require("./mutationResolvers");
const blockchainResolvers = require("./blockchainResolvers");

module.exports = {
  ...queryResolvers,
  ...mutationResolvers,
  ...blockchainResolvers,
};
