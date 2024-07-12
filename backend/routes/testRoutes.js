const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const web3 = require("web3");
const Profile = require("../models/Profile");
const { isValidAddress } = require("web3-validator");

router.get("/test-account/:id/", async (req, res) => {
  try {
    const address = req.params.id;

    // 2. Check if the address has a code (indicates a smart contract)
    const code = await web3.eth.getCode(address);
    const isContract = code !== "0x"; // Empty code means it's an account

    // 3. Check the balance as before
    const balance = await web3.eth.getBalance(address);
    const balanceInEther = web3.utils.fromWei(balance, "ether");

    res.json({
      address,
      exists: true,
      isContract,
      balance: balanceInEther,
    });
  } catch (error) {
    console.error("Error testing Ganache account:", error);
    res.status(500).json({ error: "Error testing Ganache account" });
  }
});

router.get("/test-ganache-connection", async (req, res) => {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    res.send(`Connected to Ganache. Current block number: ${blockNumber}`);
  } catch (error) {
    console.error("Failed to connect to Ganache:", error);
    res.status(500).send("Failed to connect to Ganache");
  }
});

module.exports = router;
