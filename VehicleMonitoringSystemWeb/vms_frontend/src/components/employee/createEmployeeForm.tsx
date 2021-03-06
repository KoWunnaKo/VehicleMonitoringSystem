import * as React from "react";
import * as AuthApi from "../../api/authApi";
import * as RolesApi from "../../api/roleApi";
import { auth} from "../../firebase";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import Role from "../../models/role";
import Employee from "../../models/employee";
import Colors from "../../constants/colors";
import {StylesDictionary} from "../utils/stylesDictionary";
import {useEffect, useState} from "react";
import {getDbUserCompanyId} from "../../utils/userUtil";

interface InterfaceProps {
  closeModal: () => void;
}

export const CreateEmployeeForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [error, setError] = useState<any>(null);
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [roleId, setRoleId] = useState<number>(0);
    const [passwordOne, setPasswordOne] = useState<string>('');
    const [passwordTwo, setPasswordTwo] = useState<string>('');
    const [roles, setRoles] = useState<Role[]|null>(null);

    useEffect(() => {
        (async function() {
            setRoles(await RolesApi.getRoles())
        })();
    }, []);

  async function onSubmit(event: any) {
      event.preventDefault();

      // Firebase create user
      auth
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(async (authUser: any) => {
              const companyId = await getDbUserCompanyId();
              if (!!companyId) {
                  const employee: Employee = new Employee(authUser.user.uid,
                      roleId, companyId, firstName, lastName,
                      email, undefined, passwordOne);
                  await AuthApi.signUp(employee);
                  // TODO avoid login out
                  props.closeModal();
              }
          })
          .catch(er => {
              setError(er);
          });
  }

    return (
        <form onSubmit={(event) => onSubmit(event)} style={styles.container}>
            <TextField
                value={email}
                onChange={event => setEmail(event.target.value)}
                type="text"
                placeholder="Email Address"
                style={styles.textInput}
            />
            <TextField
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
                type="text"
                placeholder="First Name"
                style={styles.textInput}
            />
            <TextField
                value={lastName}
                onChange={event => setLastName(event.target.value)}
                type="text"
                placeholder="Last Name"
                style={styles.textInput}
            />
            <TextField
                value={passwordOne}
                onChange={event => setPasswordOne(event.target.value)}
                type="password"
                placeholder="Password"
                style={styles.textInput}
            />
            <TextField
                value={passwordTwo}
                onChange={event => setPasswordTwo(event.target.value)}
                type="password"
                placeholder="Confirm Password"
                style={styles.textInput}
            />
            <FormControl style={styles.formControl}>
                <InputLabel id="role-name-label">Role</InputLabel>
                <Select
                    color={"secondary"}
                    value={roleId}
                    onChange={event => setRoleId(event.target.value)}>
                    {roles && roles.map((selectedRole) => (
                    <MenuItem key={selectedRole.id} value={selectedRole.id}>
                        {selectedRole.name}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button disabled={isSignUpDisabled()} variant='contained' type='submit' color='primary' style={styles.button}>
                Create
            </Button>

            {error && <p>{error.message}</p>}
        </form>
    );

    function isSignUpDisabled() {
        return passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === "" ||
            firstName === "" ||
            lastName === "" ||
            roleId === undefined;
    }
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    textInput: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
    },
    button: {
        width: 200,
        marginTop: 20
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300
    },
};
