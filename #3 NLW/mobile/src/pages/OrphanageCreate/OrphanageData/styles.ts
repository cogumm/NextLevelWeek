import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { Image } from 'react-native'

export const Container = styled.ScrollView`
  flex: 1;
`

export const Title = styled.Text`
  color: #5c8599;
  font-size: 24px;
  font-family: Nunito_700Bold;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom-width: 0.8px;
  border-color: #d3e2e6;
`

export const Label = styled.Text`
  color: #8fa7b3;
  font-family: Nunito_600SemiBold;
  margin-bottom: 8px;
`

export const UploadedImagesContainer = styled.View`
    flex-direction: row;
`

export const UploadedImage = styled(Image)`
    width: 64px;
    height: 64px;

    border-radius: 20px;
    margin-bottom: 32px;
    margin-right: 8px;
`

export const Input = styled.TextInput`
  background: #fff;
  border-width: 1.4px;
  border-color: #d3e2e6;
  border-radius: 20px;
  height: 56px;
  padding: 18px 24px;
  margin-bottom: 16px;
`

export const InputImageButton = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.5);
  border-width: 1.4px;
  border-style: dashed;
  border-color: #96d2f0;
  border-radius: 20px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`

export const NextButton = styled(RectButton)`
  background: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-top: 32px;
`

export const NextButtonText = styled.Text`
  font-family: Nunito_800ExtraBold;
  font-size: 16px;
  color: #fff;
`
