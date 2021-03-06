import * as React from "react";
import {StylesDictionary} from "./stylesDictionary";
import "../../styles/navigation.scss";
import Employee from "../../models/employee";
import {isUserOperator} from "../../utils/userUtil";
import Colors from "../../constants/colors";

interface InterfaceProps {
  dbUser: Employee|null|undefined;
}

export const RoleRestriction: React.FunctionComponent<InterfaceProps> = (props) => {
    return (
        <div style={styles.container}>
            {
                isUserOperator(props.dbUser)
                && <div style={styles.textStyle}>Access only for the Administrators</div>
            }
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        backgroundColor: Colors.red,
        alignSelf: 'center'
    },
    textStyle: {
        color: Colors.white,
        marginLeft: 6,
        marginRight: 6,
    }
};
