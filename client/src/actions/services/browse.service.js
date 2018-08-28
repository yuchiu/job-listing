import API from "./API";

const browseService = {
  fetchList: async credentials => {
    const payload = await API().get(`/api/v1/browse-list`);
    return payload;
  }
};

export default browseService;
