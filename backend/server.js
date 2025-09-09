const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/weather", async (req, res) => {
  const city = encodeURIComponent(req.query.city);
  if (!city) return res.json({ error: "City required" });

  try {
    const apiKey = "f1214e5b82123aa806b1c6463832e48a"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.json({ error: "City not found" });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
