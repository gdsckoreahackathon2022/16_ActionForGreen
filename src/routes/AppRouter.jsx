import React from "react";
import signup from "components/screen/signup";
import findpw from "components/screen/findpw";
import resetpw from "components/screen/resetpw";
import settings from "components/screen/settings";
import login from "components/screen/login";
import DashboardContainer from "components/Dashboard/containers/DashboardContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" exact component={DashboardContainer} />
        <Route path="/" exact component={login} />
      </Switch>
      <Switch>
        <Route path="/signup" exact component={signup} />
      </Switch>
      <Switch>
        <Route path="/findpw" exact component={findpw} />
      </Switch>
      <Switch>
        <Route path="/resetpw" exact component={resetpw} />
      </Switch>
      <Switch>
        <Route path="/settings" exact component={settings} />
      </Switch>
      <Switch>
        <Route path="/login" exact component={login} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
