import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
    onClick: () => void;
}

function ModalOverlay({ onClick }: TModalOverlayProps): React.JSX.Element {
    return (
        <div className={styles.overlay} onClick={onClick} data-test="modalOverlay">
        </div>
    );
}

export { ModalOverlay };