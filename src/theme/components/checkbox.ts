import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  control: {
    width: '24px',
    height: '24px',
  },
});

const orangeCheckbox = definePartsStyle({
  control: defineStyle({
    backgroundImage: "url('/images/icons/checkbox.svg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    _checked: {
      backgroundImage: "url('/images/icons/checkbox_checked.svg')",
      border: 'none',
      background: 'none',
      _hover: {
        backgroundImage: "url('/images/icons/checkbox_checked.svg')",
        border: 'none',
        background: 'none',
      },
    },
  }),
});

const variants = {
  orangeCheckbox: orangeCheckbox,
};

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
});
