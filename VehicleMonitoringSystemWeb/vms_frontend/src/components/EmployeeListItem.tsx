import * as React from "react";
import Employee from "../models/Employee";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import {StylesDictionary} from "../utils/StylesDictionary";
import Colors from "../constants/Colors";

interface InterfaceProps {
    employee: Employee;
}

export const EmployeeListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    return (
        <ListItem
            button={true}
            // onPress={() => this.onLearnMore(driver)}
            style={styles.listItem}
        >
            {`${props.employee.firstName} ${props.employee.lastName}`}

            {/*<ListItemSecondaryAction>*/}
            {/*    <IconButton edge="end" aria-label="comments">*/}
            {/*        <CommentIcon />*/}
            {/*    </IconButton>*/}
            {/*</ListItemSecondaryAction>*/}
        </ListItem>
    );
}

const styles: StylesDictionary  = {
    container: {
    },
    listItem: {
        height: 50
    }
};
