const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const firstname = '';

  // the routes are defined here
  router.post('/users', (req, res, next) => {
    console.log('Received POST request with data:', req.body);

    db.query(
      'INSERT INTO users (firstname, lastname, email, province) VALUES (?,?,?,?)',
      [req.body.firstname, req.body.lastname, req.body.email, req.body.province],
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
    const page = parseInt(req.params.page, 10) || 0;  // 确保 page 是整数，默认为 0
    const offset = 10 * page;  // 计算偏移量
  
    db.query(
      'SELECT id, firstname, lastname, email, province FROM users ORDER BY id LIMIT 10 OFFSET ?',
      [offset],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
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