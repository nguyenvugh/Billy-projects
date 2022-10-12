import { ListProductByCate } from "@ltp/components/Category/components/ListProductByCate";
import useTranslation from "@ltp/hooks/useTranslation";
import { MetadataTags } from "SEOs/meta-tag";

function index() {
  const { locale } = useTranslation();
  return (
    <>
      <MetadataTags
        title="Mua Sản Phẩm Nhựa Long Thành Chính Hãng | Longthanhplastic.com.vn"
        notIndex={locale === "en"}
        desContent="Tổng hợp danh sách tất cả những sản phẩm có trên Longthanhplastic"
      />
      <ListProductByCate />;
    </>
  );
}

export default index;
