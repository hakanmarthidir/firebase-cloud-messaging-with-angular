//var amqp = require('amqplib/callback_api');
var express = require('express');
var router = express.Router();
var amqp = require('amqp-connection-manager');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json("Test");
});

var connection = amqp.connect(['amqp://hakan:hakan@localhost:5672']);

var channelWrapper = connection.createChannel({
  json: true,
  setup: function (channel) {
    return channel.assertQueue('myrabbit', { durable: true });
  }
});

/* POST file parameter */
router.post('/filecreate', function (req, res, next) {
  channelWrapper.sendToQueue('myrabbit', JSON.stringify(req.body))
    .then(function () {
      return console.log("Message was sent!");
    }).catch(function (err) {
      return console.log("Message was rejected.");
    });

  res.json(req.body);
});

module.exports = router;



