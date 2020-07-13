import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "react-jss";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "../theme";
import { Header } from "../components";

storiesOf("Header", module).add("Default", () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </Router>
  );
});
