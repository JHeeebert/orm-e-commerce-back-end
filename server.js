// Purpose: Main entry point for the application
const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
// import sequelize connection
const app = express();
const PORT = process.env.PORT || 3001;
// Tells the server to use the routes we imported
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.log(err);
  }
  );

module.exports = app;

