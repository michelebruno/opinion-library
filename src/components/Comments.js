import React, {useEffect, useMemo, useRef, useState} from 'react';
import classNames from 'classnames';
import Comment from './Comment';
import {ArchiveButton} from './Button';
import {mix} from '../utils/mix';
import {sentencesHaveWord} from '../utils/sentences';

function GroupCommentList({comments, chosen, secondWord, origin, limit}) {
  return (
    <div>
      <div key={origin} className="grid gap-4">
        {comments.map(
          (c, i) =>
            i < limit && (
              <Comment key={c.id} highlightWords word={chosen} secondWord={secondWord} {...c} />
            )
        )}
      </div>
    </div>
  );
}

export default function Comments({comments, chosen, secondWord, onChangeSecondWord, distribution}) {
  const scroller = useRef();

  const [limit, setLimit] = useState(100);

  useEffect(() => {
    setLimit(100);
    scroller.current?.scrollTo(0, 0);
  }, [chosen, secondWord]);

  const memoized = useMemo(() => {
    const result = {};
    for (const origin of ['promask', 'nomask']) {
      const thisOriginComments = comments.filter(({origin: o}) => origin === o);

      const f = thisOriginComments.filter(
        ({sentences}) => !secondWord || sentencesHaveWord(sentences, secondWord)
      );

      result[origin] = {
        totalCount: thisOriginComments.length,
        count: f.length,
        comments: f,
        percentage: (100 * f.length) / thisOriginComments.length,
      };
    }
    return result;
  }, [secondWord, chosen, comments]);

  return (
    <div className="px-8 h-full max-h-full flex flex-col">
      <p className="2xl:mb-4 w-full text-lg">
        Here you can read the comments on the 100 most liked promask and nomask petition
      </p>
      <div className="w-full sticky top-0 bg-black z-20">
        <h2 className="text-lg text-light my-4">Filter opinions by:</h2>
        <div className="flex flex-wrap">
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
      <div className="">
        <div className="flex justify-around md:w-11/12 3xl:w-10/12 mx-auto">
          {['promask', 'nomask'].map(origin => {
            const {percentage, totalCount, count} = memoized[origin];
            const round = percentage > 1 ? 0 : 1;

            return (
              <p className="sticky top-0 bg-black z-30 text-center text-lg pt-3 pb-4">
                {secondWord
                  ? `${percentage.toFixed(
                      round
                    )}% of ${origin} opinions (${count} of ${totalCount})`
                  : `All ${origin} opinions (${count})`}
              </p>
            );
          })}
        </div>
      </div>
      <div
        className={classNames('w-full overflow-y-scroll flex-1 pb-8')}
        id="comments-container"
        ref={scroller}
        onScroll={function scrolled(e) {
          if (
            e.currentTarget.offsetHeight + e.currentTarget.scrollTop >=
            e.currentTarget.scrollHeight
          ) {
            console.log('Scroll ended');
            setLimit(l => {
              if (l <= Math.max(memoized.nomask.comments.length, memoized.promask.comments.length))
                return l + 200;

              return l;
            });
          }
        }}
      >
        <div className="grid grid-cols-2 gap-8 justify-around w-full md:w-11/12 3xl:w-10/12 mx-auto ">
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
