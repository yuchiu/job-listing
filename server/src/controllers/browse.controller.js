import { userModel } from "../models";

const browseController = {
  getBrowseList: async (req, res) => {
    try {
      const browseList = await userModel.find();
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
