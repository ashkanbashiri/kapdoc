var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;



//

require('rootpath')();
const cors = require('cors');
const errorHandler = require('_helpers/error-handler');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);


//



var CONTACTS_COLLECTION = "contacts";



// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb+srv://ashkan:alpacino@cluster0-tqw2p.mongodb.net/test?retryWrites=true", function (err, client) {
  if (err) {
    console.log(err);

    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*
app.route('/*').get(function(req, res) {
  console.log(path.join('config.root', 'index.html'));
  return res.sendFile(path.join('config.root', 'index.html'));
});*/

/*
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('dist'));
}
app.get('*',(req, res) => {
  res.sendFile(path('./index.html'));
});
*/



app.get("/api/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      console.log('Failed to get data from database');
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      console.log(docs);
      res.status(200).json(docs);
    }
  });
});

app.post("/tokensignin", function(req, res) {

const Role = require('_helpers/role');
console.log(req.body);
user = { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin };
res.json(user);

});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  console.log("Req: ",req.body)
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
