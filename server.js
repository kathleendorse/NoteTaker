// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle body/data parsing, static and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

//WHEN THE 2 BELOW ARE ACTIVE- APP CRASHES
// app.use("/api", apiRoutes);
//app.use("/", htmlRoutes);


// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

const apiRoutes = require("./routes/apiRoutes")(app);
const htmlRoutes = require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

//Start the server on the port
app.listen(PORT, () => console.log("Listening on PORT: " + PORT));
  



//****EVERYTHING IN THIS FILE WORKS