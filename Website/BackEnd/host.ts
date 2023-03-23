import express from "express";

const app = express();

app.set("port", 3000);

app.get("/", (req, res) => {
  res.type("text/html");
  res.send("homepage ");
});

app.get("/compare", (req, res) => {
  res.type("text/html");
  res.send("compare pokemon");
});

app.get("/catch", (req, res) => {
  res.type("text/html");
  res.send(" catch pokemon");
});

app.get("/pokedex", (req, res) => {
  res.type("text/html");
  res.send("pokdex ");
});

app.get("/battler", (req, res) => {
  res.type("text/html");
  res.send("battle");
});

app.get("/guesser", (req, res) => {
  res.type("text/html");
  res.send("who is that pokemon ");
});

app.listen(app.get("port"), () =>
  console.log("[Pichu Partners] http://localhost:" + app.get("port"))
);
