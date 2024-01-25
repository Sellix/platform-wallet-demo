import express from "express"
import "dotenv/config"
import axios from "axios"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const SELLIX_BASE_URL = "https://dev.sellix.io/v1"

const axiosInstance = axios.create({
  baseURL: SELLIX_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.SELLIX_API_KEY}`,
  }
})

const users = []

app.post("/createMerchant", async(req, res) => {
  const sellixRes = await axiosInstance.post("/wallet/merchant", {
    email: req.body.email,
    name: req.body.name,
    custom_fields: req.body.custom_fields ?? null
  })
  if (sellixRes.data.status !== 200) {
    res.statusCode = sellixRes.data.status
    res.json(sellixRes.data)
  } else {
    users.push(sellixRes.data.data.merchant)
    res.statusCode = 200
    res.json(sellixRes.data.data.merchant)
  }
})

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(9999, () => {
  console.log("Server is listening on port 9999")
})
