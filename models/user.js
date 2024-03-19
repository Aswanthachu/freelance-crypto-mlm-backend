import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refferalCode: {
    type: String,
    required: true,
    unique: true,
  },
});

async function generateReferralCode() {
  const codeLength = 8;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

  let referralCode = "";
  let isUnique = false;

  while (!isUnique) {
    referralCode = "";
    for (let i = 0; i < codeLength; i++) {
      referralCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    const existingCode = await this.findOne({ referralCode: referralCode });
    if (!existingCode) isUnique = true;
  }

  return referralCode;
}

userSchema.pre("save", async function (next) {
  if (!this.referralCode) {
    this.referralCode = await generateReferralCode();
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
