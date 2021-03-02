import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "../constants/Routes";
import { firebase } from "../firebase";
import * as AuthApi from "../api/AuthApi";
import { withAuthentication } from "../firebase/withAuthentication";
import { Account } from "../pages/Account";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { PasswordForget } from "../pages/PasswordForget";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Navigation } from "./Navigation";
import {AdminConsole} from "../pages/AdminConsole";
import Employee from "../models/Employee";
import {AppController} from "../controllers/AppController";

interface AppComponentState {
  authUser: any;
  dbAuthUser: Employee|null;
}

class AppComponent extends React.Component<{}, AppComponentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      authUser: null,
      dbAuthUser: null
    };
  }

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(async authUser => {
      if (!!authUser) {
        const dbUser = await AuthApi.getCurrentUser();
        AppController.dbUser = dbUser;
        this.setState(() => ({ authUser, dbAuthUser: dbUser }))
      }
      else {
        this.setState(() => ({ authUser: null, dbAuthUser: null }))
        AppController.dbUser = null;
      }
    });
  }


  public render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation dbUser={this.state.dbAuthUser}/>
          <Switch>
            {/*No auth*/}
            <Route exact={true} path={routes.LANDING} component={Landing} />
            <Route exact={true} path={routes.SIGN_IN} component={SignIn} />
            <Route exact={true} path={routes.PASSWORD_FORGET} component={PasswordForget}/>

            {/*Auth*/}
            <Route exact={true} path={routes.SIGN_UP} component={SignUp} />
            <Route exact={true} path={routes.HOME} component={Home} />
            <Route exact={true} path={routes.ACCOUNT} component={Account} />

            {/*Administrator*/}
            <Route exact={true} path={routes.ADMIN_CONSOLE} component={AdminConsole} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export const App = withAuthentication(AppComponent);
