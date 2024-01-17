import http from "http";
import app from "./providers/app";
import { config } from "dotenv";
config();

const server = http.createServer(app);
const { PORT, HOST } = process.env;
server.listen(PORT, () => {
  console.log(`Service Api run: ${HOST} : ${PORT}`);
});
