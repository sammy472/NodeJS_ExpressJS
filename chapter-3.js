const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

// Setting template Engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
//set port number/logic
const PORT = process.env.PORT || 5000;
//home handler
app.get('/', (req, res) => {
    res.render('home');
});
//about hanlder
app.get('/about', (req, res) => {
    res.render('about');
});
// 404 catch-all handler (middleware)
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
//activate the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

});