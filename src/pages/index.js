import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import {TextPlugin} from 'gsap/TextPlugin';
import classNames from 'classnames';
import {graphql, Link} from 'gatsby';
import {Helmet} from 'react-helmet';
import Layout from '../components/Layout';
import Image from '../components/Image';
import Comment, {HighlightedWord} from '../components/Comment';
import Button from '../components/Button';
import HomeSlide from '../components/HomeSlide';
import SlotMaschine from '../components/SlotMaschine';
import Navbar from '../components/Navbar';
import Rettangoli from '../images/rettangoli.component.svg';
import useMatter from '../components/useMatter';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

gsap.defaults({
  duration: 0.8,
  ease: 'power4.out',
});

const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

const wheelOpt = supportsPassive ? {passive: false} : false;
const wheelEvent =
  typeof document === 'undefined' || 'onwheel' in document.createElement('div')
    ? 'wheel'
    : 'mousewheel';

const commentsData = {
  812047727: 'vaccine',
  811710031: 'health',
  814486694: 'vaccine',
  822518213: 'health',
  817756846: 'vaccine',
  821382262: 'family',
  814480242: 'vaccine',
};

const links = {
  'broken.png':
    'https://www.change.org/p/broken-arrow-city-council-broken-arrow-mask-mandate-rejection',
  'elkhorn.png':
    'https://www.change.org/p/superintendent-of-elkhorn-public-school-elkhorn-public-school-ne-mask-mandate-for-under-12-years-old',
  'masks-optional.png': 'https://www.change.org/p/parents-masks-optional-for-hall-county-schools',
  'make-masks-mandatory.png':
    'https://www.change.org/p/allen-isd-school-board-make-masks-mandatory-in-allen-isd-schools',
  'unmask.png': 'https://www.change.org/p/roy-cooper-unmask-our-children-at-school',
  'mask-choice.png':
    'https://www.change.org/p/center-grove-school-board-mask-choice-center-grove-2021-22',
  'make-face-mask.png':
    'https://www.change.org/p/duluth-mayor-emily-larson-make-masks-mandatory-in-public-in-duluth-mn-during-the-covid-19-pandemic',
  'keep-texas.png':
    'https://www.change.org/p/texas-a-m-university-office-of-the-provost-keep-texas-a-m-s-current-face-covering-policy-in-place-after-march-10',
  'demand.png':
    'https://www.change.org/p/parents-of-leander-isd-demand-an-emergency-mask-mandate-meeting-from-leander-independent-school-district-board',
  'kenston.png':
    'https://www.change.org/p/the-kenston-local-school-board-kenston-local-schools-petition-to-make-masks-optional',
};

