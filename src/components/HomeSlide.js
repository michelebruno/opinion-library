import React, {forwardRef} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const heightClasses = ['h-0', 'h-full', 'h-[200%]', 'h-[300%]', 'h-[400%]'];

const HomeSlide = forwardRef(({children, className, id, span, uppercase, padding}, ref) => (
  <div
    className={classNames(
      'section px-6 lg:px-8 box-border',
      'relative',
      heightClasses[span],
      uppercase && 'uppercase',
      padding === 'top' && 'pt-24 lg:pt-32',
      padding === 'both' && 'pb-16 pt-24 lg:py-32',
      padding === 'bottom' && 'pb-16 lg:pb-32',
      'grid grid-cols-2 lg:grid-cols-12 lg:gap-8',
      className
    )}
    style={{height: `${span}00%`}}
    id={id}
    ref={ref}
  >
    <div className="snappers-container overflow-hidden absolute inset-0 -z-10">
      {Array(span)
        .fill(0)
        .map((_zero, index) => (
          <div className="h-full snapper" key={index} />
        ))}
    </div>
    {children}
  </div>
));
HomeSlide.defaultProps = {
  span: 1,
  uppercase: true,
  padding: 'top',
};

HomeSlide.propTypes = {
  padding: PropTypes.oneOf(['top', 'bottom', 'both', false]),
};

export default HomeSlide;
