import { userModel } from "../models";

const testController = {
  getBrowseList: async (req, res) => {
    try {
      const browseList = await userModel.find();
      res.json({
        confirmation: true,
        browseList,
        message: "test success!"
      });
    } catch (err) {
      console.log(err);
      return res.json({
        confirmation: false,
        browseList: [],
        message: "error occured while fetching browse list"
      });
    }
  }
};
export default testController;
