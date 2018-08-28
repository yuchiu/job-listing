const testController = {
  getTest: (req, res) => {
    res.status(200).send({
      confirmation: true,
      message: "test success!"
    });
  }
};
export default testController;
