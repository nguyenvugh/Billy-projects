import { Divider, Grid, makeStyles, Paper } from '@material-ui/core';
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import ConfirmDelete from 'app/components/ConfirmDelete';
import { ACTION_TYPE } from 'app/reducers/branch';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Input from '../components/Input';
import Select from '../components/Select';
import { urlBranch } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

function BranchesDepartmentDetail({ match }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const id = match.params.id;
  const branch = useSelector((store) => store.branch.branch);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

  useEffect(() => {
    if (branch?.id?.toString() !== id) {
      history.push(urlBranch);
      return;
    }
  }, [branch?.id, id])

  const handleEdit = () => {
    history.push(`${urlBranch}/edit/${id}`);
  };

  const handleOpenDeletePopup = () => {
    setIsOpenDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setIsOpenDeletePopup(false);
  };


  const handleDelete = () => {
    dispatch({
      type: ACTION_TYPE.DELETE_BRANCH_LIST_REQUEST,
      data: { ids: [branch?.id] },
      success: () => {
        history.push(urlBranch);
      },
    })
  };

  return (
    <div className={classes.root}>
      <ConfirmDelete
        open={isOpenDeletePopup}
        onOK={handleDelete}
        onClose={handleCloseDeletePopup}
        title='XÓA VĂN PHÒNG ĐẠI DIỆN'
        message="Bạn có chắc muốn xóa văn phòng đã chọn?"
      />
      <div className="page-header">
        <div className="page-title">
          <Breadcrumbs
            links={[{
              href: "#",
              label: branch?.name,
            }]}
          />
        </div>
        <PrimaryButton onClick={handleEdit}>
          Chỉnh sửa
        </PrimaryButton>
        <DangerButton onClick={handleOpenDeletePopup}>
          Xoá
        </DangerButton>
      </div>
      <Paper elevation={0} className={classes.inner}>
        <h5 className={classes.title}>Văn phòng
        </h5>
        <Divider />
        <Grid container spacing={4} style={{ marginTop: 12 }}>
          <Grid item xs>
            {/* 1 */}
            <Grid container item spacing={4}>
              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Tên văn phòng'
                  value={branch?.name}
                />
              </Grid>

              <Grid item xs>
                <Select
                  readOnly
                  required
                  labelName='Tỉnh/ thành phố'
                  value={branch?.city}
                />
              </Grid>

              <Grid item xs>
                <Select
                  readOnly
                  required
                  labelName='Quận/ huyện'
                  value={branch?.district}
                />
              </Grid>

            </Grid>
            {/* 2 */}
            <Grid container item spacing={4}>
              <Grid item xs>
                <Select
                  readOnly
                  required
                  labelName='Phường/ xã'
                  value={branch?.ward}
                />
              </Grid>

              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Địa chỉ'
                  value={branch?.address}
                />
              </Grid>


              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Hotline'
                  value={branch?.phone_number}
                />
              </Grid>

            </Grid>
            {/* 3 */}
            <Grid container item spacing={4}>
              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Fax'
                  value={branch?.fax}
                />
              </Grid>

              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Kinh độ'
                  value={branch?.long}
                />
              </Grid>

              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Vĩ độ'
                  value={branch?.lat}
                />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </div >
  );
}

BranchesDepartmentDetail.defaultProps = {
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 12
  },
  inner: {
    padding: '16px 24px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#0000000',

    margin: '12px 0'
  },
  chain: {
    display: 'flex',
    width: '10px',
    height: '2px',
    backgroundColor: '#000000',

    position: 'absolute',
    bottom: '33px',
    left: '-5px'
  }
}));


export default BranchesDepartmentDetail;