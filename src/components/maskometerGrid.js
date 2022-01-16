import React from 'react';
import classNames from 'classnames';
import {ArchiveButton} from './Button';
import {mix} from '../utils/mix';

export function MaskometerGrid({chosen, words, distribution, onClickSecondWord}) {
  return (
    <div className="h-full flex flex-col justify-between relative gap-4  ">
      <p className="hidden lg:block mx-8 2xl:mb-4 text-lg">
        Horizontal position corresponds to usage by the two groups in the selcted corpus of reasons
        to sign
      </p>
      <div className="flex-1 ">
        <div
          className={classNames(
            ' h-full lg:px-8 py-4 flex flex-col justify-between relative',
            'overflow-hidden uppercase'
          )}
        >
          <div className="z-1 ">
            <p className="bg-promask text-white text-sm lg:text-lg text-center h-full absolute top-0 bottom-0 left-0 rotate-180 p-0.5 lg:p-1 z-10 maskometer-label">
              Promask
            </p>

            <p className="bg-nomask text-white text-sm lg:text-lg text-center h-full absolute top-0 bottom-0 right-0 p-0.5 lg:p-1 z-10 maskometer-label">
              Nomask
            </p>

            <div className="hidden lg:block absolute top-0 bottom-0 right-1/2 translate-x-1/2 border-r-[1px] boreder-r-white border-dashed opacity-50" />

            <p className="hidden lg:block text-lg text-sm 2xl:text-base text-center text-gray select-none absolute top-0 left-0 right-0 w-full normal-case bg-black pb-2">
              equally used
            </p>
          </div>

          {typeof chosen !== 'undefined' &&
            chosen.current &&
            words.nodes.map(({name, deltaNomask}) => {
              const isCurrent = chosen.next ? chosen.next === name : chosen.current === name;

              let delta = isCurrent
                ? deltaNomask
                : distribution.find(({word, secondWord}) => {
                    if (chosen.next) {
                      return chosen.next === word && secondWord === name;
                    }
                    return chosen.current && word === chosen.current && secondWord === name;
                  }).nomaskDelta;

              delta = Math.round(delta * 100);

              delta = 3 + ((97 - 3) / 100) * delta;

              return (
                <div
                  key={name}
                  className={classNames(
                    'mx-5 lg:mx-0 flex items-center relative',
                    'before:absolute before:left-0 before:right-0 ',
                    'before:border-b-[1px] before:block before:top-1/2 before:transition-all',
                    'before:w-full transition-[margin,background-color] duration-500',
                    isCurrent
                      ? 'before:border-b-gray  opacity-30'
                      : 'before:border-b-current  before:opacity-20'
                  )}
                >
                  <ArchiveButton
                    isCurrent={isCurrent}
                    style={{
                      marginLeft: `${delta}%`,
                      '--gradient-mix': isCurrent ? undefined : mix('EA3C9A', '3514FF', delta),
                    }}
                    className="transition-[margin] duration-1000 -translate-x-1/2 absolute z-20  "
                    onClick={() => onClickSecondWord(name)}
                  >
                    <span className="hidden lg:inline">{name}</span>
                  </ArchiveButton>
                  <span className="absolute w-full text-center z-30 text-sm lg:hidden">{name}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
