// Create web server

// Import modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();

// Set port
const port = 3000;

// Set path to static files
app.use(express.static(path.join(__dirname, 'public')));

// Set path to views
app.set('views', path.join(__dirname, 'views'));

// Set view engine
app.set('view engine', 'ejs');

// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Get comments
app.get('/comments', (req, res) => {
    // Read comments from comments.json
    fs.readFile('comments.json', 'utf8', (err, data) => {
        // If error, log error
        if (err) {
            console.log('Error: ', err);
        } else {
            // Parse data
            const comments = JSON.parse(data);

            // Render comments
            res.render('comments', {
                title: 'Comments',
                comments: comments
            });
        }
    });
});

// Post comments
app.post('/comments', (req, res) => {
    // Read comments from comments.json
    fs.readFile('comments.json', 'utf8', (err, data) => {
        // If error, log error
        if (err) {
            console.log('Error: ', err);
        } else {
            // Parse data
            const comments = JSON.parse(data);

            // Add new comment to comments array
            comments.push(req.body);

            // Write comments to comments.json
            fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                // If error, log error
                if (err) {
                    console.log('Error: ', err);
                } else {
                    // Redirect to comments
                    res.redirect('/comments');
                }
            });
        }
    });
});

// Start web server
app.listen(port, () => {
    console.log(`Web server started on port ${port}`);
});