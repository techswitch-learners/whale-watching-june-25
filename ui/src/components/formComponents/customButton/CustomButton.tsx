import classNames from "classnames";
import React from "react";
import './CustomButton.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = (buttonProps: ButtonProps) => {
    return <button {...buttonProps} className={classNames("custom-button", buttonProps.className)} />
}

export default CustomButton;