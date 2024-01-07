import React from 'react';

const ProcessButton = ({ onClick, disabled }) => {
  return (
    <button className={`process-button ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
      Process
      <style jsx>{`
        .process-button {
          background-color: #3498db; /* Nouvelle couleur */
          color: white;
          padding: 12px; /* Ajustement de la taille du padding */
          border: 2px solid #3498db; /* Ajout d'une bordure */
          border-radius: 8px; /* Ajustement du border-radius */
          cursor: pointer;
          font-size: 18px; /* Ajustement de la taille de la police */
          transition: background-color 0.3s, color 0.3s; /* Ajout de la transition pour la couleur du texte */
        }

        .process-button:hover {
          background-color: #2980b9; /* Nouvelle couleur au survol */
          color: #fff; /* Nouvelle couleur du texte au survol */
        }

        .process-button.disabled {
          background-color: #bdc3c7; /* Nouvelle couleur lorsque le bouton est désactivé */
          border: 2px solid #bdc3c7; /* Nouvelle couleur de la bordure lorsque le bouton est désactivé */
          color: #7f8c8d; /* Nouvelle couleur du texte lorsque le bouton est désactivé */
          cursor: not-allowed;
        }
      `}</style>
    </button>
  );
};

export default ProcessButton;
