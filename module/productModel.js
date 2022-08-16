const {mongoose} = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' Name is required'],
  },

price: {
        type: Number,
  required: [true, 'Number is required'],
    },

 company: {
        type: Boolean,
      default: false
    },

rating:{
  type: Number,
  default: 4.5
},

createdAT: {
  type: Date,
  default: Date.now()
},

company: {
type: String,
enum: {
  values: ['ikea', 'liddy', 'marcos', 'caresa'],
  message: "{VALUE} is not supported"
}
}
});

module.exports = mongoose.model("Products", userSchema);