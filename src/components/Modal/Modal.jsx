import React, { Component } from 'react';
import { Backdrop, ModalContent, ModalImage } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class MaterialModal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
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
          <ModalImage alt={this.props.alt} src={this.props.src} />
        </ModalContent>
      </Backdrop>,
      modalRoot
    );
  }
}

export default MaterialModal;
