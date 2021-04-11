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
import {clearUsers, setDbUser, setFirebaseUser} from "./utils/UserUtil";
import {Chat} from "./pages/Chat";
import {SignalRService} from "./services/SignalR/signalRService";

interface AppComponentState {
  firebaseUser: any;
  dbUser: Employee|null;
  sidebarDisplay: boolean;
  sidebarComponent: React.ReactNode;
}

class AppComponent extends React.Component<{}, AppComponentState> {
  private chatHub: SignalRService;

  constructor(props: any) {
    super(props);

    this.state = {
      firebaseUser: null,
      dbUser: null,
      sidebarDisplay: false,
      sidebarComponent: null
    };
    this.chatHub = new SignalRService();
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
          // Chat hub connection establish
          this.chatHub.startConnection(dbUser.id);
        }
      }
      else {
        this.setState(() => ({ firebaseUser: null, dbUser: null }))
        clearUsers();
        // Chat hub connection stop
        await this.chatHub.stopConnection();
      }
    });
  }

  public async componentWillUnmount() {
    // Chat hub connection stop
    await this.chatHub.stopConnection();
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
