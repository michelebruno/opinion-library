import React, {useEffect, useMemo, useState} from 'react';
import {graphql} from 'gatsby';
import classNames from 'classnames';
import Layout from '../components/Layout';
import WordsIndex from '../components/WordsIndex';
import Accordion from '../components/Accordion';
import {MaskometerGrid} from '../components/maskometerGrid';
import Comments from '../components/Comments';
import {sentencesHaveWord} from '../utils/sentences';
import allComments from '../unsourced/comments.json';

export default function Library({data: {words, ...data}}) {
  const [chosen, setChosen] = useState({});
  const [secondWord, setSecondWord] = useState();
  const [mobileList, setMobileList] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const filteredComments = useMemo(
    () => allComments.filter(({sentences}) => sentencesHaveWord(sentences, chosen.current)),
    [chosen]
  );

  useEffect(() => {
    if (!showComments && secondWord) setShowComments(true);
  }, [secondWord]);

  useEffect(() => {
    if (!chosen.next) setSecondWord();

    setMobileList(false);
  }, [chosen]);

  const listOfChosenWords = words.nodes.map(x => x.name);

  const distribution = data.distribution.nodes.filter(
    i => listOfChosenWords.findIndex(x => x === i.secondWord) !== -1
  );

  return (
    <Layout
      wrapperClassName="max-h-screen h-screen flex flex-col"
      navClassName="!text-black"
      className="flex-1 min-h-0"
      tutorial
    >
      <div className="w-full h-full overflow-hidden flex flex-nowrap border-y-white lg:border-t-2 ">
        <WordsIndex words={words.nodes} chosen={chosen} setChosen={setChosen} />
        <div
          className={classNames(
            'overflow-hidden flex flex-col',
            chosen.current ? 'w-full lg:w-10/12' : 'w-0'
          )}
        >
          <div className="relative lg:hidden bg-light text-black uppercase text-center p-1 text-xl">
            <h3 onClick={() => setMobileList(!mobileList)}>
              {chosen.current}{' '}
              <svg
                viewBox="0 0 63 26"
                width=".8em"
                fill="none"
                className={classNames('inline transition', mobileList && 'rotate-180')}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M61.5 2L32 23.5L1 2" stroke="black" strokeWidth="6" />
              </svg>
            </h3>
            <ul
              className={classNames(
                'overflow-y-scroll no-scrollbar flex-1 words-list absolute left-0 right-0 z-40 top-full bg-black text-white max-h-screen pb-28',
                !mobileList && 'hidden'
              )}
            >
              {words.nodes.map(({name, finding}, index) => {
                const isNextSelected =
                  index + 1 < words.length
                    ? words[index + 1].name === chosen.next ||
                      words[index + 1].name === chosen.current
                    : false;

                return (
                  chosen.current !== name && (
                    <li
                      role="listitem"
                      key={name}
                      onClick={() =>
                        chosen.current !== name ? setChosen({current: name}) : setChosen({})
                      }
                      className={classNames(
                        'word-item last:border-b-current',
                        !isNextSelected && 'border-b-black '
                      )}
                    >
                      <h2 className={classNames('text-lg uppercase')}>{name}</h2>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          <Accordion
            title="Related words"
            subtitle={
              <>
                usage of words mentioned with <span className="uppercase">{chosen.current}</span>
              </>
            }
            isOpen={!showComments}
            onClick={() => setShowComments(!showComments)}
            tabpanelStyle={{minHeight: !showComments ? `${words.nodes.length}rem` : undefined}}
          >
            <MaskometerGrid
              chosen={chosen}
              words={words}
              distribution={distribution}
              onClickSecondWord={setSecondWord}
            />
          </Accordion>
          <Accordion
            title="Comments"
            subtitle={
              <>
                containing <span className="uppercase">{chosen.current}</span>{' '}
                {secondWord && (
                  <span className="hidden lg:inline">
                    and <span className="uppercase">{secondWord}</span>
                  </span>
                )}{' '}
              </>
            }
            isOpen={showComments}
            onClick={() => setShowComments(!showComments)}
          >
            <Comments
              comments={filteredComments}
              distribution={distribution.filter(({word}) => word === chosen.current)}
              chosen={chosen.current}
              secondWord={secondWord}
              onChangeSecondWord={setSecondWord}
            />
          </Accordion>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Glossary {
    words: allSheetsScatter(filter: {scelta: {eq: "X"}}, sort: {order: ASC, fields: [name]}) {
      nodes {
        name
        deltaPromask
        deltaNomask
        finding
      }
    }
    distribution: allSheetsCopiaDiDistribuzione(sort: {order: ASC, fields: [secondWord]}) {
      nodes {
        word
        secondWord
        nomaskDelta
        promaskDelta
      }
    }
  }
`;
