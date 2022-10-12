import { LIST_RESPONSE_DEFAULT } from "@cbi/constants/index";
import React from "react";
import { Documents } from "src/climate-document/Documents";
import { Documents as DocumentsI } from "src/climate-document/documents.interface";
import { getDocuments } from "src/climate-document/services";
import { List } from "src/common/interfaces/common.interface";

function index({ documents }: { documents: List<DocumentsI> }) {
  return <Documents documents={documents} />;
}

export const getServerSideProps = async () => {
  try {
    const documents = (await getDocuments({ limit: 8 })).data;
    return {
      props: {
        documents,
      },
    };
  } catch (e) {
    return {
      props: {
        documents: LIST_RESPONSE_DEFAULT,
      },
    };
  }
};
export default index;
