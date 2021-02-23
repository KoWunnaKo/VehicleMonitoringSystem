import * as React from "react";
import { auth, db } from "../../firebase";
// import * as AuthApi from "../../api/AuthApi";
// import Employee from "../../models/Employee";
import {IStylesDictionary} from "../../utils/IStylesDictionary";
import Colors from "../../constants/Colors";
import * as Routes from "constants/Routes"

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  passwordOne?: string;
  passwordTwo?: string;
  username?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  passwordOne: string;
  passwordTwo: string;
    username: string;
}

export class SignUpForm extends React.Component<InterfaceProps, InterfaceState> {
  private static INITIAL_STATE = {
    email: "",
    error: null,
    passwordOne: "",
    passwordTwo: "",
    username: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...SignUpForm.INITIAL_STATE };
  }

  public async onSubmit(event: any) {
      event.preventDefault();

      const {email, passwordOne, username} = this.state;
      const {history} = this.props;

      // Firebase create user
      auth
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then((authUser: any) => {

              // Create a user in your own accessible Firebase Database too
              db.doCreateUser(authUser.user.uid, username, email)
                  .then(() => {

                      this.setState(() => ({...SignUpForm.INITIAL_STATE}));
                      history.push(Routes.HOME);

                      // const employee: Employee = new Employee(authUser.user.uid);
                      // AuthApi.signUp(employee);
                  })
                  .catch(error => {
                      this.setState(SignUpForm.propKey("error", error));
                  });
          })
          .catch(error => {
              this.setState(SignUpForm.propKey("error", error));
          });
  }

  public render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
        username === "";

    return (
      <form onSubmit={(event) => this.onSubmit(event)} style={styles.container}>
        <input
          value={username}
          onChange={event => this.setStateWithEvent(event, "username")}
          type="text"
          placeholder="First Name"
          style={styles.textInput}
        />
        <input
          value={email}
          onChange={event => this.setStateWithEvent(event, "email")}
          type="text"
          placeholder="Email Address"
          style={styles.textInput}
        />
        <input
          value={passwordOne}
          onChange={event => this.setStateWithEvent(event, "passwordOne")}
          type="password"
          placeholder="Password"
          style={styles.textInput}
        />
        <input
          value={passwordTwo}
          onChange={event => this.setStateWithEvent(event, "passwordTwo")}
          type="password"
          placeholder="Confirm Password"
          style={styles.textInput}
        />
        <button disabled={isInvalid} style={styles.button}>
            <text style={{color: Colors.white}}>Sign Up</text>
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(event: any, columnType: string) {
    this.setState(SignUpForm.propKey(columnType, (event.target as any).value));
  }
}

const styles: IStylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    textInput: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
    },
    button: {
        width: 100,
        backgroundColor: Colors.primaryBlue
    }
};
