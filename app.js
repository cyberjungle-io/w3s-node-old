const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { connectToServer } = require('./config/db');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => res.send('Cyber Jungle W3S'));

// Uncomment these lines to include routes from different modules
 app.use('/data', require('./modules/data/data.routes'));
 app.use('/hosts', require('./modules/hosts/hosts.routes'));

// Connect to MongoDB and start the server
connectToServer().then(() => {
    const PORT = process.env.PORT || 8002;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit process with error
});
