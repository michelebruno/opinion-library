import React, {forwardRef} from "react";
import classNames from "classnames";

let heightClasses = [
    'h-0',
    'h-screen',
    'h-[200vh]',
    'h-[300vh]',
    'h-[400vh]',
]

const HomeSlide = forwardRef(({children, className, id, span, uppercase, padding}, ref) => {
    return <div className={classNames(
        "section px-10 box-border",
        'relative',
        heightClasses[span],
        uppercase && 'uppercase',
        padding === 'top' && 'pt-32',
        padding === 'both' && 'py-32',
        padding === 'bottom' && 'pb-32',
        'grid grid-cols-12 gap-16',
        className
    )}
                style={{height: `${span}00 vh`}}
                id={id}
                ref={ref}
    >
        {children}

        <div className="snappers-container absolute inset-0 z-[-1]">
            {
                Array(span).fill(0).map((_zero, index) => <div className="h-screen snapper" key={index}/>)
            }
        </div>

    </div>
})
HomeSlide.defaultProps = {
    span: 1,
    uppercase: true,
    padding: 'top'
}

export default HomeSlide