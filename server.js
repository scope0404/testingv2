const express = require('express');
const cors = require('cors');
const { getRecommendations } = require('./addmovies'); 
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Recommendation server is running!');
});

app.post('/recommend', async (req, res) => {
    console.log("✅ /recommend endpoint hit");
    console.log("📦 Request body:", req.body);
    const userInput = req.body; // { genre, style, format }

    try {
        const recommendations = await getRecommendations(userInput);
        console.log("🎬 Recommendations:", recommendations);
        res.json({ recommendations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
