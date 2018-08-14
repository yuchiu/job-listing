import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "../global";

const NotFoundPage = ({
  match: {
    params: { unfoundLocation }
  }
}) => (
  <div>
    <Navbar />
    404! The page `{unfoundLocation}` is not found.
  </div>
);

NotFoundPage.propTypes = {
  match: PropTypes.object.isRequired
};
export default NotFoundPage;
