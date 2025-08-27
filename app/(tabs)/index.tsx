import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme, { ColorScheme } from '@/hooks/useTheme';

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen. good</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
}
const createStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      backgroundColor: colors.bg,
    },
    content: {
      fontSize: 22,
    },
  });
};
