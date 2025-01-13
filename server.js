const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./routes/api');
const items = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
];


app.use('/api', apiRoutes);


app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});




// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs'); // engikne

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', items});
});


// server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
