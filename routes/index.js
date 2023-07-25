// Initiate the router
const router = require('express').Router();
const apiRoutes = require('./api');
// Define the path for the API routes
router.use('/api', apiRoutes);
// Define the path for the home page
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});
// Export the router
module.exports = router;