const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const axios = require("axios");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/process-local-payment", async (req, res) => {
  const { price, phone } = req.body;
  try {
    const body = {
      schemaVersion: "1.0",
      requestId: "10111331033",
      timestamp: 1590587436057686,
      channelName: "WEB",
      serviceName: "API_PURCHASE",
      serviceParams: {
        merchantUid: process.env.MERCHANT_U_ID,
        apiUserId: process.env.MERCHANT_API_USER_ID,
        apiKey: process.env.MERCHANT_API_KEY,
        paymentMethod: "mwallet_account",
        payerInfo: {
          accountNo: phone,
        },
        transactionInfo: {
          referenceId: "12334",
          invoiceId: "7896504",
          amount: price,
          currency: "USD",
          description: "the description goes here...",
        },
      },
    };
    // responseMsg:
    const response = await axios.post(process.env.MERCHANT_API_END_POINT, body);
    res.json(response.data);
  } catch (err) {
    console.log("hormuud error", err);
    return res.status(400).send(`Error try Again... ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
