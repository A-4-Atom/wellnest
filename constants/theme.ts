const primaryColor = "#6c47ff";
const backgroundLight = "#f5f3ff"; // light purple background
const backgroundDark = "#1a1333"; // deep purple for dark mode
const textLight = "#1a1333";
const textDark = "#f5f3ff";
const iconLight = "#7c3aed"; // purple-500
const iconDark = "#a78bfa"; // purple-300

export const Colors = {
  light: {
    primary: primaryColor,
    text: textLight,
    background: backgroundLight,
    tint: primaryColor,
    icon: iconLight,
    tabIconDefault: iconLight,
    tabIconSelected: primaryColor,
    border: "#e0e7ff", // light purple border
    card: "#ede9fe", // card background
  },
  dark: {
    primary: primaryColor,
    text: textDark,
    background: backgroundDark,
    tint: primaryColor,
    icon: iconDark,
    tabIconDefault: iconDark,
    tabIconSelected: primaryColor,
    border: "#312e81", // dark purple border
    card: "#2e1065", // card background
  },
};
