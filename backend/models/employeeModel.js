const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the employee schema
const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        // Regular expression for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  mobileNo: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function (v) {
        // Ensure mobile number is exactly 10 digits
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Mobile number must be 10 digits'
    }
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'],
    required: [true, 'Designation is required']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Gender is required']
  },
  courses: {
    type: [String],
    enum: ['MCA', 'BCA', 'BSC']
  },
}, {
  timestamps: true 
});

// Create the model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;


/*

  imgUpload: {
    type: String, // URL or path of the uploaded image
    required: [true, 'Image upload is required']
  }
*/ 