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
import {StylesDictionary} from "./components/utils/stylesDictionary";
import {clearUsers, setDbUser, setFirebaseUser} from "./utils/userUtil";
import {Chat} from "./pages/chat";
import {SignalRService} from "./services/signalR/signalRService";
import { Notifications } from 'react-push-notification';
import {CompanySettings} from "./pages/companySettings";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Colors from "./constants/colors";

interface AppComponentState {
  firebaseUser: any;
  dbUser: Employee|null;
  sidebarDisplay: boolean;
  sidebarComponent: React.ReactNode;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary
    },
  },
});

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

  public async componentDidMount() {
    await clearUsers();

    firebase.auth.onAuthStateChanged(async firebaseUser => {
      if (!!firebaseUser) {
        await setFirebaseUser(firebaseUser);
        const dbUser = await AuthApi.getCurrentUser();
        if (!!dbUser) {
          await setDbUser(dbUser);
          await this.setState(() => ({firebaseUser, dbUser}))
          // signalR connection establish
          SignalRService.startConnection(dbUser.id);
        }
      } else {
        await this.setState(() => ({firebaseUser: null, dbUser: null}))
        await clearUsers();
        // signalR connection stop
        await SignalRService.stopConnection();
      }
    });
  }

  public async componentWillUnmount() {
    // signalR connection stop
    await SignalRService.stopConnection();
    await clearUsers();
  }

  public setSidebarDisplay = async (display: boolean) => {
    await this.setState({sidebarDisplay: display});
  }

  public setSidebarComponent = async (comp: React.ReactNode) => {
    await this.setState({sidebarComponent: comp});
  }

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Navigation dbUser={this.state.dbUser}
                        setSidebarDisplay={this.setSidebarDisplay}
                        setSidebarComponent={this.setSidebarComponent}/>
            <div style={styles.container}>
              <Notifications/>
              <Sidebar childComp={this.state.sidebarComponent} display={this.state.sidebarDisplay}/>
              <Switch>
                {/*No auth*/}
                <Route exact={true} path={routes.LANDING} component={Landing} />
                <Route exact={true} path={routes.SIGN_IN} component={SignIn} />
                <Route exact={true} path={routes.PASSWORD_FORGET} component={PasswordForget}/>

                {/*Auth*/}
                <Route exact={true} path={routes.HOME} render={(props => <HomeScreen key={this.state.dbUser && this.state.dbUser.id}/>)} />
                <Route exact={true} path={routes.ACCOUNT} render={props => <Account key={this.state.dbUser && this.state.dbUser.id}/>} />
                <Route exact={true} path={routes.CHAT} render={props => <Chat key={this.state.dbUser && this.state.dbUser.id}/>} />
                <Route exact={true} path={routes.COMPANY_SETTINGS} render={props => <CompanySettings key={this.state.dbUser && this.state.dbUser.id}/>} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

// TODO can scroll the map out to the right
const styles: StylesDictionary  = {
  container: {
    display: 'flex',
    flexFlow: 'row',
    height: '100vh'
  }
};


export const App = withAuthentication(AppComponent);
