import styled from "styled-components/native";

export const OuterContainer = styled.View`
  flex-direction: column;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 3px;
  height: 65px;
`;

export const DateContainer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const DateText = styled.Text`
  color: #8a96aa;
  font-size: 15px;
  line-height: 21px;
`;

export const HeaderText = styled.Text`
  font-size: 18px;
  line-height: 21.09px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #495162;
`;

export const CryptoComponent = styled.View`
  background: #ffffff;
  border: 2px solid #f6f6f6;
  border-radius: 15px;
  width: 343px;
  height: 140px;
`;

export const MainContainer = styled.View`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
