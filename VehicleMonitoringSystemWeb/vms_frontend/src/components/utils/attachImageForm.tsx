import * as React from "react";
import {StylesDictionary} from "./stylesDictionary";

interface InterfaceProps {
    closeModal: () => void;
    saveAttachment: (file: any, fileName: string) => void;
}

export const AttachImageForm: React.FunctionComponent<InterfaceProps> = (props) => {

    const handleChangeAttachment = (e) => {
        props.saveAttachment(e.target.files[0], e.target.files[0].name);
        props.closeModal();
    }

    return (
        <div style={styles.container}>
            <h3>Select image...</h3>
            <div>
                <input type='file' accept="image/*" onChange={handleChangeAttachment}/>
            </div>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        height: 70,
        padding: 5
    }
};
