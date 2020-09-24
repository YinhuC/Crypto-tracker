import styled from "styled-components";
import { Text, View } from "react-native";

export const OuterContainer = styled(View)`
  flex-direction: column;
`;

export const HeaderContainer = styled(View)`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 3px;
  height: 65px;
  margin-left: 28%;
`;

export const DateContainer = styled(View)`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const DateText = styled(Text)`
  color: #8a96aa;
  font-size: 15px;
  line-height: 21px;
`;

export const HeaderText = styled(Text)`
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #495162;
`;
