import React from "react";
import { DynamicConfig } from "src/dynamic-config/DynamicConfig";
import { ConfigKeys } from "src/dynamic-config/interfaces";
import { getDetailConfigByKeyService } from "src/dynamic-config/services";

type ConditionProps = {
  conditionContent: string;
};
function index(props: ConditionProps) {
  return <DynamicConfig content={props.conditionContent} />;
}

export async function getStaticProps() {
  try {
    const conditionContent = await (
      await getDetailConfigByKeyService(ConfigKeys.PAGE_CONDITIONS)
    ).data.content;
    return {
      props: {
        conditionContent,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        conditionContent: "",
      },
      revalidate: 10,
    };
  }
}
export default index;
