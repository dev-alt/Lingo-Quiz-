var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var { ruruHTML } = require("ruru/server")
const { default: mongoose } = require("mongoose")
const userRoutes = require('./routes/userRoutes')
const quizRoutes = require('./routes/quizRoutes')
const Web3 = require('web3').Web3;
const web3 = new Web3('http://localhost:8545'); // Assuming Ganache is running locally on port 8545


var app = express()

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CryptoQuiz', {

})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

app.use('/api/users/', userRoutes);
app.get('/test-ganache-connection', async (req, res) => {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    res.send(`Connected to Ganache. Current block number: ${blockNumber}`);
  } catch (error) {
    console.error('Failed to connect to Ganache:', error);
    res.status(500).send('Failed to connect to Ganache');
  }
});

 

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")