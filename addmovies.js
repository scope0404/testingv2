const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("movies.db");

const movies = [
    ["Interstellar", "movie", "Sci-Fi", 169, "live-action", 8.6, "Prime Video"],
    ["Inception", "movie", "Sci-Fi", 148, "live-action", 8.8, "Netflix"],
    ["50 first dates", "movie", "Rom-com", 112, "live-action", 8.4, "Netflix"],
    ["Dead poets society", "movie", "Fantasy", 125, "live-action", 8.6, "Netflix"],
    ["The Dark Knight", "movie", "Action", 152, "live-action", 9.0, "Binge"],
    ["Arcane", "tv", "Fantasy", 40, "animated", 9.0, "Netflix"],
    ["Stranger Things", "tv", "Sci-Fi", 50, "live-action", 8.7, "Netflix"],
    ["invincible", "tv", "Action", 25, "animated", 9.1, "Prime Video"],
    ["Wall-E", "movie", "Family", 98, "animated", 8.4, "Disney+"],
    ["Avatar", "movie", "Sci-Fi", 162, "CGI", 7.8, "Disney+"]
];


db.run('DELETE FROM MOVIES;');
movies.forEach(movie => {
    db.run(
        `INSERT INTO movies (title, type, genre, duration, art_style, rating, platform)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        movie
    );
});

console.log("10 movies added!");
db.close();

/*const getRecommendations = (userInput) => {
    return new Promise((resolve, reject) => {
        const { genre, style, format } = userInput;
        const query = `
            SELECT * FROM movies 
            WHERE genre = ? AND art_style = ? AND type = ?
        `;
        db.all(query, [genre, style, format], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};*/

function getRecommendations(filters) {
    console.log("getRecommendations called with:", filters);

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database("movies.db");

        const query = `
            SELECT * FROM movies
            WHERE genre = ?
              AND art_style = ?
              AND type = ?
        `;

        const params = [
            filters.genre,
            filters.style,
            filters.format
        ];

        console.log(" SQL params:", params);

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error(" SQL ERROR:", err);
                reject(err);
                return;
            }

            console.log(" SQL rows:", rows);
            resolve(rows);
        });
    });
}


module.exports = { getRecommendations };