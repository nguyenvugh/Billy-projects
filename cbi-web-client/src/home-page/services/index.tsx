import React, { useState } from "react";
import PropTypes from "prop-types";

const useHomePage = () => {
  const [data, setData] = useState([]);
  return {
    data,
  };
};

useHomePage.propTypes = {};

export default useHomePage;
