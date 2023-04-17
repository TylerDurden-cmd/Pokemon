//pagina met willekeurigepokemon.
import express from "express";
const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {});

app.listen(app.get("port"), () => {
  console.log("[server]http://localhost:" + app.get("port"));
});
