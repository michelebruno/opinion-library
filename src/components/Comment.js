import React from 'react';
import classNames from 'classnames';
import {matches, sentenceHasWord} from '../utils/sentences';

export function HighlightedWord({children, className, isActive, promask, nomask, secondary}) {
  return (
    <span
      className={classNames(
        'highlighted-word',
        !promask && !nomask && 'before:bg-light',
        secondary
          ? [isActive && 'before:bg-light']
          : [
              promask && 'before:bg-promask',
              nomask && 'before:bg-nomask',
              isActive && (nomask || promask) && 'text-white',
            ],
        !isActive && 'before:scale-x-0',
        className
      )}
    >
      {children}
    </span>
  );
}

export default function Comment({
  id,
  className,
  children,
  origin,
  sentences,
  user,
  createdAt,
  word,
  secondWord,
  petition,
  highlightWords,
  large,
}) {
  let lastWasSkipped = false;

  return (
    <div
      id={id}
      className={classNames(
        className,
        'comment',
        large && 'large',
        origin === 'promask' && 'border-promask',
        origin === 'nomask' && 'border-nomask'
      )}
    >
      <div className=" ">
        <div className={`rounded-full avatar bg-${origin}`} />
      </div>
      <div className="col-span-11">
        <div className={`text-gray select-none ${large ? 'text-xl' : 'text-sm 2xl:text-xs'}`}>
          <span>User{user}</span>
          {' • '}
          <span>{createdAt}</span>
        </div>
        <p className={`comment-text ${large ? 'text-3xl leading-snug py-3' : 'py-2 text-base'}`}>
          {typeof sentences !== 'undefined'
            ? sentences.map((sentence, i) => {
                if (sentenceHasWord(sentence, word) || sentenceHasWord(sentence, secondWord)) {
                  lastWasSkipped = false;
                  return (
                    <React.Fragment key={i}>
                      {sentence.map((part, i) => {
                        const isPrimaryWord = matches(part, word);
                        const isSecondaryWord = matches(part, secondWord);

                        if (isPrimaryWord || isSecondaryWord)
                          return (
                            <React.Fragment key={i}>
                              {' '}
                              <HighlightedWord
                                isActive={highlightWords}
                                promask={origin === 'promask'}
                                nomask={origin === 'nomask'}
                                secondary={!isSecondaryWord}
                              >
                                {part}
                              </HighlightedWord>
                            </React.Fragment>
                          );

                        if (part === secondWord)
                          return (
                            <span key={i} className="border-light border-2">
                              {part}
                            </span>
                          );

                        return part;
                      })}{' '}
                    </React.Fragment>
                  );
                }

                if (!lastWasSkipped) {
                  lastWasSkipped = true;
                  return '[...] ';
                }

                return undefined;
              })
            : children}
        </p>
        <a
          href={petition.slug ? `https://www.change.org/p/${petition.slug}` : undefined}
          title={petition.title}
          className={classNames(
            'text-gray truncate  block ',
            petition.slug ? ' hover:text-light-darker underline' : 'cursor-default',
            large ? 'text-xl' : 'text-sm 2xl:text-xs'
          )}
          target="_blank"
          rel="noreferrer"
        >
          {petition.title || 'Petition title'}
        </a>
      </div>
    </div>
  );
}

Comment.defaultProps = {
  highlightWords: true,
};
