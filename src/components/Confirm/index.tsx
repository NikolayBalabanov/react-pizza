/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import './Confirm.scss';

interface IConfirmProps {
  title?: string;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}

function Confirm({ onClose, onConfirm, title, name }: IConfirmProps) {
  const isMounted = useRef(false);
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleSortOutside = (event: MouseEvent) => {
      if (
        modal.current &&
        modalContent.current &&
        !event.composedPath().includes(modalContent.current) &&
        isMounted.current
      ) {
        close(onClose);
      }
      isMounted.current = true;
    };
    document.body.addEventListener('click', handleSortOutside);
    return () => document.body.removeEventListener('click', handleSortOutside);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('hide-modal');
      modalContent.current?.classList.remove('hide-content');
    });
    closeBtn.current?.focus();
  }, []);

  const close = (fn: () => void) => {
    modal.current?.classList.add('hide-modal');
    modalContent.current?.classList.add('hide-content');
    setTimeout(() => {
      fn();
    }, 300);
  };

  const hendleKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Escape') {
      close(onClose);
    }
  };

  return (
    <div ref={modal} onKeyDown={hendleKeyDown} className="modal hide-modal">
      <div ref={modalContent} className="modal__content">
        <h2 className="modal__title">
          Вы действительно хотите удалить
          {name === 'basket' ? ' все из карзины' : ` пиццу "${title}"`}?
        </h2>
        <hr />
        <div className="modal__controllers">
          <button
            type="button"
            className="button button--outline button--add go-back-btn"
            onClick={() => close(onConfirm)}
          >
            Удалить
          </button>
          <button
            type="button"
            ref={closeBtn}
            className="button pay-btn"
            onClick={() => close(onClose)}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
