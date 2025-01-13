const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express(); 
const router = express.Router(); // Router 

const users = [];
const posts = [];

// Middleware setup
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.use(express.json());
app.use(express.static('public')); 

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views'); 

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});



// Main Page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', users }); 
});

// Posts Page
app.get('/posts', (req, res) => {
    res.render('posts', { posts }); // Pass posts to the template
});

// Add a new user
router.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    const newUser = { id: users.length + 1, name, email, age };
    users.push(newUser);
    res.redirect('/'); // Redirect to homee
});

// Delete a user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id == id);
    if (index !== -1) users.splice(index, 1);
    res.redirect('/'); // Redirect to the main page
});

// Add a new post
router.post('/posts', (req, res) => {
    const { title, content, authorId } = req.body;
    const newPost = { id: posts.length + 1, title, content, authorId };
    posts.push(newPost);
    res.redirect('/posts'); // Redirect ......
});

app.use('/api', router);

        // Error Handling Middleware
                        app.use((err, req, res, next) => {
                            console.error(err.stack);
                            res.status(500).send('Something went wrong!');
               });

//  server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
