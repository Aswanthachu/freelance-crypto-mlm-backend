export const getRefCode = async (req, res) => {
  try {
    const { userId } = req;

    const { referralCode } = await User.findById(userId);

    if (!referralCode)
      return res
        .status(400)
        .json({ message: "Error while fetching referral code" });

    res
      .status(200)
      .json({ message: "Successfully fetched referral code", referralCode });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching user ref code." });
  }
};

export const updateWalletAddress = async (req, res) => {
  try {
    const { userId } = req;
    const { userWalletAddress } = req.body;

    if (!userWalletAddress)
      return res.status(400).json({ message: "Wallet address is missing" });

    const { withdrawal_wallet_address } = await User.findById(userId);
    if (withdrawal_wallet_address === userWalletAddress)
      return res.status(200).json({ message: "Wallet address already saved." });

    await User.findByIdAndUpdate(userId, {
      withdrawal_wallet_address: userWalletAddress,
    });

    res.status(200).json({ message: "Wallet address saved successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while updating wallet address" });
  }
};

export const verifyTransaction = async (req, res) => {
  try {
    const { userId } = req;
    const { transactionId, amount } = req.body;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server error when verifying transaction" });
  }
};
