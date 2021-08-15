const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const qsg = require('./qsg');
const cors = require('cors')
const app = express();

// Allow cross-origin
app.use(cors());

app.set('views', path.join(__dirname, 'views'));

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Generate QSG Data
const products = qsg.generateData();

// Home Page Route
app.get('/', (req, res) =>
    res.render('index', {
        title: 'QSG App',
        products
    }
));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'assets')));

// JSON Data API Routes
app.use('/assets', express.static('assets'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

