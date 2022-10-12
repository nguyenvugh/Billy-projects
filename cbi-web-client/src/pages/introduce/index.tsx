import React from "react";
import { DynamicConfig } from "src/dynamic-config/DynamicConfig";
import { ConfigKeys } from "src/dynamic-config/interfaces";
import { getDetailConfigByKeyService } from "src/dynamic-config/services";

type IntroProps = {
  introduceContent: string;
};
function index(props: IntroProps) {
  return <DynamicConfig content={props.introduceContent} />;
}

export async function getStaticProps() {
  try {
    const introduceContent = await (
      await getDetailConfigByKeyService(ConfigKeys.PAGE_INTRO)
    ).data.content;
    return {
      props: {
        introduceContent,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        introduceContent: "",
      },
      revalidate: 10,
    };
  }
}
export default index;
