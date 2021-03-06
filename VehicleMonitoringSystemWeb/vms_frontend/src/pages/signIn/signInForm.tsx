import * as React from "react";
import * as routes from "../../constants/routes";
import { auth } from "../../firebase";
import {Button, TextField} from "@material-ui/core";
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import {PasswordForgetLink} from "../passwordForget";
import {HOME} from "../../constants/routes";
import * as AuthApi from "../../api/authApi";
import {getDbUser, isUserDriver} from "../../utils/userUtil";

interface InterfaceProps {
  error?: any;
  history?: any;
}

interface InterfaceState {
  email: string;
  error: any;
  password: string;
}

export class SignInForm extends React.Component<InterfaceProps, InterfaceState> {
  private static INITIAL_STATE = {
    email: "",
    error: null,
    password: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...SignInForm.INITIAL_STATE };
  }

   public async componentDidMount() {
       // Redirect back to home if user is logged in
       const dbUser = await getDbUser();
       if (!!dbUser && !isUserDriver(dbUser)) {
           const {history} = this.props;
           history.push(HOME);
       }
   }

  public onSubmit = (event: any) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(async () => {
        this.setState(() => ({ ...SignInForm.INITIAL_STATE }));

        const dbUser = await AuthApi.getCurrentUser();
        if (!dbUser) {
            this.setState(SignInForm.propKey("error", {message: 'User is not found in database'}));
            await auth.doSignOut();
            return;
        }

        if (isUserDriver(dbUser)) {
            this.setState(SignInForm.propKey("error", {message: 'Drivers can\'t login web-app'}));
            await auth.doSignOut();
            return;
        }

        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(SignInForm.propKey("error", error));
      });
  };

  public render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={event => this.onSubmit(event)} style={styles.container}>
        <h1>Sign In</h1>
        <TextField
          value={email}
          onChange={event => this.setStateWithEvent(event, "email")}
          type="text"
          placeholder="Email Address"
          style={styles.textInput}
        />
        <TextField
          value={password}
          onChange={event => this.setStateWithEvent(event, "password")}
          type="password"
          placeholder="Password"
          style={styles.textInput}
        />
        <Button disabled={this.isSignInDisabled()} variant='contained' type='submit' color='primary'>
          Sign In
        </Button>

        {error && <p>{error.message}</p>}

        <PasswordForgetLink />
      </form>
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, (event.target as any).value));
  }

  private isSignInDisabled() {
    const { email, password } = this.state;
    return password === "" || email === "";
  }
}

const styles: StylesDictionary  = {
  container: {
    display: 'flex',
    height: '100vh',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textInput: {
    width: 200,
    marginTop: 5,
    marginBottom: 5,
  }
};
