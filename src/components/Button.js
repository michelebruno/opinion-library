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
              'p-2 lg:p-1',
              !isCurrent && !isSelected && 'text-white border-black hover:border-light',
              isSelected && 'bg-light text-black border-light',
              isCurrent && 'bg-gray text-white border-none',
            ],
        className
      )}
      aria-hidden={isCurrent}
      aria-checked={isSelected}
      {...props}
    >
      {checkbox && isSelected && (
        <span aria-hidden className="leading-[0] mr-1">
          {'\u2715'}
        </span>
      )}
      {children}
    </button>
  );
}

export default function Button({children, className, id, as: As, large, light, ...props}) {
  return (
    <As
      id={id}
      className={classNames(
        'button inline-block',
        light ? 'hover:text-light-darker' : ' ',
        large ? 'px-4 py-2 lg:py-4 lg:px-8 text-lg lg:text-2xl ' : ' text-base py-1 px-4',
        'border-current active:bg-light active:text-black border rounded-full hover:text-black',
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
