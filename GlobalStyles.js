import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  adroidSafeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
