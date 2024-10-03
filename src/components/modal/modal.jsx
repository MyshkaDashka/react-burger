import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

function Modal({ title, onClose, children }) {

    function onKeyupEscape(e) {
        if (e.key === "Escape") onClose();
    }

    useEffect(() => {
        document.addEventListener("keyup", onKeyupEscape);
        return () => document.addEventListener("keyup", onKeyupEscape);
    }, [onKeyupEscape]);

    return (
        createPortal(
            (
                <>
                    <ModalOverlay onClick={onClose} />
                    <div className={modalStyles.modal}>
                        <p className="text text_type_main-medium p-10">{title}</p>
                        {children}
                        <CloseIcon className={modalStyles.close} onClick={onClose} />
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