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
