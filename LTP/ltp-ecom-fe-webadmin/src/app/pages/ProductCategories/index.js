import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon, DeleteOutline } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmModal from "app/components/ConfirmModal";
import {
  PRODUCT_CATEGORIES_SCREEN_CREATION_MODE,
  PRODUCT_CATEGORIES_SCREEN_EDIT_MODE,
} from "app/constants/product-categories";
import { PAGE_SIZE_UNLIMIT } from "app/utils/constant";
import lodash from "lodash";
import { useEffect, useState } from "react";
import {
  addNewCate,
  deleteProductCategory,
  getProductCategory,
  updateCate,
} from "../../services/axios";
import * as AppURL from "../../services/urlAPI";
import * as Utils from "../../utils";
import CreationModal from "./components/CreationModal";
import Table from "./components/Table";

const columns = [
  {
    id: 0,
    name: "image",
    text: "Hình ảnh",
  },
  {
    id: 1,
    name: "parent_category_code",
    text: "Mã danh mục cha",
  },
  {
    id: 2,
    name: "parent_category_name",
    text: "Tên danh mục cha",
  },
  {
    id: 3,
    name: "feature",
    text: "Feature",
  },
  // {
  //   id: 4,
  //   name: 'child_category_count',
  //   text: 'Số lượng danh mục con',
  // },
  // {
  //   id: 5,
  //   name: 'count_products',
  //   text: 'Số lượng sản phẩm',
  // },
  {
    id: 6,
    name: "action",
    text: "Chỉnh sửa",
  },
];

const detailFormInitialState = {
  product_category_name: "",
  product_category_code: "",
  product_category_thumbnail: "",
  product_category_is_feature: false,
  product_category_slug: "",
  title_seo: "",
  title_seo_en: "",
  description_seo: "",
  description_seo_en: "",
  product_category_detail_description: "",
  product_category_detail_description_en: "",
  redirect_slug_302: "",
  redirect_slug_302_en: "",
  redirect_slug: "",
  redirect_slug_en: "",
};

const useStyles = makeStyles((theme) => ({
  actionBlock: {
    textAlign: "right",
  },
}));

