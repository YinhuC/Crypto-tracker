import styled from "styled-components/native";

export const OuterContainer = styled.View`
  flex-direction: column;
  background-color: white;
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

export const CryptoComponent = styled.TouchableOpacity`
  border-radius: 15px;
  width: 343px;
  height: 140px;
  margin-bottom: 16px;
  border-style: solid;
  border-width: 2px;
`;

export const MainContainer = styled.View`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DetailComponent = styled.View`
  height: 56px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const DetialLeft = styled.View`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const DetialRight = styled.View`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

export const Icon = styled.Image`
  height: 36px;
  width: 36px;
  margin-left: 14px;
  margin-right: 12px;
`;

export const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
`;

export const Input = styled.TextInput`
  height: 50px;
  width: 80%;
  border-width: 1px;
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 18px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom-width: 1px;
`;

export const ResultContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
  margin: 20px;
`;

export const Result = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 8px;
  margin-left: 20px;
`;
