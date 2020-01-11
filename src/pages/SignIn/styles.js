import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 30px;
`;

export const Logo = styled.Image``;

export const Input = styled.TextInput`
  height: 46px;
  align-self: stretch;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 20px;
  padding: 0 15px;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 46px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #df4723;
  margin-top: 10px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
