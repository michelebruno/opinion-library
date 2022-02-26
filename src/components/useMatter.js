import {useEffect} from 'react';
import * as Matter from 'matter-js';
import {graphql, useStaticQuery} from 'gatsby';
import {detect} from 'detect-browser';

const {Engine, Render, World, Bodies, Body} = Matter;
const browser = detect();

export default function useMatter(containerRef) {
  const {front} = useStaticQuery(graphql`
    {
      front: allFile(filter: {relativeDirectory: {eq: "landing"}}) {
        nodes {
          publicURL
        }
      }
    }
  `);

  function initCanvas() {
    while (containerRef?.current?.querySelector('.snapper canvas')) {
      containerRef?.current?.querySelector('.snapper canvas').remove();
    }

    function random() {
      if (Math.random() < 0.5) {
        return -1 * Math.random();
      }
      return Math.random();
    }

    const engine = Engine.create();

    const render = Render.create({
      element: containerRef.current?.querySelector('.snapper'),
      engine,
      options: {
        background: '#CFFF58',
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        hasBounds: true,
      },
      pixelRatio: 'auto',
    });

    render.context.globalAlpha = 0;

    // Settings
    const gravity = 0;
    const sizeX = window.innerWidth;
    const sizeY = window.innerHeight;

    const isMobile = sizeX < 600;

    const friction = 0.0001;
    const angularVelocity = 0.001;
    let spriteScale = isMobile ? 0.7 : 1.3; // il bounding box è definito da maskSize
    const maskSize = Math.round(Math.min(sizeY, sizeX) / (isMobile ? 20 : 10));

    console.log(browser);
    if (browser.name === 'safari' || browser.name === 'ios' || browser.name === 'ios-webview') {
      console.log("You're on safari", browser);
      spriteScale /= 2.5;
    }

    const masks = [];

    for (let i = 0; i < 6; i++) {
      const imgIndex = i % 2;

      const startForce = isMobile ? 0.003 : 0.03;
      masks.push(
        Bodies.circle(Math.random() * sizeX, Math.random() * sizeY, maskSize, {
          friction: 0,
          frictionStatic: 0,
          frictionAir: friction,
          angularVelocity, // = quanto rimbalzano
          restitution: 1,
          force: {
            x: startForce + random() / (isMobile ? 50 : 6),
            y: startForce + random() / (isMobile ? 50 : 6),
          },
          render: {
            sprite: {
              texture: front.nodes[imgIndex].publicURL,
              xScale: spriteScale,
              yScale: spriteScale,
            },
          },
        })
      );
    }

    const textBox = Bodies.rectangle(sizeX / 2, sizeY / 2, sizeX * 0.7, sizeY * 0.2, {
      isStatic: true,
      render: {visible: false},
    });

    const scrollDownBox = Bodies.rectangle(sizeX / 2, sizeY, sizeX / 4, sizeY / 6, {
      isStatic: true,
      render: {visible: false},
    });

    // Add walls
    const wall_down = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 20,
      window.innerWidth * 1.4,
      20,
      {isStatic: true}
    );
    const wall_top = Bodies.rectangle(window.innerWidth / 2, -11, window.innerWidth * 1.4, 10, {
      isStatic: true,
    });
    const wall_left = Bodies.rectangle(-11, window.innerHeight / 2, 10, window.innerHeight * 1.4, {
      isStatic: true,
    });
    const wall_right = Bodies.rectangle(
      window.innerWidth + 21,
      window.innerHeight / 2,
      20,
      window.innerHeight * 1.4,
      {isStatic: true}
    );

    const MouseBody = Bodies.circle(sizeX / 3, sizeY / 3, maskSize);

    // Add Mouse
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        render: {visible: false},
      },
    });

    mouseConstraint.body = MouseBody;

    render.mouse = mouse;

    // Set Gravity (done trough //Settings)
    engine.world.gravity.y = gravity;
    engine.world.gravity.x = gravity;

    World.add(engine.world, [
      ...masks,
      wall_top,
      wall_down,
      wall_left,
      wall_right,
      textBox,
      scrollDownBox,
      mouseConstraint,
    ]);

    Matter.Runner.run(engine);
    Render.run(render);

    function onResize() {
      render.canvas.width = window.innerWidth * window.devicePixelRatio;
      render.canvas.height = window.innerHeight * window.devicePixelRatio;
      Body.setPosition(wall_right, {x: window.innerWidth + 21, y: window.innerHeight / 2});
    }
    window.addEventListener('resize', onResize, true);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }

  useEffect(initCanvas, []);
}
