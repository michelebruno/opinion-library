import classNames from 'classnames';
import React from 'react';

export default function WordsIndex({words, chosen, setChosen}) {
  return (
    <div
      className={classNames(
        'duration-500 flex flex-col text-left',
        chosen.current
          ? 'hidden lg:block  lg:w-2/12 border-r-2 lg:border-t border-r-white'
          : 'w-full '
      )}
    >
      <div
        className={`sticky  overflow-hidden top-0 text-light text-lg lg:text-2xl px-6 lg:px-8 pt-4 pb-4 border-white border-b lg:border-b-2 duration-1000 bg-black select-none lg:whitespace-nowrap ${
          !chosen.current && 'w-full cursor-pointer'
        }`}
        onClick={() => setChosen({})}
      >
        <h2 className={classNames('inline-block uppercase ')}>Words</h2>
        <span className={classNames('ml-2 text-light', chosen.current ? 'hidden' : '')}>
          <span className="">
            <span className="inline lg:hidden">/</span>/ 20 most used in promask and nomask comments
          </span>
        </span>
      </div>

      <ul className="overflow-y-scroll no-scrollbar flex-1 words-list ">
        {words.map(({name, finding}, index) => {
          const isNextSelected =
            index + 1 < words.length
              ? words[index + 1].name === chosen.next || words[index + 1].name === chosen.current
              : false;

          return (
            <li
              role="listitem"
              key={name}
              onClick={() => (chosen.current !== name ? setChosen({current: name}) : setChosen({}))}
              className={classNames(
                'word-item last:border-b-current',
                !isNextSelected && 'border-b-black ',
                chosen.current === name ? 'active' : ''
              )}
            >
              <h2 className={classNames('text-lg uppercase')}>{name}</h2>
              {chosen.current === name && finding && (
                <p className="pt-1 text-base animate__fadeInUp animate__animated max-w-[15.6vw]">
                  {finding}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
