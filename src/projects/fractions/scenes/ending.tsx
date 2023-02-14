import {makeScene2D} from '@motion-canvas/2d';
import {
  Node,
  Rect,
  Layout,
  LayoutProps,
  Text,
} from '@motion-canvas/2d/lib/components';
import {all, loop, waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, range} from '@motion-canvas/core/lib/utils';
import {linear} from '@motion-canvas/core/lib/tweening';

const YELLOW = '#FFC66D';
const RED = '#FF6470';
const GREEN = '#99C47A';
const BLUE = '#68ABDF';

const Trail = (props: LayoutProps) => (
  <Layout layout direction={'column'} gap={30} offsetY={-1} {...props} />
);

export default makeScene2D(function* (view) {
  const main = createRef<Node>();
  const subs = createRef<Text>();
  const star = createRef<Node>();
  const trail1 = createRef<Layout>();
  const trail2 = createRef<Layout>();
  const trail3 = createRef<Layout>();
  const dot = createRef<Rect>();

  view.add(
    <>
      <Node ref={subs} x={1920}>
        <Text fontFamily={'JetBrains Mono'} fontSize={300} fill={"#c92c31"} text={'Subscribe'}/>
      </Node>
      <Node rotation={-45} position={-1000} scale={0.8} ref={main}>
        <Node cache y={-270}>
          <Trail ref={trail1}>
            {range(3).map(_ => (
              <Rect width={40} radius={20} height={120} fill={YELLOW} />
            ))}
          </Trail>
          <Rect
            width={40}
            radius={20}
            height={270}
            fill={'white'}
            offsetY={-1}
            compositeOperation={'destination-in'}
          />
        </Node>
        <Node cache x={-70} y={-200}>
          <Trail ref={trail2}>
            {range(3).map(_ => (
              <Rect width={40} height={120} radius={20} fill={RED} />
            ))}
          </Trail>
          <Rect
            width={40}
            radius={20}
            height={180}
            fill={'white'}
            offsetY={-1}
            compositeOperation={'destination-in'}
          />
        </Node>
        <Node cache x={70} y={-300}>
          <Trail ref={trail3}>
            {range(4).map(i => (
              <Rect
                ref={i === 1 ? dot : undefined}
                width={40}
                radius={20}
                height={100}
                fill={i === 0 ? GREEN : BLUE}
                offsetY={1}
              />
            ))}
          </Trail>
          <Rect
            width={40}
            radius={20}
            height={220}
            fill={'white'}
            offsetY={-1}
            y={60}
            compositeOperation={'destination-in'}
          />
        </Node>
        <Node ref={star}>
          {range(5).map(i => (
            <Rect
              width={100}
              radius={50}
              height={150}
              fill={'#141414'}
              offsetY={1}
              rotation={(360 / 5) * i}
            />
          ))}
          {range(5).map(i => (
            <Rect
              width={40}
              radius={20}
              height={120}
              fill={'white'}
              offsetY={1}
              rotation={(360 / 5) * i}
            />
          ))}
        </Node>
      </Node>
    </>,
  );

  yield* waitUntil('Sub')

  yield* subs().position(0,3)

  yield* waitUntil('Star')

  yield all(main().position(44,3),subs().position.x(-1920,3))

  yield* all(
    star().rotation(1800, 20, linear),
    loop(20, function* () {
      yield* trail1().position.y(-150, 1, linear);
      trail1().position.y(0);
    }),
    loop(10, function* () {
      yield* trail2().position.y(-150, 2, linear);
      trail2().position.y(0);
    }),
    loop(10, function* () {
      yield* all(
        trail3().position.y(-130, 2, linear),
        dot().fill(GREEN, 2, linear),
      );
      dot().fill(BLUE);
      trail3().position.y(0);
    }),
  );

  yield* waitUntil('End')
});