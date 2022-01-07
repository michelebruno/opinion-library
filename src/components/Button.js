import React from 'react';
import classNames from 'classnames';

export function ArchiveButton({children, className, isSelected, isCurrent, checkbox, ...props}) {
  return (
    <button
      type="button"
      disabled={isCurrent}
      className={classNames(
        'archive-button border-2 select-none',
        checkbox
          ? [
              'checkbox ',
              !isCurrent && 'hover:border-light active:bg-light active:text-black',
              isCurrent && 'bg-gray border-white cursor-disabled opacity-50',
              isSelected && 'border-light',
            ]
          : [
              !isCurrent && !isSelected && 'text-white border-black hover:border-light',
              isSelected && 'bg-light text-black border-light',
              isCurrent && 'bg-gray text-white border-none',
            ],
        className
      )}
      {...props}
    >
      {checkbox && isSelected && <span className="leading-[0] text-lg mr-1">{'\u00D7'}</span>}
      {children}
    </button>
  );
}

export default function Button({children, className, id, as: As, large, light, ...props}) {
  return (
    <As
      id={id}
      className={classNames(
        ' inline-block',
        light ? 'hover:text-light-darker' : ' ',
        large ? 'py-4 px-8 text-2xl ' : ' text-base py-1 px-4',
        ' border-current active:bg-light active:text-black border rounded-full hover:text-black',
        light ? 'hover:text-light-darker' : 'hover:text-light ',
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}

Button.defaultProps = {
  as: 'a',
};
