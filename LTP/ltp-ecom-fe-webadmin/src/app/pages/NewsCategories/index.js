import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, DeleteOutline } from '@material-ui/icons';
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import ConfirmModal from 'app/components/ConfirmModal';
import { NEWS_CATEGORIES_SCREEN_CREATION_MODE, NEWS_CATEGORIES_SCREEN_EDIT_MODE } from 'app/constants/news-categories';
import { addNewCate, getProductCategory, putApi } from 'app/services/axios';
import * as AppURL from 'app/services/urlAPI';
import * as Utils from 'app/utils';
import lodash from 'lodash';
import { useEffect, useState } from 'react';
import CreationModal from './components/CreationModal';
import Table from './components/Table';

const columns = [
  {
    id: 1,
    name: 'vie_category_name',
    text: 'Tên chuyên mục (VN)',
  },
  {
    id: 2,
    name: 'eng_category_name',
    text: 'Tên chuyên mục (ENG)',
  },
  {
    id: 3,
    name: 'id_creator',
    text: 'Tên người tạo',
  },
  {
    id: 4,
    name: 'action',
    text: 'Chỉnh sửa',
  }
];

const useStyles = makeStyles((theme) => ({
  note: {
    color: '#373737',
    fontSize: '14px',
    fontWeight: '400',
    marginTop: '10px',
    textAlign: 'right',
  }
}));

const detailFormInitialState = {
  vie_category_name: '',
  eng_category_name: '',
  vie_slug: '',
  eng_slug: '',
  title_seo: '',
  title_seo_en: '',
  description_seo: '',
  description_seo_en: '',
  redirect_slug_302: "",
  redirect_slug_302_en: "",
  redirect_slug: "",
  redirect_slug_en: ""
}

export default function ProductCategories() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [mode, setMode] = useState(NEWS_CATEGORIES_SCREEN_CREATION_MODE);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [detailForm, setDetailForm] = useState(lodash.cloneDeep(detailFormInitialState));
  const [update, setUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentUpdateId, setCurrentUpdateId] = useState(0);

  useEffect(() => {
    getProductCategory(AppURL.getAllNewsCategory).then(result => {
      const data = Utils.getSafeValue(result, "data", []);
      setData(data);
    })
  }, [update]);

  const handleDeleteSelectedRows = () => {
    console.log(selectedRows);

    try {
      if (selectedRows.length > 0) {
        let ids = [];
        selectedRows.map(selectedRow => {
          const id = Utils.getSafeValue(selectedRow, "id", 0);
          ids.push(id);
        });
        const params = {
          ids: ids.join()
        }
        addNewCate(AppURL.deleteNewsCategory, params).then(res => {
          if (res.code === 200) {
            const newData = data.filter(cat => {
              return !lodash.includes(ids, cat.id);
            });
            setData(newData);
          }
        })
      }
      setSelectedRows([]);
      setConfirmDelete(false);
    } catch (error) {
      console.log(error);
      setConfirmDelete(false);
    }
  }

  const handleOpenAddModal = () => {
    setDetailForm({
      vie_category_name: '',
      eng_category_name: '',
      vie_slug: '',
      eng_slug: '',
      title_seo: '',
      title_seo_en: '',
      description_seo: '',
      description_seo_en: '',
      redirect_slug_302: "",
      redirect_slug_302_en: "",
      redirect_slug: "",
      redirect_slug_en: ""
    });
    setMode(NEWS_CATEGORIES_SCREEN_CREATION_MODE);
    setIsOpenCreateModal(true);
  }

  const handleOpenEditModal = (item) => {
    const translates = Utils.getSafeValue(item, "translates", []);
    const vie = Utils.getField(translates, "vi", "name");
    const eng = Utils.getField(translates, "en", "name");
    const vie_slug = Utils.getField(translates, "vi", "slug");
    const eng_slug = Utils.getField(translates, "en", "slug");
    const title_seo = Utils.getField(translates, "vi", "title_seo");
    const title_seo_en = Utils.getField(translates, "en", "title_seo");
    const description_seo = Utils.getField(translates, "vi", "description_seo");
    const description_seo_en = Utils.getField(translates, "en", "description_seo");
    const redirect_slug_302 = Utils.getField(translates, "vi", "redirect_slug_302");
    const redirect_slug_302_en = Utils.getField(translates, "en", "redirect_slug_302");
    const redirect_slug =  Utils.getField(translates, "vi", "redirect_slug");
    const redirect_slug_en =  Utils.getField(translates, "en", "redirect_slug");
    setDetailForm({
      vie_category_name: vie,
      eng_category_name: eng,
      vie_slug,
      eng_slug,
      title_seo,
      title_seo_en,
      description_seo,
      description_seo_en,
      redirect_slug_302,
      redirect_slug_302_en,
      redirect_slug,
      redirect_slug_en
    })
    setMode(NEWS_CATEGORIES_SCREEN_EDIT_MODE);
    setCurrentUpdateId(item.id);
    setIsOpenCreateModal(true);
  }

  const handleSave = (form) => {
    console.log(form);
    try {
      if (mode === NEWS_CATEGORIES_SCREEN_CREATION_MODE) {
        addNewCate(AppURL.postNewsCategory, form).then(() => {
          setUpdate(!update);
        })
      } else {
        const url = Utils.replaceStrUrl(AppURL.updateNewsCategory, [
          currentUpdateId
        ])
        putApi(url, form).then(() => {
          setUpdate(!update);
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpenCreateModal(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Danh sách chuyên mục tin tức</div>
        <PrimaryButton
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
        >
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
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows
        }}
        onEdit={handleOpenEditModal}
        setData={setData}
      />
      <p className={classes.note}>* Kéo thả các tab để thay đổi thứ tự</p>
      <CreationModal
        title={mode === NEWS_CATEGORIES_SCREEN_CREATION_MODE ? 'Thêm mới chuyên mục' : 'Chỉnh sửa chuyên mục'}
        isOpen={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        form={detailForm}
        onSave={handleSave}
        mode={mode}
      />
      <ConfirmModal
        isOpen={confirmDelete}
        type="delete"
        title="Xoá chuyên mục tin tức"
        okText="Xoá"
        onOk={handleDeleteSelectedRows}
        onClose={() => setConfirmDelete(false)}
      >
        <p>Bạn có chắc muốn xóa những danh mục đã chọn?</p>
      </ConfirmModal>
    </div>
  );
}