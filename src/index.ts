import express from 'express';
const app = express();

const ALLOWED_CITIES = ['Bangkok', 'Tokyo', 'Osaka', 'Chiba'];

app.get('/weather', (req, res) => {
  const city = req.query.city as string;
  
  // Validation: Check if city is provided
  if (!city) {
    return res.status(400).json({
      error: 'City parameter is required',
      allowedCities: ALLOWED_CITIES
    });
  }
  
  // Validation: Check if city is in allowed list (case-insensitive)
  const cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  if (!ALLOWED_CITIES.includes(cityCapitalized)) {
    return res.status(400).json({
      error: `City '${city}' is not supported`,
      allowedCities: ALLOWED_CITIES
    });
  }
  
  // Simulated data
  res.json({
    city: cityCapitalized,
    temp: Math.floor(Math.random() * 15) + 20 + "°C",
    condition: "Sunny",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Weather Data Service running on ${PORT}`));
