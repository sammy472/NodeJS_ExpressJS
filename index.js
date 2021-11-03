const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
var products = require('./products');
const nodemailer = require('nodemailer');
//app.use(require('body-parser')())
const formidable = require('formidable');
app.use(express.urlencoded());
// Setting template Engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
//use static middleware
app.use(express.static(path.join(__dirname, '/public')));
//set port number/logic
const PORT = process.env.PORT || 9000;
//home handler
app.get('/', (req, res) => {
    console.log(res.session, req.session)
    res.render('home', { products: products, id: '1' });
});
//about hanlder
app.get('/about', (req, res) => {
    res.render('about');
});
//form handler
app.get('/login', (req, res) => {
    res.render('login');
});
//search handler
app.get('/search', (req, res) => {
    console.log(req.query);
    if (req.query) {
        let name = req.query.name;
        let index = products.findIndex((product) => product.name === name);
        let page = products[index].page;
        let filteredProducts = products.filter((product) => product.page === page);
        console.log(filteredProducts, page);
        return res.render('search', { filteredProducts: filteredProducts });
    }

});
app.post('/login', (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = './uploads/';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
        if (err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/');
        /*var arrayOfFiles = files[""];
        if (arrayOfFiles.length > 0) {
            let fileNames = [];
            arrayOfFiles.forEach(eachfile => {
                fileNames.push(eachfile.path);
            });
            console.log(fileNames);
            res.redirect(303, '/');
        } else { res.redirect(303, '/404') };*/
    });
});
//contact handlers
/*
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.post('/contact', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const name = req.body.fullname;
    const message = req.body.message;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samuelboateng472@gmail.com',
            pass: 'Newtonian472'
        }
    });

    var mailOptions = {
        from: email,
        to: 'samuelboateng472@gmail.com',
        subject: name + 'Sending Email using Node.js',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        }
        console.log('Email sent.');
        res.render('/contact', { message: message });

    });
});*/
//download handler
app.get('/download', (req, res) => {
    res.download('./public/books/Web_Development_with_Node_Express', 'Web_Development_with_Node_Express', (err) => {
        if (err) res.redirect(303, '/');
    });
});
//try examples handler
app.get('/try', (req, res) => {
    let context = {
        currency: {
            name: 'United States dollars',
            abbrev: 'USD',
        },
        tours: [
            { name: 'Hood River', price: '$99.95' },
            { name: 'Oregon Coast', price: '$159.95' }
        ],
        specialsUrl: '/january-specials',
        currencies: ['USD', 'GBP', 'BTC'],
    }
    res.render('try', { context: context });
});
app.get('/try/:id/search/:ID', (req, res) => {
    console.log(req.params);
    res.render('try');
});


// 404 catch-all handler (middleware)
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use((err, req, res, next) => {
    res.status(500);
    res.redirect(303, '/');
});
//activate the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

});