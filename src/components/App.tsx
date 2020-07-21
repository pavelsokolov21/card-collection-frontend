import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { client } from "../store";
import { IS_AUTH, GET_REFRESH_TOKEN } from "../queries";
import { HomePage, CollectionPage, LoginPage, RegistrationPage } from "../pages";
import { Header } from "./header/header";

interface AuthData {
  isAuth: boolean;
}

const NonAuthPaths = () => (
  <>
    <Route exact path="/login" component={LoginPage}/>
    <Route exact path="/registration" component={RegistrationPage}/>
  </>
)

const App: React.FC = () => {
  const dataClient = useQuery(IS_AUTH);

  const [setRefreshToken] = useMutation(GET_REFRESH_TOKEN);

  setRefreshToken().then(() => {
    client.writeQuery({
      query: IS_AUTH,
      data: {
        isAuth: true
      }
    });
  }).catch(() => {
    client.writeQuery({
      query: IS_AUTH,
      data: {
        isAuth: false
      }
    });
  });

  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/collections/:id" component={CollectionPage}/>
        {
          !dataClient?.data?.isAuth
            ? <NonAuthPaths/>
            : <Redirect to="/"/>
        }
      </Switch>
    </Router>
  );
};

export default App;
