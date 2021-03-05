import React from 'react';
import './Marker.css';
import Colors from "../../constants/Colors";

export const Marker = (props: any) => {
    const { name } = props;
    return (
        <div className="marker"
             style={{ backgroundColor: Colors.primaryBlue, cursor: 'pointer'}}
        >
            {name}
        </div>
    );
};
