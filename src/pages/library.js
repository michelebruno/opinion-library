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
  }, [chosen]);

  const listOfChosenWords = words.nodes.map(x => x.name);

  const distribution = data.distribution.nodes.filter(
    i => listOfChosenWords.findIndex(x => x === i.secondWord) !== -1
  );

  return (
    <Layout
      wrapperClassName="max-h-screen h-screen flex flex-col"
      navClassName="!text-black"
      className="flex-1 min-h-0 "
      tutorial
    >
      <div className="w-full h-full overflow-hidden flex flex-nowrap border-y-white border-t-2 ">
        <WordsIndex words={words.nodes} chosen={chosen} setChosen={setChosen} />
        <div
          className={classNames(
            ' overflow-hidden flex flex-col',
            chosen.current ? 'w-10/12' : 'w-0'
          )}
        >
          <Accordion
            title="Related words"
            subtitle={
              <>
                usage of words mentioned with <span className="uppercase">{chosen.current}</span>
              </>
            }
            isOpen={!showComments}
            onClick={() => setShowComments(!showComments)}
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
                  <>
                    and <span className="uppercase">{secondWord}</span>
                  </>
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
