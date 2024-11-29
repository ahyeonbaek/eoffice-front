import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigateButtonsProps {
    label: string;
    onClick: () => {};
}

export const NavigateButtons : React.FC<NavigateButtonsProps> = ({label, onClick}) => {

    return (
        <button onClick={onClick}>
            {label}
        </button>
    )
}