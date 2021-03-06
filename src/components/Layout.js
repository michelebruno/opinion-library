import React from 'react';
import '../style.css';
import {Helmet} from 'react-helmet';
import classNames from 'classnames';
import Footer from './Footer';
import Navbar from './Navbar';
import Seo from './Seo';

console.log(
  'Developed by Michele Bruno.',
  'Check out my portfolio https://michelebruno.github.io/'
);
export default function Layout({
  children,
  className,
  container,
  wrapperClassName,
  fixedHeader,
  footer,
  light,
  tutorial,
  title,
  scrollWrap,
  scrollWrapRef,
}) {
  return (
    <div>
      <div className={classNames('antialiased', wrapperClassName)}>
        <Seo title={title} />
        <Helmet
          bodyAttributes={{
            class: classNames(
              footer ? 'bg-white text-black about-page scroll-smooth' : 'bg-black text-white '
            ),
          }}
        />
        {!scrollWrap && <Navbar fixed={fixedHeader} light={light} tutorial={tutorial} />}
        <div
          className={classNames(
            container && 'mx-6 lg:mx-8',
            scrollWrap
              ? 'fixed z-10 inset-0 overflow-y-scroll no-scrollbar scroll-wrapper touch-none'
              : 'relative',
            className
          )}
          ref={scrollWrapRef}
        >
          {scrollWrap && <Navbar fixed={fixedHeader} light={light} tutorial={tutorial} />}
          {children}
        </div>

        {footer && <Footer />}
      </div>
    </div>
  );
}
