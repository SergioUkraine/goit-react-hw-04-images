import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalContent, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ src, alt, hideModal }) {
  const closeModal = useCallback(
    ({ code, target, currentTarget }) => {
      if (code === 'Escape' || target === currentTarget) {
        hideModal();
      }
    },
    [hideModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      window.removeEventListener('keydown', closeModal);
      document.documentElement.style.overflowY = 'visible';
    };
  }, [closeModal]);

  return createPortal(
    <Backdrop onClick={closeModal}>
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
