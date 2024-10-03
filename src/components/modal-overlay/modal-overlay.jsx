import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";

function ModalOverlay({ onClick }) {
    return (
        <div className={styles.overlay} onClick={onClick}>
        </div>
    );
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}

export { ModalOverlay };