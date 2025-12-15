import React from 'react';
import './Button.css'; // We will create this CSS file next

/**
 * A reusable button component.
 * @param {object} props
 * @param {React.ReactNode} props.children - The text or icon inside the button.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.type='button'] - The button's type (e.g., 'button', 'submit').
 */
const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button className="custom-button" type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;