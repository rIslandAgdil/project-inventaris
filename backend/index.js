require("dotenv").config();
const express = require("express");
const cors = require("cors");

const loginRouter = require("./routers/loginRouters");
const barangRoutes = require("./routers/barangRouters");
const ruanganRoutes = require("./routers/ruanganRouters");
const PORT = process.env.PORT;

// const whitelist = process.env.CORS_ORIGIN_ALLOW.split(",");

// // Konfigurasi opsi CORS
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Jika request tidak punya origin (misalnya curl/postman) atau origin ada dalam whitelist → izinkan
//     if (!origin || whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       // Jika origin tidak ada dalam daftar → tolak dengan error
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200, // Untuk memastikan response preflight OPTIONS sukses di browser lama
// };

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", loginRouter);
app.use("/barang", barangRoutes);
app.use("/ruangan", ruanganRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
