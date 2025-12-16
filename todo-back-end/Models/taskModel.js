const mongoose = require('mongoose');
const User = require('./user')
const taskSchema = new mongoose.Schema({
    
    task:{
        type: String,
        required: true,
        minlength: 2
    },
    isCompleted:{
        type: Boolean,
        default: false,
    
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    deadline:{
        type: Date
    },
    category: {   // 👈 new field
    type: String,
    enum: ["Work", "Personal", "Urgent", "General"], // predefined categories
    default: "General"
  },
    userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },

})

const tasks = mongoose.model('tasks', taskSchema);

module.exports = tasks