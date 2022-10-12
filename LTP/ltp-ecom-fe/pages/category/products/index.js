import { ROUTE_CATEGORY } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import React from "react";

function index() {
  return <></>;
}

export async function getServerSideProps({ locale }) {
  return {
    redirect: {
      destination: addTrailingSlash(ROUTE_CATEGORY(locale)),
      statusCode: 301,
    },
  };
}

export default index;
