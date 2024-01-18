import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children?: React.ReactNode;
}

const Background: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: '#3D8360' }]}>
      {children}
    </View>
  );
};

export default Background;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
