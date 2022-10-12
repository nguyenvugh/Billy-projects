
import { Card, CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DefaultAvatar from 'app/assets/default/default-user.png';
const useStyles = makeStyles((theme) => ({
  img: {
    borderRadius: '40px'
  },
}));

export default function Content({ data }) {
  const classes = useStyles();

  const {
    id,
    name,
    created_at_string,
    phone_number,
    email,
    sex,
    address,
    birthday,
    avatar,
    ward, district, city, country,
  } = data;

  return (
    <Grid container spacing={3}>
      <Grid item md={4} className={classes.contentBlock}>
        <div className="info-content">
          <div className="info-label">Tên người dùng</div>
          <div className="info-value">{name}</div>
        </div>
        <div className="info-content">
          <div className="info-label">Số điện thoại</div>
          <div className="info-value">{phone_number}</div>
        </div>
        <div className="info-content">
          <div className="info-label">Giới tính</div>
          <div className="info-value">{sex === 1 ? 'Nam' : 'Nữ'}</div>
        </div>
        <div className="info-content">
          <div className="info-label">Ngày sinh</div>
          <div className="info-value">{birthday}</div>
        </div>
      </Grid>
      <Grid item md={5}>
        <div className="info-content">
          <div className="info-label">Thời gian tạo</div>
          <div className="info-value">{created_at_string}</div>
        </div>
        <div className="info-content">
          <div className="info-label">Email</div>
          <div className="info-value">{email}</div>
        </div>
        <div className="info-content">
          <div className="info-label">Địa chỉ</div>
          <div className="info-value">{address}, {ward}, {district}, {city}, {country}</div>
        </div>
        <div className="info-content">
          <div className="info-label">Lý do khóa</div>
          <div className="info-value">{data?.lock_reason}</div>
        </div>
      </Grid>
      <Grid item md={3}>
        <Card className={classes.img}>
          <CardMedia
            image={avatar || DefaultAvatar}
            style={{ paddingBottom: "100%" }}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
