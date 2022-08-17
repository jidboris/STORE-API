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
  default: 4.5,
},

company: {
type: String,
enum: {
  values: ['sokoa', 'alaba', 'ibachi', 'filade'],
  message: "{VALUE} is not supported",
}
}},
{ timestamps: true },
);

module.exports = mongoose.model("Products", userSchema);