import express from "express";
import { client } from "@repo/db";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi there");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await client.user.create({
    data: {
      email: email,
      password: password,
    },
  });
  res.json({
    message: "Signup successful",
    id: user.id,
  });
});

app.listen(3002);
