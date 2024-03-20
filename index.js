const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const conn = require("./config/connect.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const router = require("./routes/router.js");
const crypto = require('crypto');
dotenv.config();
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret key:', secretKey);
const app = express();

const sessionStore = new SequelizeStore({
  db: conn,
});

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5000'
}));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
