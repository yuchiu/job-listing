import { userModel } from "../models";

const browseController = {
  getBrowseList: async (req, res) => {
    try {
      // req.user is retreived from auth.policy
      console.log(req.user);
      const browseList = await userModel.find({ _id: { $ne: req.user._id } });
      res.status(200).send({
        confirmation: true,
        browseList
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        confirmation: false,
        message: "error occured while fetching browse list"
      });
    }
  }
};
export default browseController;
