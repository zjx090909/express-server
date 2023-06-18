const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const firstname = '';

  // the routes are defined here
  router.post('/users', (req, res, next) => {
    db.query(
      'INSERT INTO users (firstname, lastname, email, province) VALUES (?,?,?,?)',
      [firstname, req.body.lastname, req.body.email, req.body.province],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  router.get('/users', function (req, res, next) {
    db.query(
      'SELECT id, lastname, email, province FROM users WHERE firstname=? ORDER BY province LIMIT 10 OFFSET ?',
      [firstname, 10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/users/:id', function (req, res, next) {
    db.query(
      'UPDATE users SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.lastname, req.body.email, req.body.province, req.params.id, firstname],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/users/:id', function (req, res, next) {
    db.query(
      'DELETE FROM users WHERE id=? AND firstname=?',
      [req.params.id, firstname],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  return router;
}

module.exports = createRouter;