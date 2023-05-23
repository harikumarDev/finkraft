const app = require("./app");
const db = require("./config/db");
const routes = require("./routes");

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

db.connect();

app.use("/api", routes);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
