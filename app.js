//dependencies
const mongoose = require('mongoose');
const express = require('express');
const exphbs =  require('express-handlebars');
const methodOverride = require("method-override");
const bodyParser = require('body-parser');

const app = express();

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));


//database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/contractor_project', { useNewUrlParser: true });

//routes
require('./controllers/posts')(app);
require('./controllers/comments')(app);

module.exports = (app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("It\'s Alive! c('.'c)")
})