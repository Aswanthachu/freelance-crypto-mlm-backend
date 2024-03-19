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
  hashedPassword: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
    unique: true,
  },
  withdrawal_wallet_address: {
    type: String,
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

    const existingCode = await this.constructor.findOne({
      referralCode: referralCode,
    });
    if (!existingCode) isUnique = true;
  }

  return referralCode;
}

userSchema.pre("save", async function (next) {
  const generateReferralCodeBound = generateReferralCode.bind(this);

  if (!this.referralCode) {
    this.referralCode = await generateReferralCodeBound();
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
