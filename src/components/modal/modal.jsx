import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

function Modal({ title, onClose, children }) {

    const onKeyupEscape = useCallback(
        (e) => {
            if (e.key === "Escape") onClose();
        }, [])

    useEffect(() => {
        document.addEventListener("keyup", onKeyupEscape);
        return () => document.addEventListener("keyup", onKeyupEscape);
    }, [onKeyupEscape]);

    return (
        createPortal(
            (
                <>
                    <ModalOverlay onClick={onClose} />
                    <div className={styles.modal}>
                        <p className="text text_type_main-medium p-10">{title}</p>
                        {children}
                        <CloseIcon className={styles.close} onClick={onClose} />
                    </div>
                </>
            ),
            modalRoot
        ));
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.element
}

export { Modal };