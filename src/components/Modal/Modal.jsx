import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalContent, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ src, alt, hideModal }) {
  const handleCloseModal = useCallback(
    ({ code, target, currentTarget }) => {
      if (code === 'Escape' || target === currentTarget) {
        hideModal();
      }
    },
    [hideModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleCloseModal);
      document.documentElement.style.overflowY = 'visible';
    };
  }, [handleCloseModal]);

  return createPortal(
    <Backdrop onClick={handleCloseModal}>
      <ModalContent>
        <ModalImage src={src} alt={alt} />
      </ModalContent>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
