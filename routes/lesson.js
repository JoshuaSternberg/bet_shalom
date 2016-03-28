var express = require('express');
var router = express.Router();
var path = require('path');
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res){
  var lessonPlan = {
    author: req.body.author,
    title: req.body.title,
    lesson_plan: req.body.lesson_plan,
    materials: req.body.materials,
    resource: req.body.resource,
    deleted: false
  };

  pg.connect(connection, function(err, client) {
    client.query('INSERT INTO lesson (author, title, lesson_plan, materials, ' +
      'resource, deleted) VALUES ($1, $2, $3, $4, $5, $6)',
      [lessonPlan.author, lessonPlan.title, lessonPlan.lesson_plan, lessonPlan.materials,
      lessonPlan.resource, lessonPlan.deleted],

      function(err, result) {
        if (err) {
          console.log('Error inserting data', err);
          res.send(false);
        } else {
          res.send(true);
        }
      });
  });
});

module.exports = router;

// CREATE TABLE lesson
//     (
//     lesson_id SERIAL NOT NULL PRIMARY KEY,
//     author character varying(120) NOT NULL,
//     title character varying(120) NOT NULL,
//     lesson_plan jsonb,
//     materials BOOLEAN NOT NULL,
//     resource BOOLEAN NOT NULL,
//     deleted BOOLEAN NOT NULL
//     );
