import React from 'react';
import Colors from "../../constants/colors";
import '../../styles/marker.scss';

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
