import { FormHelperText, Grid, Typography, Link as LinkUI } from "@material-ui/core";
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from "app/components/Button/DangerButton";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmModal from "app/components/ConfirmModal";
import TextField from "app/components/TextField";
import TreeSelect from "app/components/TreeSelect";
import { ACTION_TYPE } from "app/reducers/authorization";
import { isEmpty } from "app/utils/validate";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { RoleArrayWithKey, RoleObject, RoleTree } from "./tree";

const PageType = {
  DETAIL: "DETAIL",
  EDIT: "EDIT",
  ADD: "ADD",
};
Object.freeze(PageType);


const AddEditAuthorization = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [treeRole, setTreeRole] = useState([]);
  const [pageType, setPageType] = useState(PageType.ADD);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});
  let permissionGroup = useSelector(
    (store) => store.authorization.permissionGroup
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    if (id) {
      dispatch({
        type: ACTION_TYPE.GET_PERMISSION_GROUP_REQUEST,
        id,
      });
      setPageType(PageType.DETAIL);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      setName(permissionGroup?.name ? permissionGroup.name : "");
      setDescription(
        permissionGroup?.description ? permissionGroup.description : ""
      );
    } else {
      permissionGroup = {};
      setName("");
      setDescription("");
      setError({});
    }
  }, [id, permissionGroup?.description, permissionGroup?.name]);

  useEffect(() => {
    let permissions = {};
    if (id) {
      permissions = permissionGroup?.permissions
        ? permissionGroup?.permissions
        : {};
    }
    if (permissions && Array.isArray(RoleArrayWithKey)) {
      for (let i = 0; i < RoleTree.length; i++) {
        let tree = RoleTree[i];
        let childChecked = false;
        if (tree.child) {
          let child = tree.child;
          for (let j = 0; j < child.length; j++) {
            if (permissions && permissions[child[j].key] === true) {
              child[j].checked = true;
              childChecked = true;
            } else {
              child[j].checked = false;
            }
            let permission2 = RoleArrayWithKey.find(
              (item) => item?.key === child[j].key
            );
            if (permission2) {
              child[j].id = permission2?.id;
            }
          }
          tree.checked = childChecked;
        } else {
          if (permissions && permissions[tree.key] === true) {
            tree.checked = true;
          } else {
            tree.checked = false;
          }
          let permission2 = RoleArrayWithKey.find(
            (item) => item?.key === tree.key
          );
          if (permission2) {
            tree.id = permission2?._id;
          }
        }
      }
      setTreeRole(RoleTree);
    }
  }, [permissionGroup?.permissions, treeRole]);

  const treeUpdate = () => {
    let permissions = permissionGroup?.permissions
      ? permissionGroup?.permissions
      : {};
    if (permissions && Array.isArray(RoleArrayWithKey)) {
      for (let i = 0; i < RoleTree.length; i++) {
        let tree = RoleTree[i];
        let childChecked = false;
        if (tree.child) {
          let child = tree.child;
          for (let j = 0; j < child.length; j++) {
            if (permissions && permissions[child[j].key] === true) {
              child[j].checked = true;
              childChecked = true;
            } else {
              child[j].checked = false;
            }
            let permission2 = RoleArrayWithKey.find(
              (item) => item?.key === child[j].key
            );
            if (permission2) {
              child[j].id = permission2?.id;
            }
          }
          tree.checked = childChecked;
        } else {
          if (permissions && permissions[tree.key] === true) {
            tree.checked = true;
          } else {
            tree.checked = false;
          }
          let permission2 = RoleArrayWithKey.find(
            (item) => item?.key === tree.key
          );
          if (permission2) {
            tree.id = permission2?._id;
          }
        }
      }
      setTreeRole(RoleTree);
    }
  }

  const onDelete = () => {
    setConfirmDelete(true);
  };

  const handleDelete = (id) => {
    dispatch({
      type: ACTION_TYPE.DELETE_PERMISSION_GROUP_REQUEST,
      data: `ids=${id}`,
      success: () => {
        setConfirmDelete(false);
        onCancelEdit();
        onList();
      },
    });
  };

  const onList = () => {
    onCancelEdit();
    history.push("/");
  };

  const onCancelEdit = (e) => {
    e?.preventDefault();
    setPageType(PageType.DETAIL);
    setName(permissionGroup?.name);
    setTreeRole([]);
    setDescription(permissionGroup?.description);
    setError({});
  };

  const onSubmit = (e) => {
    e?.preventDefault();
    let error = {};
    if (isEmpty(name)) {
      error.name = "Vui lòng nhập tên nhóm quyền";
    }
    if (isEmpty(description)) {
      error.description = "Vui lòng nhập mô tả nhóm quyền";
    }
    let isDefinedPerm = false;

    let permissionObject = RoleObject;
    let treeRole = RoleTree;
    for (let i = 0; i < treeRole.length; i++) {
      let child = treeRole[i]?.child;
      if (child) {
        for (let j = 0; j < child.length; j++) {
          if (child[j].checked) {
            permissionObject[child[j].key] = true;
            isDefinedPerm = true;
          } else {
            permissionObject[child[j].key] = false;
          }
        }
      } else {
        if (treeRole[i].checked) {
          permissionObject[treeRole[i].key] = true;
          isDefinedPerm = true;
        } else {
          permissionObject[treeRole[i].key] = false;
        }
      }
    }
    if (!isDefinedPerm) error.permission = "Vui lòng thiết lập quyền";
    setError(error);
    if (JSON.stringify(error) !== "{}") return;
    let data = {
      name,
      description,
      permissions: permissionObject,
    };
    dispatch({
      type: id
        ? ACTION_TYPE.EDIT_PERMISSION_GROUP_REQUEST
        : ACTION_TYPE.ADD_PERMISSION_GROUP_REQUEST,
      id,
      data,
      success: () => {
        if (id) {
          dispatch({
            type: ACTION_TYPE.GET_PERMISSION_GROUP_REQUEST,
            id,
          });
          setPageType(PageType.DETAIL);
        } else {
          onCancelEdit();
          onList();
        }
      },
    });
  };
  return (
    <Fragment>
      <ConfirmModal
        isOpen={confirmDelete}
        type="delete"
        onClose={() => setConfirmDelete(false)}
        onOk={() => {
          handleDelete(id);
        }}
        title="Xóa phân quyền"
        children="Bạn có chắc muốn xóa nhóm phân quyền này"
        cancelText="Hủy bỏ"
        okText="Xóa"
      />
      <form>
        <div className="page-header">
          <div className="page-title">
            {pageType === PageType.EDIT ?
              <Breadcrumbs>
                <Link to="/">Danh sách phân quyền</Link>
                <LinkUI href="#" onClick={onCancelEdit}>{permissionGroup?.name}</LinkUI>
                <Typography>
                  Chỉnh sửa
                </Typography>
              </Breadcrumbs> :
              <Breadcrumbs>
                <Link to="/">Danh sách phân quyền</Link>
                <Typography>
                  {pageType === PageType.DETAIL ? permissionGroup?.name : "Thêm mới"}
                </Typography>
              </Breadcrumbs>
            }
          </div>
          {pageType === PageType.DETAIL ? (
            <>
              <PrimaryButton
                onClick={() => setPageType(PageType.EDIT)}
              >
                Chỉnh sửa
              </PrimaryButton>
              <DangerButton onClick={onDelete}>
                Xóa
              </DangerButton>
            </>
          ) : pageType === PageType.ADD ? (
            <>
              <DefaultButton onClick={onList}>
                Huỷ
              </DefaultButton>
              <PrimaryButton onClick={onSubmit}>
                Lưu lại
              </PrimaryButton>
            </>
          ) : (
            <>
              <DefaultButton onClick={onCancelEdit}>
                Huỷ
              </DefaultButton>
              <PrimaryButton onClick={onSubmit}>
                Lưu lại
              </PrimaryButton>
            </>
          )}
        </div>
        <div className="page-content page-content__form">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <div className="label">Tên nhóm *</div>
              <TextField
                style={{ marginTop: 0, marginBottom: 0 }}
                required
                placeholder="Nhập tên nhóm"
                value={name}
                disabled={pageType === PageType.DETAIL}
                onChange={(e) => setName(e.target.value)}
                error={!!error?.name}
                helperText={error?.name ? error.name : ""}
                variant="outlined"
                size="small"
              />
              {pageType === PageType.DETAIL && (
                <>
                  <div className="label">Ngày tạo</div>
                  <TextField
                    style={{ marginTop: 0, marginBottom: 0 }}
                    disabled
                    value={
                      permissionGroup?.created_at
                        ? permissionGroup.created_at
                        : ""
                    }
                    size="small"
                    variant="outlined"
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="label">Mô tả *</div>
              <TextField
                style={{ marginTop: 0, marginBottom: 0 }}
                required
                placeholder="Superadmin"
                value={description}
                disabled={pageType === PageType.DETAIL}
                error={!!error?.description}
                helperText={error?.description ? error.description : ""}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                size="small"
              />
              {pageType === PageType.DETAIL && (
                <>
                  <div className="label">Sĩ số</div>
                  <TextField
                    style={{ marginTop: 0, marginBottom: 0 }}
                    disabled
                    value={permissionGroup?.count ? permissionGroup.count : 0}
                    variant="outlined"
                    size="small"
                  />
                </>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <div className="label">Phân quyền *</div>
              <FormHelperText error={error}>{error && error.permission}</FormHelperText>
              <div
                style={{
                  border: "1px solid #E2E2E2",
                  borderRadius: 4,
                  marginTop: 8,
                }}
              >
                <TreeSelect
                  trees={treeRole}
                  locked={pageType === PageType.DETAIL}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    </Fragment>
  );
};

export default AddEditAuthorization;
