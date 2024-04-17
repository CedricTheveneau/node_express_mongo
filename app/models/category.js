const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is required"],
    unique: [true, "The name field must be unique"],
    trim: true,
    minlength: [5, "The category name must be at least 5 characters long"],
  },
});

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
