// src/repositories/userRepository.js
const db = require('../db/sqliteConnection');
const User = require('../models/userModel');

class UserRepository {
  static create(user) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (name, hashed_password, gender, dob, user_image_path) 
                   VALUES (?, ?, ?, ?, ?)`;
      db.run(sql, [user.name, user.hashed_password, user.gender, user.dob, user.user_image_path], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(new User(user.name, user.hashed_password, user.gender, user.dob, user.user_image_path, this.lastID));
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE user_id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? new User(row.name, row.hashed_password, row.gender, row.dob, row.user_image_path, row.user_id) : null);
        }
      });
    });
  }

  static update(id, userData) {
    return new Promise((resolve, reject) => {
      const { name, gender, dob, user_image_path } = userData;
      const updates = [];
      const values = [];

      if (name) {
        updates.push('name = ?');
        values.push(name);
      }
      if (gender) {
        updates.push('gender = ?');
        values.push(gender);
      }
      if (dob) {
        updates.push('dob = ?');
        values.push(dob);
      }
      if (user_image_path) {
        updates.push('user_image_path = ?');
        values.push(user_image_path);
      }

      if (updates.length === 0) {
        resolve(null);
        return;
      }

      const sql = `UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`;
      values.push(id);

      db.run(sql, values, function(err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes > 0) {
            UserRepository.findById(id).then(resolve).catch(reject);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM users WHERE user_id = ?';
      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }
  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const users = rows.map(row => new User(row.name, row.hashed_password, row.gender, row.dob, row.user_image_path, row.user_id));
          resolve(users);
        }
      });
    });
  }
}

module.exports = UserRepository;