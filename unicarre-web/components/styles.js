import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

// Colors object
const Colors = {
  primary: "#6D28D9",
  secondary: "#F3F4F6",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
};

// Destructure colors for easy access
const { primary, brand } = Colors;

// Styled container
export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${(StatusBar.currentHeight || 0) + 10}px;
  background-color: ${primary};
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

// Optional export of Colors
export { Colors };
