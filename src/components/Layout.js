import React from 'react';
import '../style.css';
import {Helmet} from 'react-helmet';
import classNames from 'classnames';
import Footer from './Footer';
import Navbar from './Navbar';
import Seo from './Seo';

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
}) {
  return (
    <div className={classNames('antialiased', wrapperClassName)}>
      <Seo title={title} />
      <Helmet
        bodyAttributes={{
          class: classNames(
            footer
              ? 'bg-white text-black overflow-y-scroll about-page scroll-p-16'
              : 'bg-black text-white '
          ),
        }}
      />
      <Navbar fixed={fixedHeader} light={light} tutorial={tutorial} />
      <div className={classNames('relative ', container && 'mx-8', className)}>{children}</div>
      {footer && <Footer />}
    </div>
  );
}
