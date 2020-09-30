// ===============================================================================
// LOAD DATA
// We are linking our routes to the db.json file in the db subdirectory for the backend.
//`db.json` file on the backend- contains an array that will be used to store and retrieve notes using the `fs` module.
// ===============================================================================

// The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.
//retrieve = get
//store = post
let noteDB = require("../db/db.json");
const fs = require("fs");
var path = require("path");
var datapath = path.join(__dirname, "../db/db.json");

module.exports = function(app) {
  // API GET Requests


    //* GET `/api/notes` - Should read the `db.json` 
    //file and return all saved notes as JSON.        
    app.get("/api/notes", function(req, res) {
      fs.readFile(datapath, function(err, data){  ///THIS FUCKING WORKS!!!
        if (err) throw err;
        res.json(noteDB);

      });
   
      
    });

    //* POST `/api/notes` -  
    //add it to the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", function(req, res) {
      var newnote = req.body;
      noteDB.push(newnote);
      var newArr = noteDB.map(v=>Object.assign(v, {id: noteDB.indexOf(v)})); //works
      var ArrJson = JSON.stringify(newArr); 
      fs.writeFileSync(datapath, ArrJson, function(err){   //IT FUCKING WORKS!!!
        if(err) throw err;
        console.log("Replaced!");
      });
      res.json(true);  //works
//      



    });


    //* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
    //This means you'll need to find a way to give each note a unique `id` when it's saved. 
    //In order to delete a note, you'll need to read all notes from the `db.json` file, 
    //remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
  

  app.delete("/api/notes/:id", function(req, res){
    let idparam = parseInt(req.params.id);
      
    fs.readFile(datapath, function(err, data){  ///THIS FUCKING WORKS!!!
      if (err) throw err;
      for(var i=0; i<noteDB.length; i++){
        if(idparam === noteDB[i].id){
          var spliced = noteDB.splice(i,1);
          console.log(spliced);
          var newArrJson = JSON.stringify(noteDB); 
          fs.writeFileSync(datapath, newArrJson, function(err){   //IT FUCKING WORKS!!!
            if(err) throw err;
            console.log("Replaced!");
          });
        }
      }
    });
    res.json(true); 
  });
};















