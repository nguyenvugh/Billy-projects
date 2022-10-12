import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon, DeleteOutline } from "@material-ui/icons";
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmModal from "app/components/ConfirmModal";
import {
  PRODUCT_CATEGORIES_SCREEN_CREATION_MODE,
  PRODUCT_CATEGORIES_SCREEN_EDIT_MODE,
} from "app/constants/product-categories";
import { urlProductCategory } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { deleteProductCategory, getProductCategory } from "app/services/axios";
import * as AppURL from "app/services/urlAPI";
import * as Utils from "app/utils";
import { PAGE_SIZE_UNLIMIT } from "app/utils/constant";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    name: "child_category_code",
    text: "Mã danh mục con",
  },
  {
    id: 2,
    name: "child_category_name",
    text: "Tên danh mục con",
  },
  // {
  //   id: 3,
  //   name: 'products_count',
  //   text: 'Số lượng sản phẩm',
  // },
  {
    id: 4,
    name: "action",
    text: "Chỉnh sửa",
  },
];

const detailFormInitialState = {
  product_category_name: "",
  product_category_code: "",
  product_category_thumbnail: "",
  title_seo: "",
  title_seo_en: "",
  description_seo: "",
  description_seo_en: "",
  slug: "",
  slug_en: "",
  product_category_detail_description: "",
  product_category_detail_description_en: "",
  redirect_slug_302: "",
  redirect_slug_302_en: "",
  redirect_slug: "",
  redirect_slug_en: ""
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "18px",
    margin: 0,
    fontWeight: 600,
    lineHeight: "36px",
  },
  titleLink: {
    color: "#000000",
    textDecoration: "none",
    marginRight: "15px",
  },
  titleText: {
    marginLeft: "15px",
    marginRight: "15px",
  },
  actionBlock: {
    textAlign: "right",
  },
  addButton: {
    backgroundColor: "#3952D3",
    textTransform: "unset",
    marginRight: "15px",
  },
  deleteButton: {
    backgroundColor: "#D70000",
    textTransform: "unset",
  },
}));

export default function ChildrenProductCategories() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [detailForm, setDetailForm] = useState(
    lodash.cloneDeep(detailFormInitialState)
  );
  const [mode, setMode] = useState(PRODUCT_CATEGORIES_SCREEN_CREATION_MODE);
  const [parentTitle, setParentTitle] = useState("");
  const [isFeature, setIsFeature] = useState(false);
  const [update, setUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentUpdateId, setCurrentUpdateId] = useState(0);

  useEffect(() => {
    getProductCategory(
      Utils.replaceStrUrl(AppURL.deleteProductCategory, [id])
    ).then((res) => {
      const translates = Utils.getSafeValue(res, "translates", []);
      const name = Utils.getField(translates, "vi", "name");
      setParentTitle(name);
    });
  }, []);

  useEffect(() => {
    const url = Utils.replaceStrUrl(AppURL.getChildProductCategory, [
      1,
      PAGE_SIZE_UNLIMIT,
      id,
    ]);
    getProductCategory(url).then((data) => {
      const results = Utils.getSafeValue(data, "results", []);
      setData(results.sort((a, b) => a.order - b.order));
    });
  }, [id, update]);

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
      product_category_parent: id,
      product_category_name: "",
      product_category_code: "",
      product_category_name_en: "",
      product_category_thumbnail: "",
      product_category_is_feature: false,
      title_seo: "",
      title_seo_en: "",
      description_seo: "",
      description_seo_en: "",
      slug: "",
      slug_en: "",
      product_category_detail_description: "",
      product_category_detail_description_en: "",
      redirect_slug_302: "",
      redirect_slug_302_en: "",
      redirect_slug: "",
      redirect_slug_en: ""
    });
    setMode(PRODUCT_CATEGORIES_SCREEN_CREATION_MODE);
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
    const nameObjEn = lodash.find(translates, {
      language_code: "en",
      language_field: "name",
    });
    const title_seo = Utils.getField(translates, "vi", "title_seo");
    const title_seo_en = Utils.getField(translates, "en", "title_seo");
    const description_seo = Utils.getField(translates, "vi", "description_seo");
    const description_seo_en = Utils.getField(
      translates,
      "en",
      "description_seo"
    );
    const slug = Utils.getField(translates, "vi", "slug");
    const slug_en = Utils.getField(translates, "en", "slug");
    const nameEn = Utils.getSafeValue(nameObjEn, "language_value", "");
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
    const redirect_slug = Utils.getField(
      translates,
      "vi",
      "redirect_slug"
    );
    const redirect_slug_en = Utils.getField(
      translates,
      "en",
      "redirect_slug"
    );
    setDetailForm({
      image: image,
      product_category_name: name,
      product_category_name_en: nameEn,
      product_category_code: code,
      product_category_thumbnail: url,
      product_category_is_feature: is_feature,
      title_seo,
      title_seo_en,
      description_seo,
      description_seo_en,
      slug,
      slug_en,
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

  const changeUpdate = () => {
    setUpdate(!update);
  };

  return (
    <>
      {data === null ? (
        <div></div>
      ) : (
        <div>
          <div className="page-header">
            <div className="page-title">
              <Breadcrumbs>
                <Link to={urlProductCategory}>Danh mục sản phẩm</Link>
                <Typography>{parentTitle}</Typography>
              </Breadcrumbs>
            </div>
            <PrimaryButton startIcon={<AddIcon />} onClick={handleOpenAddModal}>
              Thêm mới
            </PrimaryButton>
            <DangerButton
              disabled={selectedRows?.length === 0}
              startIcon={<DeleteOutline />}
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
                ? "Cập nhật danh mục con"
                : "Thêm danh mục con"
            }
            form={detailForm}
            isOpen={isOpenCreateModal}
            changeUpdate={changeUpdate}
            onClose={() => setIsOpenCreateModal(false)}
            mode={mode}
            isFeature={isFeature}
            setIsFeature={setIsFeature}
            id={id}
            currentUpdateId={currentUpdateId}
          />
          <ConfirmModal
            isOpen={confirmDelete}
            type="delete"
            title="Xoá danh mục con"
            okText="Xoá"
            onOk={handleDeleteSelectedRows}
            onClose={() => setConfirmDelete(false)}
          >
            <p>Bạn có chắc muốn xóa những danh mục đã chọn?</p>
          </ConfirmModal>
        </div>
      )}
    </>
  );
}
