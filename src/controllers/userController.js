// src/controllers/userController.js
const UserRepository = require('../repositories/userRepository');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserController {
  static async createUser(req, res) {
    try {
      const { name, password, gender, dob, user_image_path } = req.body;

      // Validate input
      if (!name || !password || !gender || !dob) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Validate gender
      if (!['M', 'F', 'Other'].includes(gender)) {
        return res.status(400).json({ error: 'Invalid gender' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user object
      const user = new User(name, hashedPassword, gender, dob, user_image_path);

      // Save user to database
      const createdUser = await UserRepository.create(user);

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: createdUser.id,
          name: createdUser.name,
          gender: createdUser.gender,
          dob: createdUser.dob,
          user_image_path: createdUser.user_image_path
        }
      });
    } catch (error) {
      console.error('Error in createUser:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserRepository.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        id: user.id,
        name: user.name,
        gender: user.gender,
        dob: user.dob,
        user_image_path: user.user_image_path
      });
    } catch (error) {
      console.error('Error in getUserById:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const { name, gender, dob, user_image_path } = req.body;

      // Validate input
      if (!name && !gender && !dob && !user_image_path) {
        return res.status(400).json({ error: 'At least one field to update is required' });
      }

      // Validate gender if provided
      if (gender && !['M', 'F', 'Other'].includes(gender)) {
        return res.status(400).json({ error: 'Invalid gender' });
      }

      const updatedUser = await UserRepository.update(userId, { name, gender, dob, user_image_path });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        message: 'User updated successfully',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          gender: updatedUser.gender,
          dob: updatedUser.dob,
          user_image_path: updatedUser.user_image_path
        }
      });
    } catch (error) {
      console.error('Error in updateUser:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deleted = await UserRepository.delete(userId);

      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error in deleteUser:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  static async getAllUsers(req, res) {
    try {
      const users = await UserRepository.findAll();
      res.json(users.map(user => ({
        id: user.id,
        name: user.name,
        gender: user.gender,
        dob: user.dob,
        user_image_path: user.user_image_path
      })));
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserController;