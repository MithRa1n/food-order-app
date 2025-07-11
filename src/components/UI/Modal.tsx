import { useRef, useEffect } from "react";
import { createPortal } from "react-dom"

interface ModalProps {
    children?: React.ReactNode;
    open?: boolean;
    className?: string;
    onClose?: () => void;
}   


export default function Modal({children, open, className, onClose}: ModalProps) {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
        const dialog = modalRef.current;
        if (!dialog) return;
        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open])

    const modalRoot = document.getElementById("modal");
    if (!modalRoot) {
        console.error("Modal root element not found");
        return null;
    }

    return (
        createPortal(<dialog onClose={onClose} ref={modalRef} open={open} className={`modal ${className}`}>{children} </dialog>, modalRoot)
    );
}