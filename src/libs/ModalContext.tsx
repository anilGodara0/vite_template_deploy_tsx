import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

const ModalContext = createContext<any>(null);

export const ModalProvider = ({ children }: any) => {
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    const showModal = (content: React.ReactNode) => setModalContent(content);
    const hideModal = () => setModalContent(null);

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}

            {modalContent &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl shadow-xl">
                            {modalContent}
                            <button onClick={hideModal} className="mt-4 text-blue-600">Close</button>
                        </div>
                    </div>,
                    document.body
                )}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
