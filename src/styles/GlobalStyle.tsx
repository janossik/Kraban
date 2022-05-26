import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,*::after,*::before{
      box-sizing: border-box;
      font-family:${({ theme: { font } }) => font.family.primary};
      margin-top:0px;
    }
    body{
      min-height:100vh;
      margin:0;
      padding-top: 50px;
      background-color: ${({ theme: { color } }) => color.background};
      font-size:16px;
      font-weight:${({ theme: { font } }) => font.weight.regular};
      color: ${({ theme }) => theme.color.primaryText};
      background: ${({ theme }) => theme.color.background};
      position: relative;
      overflow-x: hidden;
    }
    li{
      letter-spacing: 1px;
    }
    textarea{
      resize: none;
    }

    #__next{
      min-height: calc(100vh - 60px);
    }

    ::-webkit-scrollbar {
      width:  8px;
      @media screen and (min-width: ${({ theme }) => theme.screenSize.small}) {
        width: 10px;
  }
    }

    ::-webkit-scrollbar-track {
      background:grey;
    }

    ::-webkit-scrollbar-thumb {
      background:${({ theme: { color } }) => color.tertiary};
    }

    ::-webkit-scrollbar-thumb:hover {
      opacity: 1;
    }
`;

export default GlobalStyle;
