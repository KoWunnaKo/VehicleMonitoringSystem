import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "./constants/Routes";
import { firebase } from "./firebase";
import * as AuthApi from "./api/AuthApi";
import { withAuthentication } from "./firebase/withAuthentication";
import { Account } from "./pages/Account";
import { HomeScreen } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { PasswordForget } from "./pages/PasswordForget";
import { SignIn } from "./pages/SignIn";
import { Navigation } from "./components/Navigation";
import Employee from "./models/Employee";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {StylesDictionary} from "./utils/StylesDictionary";
import {STORAGE_KEY_AUTH_USER, STORAGE_KEY_DB_AUTH_USER} from "./constants/AsyncStorageKeys";

interface AppComponentState {
  authUser: any;
  dbAuthUser: Employee|null;
  sidebarDisplay: boolean;
  sidebarComponent: React.ReactNode;
}

class AppComponent extends React.Component<{}, AppComponentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      authUser: null,
      dbAuthUser: null,
      sidebarDisplay: false,
      sidebarComponent: null
    };
  }

  public componentDidMount() {
    // console.log(`App.componentDidMount`);
    localStorage.clear();
    firebase.auth.onAuthStateChanged(async authUser => {
      if (!!authUser) {
        localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(authUser));
        const dbUser = await AuthApi.getCurrentUser();
        localStorage.setItem(STORAGE_KEY_DB_AUTH_USER, JSON.stringify(dbUser));
        this.setState(() => ({ authUser, dbAuthUser: dbUser }))
      }
      else {
        this.setState(() => ({ authUser: null, dbAuthUser: null }))
        localStorage.clear();
      }
    });
  }

  public componentWillUnmount() {
    // console.log(`App.componentWillUnmount`);
    localStorage.clear();
  }

  public setSidebarDisplay = (display: boolean) => {
    this.setState({ sidebarDisplay: display });
  }

  public setSidebarComponent = (comp: React.ReactNode) => {
    this.setState({ sidebarComponent: comp });
  }

  public render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation dbUser={this.state.dbAuthUser}
                      setSidebarDisplay={this.setSidebarDisplay}
                      setSidebarComponent={this.setSidebarComponent}/>
          <div style={styles.container}>
            <Sidebar childComp={this.state.sidebarComponent} display={this.state.sidebarDisplay}/>
            <Switch>
              {/*No auth*/}
              <Route exact={true} path={routes.LANDING} component={Landing} />
              <Route exact={true} path={routes.SIGN_IN} component={SignIn} />
              <Route exact={true} path={routes.PASSWORD_FORGET} component={PasswordForget}/>

              {/*Auth*/}
              <Route exact={true} path={routes.HOME} component={HomeScreen} />
              <Route exact={true} path={routes.ACCOUNT} component={Account} />

              {/*Administrator*/}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const styles: StylesDictionary  = {
  container: {
    display: 'flex',
    flexFlow: 'row',
    height: '100vh'
  }
};


export const App = withAuthentication(AppComponent);