export default function ProductCategories() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [detailForm, setDetailForm] = useState(
    lodash.cloneDeep(detailFormInitialState)
  );
  const [mode, setMode] = useState(PRODUCT_CATEGORIES_SCREEN_CREATION_MODE);
  const [update, setUpdate] = useState(false);
  const [currentUpdateId, setCurrentUpdateId] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isFeature, setIsFeature] = useState(false);
  const [totalFeatures, setTotalFeatures] = useState(0);

  useEffect(() => {
    const url = Utils.replaceStrUrl(AppURL.getProductCategory, [
      1,
      PAGE_SIZE_UNLIMIT,
    ]);
    getProductCategory(url).then((data) => {
      const results = Utils.getSafeValue(data, "results", []);
      setData(results.sort((a, b) => a.order - b.order));
      let tt = 0;
      results.map((res) => {
        if (res.is_feature === 1) tt++;
      });
      setTotalFeatures(tt);
    });
  }, [update]);

  const handleDeleteSelectedRows = () => {
    console.log("handleDeleteSelectedRows", selectedRows);
    try {
      if (selectedRows.length > 0) {
        if (selectedRows.length === 1) {
          const selectedId = Utils.getSafeValue(selectedRows[0], "id", 0);
          const url = Utils.replaceStrUrl(AppURL.deleteProductCategory, [
            selectedId,
          ]);
          deleteProductCategory(url).then((res) => {
            if (res !== null) {
              const newData = data.filter((cat) => {
                return cat.id !== selectedId;
              });
              setData(newData.sort((a, b) => a.order - b.order));
            }
          });
        } else {
          const arrIds = selectedRows.map((row) => row?.id);
          const param = "ids=";
          let url = Utils.replaceStrUrl(AppURL.deleteProductCategories, []);
          for (let i = 0; i < arrIds.length - 1; i++) {
            url += param + arrIds[i] + "&";
          }
          url += param + arrIds[arrIds.length - 1];
          deleteProductCategory(url).then((res) => {
            if (res !== null) {
              const newData = data.filter((cat) => {
                return !lodash.includes(arrIds, cat.id);
              });
              setData(newData.sort((a, b) => a.order - b.order));
            }
          });
        }
      }
      setSelectedRows([]);
      setConfirmDelete(false);
    } catch (error) {
      console.log(error);
      setConfirmDelete(false);
    }
  };

  const handleOpenAddModal = () => {
    setDetailForm({
      product_category_name: "",
      product_category_name_en: "",
      product_category_code: "",
      product_category_thumbnail: "",
      product_category_is_feature: false,
      product_category_slug: "",
      product_category_slug_en: "",
      title_seo: "",
      title_seo_en: "",
      description_seo: "",
      description_seo_en: "",
      product_category_detail_description: "",
      product_category_detail_description_en: "",
      redirect_slug_302: "",
      redirect_slug_302_en: "",
      redirect_slug: "",
      redirect_slug_en: "",
    });
    setMode(PRODUCT_CATEGORIES_SCREEN_CREATION_MODE);
    setIsFeature(false);
    setIsOpenCreateModal(true);
  };

  const handleOpenEditModal = (item) => {
    const image = Utils.getSafeValue(item, "image", 0);
    const translates = Utils.getSafeValue(item, "translates", []);
    const nameObj = lodash.find(translates, {
      language_code: "vi",
      language_field: "name",
    });
    const name = Utils.getSafeValue(nameObj, "language_value", "");
    const nameEnObj = lodash.find(translates, {
      language_code: "en",
      language_field: "name",
    });
    const slug = Utils.getField(translates, "vi", "slug");
    const slugEN = Utils.getField(translates, "en", "slug");
    const title_seo = Utils.getField(translates, "vi", "title_seo");
    const title_seo_en = Utils.getField(translates, "en", "title_seo");
    const description_seo = Utils.getField(translates, "vi", "description_seo");
    const description_seo_en = Utils.getField(
      translates,
      "en",
      "description_seo"
    );
    const nameEN = Utils.getSafeValue(nameEnObj, "language_value", "");
    const code = Utils.getSafeValue(item, "code", "");
    const url = Utils.getSafeValue(item.image_obj, "url", "");
    const is_feature = Utils.getSafeValue(item, "is_feature", -1);
    is_feature === 1 ? setIsFeature(true) : setIsFeature(false);
    const product_category_detail_description = Utils.getField(
      translates,
      "vi",
      "detail_description"
    );
    const product_category_detail_description_en = Utils.getField(
      translates,
      "en",
      "detail_description"
    );
    const redirect_slug_302 = Utils.getField(
      translates,
      "vi",
      "redirect_slug_302"
    );
    const redirect_slug_302_en = Utils.getField(
      translates,
      "en",
      "redirect_slug_302"
    );
    const redirect_slug =  Utils.getField(
      translates,
      "vi",
      "redirect_slug"
    );
    const redirect_slug_en =  Utils.getField(
      translates,
      "en",
      "redirect_slug"
    );
    setDetailForm({
      ...item,
      image: image,
      product_category_name: name,
      product_category_name_en: nameEN,
      product_category_code: code,
      product_category_thumbnail: url,
      product_category_is_feature: is_feature,
      product_category_slug: slug,
      product_category_slug_en: slugEN,
      title_seo,
      title_seo_en,
      description_seo,
      description_seo_en,
      product_category_detail_description,
      product_category_detail_description_en,
      redirect_slug_302,
      redirect_slug_302_en,
      redirect_slug,
      redirect_slug_en
    });
    setMode(PRODUCT_CATEGORIES_SCREEN_EDIT_MODE);
    setCurrentUpdateId(item.id);
    setIsOpenCreateModal(true);
  };

  const handleSave = (form) => {
    try {
      if (mode === PRODUCT_CATEGORIES_SCREEN_CREATION_MODE) {
        addNewCate(AppURL.productCate, form)
          .then(() => {
            setUpdate(!update);
            setIsOpenCreateModal(false);
          })
          .catch((error) => {
            const err = error.response?.data;
          });
      } else {
        const url = Utils.replaceStrUrl(AppURL.deleteProductCategory, [
          currentUpdateId,
        ]);
        updateCate(url, form)
          .then(() => {
            setUpdate(!update);
            setIsOpenCreateModal(false);
          })
          .catch((error) => {
            const err = error.response?.data;
          });
      }
    } catch (error) {
      console.log("tess..", error);
      setIsOpenCreateModal(false);
    }
  };

  return (
    <div>
      <div container className="page-header">
        <div className="page-title">Danh mục sản phẩm</div>
        <PrimaryButton startIcon={<AddIcon />} onClick={handleOpenAddModal}>
          Thêm mới
        </PrimaryButton>
        <DangerButton
          startIcon={<DeleteOutline />}
          disabled={selectedRows.length === 0}
          onClick={() => setConfirmDelete(true)}
        >
          Xoá đã chọn
        </DangerButton>
      </div>
      <Table
        data={data}
        setData={setData}
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows,
        }}
        onEdit={handleOpenEditModal}
      />
      <CreationModal
        title={
          mode === PRODUCT_CATEGORIES_SCREEN_EDIT_MODE
            ? "Cập nhật danh mục cha"
            : "Thêm danh mục cha"
        }
        form={detailForm}
        isOpen={isOpenCreateModal}
        onSave={handleSave}
        onClose={() => {
          setIsOpenCreateModal(false);
          setUpdate(!update);
        }}
        mode={mode}
        isFeature={isFeature}
        setIsFeature={setIsFeature}
        totalFeatures={totalFeatures}
        setTotalFeatures={setTotalFeatures}
        setUpdate={setUpdate}
        update={update}
      />
      <ConfirmModal
        isOpen={confirmDelete}
        type="delete"
        title="Xoá danh mục cha"
        okText="Xoá"
        onOk={handleDeleteSelectedRows}
        onClose={() => setConfirmDelete(false)}
      >
        <p>Bạn có chắc muốn xóa những danh mục đã chọn?</p>
      </ConfirmModal>
    </div>
  );
}
