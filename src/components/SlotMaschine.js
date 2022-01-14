import * as React from 'react';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';

export default function SlotMaschine({words}) {
  const el = useRef();
  useEffect(() => {
    const l = words.nodes.length * 2;

    // SLOT MACHINE
    gsap.to(el.current, {
      yPercent: (-100 * l) / (l + 1),
      ease: 'power4.out',
      paused: true,
      duration: 3,
      delay: 0.3,
      scrollTrigger: {
        trigger: el.current.parentElement,
        once: true,
        scroller: '.scroll-wrapper',
        // start: 'top center'
      },
    });
  }, []);
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-4 overflow-hidden h-[1.75em] rounded-full border-2 border-white inline-block">
      <div className="inline-block h-[1em]" id="slot-machine">
        <div className="slot-content w-auto" ref={el}>
          {[...words.nodes.map(i => i.name), ...words.nodes.map(i => i.name), 'mask mandates'].map(
            (w, i) => (
              <span className="block w-auto" key={i}>
                {w}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
