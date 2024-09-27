// src/models/userModel.js
class User {
    constructor(name, hashedPassword, gender, dob, userImagePath, id = null) {
      this.id = id;
      this.name = name;
      this.hashed_password = hashedPassword;
      this.gender = gender;
      this.dob = dob;
      this.user_image_path = userImagePath;
    }
  }
  
  module.exports = User;