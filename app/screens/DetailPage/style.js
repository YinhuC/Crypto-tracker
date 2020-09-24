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
  width: 335px;
  height: 185px;
  margin-bottom: 30px;
`;

export const MainContainer = styled.View`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DetailComponent = styled.View`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Icon = styled.Image`
  height: 36px;
  width: 36px;
  margin-left: 14px;
  margin-right: 12px;
`;
