const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "cashier"],
      default: "admin"
    },
    marchant: {
      type: mongoose.Types.ObjectId,
      ref: "marchant",
    },
  },
  {
    timestamp: true,
  }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// };

module.exports = mongoose.model("user", userSchema);
