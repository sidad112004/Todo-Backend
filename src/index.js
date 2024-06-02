import dotenv from 'dotenv';
import { app } from './app.js';
import { connection } from './db/index.js';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config({
    path: './.env'
});



// Connect to the database
connection()
    .then(() => {
        // Start the server
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error in DB connection', error);
    });
