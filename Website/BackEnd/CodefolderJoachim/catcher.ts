//dit is voor de catcher.
import express from "express";
const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.type("text/html");
  res.send("hallo");
});

app.listen(app.get("port"), () => {
  console.log("[server]http://localhost:3000" + app.get("port"));
});
