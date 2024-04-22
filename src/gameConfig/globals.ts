import { createGround } from "@gameCore/elements/ground";
import { Vec2, World } from "planck";
import { Globals } from "@gameCore/types";
import { rotatePoints, segmentedBezier } from "@utils/bezier";
import { translateElement } from "@utils/translateElement";
import { loadGifFxImages } from "@gameCore/effects/effect";
import gifFx1 from "../assets/images/fx-1.gif";

export const gifFxImages = loadGifFxImages([{ path: gifFx1, x: "calc( 50% - 200px )", y: "-80px" }, { path: gifFx1, x: "calc( 50% - 80px )", y: "210px" }]);

const gameElements = {
  balls: [
    { initPosition: Vec2(21.3, 33.0), active: false },
    { initPosition: Vec2(21.3, 31.0), active: false },
    { initPosition: Vec2(21.3, 29.0), active: false },

  ],

  scoops: [
    {
      shape: "arc",
      coordinates: [
        ...segmentedBezier(
          { x: 5.0, y: 2.0 },
          { x: 3.0, y: 1.5 },
          { x: 3.0, y: 4.5 },
          { x: 5.0, y: 4.0 },
          11
        ),
      ],
    },
  ],

  groundAnchors: [
    ...segmentedBezier(
      { x: 2.0, y: 2.0 },
      { x: 2.0, y: 1.0 },
      { x: 2.0, y: 1.0 },
      { x: 3.0, y: 1.0 },
      10
    ),

    ...segmentedBezier(
      { x: 21.0, y: 1.0 },
      { x: 22.0, y: 1.0 },
      { x: 22.0, y: 1.0 },
      { x: 22.0, y: 2.0 },
      10
    ),

    ...segmentedBezier(
      { x: 22.0, y: 33.0 },
      { x: 22.0, y: 34.0 },
      { x: 22.0, y: 34.0 },
      { x: 21.0, y: 34.0 },
      10
    ),

    ...segmentedBezier(
      { x: 3.0, y: 34.0 },
      { x: 2.0, y: 34.0 },
      { x: 2.0, y: 34.0 },
      { x: 2.0, y: 33.0 },
      10
    ),
  ],

  chainBumpers: [
    // {
    //   shape: "chain",
    //   props: {
    //     restitution: 0.9,
    //     friction: 0,
    //     damping: 0,
    //   },

    //   coordinates: 
    //     [
    //       ...segmentedBezier(
    //         { x: 7.0, y: 9.7 },
    //         { x: 7.0, y: 10.1 },
    //         { x: 7.4, y: 10.1},
    //         { x: 7.4, y: 9.6 },

    //         6
    //       ),

    //       ...segmentedBezier(
    //         { x: 7.4, y: 9.0 },
    //         { x: 7.4, y: 8.6 },
    //         { x: 7.0, y: 8.6 },
    //         { x: 7.0, y: 9.0 },

    //         6
    //       ),


    //     ],


    // },

    //slingshot left
    {
      shape: "chain",
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },

      coordinates: translateElement(
        [
          ...segmentedBezier(
            { x: 0.3, y: 0.3 },
            { x: 0.3, y: 0.2 },
            { x: 0.0, y: 0.2 },
            { x: 0.0, y: 0.3 },
            9
          ),

          ...segmentedBezier(
            { x: 0.0, y: 3.0 },
            { x: 0.0, y: 3.2 },
            { x: 0.2, y: 3.4 },
            { x: 0.2, y: 3.4 },
            9
          ),

          ...segmentedBezier(
            { x: 0.9, y: 4.0 },
            { x: 1.0, y: 4.1 },
            { x: 1.2, y: 3.9 },
            { x: 1.1, y: 3.7 },
            9
          ),
        ],
        { x: 5.5, y: 24.5 }
      ),
    },
    //slingshot right
    {
      shape: "chain",
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
      coordinates: translateElement(
        [
          ...segmentedBezier(
            { x: 0.9, y: 0.2 },
            { x: 0.9, y: -0.2 },
            { x: 0.3, y: -0.1 },
            { x: 0.2, y: 0.5 },
            4
          ),

          ...segmentedBezier(
            { x: -0.6, y: 4.0 },
            { x: -0.6, y: 4.2 },
            { x: -0.5, y: 4.2 },
            { x: -0.4, y: 4.0 },
            9
          ),

          ...segmentedBezier(
            { x: 1.0, y: 2.8 },
            { x: 1.0, y: 2.8 },
            { x: 1.2, y: 2.4 },
            { x: 1.2, y: 2.4 },
            9
          ),
        ],
        { x: 17.0, y: 24.5 }
      ),
    },

    {
      shape: "chain",
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
      coordinates: rotatePoints(
        [
          Vec2(11.5, 12.4),
          Vec2(12.0, 13.0),
          Vec2(14.4, 13.0),
          Vec2(14.6, 12.6),
        ],
        (14 * Math.PI) / 180
      ),
    },

    /*
    {
      shape: "chain",
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
      coordinates: rotatePoints(
        [
          Vec2(3.0, 17.0),
          Vec2(3.0, 22.0),
          Vec2(3.3, 21.4),
          Vec2(3.5, 18.0),
        ], -0.2)
    },
    */

    {
      shape: "chain",
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
      coordinates: [
        Vec2(18.2, 17.5),
        Vec2(18.0, 17.5),
        Vec2(19.4, 21.0),
        Vec2(19.8, 21.0),
      ],
    },

    {
      shape: "chain",
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
      coordinates: [
        Vec2(18.2, 17.5),
        Vec2(18.0, 17.5),
        Vec2(19.4, 21.0),
        Vec2(19.8, 21.0),
      ],
    },

    {
      shape: "chain",
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
      coordinates: [Vec2(15.0, 3.0), Vec2(15.0, 3.3), Vec2(18.0, 5.3)],
    },

    {
      shape: "chain",
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
      coordinates: [Vec2(6.5, 4.3), Vec2(4.0, 5.0), Vec2(4.0, 5.3)],
    },
  ],

  circleBumpers: [
    {
      shape: "circle",
      position: Vec2(11.8, 8.3),
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
    },

    {
      shape: "circle",
      position: Vec2(15.2, 7.6),
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
    },

    {
      shape: "circle",
      position: Vec2(14.0, 10.9),
      props: {
        restitution: 0.9,
        friction: 0,
        damping: 0,
      },
    },
  ],

  lanes: [
    [Vec2(4.4, 28.7), Vec2(7.3, 30.7)],
    // [Vec2(18.0, 30.0), Vec2(20.5, 28.0)],
    [Vec2(4.2, 24.0), Vec2(4.3, 28.5)],
    [Vec2(20.75, 28.0), Vec2(20.75, 22.0)],
  ],

  chainLanes: [
    //[Vec2(2.05, 9.0), Vec2(3.2, 14.0)],
    {
      shape: "arc",
      coordinates: [
        ...segmentedBezier(
          { x: 2.05, y: 9.0 },
          { x: 4.0, y: 12.5 },
          { x: 5.0, y: 14.0 },
          { x: 5.0, y: 14.4 },
          8
        ),

        ...segmentedBezier(
          { x: 5.0, y: 20.0 },
          { x: 5.0, y: 20.3 },
          { x: 2.6, y: 20.0 },
          { x: 3.0, y: 24.0 },
          8
        ),
      ],
    },
    {
      shape: "arc",
      coordinates: [
        ...segmentedBezier(
          { x: 22.0, y: 4.0 },
          { x: 22.0, y: 2.0 },
          { x: 20.0, y: 1.0 },
          { x: 18.0, y: 1.0 },
          8
        ),
      ],
    },

    {
      shape: "chain",
      coordinates: [
        { x: 18.0, y: 17.0 },
        ...segmentedBezier(
          { x: 20.0, y: 5.0 },
          { x: 20.0, y: 3.0 },
          { x: 18.0, y: 2.0 },
          { x: 16.0, y: 2.0 },
          11
        ),
      ],
    },

    {
      shape: "chain",
      coordinates: [
        { x: 19.5, y: 22.0 },
        ...segmentedBezier(
          { x: 19.5, y: 29.0 },
          { x: 19.5, y: 29.25 },
          { x: 19.0, y: 29.5 },
          { x: 19.0, y: 29.5 },
          9
        ),
        { x: 16.75, y: 30.8 },
      ],
    },
  ],

  tubes: [
    {
      shape: "chain",
      coordinates: [
        //inner
        [
          { x: 3.8, y: 19.6 },

          ...segmentedBezier(
            { x: 3.8, y: 12.5 },
            { x: 3.8, y: 12.5 },
            { x: 3.5, y: 11.2 },
            { x: 4.1, y: 11.6 },
            9
          ),
          ...segmentedBezier(
            { x: 4.3, y: 11.8 },
            { x: 4.8, y: 12.3 },
            { x: 6.0, y: 12.0 },
            { x: 5.8, y: 11.0 },
            9
          ),

          ...segmentedBezier(
            { x: 5.6, y: 10.5 },
            { x: 4.6, y: 9.4 },
            { x: 5.2, y: 8.0 },
            { x: 6.6, y: 11.0 },
            9
          ),


        ],
        //outer
        [
          { x: 3.0, y: 20.0 },

          ...segmentedBezier(
            { x: 2.8, y: 11.8 },
            { x: 2.8, y: 11.2 },
            { x: 3.4, y: 10.0 },
            { x: 4.4, y: 10.9 },
            9
          ),
          ...segmentedBezier(
            { x: 4.6, y: 11.0 },
            { x: 5.2, y: 11.2 },
            { x: 4.8, y: 10.8 },
            { x: 4.8, y: 10.8 },
            9
          ),

          ...segmentedBezier(
            { x: 4.3, y: 10.0 },
            { x: 3.1, y: 7.6 },
            { x: 6.4, y: 8.0 },
            { x: 8.0, y: 10.8 },
            11
          ),
        ],
      ],
    },
  ],

  slingshots: [],

  sensors: [
    {
      shape: "circle",
      gameElementType: "CENTRAL-SENSOR",
      coordinates: Vec2(12.0, 21.0),
      id: "sensor0",
      fxGif: gifFxImages[1],
    },
    {
      shape: "circle",
      gameElementType: "SCOOP-SENSOR",
      coordinates: Vec2(4.5, 3.0),
      id: "sensor1",
      fxGif: gifFxImages[0],
    },

    {
      shape: "edge",
      gameElementType: "EDGE-SENSOR",
      coordinates: [Vec2(9.0, 33.75), Vec2(15.0, 33.75)],
      id: "sensor-gameover",
    },

    {
      shape: "edge",
      gameElementType: "EDGE-SENSOR",
      coordinates: [Vec2(2.0, 33.5), Vec2(5.0, 33.5)],
      id: "sensor-left-drain",
    },

    {
      shape: "edge",
      gameElementType: "EDGE-SENSOR",
      coordinates: [Vec2(19.0, 33.5), Vec2(22.0, 33.5)],
      id: "sensor-right-drain",
    },
  ],
  flippers: [
    {
      bodyCoordinate: Vec2(7.5, 31.0),
      boxCenter: Vec2(2.0, 0.1),
      /* planck.js, box2d box sets half width, half height */
      attributes: {
        hX: 2.0,
        hY: 0.1,
        d: 1.0,
      },
      jointProps: {
        lowerAngle: (-5.0 * Math.PI) / 180.0,
        upperAngle: (20.0 * Math.PI) / 180.0,
        anchor: Vec2(7.5 + 0.3, 31.0 + 0.3),
      },
      id: "flipperLeft",
    },
    {
      bodyCoordinate: Vec2(12.6, 31.0),
      boxCenter: Vec2(2.0, 0.1),
      attributes: {
        hX: 2.0,
        hY: 0.1,
        d: 1.0,
      },
      isMirrored: true,
      jointProps: {
        lowerAngle: (-20.0 * Math.PI) / 180.0,
        upperAngle: (5.0 * Math.PI) / 180.0,
        anchor: Vec2(12.9 + 4.0 - 0.3, 31.0 + 0.3),
      },
      id: "flipperRight",
    },
  ],
};

const credits = { bumper: 3 };

const levels = [
  { requiredScore: 0 },
  { requiredScore: 200 },
  { requiredScore: 400 },
];

const world = new World(Vec2(0.0, 10.0));
const ground = createGround(world, gameElements.groundAnchors);

const globals: Globals = {
  world,
  ground,
  scaleCanvas: 16,
  gameElements,
  willBeRemovedParticles: [],
};

export { globals, credits, levels };
