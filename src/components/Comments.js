import React, {useEffect, useMemo, useRef, useState} from 'react';
import classNames from 'classnames';
import Comment from './Comment';
import {ArchiveButton} from './Button';
import {mix} from '../utils/mix';
import {sentencesHaveWord} from '../utils/sentences';

function GroupCommentList({comments, chosen, secondWord, origin, limit, sentence, onScroll}) {
  return (
    <div>
      <div className="flex justify-between lg:hidden py-4 px-6">
        <h4 className="uppercase text-lg text-light">{origin}</h4>
        <p className="ml-4 text-xs flex-shrink-1 truncate align-middle self-center">{sentence}</p>
      </div>
      <div
        key={origin}
        className="flex flex-nowrap items-start overflow-x-scroll lg:overflow-auto no-scrollbar lg:grid lg:gap-4 px-6 lg:px-8 "
        onScroll={onScroll}
      >
        {comments.map(
          (c, i) =>
            i < limit && (
              <Comment
                key={c.commentId}
                highlightWords
                word={chosen}
                secondWord={secondWord}
                {...c}
              />
            )
        )}
      </div>
    </div>
  );
}

export default function Comments({comments, chosen, secondWord, onChangeSecondWord, distribution}) {
  const scroller = useRef();

  const [limit, setLimit] = useState(100);
  const [filterOverlay, setFilterOverlay] = useState(false);
  useEffect(() => {
    setLimit(100);
    setFilterOverlay(false);
    scroller.current?.scrollTo(0, 0);
  }, [chosen, secondWord]);

  const memoized = useMemo(() => {
    const result = {};
    for (const origin of ['promask', 'nomask']) {
      const thisOriginComments = comments.filter(({origin: o}) => origin === o);

      const f = thisOriginComments.filter(
        ({sentences}) => !secondWord || sentencesHaveWord(sentences, secondWord)
      );

      const count = f.length;
      const percentage = (100 * count) / thisOriginComments.length;
      const round = percentage > 0.94 ? 0 : 1;
      const sentence = secondWord
        ? `${percentage.toFixed(round)}% of comments in ${origin} (${count} of ${
            thisOriginComments.length
          })`
        : `All comments in ${origin} petitions (${count})`;

      result[origin] = {
        totalCount: thisOriginComments.length,
        count,
        sentence,
        comments: f,
        percentage,
      };
    }
    return result;
  }, [secondWord, chosen, comments]);

  function scrolled(e) {
    if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
      setLimit(l => {
        if (l <= Math.max(memoized.nomask.comments.length, memoized.promask.comments.length))
          return l + 200;

        return l;
      });
    }
  }

  return (
    <div className="h-full max-h-full flex flex-col  overflow-y-scroll lg:overflow-y-visible">
      <p className="2xl:mb-4 w-full text-sm lg:text-lg px-6 lg:px-8">
        Here you can read the comments on the 100 most liked promask and nomask petition
      </p>
      <div className="w-full top-0 bg-black z-20">
        <h2 className="text-lg text-light my-4 hidden lg:block px-6 lg:px-8">
          Filter opinions by:
        </h2>
        <button
          className="text-light border-light border px-2 py-1 my-4 mx-6 lg:hidden"
          onClick={() => setFilterOverlay(true)}
        >
          Filter opinions by {secondWord && `(${secondWord})`}
        </button>
        <div
          className={classNames(
            'absolute top-10 inset-0 lg:static',
            '',
            !filterOverlay && 'hidden lg:block'
          )}
        >
          <div className="ml-12 lg:ml-0 bg-black border-l border-light p-8 lg:py-0 lg:static lg:border-l-0 h-full">
            <div
              className="pb-8 text-light text-xl lg:hidden"
              onClick={() => setFilterOverlay(false)}
            >
              {'\u2715'}
            </div>
            <div className=" flex flex-wrap">
              {distribution.map(({secondWord: word, nomaskDelta}) => {
                const isSelected = secondWord === word;
                const isCurrent = chosen === word;

                return (
                  <ArchiveButton
                    key={word}
                    checkbox
                    isCurrent={isCurrent}
                    className="mb-2 mr-2"
                    isSelected={isSelected}
                    onClick={() => onChangeSecondWord(isSelected ? undefined : word)}
                    style={{
                      '--gradient-mix': mix('EA3C9A', '3514FF', nomaskDelta * 100),
                    }}
                  >
                    {word}
                  </ArchiveButton>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="hidden lg:flex justify-around md:w-11/12 3xl:w-10/12 mx-auto">
          {['promask', 'nomask'].map(origin => {
            const {sentence} = memoized[origin];
            return (
              <p key={origin} className="sticky top-0 bg-black z-30 text-center text-lg pt-3 pb-4">
                {sentence}
              </p>
            );
          })}
        </div>
      </div>
      <div
        className={classNames('w-full lg:overflow-y-scroll flex-1 pb-8')}
        id="comments-container"
        ref={scroller}
        onScroll={scrolled}
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 justify-around w-full md:w-11/12 3xl:w-10/12 mx-auto ">
          {chosen &&
            ['promask', 'nomask'].map(origin => (
              <GroupCommentList
                key={origin}
                origin={origin}
                chosen={chosen}
                secondWord={secondWord}
                limit={limit}
                {...memoized[origin]}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
