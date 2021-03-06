import * as React from 'react';
import classNames from 'classnames';
import {Link} from 'gatsby';
import {useState} from 'react';
import Logo from '../images/logo.component.svg';
import Burger from '../images/burger.component.svg';
import Button from './Button';

import video1 from '../video/tutorial_1 MENO.mp4';
import video2 from '../video/tutorial_2 MENO.mp4';
import video3 from '../video/tutorial_3 MENO.mp4';
import video4 from '../video/tutorial_4 MENO.mp4';
import video5 from '../video/tutorial_5 MENO.mp4';

const tutorialSlides = [
  {
    video: video1,
    text: 'When first opening the library you’ll be presented a list of the twenty words most used to comment both promask and nomask petitions. Select a word to discover which other words are most commonly used together with it.',
  },

  {
    video: video2,
    text: 'Once a word is selected, a central panel will appear to display how the other words are used by the two groups in comments mentioning it.',
  },

  {
    video: video3,
    text: 'Related words will be positioned horizontally according to their usage by the two groups. Words most frequently used to comment promask petitions will be found on the right, while words used to comment nomask ones will be positioned to the left. The vertical disposition follows alphabetic order.',
  },
  {
    video: video4,
    text: 'You can read the comments mentioning the selected word by clicking on the Comments tab.',
  },
  {
    video: video5,
    text: 'An additional filter can be added by selecting one of the words from the list inside the Comments tab. This will add a filter and display only comments using both words.',
  },
];

function Tutoria({tutorial, onChangeTutorial}) {
  return (
    <div className="fixed inset-0 z-[100] lg:z-50">
      <div className="w-full h-full relative">
        <div
          className="bg-gray absolute inset-0 opacity-70"
          onClick={() => onChangeTutorial(false)}
        />
        <div className="absolute inset-0 flex items-center w-full 2xl:w-6/12 md:w-8/12 mx-auto justify-center">
          <div className="mx-16 bg-[#ECECEC] rounded-3xl text-black relative w-full">
            <div className="absolute top-0 right-0">
              <button
                role="button"
                className="px-8 py-6 cursor-pointer inline-block "
                onClick={() => onChangeTutorial(false)}
              >
                <svg
                  width="1rem"
                  height="1rem"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-black inline-block"
                >
                  <path d="M1 0.999999L13 13" strokeWidth="2" />
                  <path d="M13 1L0.999999 13" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div className="flex items-center h-full ">
              <div className="">
                <button
                  className={`cursor-pointer pl-8 pr-4 py-6  text-xl ${
                    tutorial === 0 && 'invisible'
                  }`}
                  type="button"
                  onClick={() => onChangeTutorial(i => (i <= 0 ? false : i - 1))}
                >
                  {'<-'}
                </button>
              </div>
              <div className="overflow-hidden pt-20 pb-16">
                <div
                  className="w-full flex flex-nowrap transition-all duration-500"
                  style={{transform: `translateX(${tutorial * -100}%)`}}
                >
                  {tutorialSlides.map(t => (
                    <div className="w-full flex-shrink-0 px-4 box-border" key={t.video}>
                      <video
                        src={t.video}
                        className="aspect-[16/10]"
                        muted
                        playsInline
                        autoPlay
                        loop
                      />
                      <p className="pt-6 text-lg">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <button
                  type="button"
                  className={`cursor-pointer pl-8 pr-4 py-6 rotate-180 block text-xl ${
                    tutorial === 4 && 'invisible'
                  }`}
                  onClick={() =>
                    onChangeTutorial(i => (i >= tutorialSlides.length - 1 ? false : i + 1))
                  }
                >
                  {'<-'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const menu = [
  {
    path: '/',
    text: 'Context',
  },
  {
    path: '/library/',
    text: 'Library',
  },
  {
    path: '/about/',
    text: 'About',
  },
];

export default function Navbar({fixed, light, absolute, className, allBlack, tutorial}) {
  const [showTutorial, setTutorial] = useState(false);
  const [openMenu, setMenu] = useState(false);

  return (
    <>
      <nav
        className={classNames(
          fixed ? 'fixed' : [absolute ? 'absolute' : 'sticky'],
          'top-0 z-[15] py-4 px-6 lg:px-8 flex w-full uppercase justify-between text-base items-center',
          light && 'navbar-light',
          tutorial && ' !z-[100] ',
          className
        )}
      >
        <Link to="/" className="w-1/12">
          <Logo className="fill-current h-8 lg:h-[60px]" />
        </Link>
        <button
          className={classNames(
            'font-icon text-xl p-1 relative z-[110] lg:hidden',
            openMenu && 'active text-white'
          )}
          onClick={() => setMenu(!openMenu)}
        >
          A
        </button>
        <ul
          className={classNames(
            'lg:flex lg:items-center',
            openMenu
              ? 'fixed inset-0 flex flex-col text-left justify-end !bg-black text-3xl gap-y-4 p-6 pb-16 z-[100] text-white'
              : 'hidden'
          )}
          onTouchMove={e => e.preventDefault()}
          onScroll={e => e.preventDefault()}
        >
          <div>
            <button
              className={classNames(
                'button  w-auto',
                light ? 'hover:text-light-darker' : ' ',
                'lg:py-1 px-8 lg:px-4',
                'hidden lg:inline',
                'border-current active:bg-light active:text-black border rounded-full hover:text-black',
                light ? 'hover:text-light-darker' : 'hover:text-light ',
                tutorial ? 'uppercase ' : 'invisible'
              )}
              onClick={() => {
                setMenu(false);
                setTutorial(0);
              }}
            >
              Tutorial
            </button>
          </div>
          {menu.map(({path, text}) => (
            <li key={path} className="first:border-current lg:ml-8 ">
              <Link
                to={path}
                className={classNames(
                  'hover:underline py-3',
                  !allBlack && 'active:text-light-darker '
                )}
                activeClassName={classNames(
                  'underline',
                  allBlack && 'text-light lg:text-current',
                  !allBlack && [
                    light
                      ? 'border-light-darker lg:text-light-darker'
                      : 'lg:border-light lg:text-light',
                  ]
                )}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {typeof showTutorial === 'number' && (
        <Tutoria tutorial={showTutorial} onChangeTutorial={setTutorial} />
      )}
    </>
  );
}
