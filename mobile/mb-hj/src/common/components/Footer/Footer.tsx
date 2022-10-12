import React from 'react'
import {Text, View} from 'react-native'

function Footer() {
  return (
    <View style={{
      backgroundColor: '#0D8DC8',
      padding: 20,
    }}>
      <Text style={{color: 'white'}}>SÀN THƯƠNG MẠI ĐIỆN TỬ HELLOJOB.JP</Text>
      <Text style={{color: 'white', fontSize: 12, marginVertical: 10}}>Đơn vị chủ quản: CÔNG TY CỔ PHẦN HELLOJOB</Text>
      <Text style={{color: 'white', fontSize: 12, marginVertical: 10}}>
        Tầng 21, Tòa nhà Viwaseen, Số 48 Tố Hữu, Phường Trung Văn, Quận, Nam Từ
        Liêm, Thành phố Hà Nội, Việt Nam
      </Text>
      <Text style={{color: 'white', fontSize: 12, marginVertical: 10}}>Người đại diện chịu trách nhiệm: Nguyễn Quốc Việt</Text>
      <Text style={{color: 'white', fontSize: 12, marginTop: 10}}>
        Số GCNĐKDN: 0109000738 | Ngày cấp: 25/11/2019 | Nơi cấp: Sở Kế hoạch &
        Đầu tư TP Hà Nội
      </Text>
    </View>
  )
}

export default Footer