// markup
const IndexPage = ({
  data: {
    allFile,
    words,
    comments: {nodes: homeComments},
  },
}) => {
  const [highlightWords, setHighlightWords] = useState(false);
  const scroller = useRef();
  const landing = useRef();
  const changeDataSlide = useRef();
  const maskMandateSlide = useRef();
  const understandLanguage = useRef();
  const whyYouSigned = useRef();

  function goToSection(i) {
    gsap.to(scroller.current, {
      scrollTo: {y: i * scroller.current.offsetHeight, autoKill: false},
      duration: 0.8,
      overwrite: true,
    });
  }

  useMatter(landing);

  function openPetitionLink(index) {
    const fn = allFile.nodes[index].relativePath.slice(5);

    return () => window.open(links[fn], '_blank');
  }

  useEffect(() => {
    ScrollTrigger.defaults({
      scroller: scroller.current,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: changeDataSlide.current,
          start: 'top top',
          end: 'bottom bottom',
        },
        toggleActions: 'play pause reverse reset',
      })
      .from('#change-data-bubbles > div', {
        y: 1200,
        stagger: 0.3,
        duration: 2,
        rotate: '-=15deg',
        ease: 'power4.out',
      });
    /* .to('#change-data-bubbles > div', {
        y: '+=20',
        rotate: '+=10deg',
        duration: 6,
        stagger: 1,
        repeat: -1,
        yoyo: true,
      }); */

    const petitionImagesTl = gsap.from(
      gsap.utils.toArray(maskMandateSlide.current.querySelectorAll('img')),
      {
        paused: true,
        opacity: 0,
        y: 10,
        duration: 0.2,
        stagger: 0.1,
      }
    );

    // MASK MANDATE
    gsap.timeline({
      scrollTrigger: {
        trigger: maskMandateSlide.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: scroll => {
          scroll.direction === 1 && scroll.progress > 0.49 && petitionImagesTl.play();
          scroll.direction === -1 && petitionImagesTl.reverse();
        },
      },
    });

    // WHY YOU SIGNED
    gsap.from('#fake-comment ', {
      scrollTrigger: {
        trigger: '#fake-comment',
      },
      yPercent: 20,
      opacity: 0,
    });

    // WHY YOU SIGNED
    gsap.to('#fake-comment .comment-text', {
      text: {
        value: 'Those who signed these petitions explained their reasons in comments.',
      },
      scrollTrigger: {
        trigger: '#fake-comment',
      },
      duration: 2,
      delay: 0.8,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#some-words-frequent',
          toggleActions: 'play pause pause reverse',
        },
      })
      .from('#some-words-frequent svg > g', {
        y: -1200,
        stagger: 0.2,
      });

    // THIS LETS US UNDERSTAND
    gsap.timeline({
      scrollTrigger: {
        trigger: understandLanguage.current,
        end: 'bottom bottom',
        // toggleActions: "play pause reverse reset",
      },
    });

    gsap.to('#recurring-words', {
      scrollTrigger: {
        trigger: '#recurring-words',
        onLeaveBack() {
          setHighlightWords(false);
        },
        onEnterBack() {
          setHighlightWords(true);
        },
        onEnter() {
          setHighlightWords(true);
        },
      },
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: understandLanguage.current,
          end: 'bottom bottom',
          // toggleActions: "play pause reverse reset",
        },
      })
      .from(
        gsap.utils.toArray(
          understandLanguage.current.querySelectorAll('.comment-container .comment')
        ),
        {
          yPercent: 20,
          opacity: 0,
          stagger: 0.3,
        }
      );

    const panels = gsap.utils.toArray('.snapper');
    let canAdvance = true;
    let lastAdvance = 0;

    function goPrev() {
      if (lastAdvance === 0) return;
      goToSection(--lastAdvance);
    }

    function goNext() {
      if (panels.length < lastAdvance) return;
      goToSection(++lastAdvance);
    }

    function triggerNext() {
      if (canAdvance) {
        canAdvance = false;
        goNext();
        setTimeout(() => {
          canAdvance = true;
        }, 1500);
      }
    }

    function triggerPrev() {
      if (canAdvance) {
        canAdvance = false;
        goPrev();
        setTimeout(() => {
          canAdvance = true;
        }, 1500);
      }
    }

    function handleScroll(e) {
      e.preventDefault();

      const n = -e.wheelDeltaX || -e.deltaX;
      const o = e.wheelDeltaY || -e.deltaY;
      const r = Math.abs(n) > Math.abs(o) ? n : o;
      e && e.preventDefault();

      canAdvance && (r < 0 ? triggerNext() : triggerPrev());
    }

    function handleKeyUp(e) {
      e.preventDefault();
      canAdvance &&
        (e.key === 'ArrowDown' || e.key === 'ArrowRight'
          ? goNext()
          : (e.key !== 'ArrowUp' && e.key !== 'ArrowLeft') || goPrev());
    }

    function handleTouchMove(e) {
      e.preventDefault();

      console.log(e);

      const n = -e.wheelDeltaX || -e.deltaX;
      const o = e.wheelDeltaY || -e.deltaY;
      const r = Math.abs(n) > Math.abs(o) ? n : o;
      e && e.preventDefault();

      canAdvance && (r < 0 ? triggerNext() : triggerPrev());
    }

    const touches = {
      touchstart: {x: -1, y: -1},
      touchmove: {x: -1, y: -1},
      touchend: false,
      direction: 'undetermined',
    };

    function touchHandler(event) {
      let touch;
      if (typeof event !== 'undefined') {
        if (typeof event.touches !== 'undefined') {
          [touch] = event.touches;
          switch (event.type) {
            case 'touchstart':
            case 'touchmove':
              // event.preventDefault();

              touches[event.type].x = touch.pageX;
              touches[event.type].y = touch.pageY;
              break;
            case 'touchend':
              // event.preventDefault();

              touches[event.type] = true;
              if (touches.touchstart.y > -1 && touches.touchmove.y > -1) {
                touches.direction = touches.touchstart.y < touches.touchmove.y ? 'top' : 'bottom';

                // DO STUFF HERE

                canAdvance && (touches.direction === 'bottom' ? triggerNext() : triggerPrev());
              }
            default:
              break;
          }
        }
      }
    }

    scroller.current.addEventListener('touchstart', touchHandler, wheelOpt);
    scroller.current.addEventListener('touchmove', touchHandler, wheelOpt);
    scroller.current.addEventListener('touchend', touchHandler, wheelOpt);

    window.addEventListener(wheelEvent, handleScroll, wheelOpt);

    scroller.current.addEventListener('keyup', handleKeyUp);

    // function swipeHandler(t) {
    //     t.deltaY < -30 ? triggerNext() : t.deltaY > 30 && triggerPrev()
    // }

    // just in case the user forces the scroll to an in between spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
    gsap
      .timeline({
        scrollTrigger: {
          start: 0,
          end: 'max',
          // snap: 1 / (panels.length - 1),
          scrub: true,
        },
      })
      .from('#progress-bar', {
        scaleY: 0,
        ease: 'linear',
      });

    return () => {
      scroller.current?.removeEventListener('touchstart', touchHandler);
      scroller.current?.removeEventListener('touchmove', touchHandler);
      scroller.current?.removeEventListener('touchend', touchHandler);
      window.removeEventListener(wheelEvent, handleScroll);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <Layout
      scrollWrap
      scrollWrapRef={scroller}
      fixedHeader
      className="text-[7.485vw] lg:text-[4.34vw] leading-tight"
    >
      <Helmet bodyAttributes={{class: 'no-scrollbar bg-black text-white'}} />
      <div
        className="fixed right-0 top-0 bottom-0 origin-top bg-light w-2 z-40"
        id="progress-bar"
      />
      <HomeSlide
        className="text-black lg:text-[6vw] grid-rows-6 z-50 select-none relative z-20"
        ref={landing}
        padding="both"
      >
        <Navbar absolute light allBlack className="!z-20" />
        <div className="text-black text-center col-span-2 lg:col-span-12 row-start-3 row-span-2 flex flex-col justify-center self-middle relative z-20">
          <h1 className="text-5xl lg:text-8xl 2xl:text-9xl mb-2">Opinion Library</h1>
          <h2 className="text-lg lg:text-[1.8rem] 2xl:text-[2.2rem] normal-case">
            What do change.org users think about mask mandates in the U.S.?
          </h2>
        </div>
        <div className="absolute left-0 right-0 bottom-0 py-8 z-20 text-center text-base lg:text-xl normal-case text-black">
          <p onClick={() => goToSection(1)} className="cursor-pointer">
            Scroll down to discover more
            <span className="mx-auto w-10 lg:w-12 pt-4 block">
              <svg viewBox="0 0 63 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M61.5 2L32 23.5L1 2" stroke="black" strokeWidth="3" />
              </svg>
            </span>
          </p>
        </div>
      </HomeSlide>
      <HomeSlide className="overflow-hidden" span={1} ref={changeDataSlide}>
        <div
          id="change-data-bubbles"
          className="text-black text-center normal-case absolute h-[90%] bottom-0 w-full right-0 left-0 select-none"
        >
          <div
            className={classNames(
              'bg-light rotate-[-30deg] ',
              'bg-light rounded-full ',
              'flex items-center justify-center ',
              'w-[50vmin] lg:w-[60vmin] h-[50vmin] lg:h-[60vmin] ',
              'absolute right-0 bottom-[15%] '
            )}
          >
            <div>
              <p className="text-xl lg:text-3xl">+208,5%</p>
              <p className="text-base">Signatures</p>
            </div>
          </div>
          <div
            className={classNames(
              'bg-light rotate-[18deg] ',
              'bg-light rounded-full px-4 ',
              'flex items-center justify-center ',
              'w-[25vmin] lg:w-[16vmin] h-[25vmin] lg:h-[16vmin] ',
              'absolute right-[66%] bottom-[30%] lg:bottom-[16%]'
            )}
          >
            <div>
              <p className="text-xl lg:text-3xl">+33%</p>
              <p className="text-base">Global Users</p>
            </div>
          </div>
          <div
            className={classNames(
              'bg-light rotate-[-30deg] ',
              'bg-light rounded-full px-4 ',
              'flex items-center justify-center ',
              'w-[25vmin] lg:w-[15vmin] h-[25vmin] lg:h-[15vmin] ',
              'absolute left-[30%] lg:left-[41%] bottom-[4%]'
            )}
          >
            <div>
              <p className="text-xl lg:text-3xl">+46%</p>
              <p className="text-base">Published Petitions</p>
            </div>
          </div>
        </div>
        <h2 className="col-span-2 lg:col-span-9 relative">
          <mark>Change.org</mark> is the largest petition website, and in 2020{' '}
          <span className="inline-block">it only grew</span> larger, especially in the United States
        </h2>
      </HomeSlide>
      <HomeSlide span={2} padding={false} ref={maskMandateSlide}>
        <div className="col-span-2 lg:col-span-8 ">
          <h2 className="sticky top-0 full pt-24 lg:pt-32" style={{letterSpacing: -1}}>
            As the platform grew, so did the topics being discussed. One of the most{' '}
            <mark>controversial themes</mark> has been <br />
            <SlotMaschine words={words} />
          </h2>
        </div>

        <div className="absolute h-1/2 bottom-0 left-0 right-0 p-8 overflow-hidden">
          <div className="relative h-full w-full z-40 home-petition-images ">
            <Image
              image={allFile.nodes[7]}
              className="lg:w-1/3 absolute top-[23%] lg:top-0 right-2 lg:right-8"
              onClick={openPetitionLink(7)}
            />
            <Image
              image={allFile.nodes[0]}
              className="w-1/3 absolute top-8 left-0 hidden lg:block"
              onClick={openPetitionLink(0)}
            />
            <Image
              image={allFile.nodes[8]}
              className="lg:w-1/3 absolute top-[5%] lg:top-[16%] left-8 lg:left-[41%]"
              onClick={openPetitionLink(8)}
            />
            <Image
              image={allFile.nodes[2]}
              className="lg:w-1/3 absolute top-1/4 lg:top-1/3 lg:mt-8 -right-4 lg:-right-16 hidden lg:block "
              onClick={openPetitionLink(2)}
            />
            <Image
              image={allFile.nodes[1]}
              className="lg:w-1/3 absolute bottom-[30%] lg:bottom-[unset] lg:top-1/2 -translate-y-1/2 lg:left-[8.3%]"
              onClick={openPetitionLink(1)}
            />
            <Image
              image={allFile.nodes[4]}
              className="lg:w-1/3 absolute bottom-[22%] lg:bottom-[20%] left-[16%]"
              onClick={openPetitionLink(4)}
            />
            <Image
              image={allFile.nodes[3]}
              className="lg:w-1/3 absolute bottom-12 lg:bottom-[16%] right-[16%]"
              onClick={openPetitionLink(3)}
            />
            <Image
              image={allFile.nodes[5]}
              className="lg:w-1/3 absolute top-full lg:top-[83%] -left-[5%] hidden lg:block"
              onClick={openPetitionLink(5)}
            />
            <Image
              image={allFile.nodes[6]}
              className="lg:w-1/3 absolute bottom-0 right-0"
              onClick={openPetitionLink(6)}
            />
          </div>
        </div>
      </HomeSlide>
      <HomeSlide className="auto-rows-min " padding="both" id="why-you-signed" ref={whyYouSigned}>
        <div className="col-span-2 lg:col-span-9 min-h-[30rem]">
          <p className="pb-8 ">
            <mark>Why</mark> they have signed
          </p>
          <Comment
            id="fake-comment"
            user="30200130"
            from_now="1 minute ago"
            petition={{title: 'Petition title'}}
            large
            origin="black"
          />
        </div>
      </HomeSlide>
      <HomeSlide
        span={2}
        className="grid-rows-2"
        id="understand-language"
        padding={false}
        ref={understandLanguage}
      >
        <div className="col-span-2 lg:col-span-8">
          <div className="lg:h-screen w-full pt-24 lg:pt-32">
            <p id="this-allows">
              This allows us to understand the different points of view and the{' '}
              <mark>language</mark> used to express them
            </p>
          </div>
          <div className="lg:h-screen lg:w-full pt-4 lg:pt-32">
            <p id="recurring-words">
              We can find recurring{' '}
              <HighlightedWord isActive={highlightWords} className={highlightWords && 'text-black'}>
                words
              </HighlightedWord>{' '}
              in these comments
            </p>
          </div>
        </div>
        <div className=" col-span-2 lg:row-span-2 lg:col-span-4 normal-case">
          <div className="lg:sticky h-full lg:h-screen top-0 pt-24 lg:pt-32 grid auto-rows-min gap-y-4 comment-container overflow-hidden lg:overflow-y-scroll no-scrollbar ">
            {Object.entries(commentsData).map(([id, word], index) => {
              const comment = homeComments.find(({commentId}) => commentId == id);
              return (
                <Comment
                  key={id}
                  highlightWords={highlightWords}
                  word={word}
                  className={classNames('!mr-0', index > 4 && 'hidden lg:grid')}
                  {...comment}
                  origin="black"
                />
              );
            })}
          </div>
        </div>
      </HomeSlide>
      <HomeSlide
        span={1}
        className="grid-rows-2  auto-rows-max lg:auto-rows-auto lg:grid-rows-none"
        id="some-words-frequent"
      >
        <div className="col-span-2 lg:col-span-6">
          <h2 className="mb-4">
            These words are common, but are used in different ways to comment{' '}
            <span className="bg-promask inline-block">pro mask</span> and{' '}
            <span className="bg-nomask inline-block">no mask</span> petitions
          </h2>
        </div>
        <div className="col-span-2 lg:col-span-6 relative">
          <Rettangoli className="absolute bottom-0 left-0 right-0 h-full w-full delta-svg" />
        </div>
      </HomeSlide>
      <HomeSlide className=" auto-rows-min" padding="both">
        <div className="col-span-2 lg:col-span-9" style={{letterSpacing: -1}}>
          The opinion library is a tool that collects comments and shows relations among the{' '}
          <mark>words most commonly used</mark> to comment pro mask and no mask petitions
        </div>
        <div className="absolute col-span-2 left-8 right-8 bottom-16 z-10">
          <div className=" inline-block">
            <Button
              id="view-library-button"
              as={Link}
              to="/library/"
              large
              onTouchStart={e => e.stopPropagation()}
              onTouchMove={e => e.stopPropagation()}
              onTouchEnd={e => e.stopPropagation()}
              onClick={e => e.stopPropagation()}
              activeClassName={classNames('border-light text-light')}
            >
              View the library
            </Button>
          </div>
        </div>
      </HomeSlide>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  {
    words: allSheetsScatter(limit: 64, skip: 2) {
      nodes {
        name
      }
    }
    allFile(filter: {relativeDirectory: {eq: "home"}}) {
      nodes {
        id
        relativePath
        childImageSharp {
          gatsbyImageData
        }
      }
    }

    comments: allCommentsJson(filter: {showInHome: {eq: true}}) {
      nodes {
        ...CommentJsonFragment
      }
    }
  }
`;
