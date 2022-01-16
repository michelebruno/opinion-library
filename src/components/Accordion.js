import React from 'react';
import classNames from 'classnames';

export default function Accordion({onClick, isOpen, children, title, subtitle, tabpanelStyle}) {
  const panelId = `${title.replace(' ', '-').toLowerCase()}-tabpanel`;
  return (
    <div
      className={`group flex flex-col last:border-t-white last:border-t-2 ${
        isOpen ? 'min-h-0 flex-1 ' : ''
      }`}
    >
      <div
        className={classNames(
          'py-4 px-6 lg:px-8 border-y-white box-border justify-between group select-none cursor-pointer text-light flex',
          title === 'Related words' && 'hidden lg:flex'
        )}
        onClick={onClick}
        aria-controls={`#${panelId}`}
        role="tab"
      >
        <div className="whitespace-nowrap ">
          <h2 className="text-lg lg:text-2xl uppercase inline-block">{title}</h2>
          <span
            className={classNames(
              'mx-2 leading-none lg:text-xl normal-case inline lg:inline truncate',
              isOpen ? '' : ' group-active:opacity-100'
            )}
          >
            / {subtitle}
          </span>
        </div>

        <div>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 12.5L25 12.5" stroke="currentColor" strokeWidth="2" />
            {!isOpen && (
              <path d="M12.5 25L12.5 -1.04308e-06" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-expanded={isOpen}
        className={classNames('', isOpen ? 'min-h-0 flex-1' : 'h-0 overflow-hidden')}
        style={tabpanelStyle}
      >
        {children}
      </div>
    </div>
  );
}

Accordion.defaultProps = {
  onToggle: () => {},
};
