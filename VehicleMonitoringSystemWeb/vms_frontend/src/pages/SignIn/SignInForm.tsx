import * as React from "react";
import * as routes from "../../constants/Routes";
import { auth } from "../../firebase";
import {Button, InputLabel, TextField} from "@material-ui/core";
import {StylesDictionary} from "../../utils/StylesDictionary";
import Colors from "../../constants/Colors";
import {PasswordForgetLink} from "../PasswordForget";

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

  public onSubmit = (event: any) => {
    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...SignInForm.INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(SignInForm.propKey("error", error));
      });

    event.preventDefault();
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
        <Button disabled={this.isSignInDisabled()} style={styles.button}>
          <InputLabel style={styles.buttonText}>Sign In</InputLabel>
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
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput: {
    width: 200,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    width: 200,
    backgroundColor: Colors.primaryBlue,
    marginTop: 20
  },
  buttonText: {
    color: Colors.white,
    alignContent: 'center'
  }
};
