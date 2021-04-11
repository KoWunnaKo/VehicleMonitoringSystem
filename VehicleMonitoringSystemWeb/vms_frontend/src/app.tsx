import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "./constants/routes";
import { firebase } from "./firebase";
import * as AuthApi from "./api/authApi";
import { withAuthentication } from "./firebase/withAuthentication";
import { Account } from "./pages/account";
import { HomeScreen } from "./pages/home";
import { Landing } from "./pages/landing";
import { PasswordForget } from "./pages/passwordForget";
import { SignIn } from "./pages/signIn";
import { Navigation } from "./components/navigation/navigation";
import Employee from "./models/employee";
import {Sidebar} from "./components/sidebar/sidebar";
import {StylesDictionary} from "./utils/stylesDictionary";
import {clearUsers, setDbUser, setFirebaseUser} from "./utils/userUtil";
import {Chat} from "./pages/chat";
import {SignalRService} from "./services/signalR/signalRService";

interface AppComponentState {
  firebaseUser: any;
  dbUser: Employee|null;
  sidebarDisplay: boolean;
  sidebarComponent: React.ReactNode;
}

class AppComponent extends React.Component<{}, AppComponentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      firebaseUser: null,
      dbUser: null,
      sidebarDisplay: false,
      sidebarComponent: null
    };
  }

  public componentDidMount() {
    clearUsers();
    firebase.auth.onAuthStateChanged(async firebaseUser => {
      if (!!firebaseUser) {
        setFirebaseUser(firebaseUser);
        const dbUser = await AuthApi.getCurrentUser();
        if (!!dbUser) {
          setDbUser(dbUser);
          this.setState(() => ({firebaseUser, dbUser}))
          // signalR connection establish
          SignalRService.startConnection(dbUser.id);
        }
      }
      else {
        this.setState(() => ({ firebaseUser: null, dbUser: null }))
        clearUsers();
        // signalR connection stop
        await SignalRService.stopConnection();
      }
    });
  }

  public async componentWillUnmount() {
    // signalR connection stop
    await SignalRService.stopConnection();
    clearUsers();
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
          <Navigation dbUser={this.state.dbUser}
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
              <Route exact={true} path={routes.CHAT} component={Chat} />

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
