// Get Request Handler
const mongoose = require("mongoose");
const messageModel = mongoose.model("message");

const getAllMessagesOrderedByLastPosted = (req, res) => {
  messageModel
    .find()
    .sort({ _id: -1 })
    .exec((err, messages) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(messages);
      }
    });
};
const getSingleMessage = (req, res) => {
  if (req.params && req.params.messageid) {
    console.log(req.params);
    console.log(req.params && req.params.messageid);
    messageModel.findById(req.params.messageid).exec((err, message) => {
      // error in executing function
      if (err) {
        res.status(400).json(err);
        return;
      }

      // could execute, but didn't find message
      if (!message) {
        res.status(404).json({
          "api-msg": "messageid not found"
        });
        return;
      }

      // found message
      res.status(200).json(message);
    });
  } else {
    // must have a message id
    res.status(400).json({
      "api-msg": "No messageid in request"
    });
  }
};

const deleteSingleMessage = (req, res) => {
  if ((req.params && req.params.messageid)) {
    messageModel.findById(req.params.messageid).exec((err, message) => {
        // error in executing function
        if (err) {
          res.status(400).json(err);
          return;
        }

        // could execute, but didn't find message
        if (!message) {
          res.status(404).json({
            "api-msg": "messageid not found"
          });
          return;
        }

        //found message, now deleting
        message.remove(err => {
          // error executing function
          if (err) {
            return res.status(400).json(err);
          }
          res.status(200).json(message);
        });
      })
  } else {
    // must have a message id
    res.status(400).json({
      "api-msg": "No messageid in request"
    });
  }
};

const deleteAllMessages = (req, res) => {
    messageModel.find().exec((err, message) => {
        // error in executing function
        if (err) {
          res.status(400).json(err);
          return;
        }

        // could execute, but didn't find message
        if (!message || (message.length == 0)) {
          res.status(404).json({
            "api-msg": "messageid not found"
          });
          return;
        }

        //found message, now deleting
        message.forEach(element => {
          element.remove(err => {
            // error executing function
            if (err) {
              return res.status(400).json(err);
            }
          });
          
        });
        res.status(200).json(message); //.json({"api-msg" : "Delete correct"});

      })
  };


const updateSingleMessage = (req, res) => {
  if ((req.params && req.params.messageid)) {
    messageModel.findById(req.params.messageid).exec((err, message) => {
        // error in executing function
        if (err) {
          res.status(400).json(err);
          return;
        }

        // could execute, but didn't find message
        if (!message) {
          res.status(404).json({
            "api-msg": "messageid not found"
          });
          return;
        }

        //found message, now updating
        //console.log(req.body.msg);
        message.updateOne({msg: req.body.msg}, (err => {
          // error executing function
          if (err) {
            return res.status(400).json(err);
          }
          res.status(200).json(message);
          console.log(req.body.msg);
        }));
      })
  } else {
    // must have a message id
    res.status(400).json({
      "api-msg": "No messageid in request"
    });
  }
};
// Post Request Handler
const addNewMessage = (req, res) => {
  messageModel.create(req.body, (err, messages) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(messages);
    }
  });
};

module.exports = {
  getAllMessagesOrderedByLastPosted,
  addNewMessage,
  getSingleMessage,
  deleteSingleMessage,
  deleteAllMessages,
  updateSingleMessage
};
