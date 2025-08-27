import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '@/hooks/useTheme';

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen. good</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
