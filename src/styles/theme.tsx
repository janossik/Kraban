import "styled-components";

// and extend it
declare module "styled-components" {
  export interface DefaultTheme {
    font: {
      size: {
        small: string;
        regular: string;
        medium: string;
        large: string;
        xlarge: string;
      };
      weight: {
        light: string;
        regular: string;
        medium: string;
        bold: string;
      };
      family: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
    color: {
      primary: string;
      secondary: string;
      tertiary: string;
      background: string;
      primaryText: string;
      secondaryText: string;
    };
    screenSize: {
      small: string;
      default: string;
      large: string;
    };
  }
}

export const theme = {
  font: {
    weight: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "600",
    },
    size: {
      small: "16px",
      regular: "20px",
      medium: "32px",
      large: "40px",
      xlarge: "50px",
    },
    family: {
      primary: `'Quicksand', sans-serif`,
      secondary: ``,
      tertiary: ``,
    },
  },
  color: {
    primary: "#2d2d2d",
    secondary: "#57a4ff",
    tertiary: "rgb(0, 127, 255)",
    background: "#fafafa",
    primaryText: "#16161d",
    secondaryText: "#F8F5FA",
  },
  screenSize: {
    small: "769px",
    default: "1025px",
    large: "1441px",
  },
};
