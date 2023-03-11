const express = require("express"); //includes express
const app = express(); //calls the express method
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//cross origin resource sharing
const cors = require("cors"); //cross origin restriction to be waived
const bcrypt = require("bcryptjs");
const config = require("./config.json");

const product = require("./Products.json");
const Product = require("./models/products.js");
const Review = require("./models/reviews.js");
const Comment = require("./models/comments.js");
const User = require("./models/users.js");
const Session = require("./models/sessions.js");

const port = 5000;

const getCurrentUser = (sessionId) => {
  // TODO: Get role id of the current user from sessionId
  const currentUser = { role: 'admin', id: 1 };

  return currentUser;
}

// use ends here
app.use((req, res, next) => {
  console.log(`${req.method} request ${req.url}`);
  next();
});

app.use(bodyParser.json({ limit: "10mb" })); //calling body parser method
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" })); //using default

app.use(cors()); //calling cors method

app.get("/", (req, res) => res.send("Hello! I am from the backend"));

mongoose
  .connect(
    `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.${config.MONGO_CLUSTER_NAME}.mongodb.net/${config.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB connected!"))
  .catch((err) => {
    console.log(`DBConnectionError:${err.message}`);
  });

// API -- product endpoints
// POST add new product
app.post("/product", (req, res) => {
  // Permission check
  const currentUser = getCurrentUser(req.session.id)
  if (currentUser.role != 'admin') {
    res.send("permission denied")
    return
  }

  // TODO: Add validation here
  Product.findOne({ name: req.body.name }, (err, foundResult) => {
    if (foundResult) {
      res.send("Name exists already. Please try another name");
    } else {
      // Build product Object
      const dbProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        image_urls: req.body.imageUrls,
        stock: req.bock.stock || 0,
        category: req.body.category,
        description: req.body.description,
        user_id: currentUser.id,
      });

      // Save to the database, and return result
      dbProduct
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => res.send(err));
    }}
});

// GET list all products
app.get("/product", (req, res) => {
  // TODO: Add pagination

  Product.find().then((result) => {
    res.send(result);
  });
});

// PATCH update the details of the objects
app.patch("/product/:id", (req, res) => {
  // Permission check
  const currentUser = getCurrentUser(req.session.id)
  if (currentUser.role != 'admin') {
    res.send("permission denied")
    return
  }

  // Update
  const idParam = req.params.id;
  Product.findById(idParam, (err, product) => {
    if (product["user_id"] == req.body.userId) {
      const updatedProduct = {
        name: req.body.name || product.name,
        price: req.body.price || product.price,
        image_urls: req.body.imageUrls || product.image_urls,
        stock: req.bock.stock || product.stock,
        category: req.body.category || product.category,
        description: req.body.description || product.description,
      };
      Product.updateOne({ _id: idParam }, updatedProduct)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => res.send(err));
    } else {
      res.send("error: product not found");
    }
  });
});

// DELETE delete a product
app.delete("/product/:id", (req, res) => {
  // Permission check
  const currentUser = getCurrentUser(req.session.id)
  if (currentUser.role != 'admin') {
    res.send("permission denied")
    return
  }

  // Delete
  const idParam = req.params.id;
  Product.findOne({ _id: idParam }, (err, product) => {
    if (product) {
      Product.deleteOne({ _id: idParam }, (err) => {
        res.send("deleted");
      });
    } else {
      res.send("not found");
    }
  }).catch((err) => res.send(err));
});

// Fake product endpoints for testing
// TODO: remove the below 2 fake endpoints when go live
app.get("/product", (req, res) => {
  res.json(product);
});

app.get("/product/:id", (req, res) => {
  const idParam = req.params.id;
  for (let i = 0; i < product.length; i++) {
    if (idParam.toString() === product[i].id.toString()) {
      res.json(product[i]);
    }
  }
});

// API -- review endpoints
// POST add new review
app.post("/product/:pid/review", (req, res) => {

  const currentUser = getCurrentUser(req.session.id)
 
  Product.findById(req.params.pid, (err, foundResult) => {
    if (!foundResult) {
      res.send("Product Id does not exist, please check and try again");
      return;
    }

    if (!req.body.content || req.body.content.length === 0) {
      res.send("content must be non-empty");
      return;
    }

    // Build review object
    const dbReview = new Review({
      _id: new mongoose.Types.ObjectId(),
      product_id: req.params.pid,
      user_id: req.body.imageUrls,
      content: req.body.content,
      stars: req.boday.stars
    });

    // Save to the database, and return result
    dbReview
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
    }}
});

// GET list all review by productId
app.get("/product/:pid/review", (req, res) => {
  Review.find({product_id: req.params.pid}).then((result) => {
    res.send(result);
  });
});

// PATCH update the details
app.patch("/product/:pid/review/:id", (req, res) => {
  // Permission check
  const currentUser = getCurrentUser(req.session.id)
  if (currentUser.role != 'admin') {
    res.send("permission denied")
    return
  }

  // Update
  const idParam = req.params.id;
  Review.findById(idParam, (err, review) => {
    if (!review) {
      res.send("review not found");
      return;
    }
    const updatedReview = {
      content: req.body.content || review.content,
      stars: req.body.stars || review.stars,
    };
    Review.updateOne({ _id: idParam }, updatedReview)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  });
});

// DELETE delete a review
app.delete("/product/:pid/review/:id", (req, res) => {
  // Permission check
  const currentUser = getCurrentUser(req.session.id)
  if (currentUser.role != 'admin') {
    res.send("permission denied")
    return
  }

  // Delete
  const idParam = req.params.id;
  Review.findOne({ _id: idParam }, (err, review) => {
    if (!review) {
      res.send("review not found");
      return;
    }
    Review.deleteOne({ _id: idParam }, (err) => {
      res.send("deleted");
    });
  }).catch((err) => res.send(err));
});
 
// API -- comment endpoints
// POST add new comment
app.post("/product/:pid/comment", (req, res) => {

  const currentUser = getCurrentUser(req.session.id)
 
  Product.findById(req.params.pid, (err, foundResult) => {
    if (!foundResult) {
      res.send("Product Id does not exist, please check and try again");
      return;
    }

    if (!req.body.content || req.body.content.length === 0) {
      res.send("content must be non-empty");
      return;
    }

    // Build comment object
    const dbComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      product_id: req.params.pid,
      user_id: req.body.imageUrls,
      content: req.body.content,
    });

    // Save to the database, and return result
    dbComment
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
    }}
});

// GET list all comment by productId
app.get("/product/:pid/comment", (req, res) => {
  Comment.find({product_id: req.params.pid}).then((result) => {
    res.send(result);
  });
});

// PATCH update the details
app.patch("/product/:pid/comment/:id", (req, res) => {
  // Permission check
  const currentUser = getCurrentUser(req.session.id)
  if (currentUser.role != 'admin') {
    res.send("permission denied")
    return
  }

  // Update
  const idParam = req.params.id;
  Comment.findById(idParam, (err, comment) => {
    if (!comment) {
      res.send("comment not found");
      return;
    }
    const updatedComment = {
      content: req.body.content,
    };
    Comment.updateOne({ _id: idParam }, updatedComment)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  });
});

// DELETE delete a comment
app.delete("/product/:pid/comment/:id", (req, res) => {
  // Permission check
  const currentUser = getCurrentUser(req.session.id)
  if (currentUser.role != 'admin') {
    res.send("permission denied")
    return
  }

  // Delete
  const idParam = req.params.id;
  Comment.findOne({ _id: idParam }, (err, comment) => {
    if (!comment) {
      res.send("comment not found");
      return;
    }
    Comment.deleteOne({ _id: idParam }, (err) => {
      res.send("deleted");
    });
  }).catch((err) => res.send(err));
});

// API - User endpoints
// POST - create a new user
app.post("/user", (req, res) => {
  // Permission check
  const currentUser = getCurrentUser(req.session.id)
  if (currentUser.role != 'admin') {
    res.send("permission denied")
    return
  }

  // checking if user is found in the db already
  User.findOne({ username: req.body.username }, (err, userResult) => {
    if (userResult) {
      res.send("Username exists already. Please try another name");
    } else {
      const hash = bcrypt.hashSync(req.body.password); //encrypts MONGO_PASSWORD
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        role: req.boday.role || 'customer'
        password: hash,
      });
      //saves to database and notify the user
      user
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => res.send(err));
    }
  });
});

// GET - get all users
app.get("/user", (req, res) => {
  // TODO: Permission check here

  User.find().then((result) => {
    res.send(result);
  });
});

// PATCH update the details of user 
app.patch("/user/:id", (req, res) => {
  // TODO: Get role id of the current user from session
  const currentUser = { role: 'admin', id: 1};
  const idParam = req.params.id;
  if (currentUser.role != 'admin' && currentUser.id != idParam) {
    res.send("you have no permission");
    return
  }

  // Update
  User.findById(idParam, (err, user) => {
      const hash = bcrypt.hashSync(req.body.password); //encrypts MONGO_PASSWORD
      const updatedUser = {
        password: bash
      };
      User.updateOne({ _id: idParam }, updatedUser)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => res.send(err));
    } else {
      res.send("error: user not found");
    }
  });
});

// DELETE delete a product
app.delete("/user/:id", (req, res) => {
  // TODO: Get role id of the current user from session
  const currentUser = { role: 'admin', id: 1};
  const idParam = req.params.id;
  if (currentUser.role != 'admin') {
    res.send("you have no permission");
    return
  }

  // Delete
  user.findOne({ _id: idParam }, (err, user) => {
    if (user) {
      User.deleteOne({ _id: idParam }, (err) => {
        res.send("deleted");
      });
    } else {
      res.send("not found");
    }
  }).catch((err) => res.send(err));
});

// Login endpoint
app.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, userResult) => {
    if (userResult) {
      if (bcrypt.compareSync(req.body.password, userResult.password)) {

        // TODO: Create session and return session
        res.send(userResult);
      } else {
        res.send("Sorry, failed to login. Please ensure username and password are entered correctly");
      }
    } else {
      res.send("user not found. Please register");
    } 
  }); 
});

// Logout
app.post("/logout", (req, res) => {
  // Clear session
});

// listening to port
app.listen(port, () =>
  console.log(`My fullstack application is listening on port ${port}`)
);
