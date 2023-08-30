import React, { Component } from 'react';
import { Backdrop, ModalContent, ModalImage } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.documentElement.style.overflowY = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.documentElement.style.overflowY = 'visible';
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.hideModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.hideModal();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ModalContent>
          <ModalImage src={this.props.src} alt={this.props.alt} />
        </ModalContent>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
