let noteDB = require("../db/db.json");
const fs = require("fs");
var path = require("path");
var datapath = path.join(__dirname, "../db/db.json");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
      fs.readFile(datapath, function(err, data){
        if (err) throw err;
        res.json(noteDB);
      });
    });

    app.post("/api/notes", function(req, res) {
      var newnote = req.body;
      noteDB.push(newnote);
      var newArr = noteDB.map(v=>Object.assign(v, {id: noteDB.indexOf(v)}));
      var ArrJson = JSON.stringify(newArr); 
      fs.writeFileSync(datapath, ArrJson, function(err){
        if(err) throw err;
        console.log("Replaced!");
      });
      res.json(true);      
    });

  

  app.delete("/api/notes/:id", function(req, res){
    let idparam = parseInt(req.params.id);
    fs.readFile(datapath, function(err, data){
      if (err) throw err;
      for(var i=0; i<noteDB.length; i++){
        if(idparam === noteDB[i].id){
          var spliced = noteDB.splice(i,1);
          console.log(spliced);
          var newArrJson = JSON.stringify(noteDB); 
          fs.writeFileSync(datapath, newArrJson, function(err){
            if(err) throw err;
            console.log("Replaced!");
          });
        }
      }
    });
    res.json(true); 
  });
};















