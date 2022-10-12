import { LIST_DATA_RESPONSE } from "@/src/common/constants/common.constant";
import { Lang, ListResponse } from "@/src/common/interfaces/common.interface";
import { getListCategoryService } from "@/src/common/services/common.services";
import LibraryPage from "@/src/components/libraryComponents";

import { DOCUMENT_SIZE, getParamSearchDocument } from "@/src/components/libraryComponents/contants";
import { DocumentItem, LibraryPageProps } from "@/src/components/libraryComponents/interfaces";

import { getListDocumentService } from "@/src/components/libraryComponents/services";
import { GetStaticProps } from "next";

const Library = ({ listItem, categories }: LibraryPageProps) => {
  return <LibraryPage listItem={listItem} categories={categories} />;
};

export const getStaticProps: GetStaticProps<LibraryPageProps> = async ({ locale }) => {
  const categories = await (await getListCategoryService(getParamSearchDocument({ lang: locale as Lang }))).data;
  let listItem: ListResponse<DocumentItem> = LIST_DATA_RESPONSE;
  if (categories.length) {
    listItem = await getListDocumentService(
      getParamSearchDocument({
        size: DOCUMENT_SIZE,
        lang: locale as Lang,
      })
    );
  }
  return {
    props: { listItem, categories },
    revalidate: 10,
  };
};

export default Library;
