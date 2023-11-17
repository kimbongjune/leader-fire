import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { checkboxTheme } from './components/checkbox';

export const theme: Record<string, any> = extendTheme({
  colors: {
    ...baseTheme.colors,
    blue: { 50: '#EDF5FF', 100: '#D0E2FF', 200: '#A6C8FF', 300: '#78A9FF', 400: '#4589FF', 500: '#0F62FE', 600: '#0043CE', 700: '#002D9C', 800: '#001D6C', 900: '#001141' },
    gray: { 50: '#F4F4F4', 100: '#E0E0E0', 200: '#C6C6C6', 300: '#A8A8A8', 400: '#8D8D8D', 500: '#6F6F6F', 600: '#525252', 700: '#393939', 800: '#262626', 900: '#161616' },
    coolGray: { 50: '#F2F4F8', 100: '#DDE1E6', 200: '#C1C7CD', 300: '#A2A9B0', 400: '#878D96', 500: '#697077', 600: '#4D5358', 700: '#343A3F', 800: '#21272A', 900: '#121619' },
    warmGray: { 50: '#F7F3F2', 100: '#E5E0DF', 200: '#CAC5C4', 300: '#ADA8A8', 400: '#8F8B8B', 500: '#736F6F', 600: '#565151', 700: '#3C3838', 800: '#272525', 900: '#171414' },
    green: { 50: '#ECFFF9', 100: '#D1FFF0', 200: '#B7FFE7', 300: '#98EFD2', 400: '#70E1BB', 500: '#44D1A2', 600: '#0CB07A', 700: '#00714B', 800: '#005337', 900: '#003725' },
    black: '#000',
    white: '#fff',
  },
  fonts: {
    heading: `Prentendard-Bold, sans-serif`,
    body: `Prentendard-Regular, sans-serif`,
  },
  breakpoints: {
    sm: '1080px',
  },
  components: {
    Drawer: {
      parts: ['dialog', 'header', 'body'],
      variants: {
        default: {
          dialog: {
            maxW: '311px',
          },
        },
        sop: {
          dialog: {
            maxW: '240px',
          },
        },
      },
    },
    Checkbox: checkboxTheme,
  },
});
