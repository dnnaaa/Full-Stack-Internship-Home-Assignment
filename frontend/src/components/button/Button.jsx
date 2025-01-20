import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ label, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,       // Texte affiché dans le bouton
  onClick: PropTypes.func.isRequired,      // Fonction appelée lors du clic
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Type de bouton HTML
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']), // Style du bouton
  disabled: PropTypes.bool,                // Désactive le bouton
};

export default Button;
