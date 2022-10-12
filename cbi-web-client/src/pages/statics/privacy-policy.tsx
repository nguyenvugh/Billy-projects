import React from "react";
import { DynamicConfig } from "src/dynamic-config/DynamicConfig";
import { ConfigKeys } from "src/dynamic-config/interfaces";
import { getDetailConfigByKeyService } from "src/dynamic-config/services";

type PoliciesProps = {
  policiesContent: string;
};
function index(props: PoliciesProps) {
  return <DynamicConfig content={props.policiesContent} />;
}

export async function getStaticProps() {
  try {
    const policiesContent = await (
      await getDetailConfigByKeyService(ConfigKeys.PAGE_POLICIES)
    ).data.content;
    return {
      props: {
        policiesContent,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        policiesContent: "",
      },
      revalidate: 10,
    };
  }
}
export default index;
