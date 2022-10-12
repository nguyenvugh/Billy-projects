import React from "react";
import useTranslation from "next-translate/useTranslation";

export function Home() {
  const { t } = useTranslation("common");
  const example = t("greeting");
  return <div>{example}</div>;
}
