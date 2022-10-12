import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@clvtube/common/navigators/Root'

export interface IinitialState {
  numberTranscipt: number
  totalTranscipt: number
  loopVideo: boolean
}
export type VideoDetailPageProps = NativeStackScreenProps<
  RootStackParamList,
  'VideoDetails'
>
export interface ItemProps {
  index: number
  scrollX: number
}
