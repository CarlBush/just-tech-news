const express = require("express");
const routes = require("./controllers/");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;



//Creates an express session to our sequelize database
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);



// force = if true it would drop and recreate all databses tables on startup
sequelize.sync({ force: false }).then (() => {
    app.listen(PORT, () => console.log ("Now listening"))
});