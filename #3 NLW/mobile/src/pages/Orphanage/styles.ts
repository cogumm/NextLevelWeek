import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import { RectButton } from 'react-native-gesture-handler'

const full_width = Dimensions.get('window').width

export const Container = styled.ScrollView`
  flex: 1;
`

export const ImagesContainer = styled.View`
  height: 240px;
`

export const OrphanageImage = styled.Image`
  width: ${full_width};
  height: 240px;
  resize-mode: cover;
`

export const DetailsContainer = styled.View`
  padding: 24px;
`

export const Title = styled.Text`
  color: #4d6f80;
  font-size: 30px;
  font-family: Nunito_700Bold;
`

export const Description = styled.Text`
  font-family: Nunito_600SemiBold;
  color: #5c8599;
  line-height: 24px;
  margin-top: 16px;
`

export const MapContainer = styled.View`
  border-radius: 20px;
  overflow: hidden;
  border-width: 1.2px;
  border-color: #b3dae2;
  margin-top: 40px;
  background: #e6f7fb;
`

export const Map = styled(MapView)`
  width: 100%;
  height: 150px;
`

export const RoutesButtonContainer = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
  justify-content: center;
`

export const RoutesText = styled.Text`
  font-family: Nunito_700Bold;
  color: #0089a5;
`

export const Separator = styled.View`
  height: 0.8px;
  width: 100%;
  background: #d3e2e6;
  margin: 40px 0;
`

export const ScheduleContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`

export const ScheduleItemClock = styled.View`
  width: 48%;
  padding: 20px;
  background: #e6f7fb;
  border-width: 1px;
  border-color: #b3dae2;
  border-radius: 20px;
`

export const ScheduleItemInfo = styled.View`
  width: 48%;
  padding: 20px;
  background: #edfff6;
  border-width: 1px;
  border-color: #a1e9c5;
  border-radius: 20px;
`

export const ScheduleItemInfoRed = styled.View`
  width: 48%;
  padding: 20px;
  background: #fef6f9;
  border-width: 1px;
  border-color: #ffbcd4;
  border-radius: 20px;
`

export const ScheduleText = styled.Text`
  font-family: Nunito_600SemiBold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
  color: #5c8599;
`

export const ContactButton = styled(RectButton)`
  background: #3cdc8c;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-top: 40px;
`

export const ContactButtonText = styled.Text`
  font-family: Nunito_800ExtraBold;
  color: #fff;
  font-size: 16px;
  margin-left: 16px;
`
