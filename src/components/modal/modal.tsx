import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

type TModalProps = {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

function Modal({ title, onClose, children }: TModalProps): React.JSX.Element {
    const onKeyupEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        }, [])

    useEffect(() => {
        document.addEventListener("keyup", onKeyupEscape);
        return () => document.removeEventListener("keyup", onKeyupEscape);
    }, [onKeyupEscape]);

    return (
        createPortal(
            (
                <>
                    <ModalOverlay onClick={onClose} />
                    <div className={styles.modal} data-test="modalContainer">
                        <p className="text text_type_main-medium p-10">{title}</p>
                        {children}
                        <button type='button' className={styles.close} data-test="modalCloseButton" onClick={onClose}>
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                </>
            ),
            modalRoot!
        ));
}

export { Modal };