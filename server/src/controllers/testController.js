const testController = {
  getTest: (req, res) => {
    res.json({
      confirmation: true,
      message: "test success!"
    });
  }
};
export default testController;
