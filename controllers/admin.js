export const getAllPendingDeposits = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching all deposits." });
  }
};

export const getAllWithdrawalRequest=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error while fetching withdrawal request."});
    }
}