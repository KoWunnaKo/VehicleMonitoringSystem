import * as React from "react";
import { auth, db } from "../../firebase";
import * as AuthApi from "../../api/AuthApi";
import * as RolesApi from "../../api/RolesApi";
import Employee from "../../models/Employee";
import {StylesDictionary} from "../../utils/StylesDictionary";
import Colors from "../../constants/Colors";
import * as Routes from "../../constants/Routes"
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import Role from "../../models/Role";


interface InterfaceProps {
  error?: any;
  history?: any;
}

interface InterfaceState {
    error: any;
    email: string;
    firstName: string;
    lastName: string;
    role: Role|null;
    passwordOne: string;
    passwordTwo: string;
    roles: Role[]|null;
}

export class SignUpForm extends React.Component<InterfaceProps, InterfaceState> {
  private static INITIAL_STATE = {
    error: null,
    email: "",
    firstName: "",
    lastName: "",
    role: null,
    passwordOne: "",
    passwordTwo: "",
    roles: []
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
      super(props);
      this.state = {...SignUpForm.INITIAL_STATE};
      this.setRolesOptions();
  }

  public async onSubmit(event: any) {
      event.preventDefault();

      const { firstName, lastName, role, email, passwordOne } = this.state;
      const {history} = this.props;

      // Firebase create user
      auth
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then((authUser: any) => {

              // Create a user in your own accessible Firebase Database too
              db.doCreateUser(authUser.user.uid, '', email)
                  .then(() => {

                      this.setState(() => ({...SignUpForm.INITIAL_STATE}));
                      history.push(Routes.HOME);

                      const employee: Employee = new Employee(authUser.user.uid,
                          role, undefined, firstName, lastName,
                              email, undefined, passwordOne);
                      AuthApi.signUp(employee);
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
        const { firstName, lastName, email, role, passwordOne, passwordTwo, error } = this.state;

        return (
          <form onSubmit={(event) => this.onSubmit(event)} style={styles.container}>
            <TextField
                value={email}
                onChange={event => this.setStateWithEvent(event, "email")}
                type="text"
                placeholder="Email Address"
                style={styles.textInput}
            />
            <TextField
                value={firstName}
                onChange={event => this.setStateWithEvent(event, "firstName")}
                type="text"
                placeholder="First Name"
                style={styles.textInput}
            />
            <TextField
                value={lastName}
                onChange={event => this.setStateWithEvent(event, "lastName")}
                type="text"
                placeholder="Last Name"
                style={styles.textInput}
            />
            <TextField
                value={passwordOne}
                onChange={event => this.setStateWithEvent(event, "passwordOne")}
                type="password"
                placeholder="Password"
                style={styles.textInput}
            />
            <TextField
                value={passwordTwo}
                onChange={event => this.setStateWithEvent(event, "passwordTwo")}
                type="password"
                placeholder="Confirm Password"
                style={styles.textInput}
            />

              <FormControl style={styles.formControl}>
                  <InputLabel id="role-name-label">Role</InputLabel>
                  <Select
                      defaultValue=''
                      labelId="role-name-label"
                      id="role-select"
                      value={role}
                      onChange={event => this.setStateWithEvent(event, "role")}>
                      {this.state.roles && this.state.roles.map((selectedRole) => (
                          <MenuItem key={selectedRole.id} value={selectedRole.name} style={{color: Colors.white}}>
                              {selectedRole.name}
                          </MenuItem>
                      ))}
                  </Select>
              </FormControl>

            <Button disabled={this.isSignUpDisabled()} style={styles.button}>
                <InputLabel style={styles.buttonText}>Sign Up</InputLabel>
            </Button>

            {error && <p>{error.message}</p>}
          </form>
        );
  }

    private setStateWithEvent(event: any, columnType: string) {
        this.setState(SignUpForm.propKey(columnType, (event.target as any).value));
    }

    private async setRolesOptions() {
        this.setState({roles: await RolesApi.getRoles()})
    }

    private isSignUpDisabled() {
        const {firstName, lastName, email, role, passwordOne, passwordTwo } = this.state;
        return passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === "" ||
            firstName === "" ||
            lastName === "" ||
            role === null;
    }
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20
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
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300
    },
};
