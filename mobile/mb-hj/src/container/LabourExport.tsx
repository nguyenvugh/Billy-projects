import {Container} from 'native-base'
import React from 'react'
import {Dimensions, FlatList, Image, ScrollView, Text, View} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Images from '../common/assets'
import AnimInput from '../common/components/AnimInput/AnimInput'
import AnimTabBar from '../common/components/AnimTabBar/AnimTabBar'
import Footer from '../common/components/Footer/Footer'
import ItemGridView from '../common/components/ItemGridView/ItemGridView'
import Section from '../common/components/Section/Section'

const {width} = Dimensions.get('window')

const mockSlider = [
  {
    id: 1,
    image:
      'https://venngage-wordpress.s3.amazonaws.com/uploads/2020/04/Curves-Twitch-Banner-Template.png',
  },
  {
    id: 2,
    image:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/purple-offline-twitch-banner-design-template-3f62872881b43337423de4c6c3988975_screen.jpg?ts=1597663004',
  },
  {
    id: 3,
    image:
      'https://vengreso.com/wp-content/uploads/2019/01/LinkedIn-Banner-Template-by-LinkedIn-Expert-Viveka-von-Rosen.jpg',
  },
]

const dataJob = [
  {
    id: 1,
    tag: 'XKLĐ',
    image:
      'https://imgmedia.lbb.in/media/2021/08/610a3e039a828c7bd6604c24_1628061187028.jpg',
    offer: '28.5tr',
    real_receive: '25tr',
    title: 'Dệt may mặc, May (quần áo), Shikoku',
    posted_by: 'Hello Job',
    score: 170,
    expired_apply: '31/03/2022',
  },
  {
    id: 2,
    tag: 'XKLĐ',
    image:
      'https://imgmedia.lbb.in/media/2021/08/610a3e039a828c7bd6604c24_1628061187028.jpg',
    offer: '28.5tr',
    real_receive: '25tr',
    title: 'Dệt may mặc, May (quần áo), Shikoku',
    posted_by: 'Hello Job',
    score: 170,
    expired_apply: '31/03/2022',
  },
  {
    id: 3,
    tag: 'XKLĐ',
    image:
      'https://imgmedia.lbb.in/media/2021/08/610a3e039a828c7bd6604c24_1628061187028.jpg',
    offer: '28.5tr',
    real_receive: '25tr',
    title: 'Dệt may mặc, May (quần áo), Shikoku',
    posted_by: 'Hello Job',
    score: 170,
    expired_apply: '31/03/2022',
  },
  {
    id: 4,
    tag: 'XKLĐ',
    image:
      'https://imgmedia.lbb.in/media/2021/08/610a3e039a828c7bd6604c24_1628061187028.jpg',
    offer: '28.5tr',
    real_receive: '25tr',
    title: 'Dệt may mặc, May (quần áo), Shikoku',
    posted_by: 'Hello Job',
    score: 170,
    expired_apply: '31/03/2022',
  },
  {
    id: 5,
    tag: 'XKLĐ',
    image:
      'https://imgmedia.lbb.in/media/2021/08/610a3e039a828c7bd6604c24_1628061187028.jpg',
    offer: '28.5tr',
    real_receive: '25tr',
    title: 'Dệt may mặc, May (quần áo), Shikoku',
    posted_by: 'Hello Job',
    score: 170,
    expired_apply: '31/03/2022',
  },
  {
    id: 6,
    tag: 'XKLĐ',
    image:
      'https://imgmedia.lbb.in/media/2021/08/610a3e039a828c7bd6604c24_1628061187028.jpg',
    offer: '28.5tr',
    real_receive: '25tr',
    title: 'Dệt may mặc, May (quần áo), Shikoku',
    posted_by: 'Hello Job',
    score: 170,
    expired_apply: '31/03/2022',
  },
]

const LabourExport = () => {
  return (
    <ScrollView>
      <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={Images.logo}
            style={{width: 100, height: 60, resizeMode: 'contain'}}
          />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image
              source={Images.ic_location}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                marginHorizontal: 5,
              }}
            />
            <Image
              source={Images.ic_noti}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                marginHorizontal: 5,
              }}
            />
            <Image
              source={Images.ic_profile}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                marginHorizontal: 5,
              }}
            />
          </View>
        </View>
        <AnimTabBar />
        <View
          style={{
            marginVertical: 10,
          }}>
          <AnimInput />
        </View>
        <View>
          <Carousel
            width={width - 40}
            height={100}
            data={mockSlider}
            renderItem={({item}) => (
              <Image
                source={{uri: item.image}}
                style={{width: width - 40, height: 100}}
              />
            )}
          />
        </View>
        <Section
          dataJob={dataJob}
          title={'Việc làm được tìm kiếm nhiều nhất'}
        />
        <Section dataJob={dataJob} title={'Việc làm tốt nhất'} />
        <Section dataJob={dataJob} title={'Việc làm đặc định nổi bật'} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Các công ty hàng đầu
        </Text>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          renderItem={() => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#D2D2D2',
                borderWidth: 1,
                marginRight: 15,
              }}>
              <Image source={Images.logo} style={{height: 30, width: 30}} />
            </View>
          )}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            marginTop: 20,
          }}>
          Ngành nghề trọng điểm
        </Text>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          renderItem={() => (
            <View
              style={{
                width: 120,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#D2D2D2',
                borderWidth: 1,
                marginRight: 15,
                paddingVertical: 15,
              }}>
              <Image
                source={{
                  uri: 'https://imgmedia.lbb.in/media/2021/08/610a3e039a828c7bd6604c24_1628061187028.jpg',
                }}
                style={{height: 90, width: 90}}
              />
              <Text style={{marginVertical: 5}}>NÔNG NGHIỆP</Text>
              <Text style={{fontSize: 12, color: '#9B999A', marginBottom: 5}}>
                500 công việc
              </Text>
            </View>
          )}
        />
      </View>
      <Footer />
    </ScrollView>
  )
}

export default LabourExport
