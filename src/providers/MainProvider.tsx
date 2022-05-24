import GlobalStyle from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import { UserProvider } from "@/hooks/useUser";
import { ThemeProvider } from "styled-components";

const MainProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </UserProvider>
  );
};

export default MainProvider;
