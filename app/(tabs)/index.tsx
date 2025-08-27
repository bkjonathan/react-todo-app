import {StyleSheet, Text, View} from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>Edit app/index.tsx to edit this screen. good</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 container:{
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
 }
})