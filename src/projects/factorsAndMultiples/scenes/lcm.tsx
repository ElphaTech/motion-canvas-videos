import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line, Circle, Rect, Text, Shape} from '@motion-canvas/2d/lib/components/';
import { CodeBlock, insert, range, remove, edit } from '@motion-canvas/2d/lib/components/CodeBlock';
import { createRef, makeRef, useDuration,Reference } from '@motion-canvas/core/lib/utils';
import {all, waitUntil, waitFor, sequence} from '@motion-canvas/core/lib/flow';
import { createEaseOutBack, createEaseInOutBack, createEaseInBack } from '@motion-canvas/core/lib/tweening';
import { SignalValue, createSignal } from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
    const screenNode = createRef<Node>();
    const titleN = createRef<Node>();
    const title0 = createRef<Text>();
    const title1 = createRef<Text>();
    const title2 = createRef<Text>();
    const title3 = createRef<Text>();
    
    const lcmP1 = createRef<Rect>();
    const code1 = createRef<CodeBlock>();
    const l1Box = createRef<Rect>();
    const l2Box = createRef<Rect>();

    const lcmP2 = createRef<Rect>();
    const code2 = createRef<CodeBlock>();

    const textS = {
        fontFamily: 'monospace',
        fill: '#8FB974',
    };

    yield view.add(
        <Node ref={screenNode} x={1920}>
            <Node ref={titleN}>
                <Text text={'Section 1:'} {...textS} fontSize={80} lineHeight={80} y={-235} ref={title0}/>
                <Text text={'How to Calculate'} {...textS} fontSize={150} lineHeight={150} y={-110} ref={title1}/>
                <Text text={'The Lowest Common'} {...textS} fontSize={150} lineHeight={150} y={50} ref={title2}/>
                <Text text={'Multiple (LCM)'} {...textS} fontSize={150} lineHeight={150} y={210} ref={title3}/>
                {/* <Rect width={1000} height={560} fill={'#2222dd'} opacity={0.5}/> */}
            </Node>
            <Rect ref={lcmP1} scale={1.5} y={1020}>
                <Rect ref={l1Box} width={70.2} height={95} fill={'#22dd22'} radius={25} y={-60} x={-30.1} opacity={0}/>
                <Rect ref={l2Box} width={70.2} height={95} fill={'#22dd22'} radius={25} y={40} x={-30.1} opacity={0}/>
                <CodeBlock ref={code1} fontSize={100} lineHeight={100} code={`
                    12 |
                    8  |`}/>,
            </Rect>
            <Rect ref={lcmP2} scale={0.7} y={1720}>
                <CodeBlock ref={code2} fontSize={100} lineHeight={100} code={` = lcm`}/>
            </Rect>
        </Node>
    );
    //bring screen in
    yield* screenNode().position.x(0,0.5)

    //show example
    yield* waitUntil('show example')
    yield* all(
        title0().position.y(-1020,0.8),
        title1().position.y(-1130,0.8),
        title2().fontSize(70,0.8),
        title3().fontSize(70,0.8),
        title2().position.x(-316.125,0.8),
        title3().position.x(379.35,0.8),
        title2().position.y(-480,0.8),
        title3().position.y(-480,0.8),
    )
    yield* lcmP1().position.y(0,0.8)

    yield* waitUntil('add 1-1st 2')
    yield * code1().edit(0.8)`12 |${insert(' 2')}
8  |`;

    yield* waitUntil('add 1-2nd 2')
    yield * code1().edit(0.8)`12 | 2${insert(', 2')}
8  |`;

    yield* waitUntil('add 1-1st 3')
    yield * code1().edit(0.8)`12 | 2, 2${insert(', 3')}
8  |`;

    yield* waitUntil('add 2-1st 2')
    yield * code1().edit(0.8)`12 | 2, 2, 3
8  |${insert(' 2')}`;

    yield* waitUntil('add 2-2nd 2')
    yield * code1().edit(0.8)`12 | 2, 2, 3
8  | 2${insert(', 2')}`;

    yield* waitUntil('add 2-3rd 2')
    yield * code1().edit(0.8)`12 | 2, 2, 3
8  | 2, 2${insert(', 2')}`;

    yield* waitUntil('reset highlighting')
    yield* code1().selection(range(0, 0, Infinity, Infinity),1)

    //remove first 2
    yield* waitUntil('show top box')
    yield* l1Box().opacity(0.6,0.8)

    yield* waitUntil('show bottom box')
    yield* l2Box().opacity(0.6,0.8)

    yield* waitUntil('1st flash')
    yield* l2Box().fill('#ff2222',0.3)

    yield* waitUntil('1st remove')
    yield* all(
        l2Box().opacity(0,1.2),
        code1().edit(1.2,false)`12 | 2, 2, 3
8  | ${remove('2, ')}2, 2`,
    )
    l2Box().fill('#22dd22')

    //remove second 2
    yield* waitUntil('move top box')
    yield* l1Box().position.x(150.5,0.8)

    yield* waitUntil('show bottom box2')
    yield* l2Box().opacity(0.6,0.8)

    yield* waitUntil('2st flash')
    yield* l2Box().fill('#ff2222',0.3)

    yield* waitUntil('2st remove')
    yield* all(
        l2Box().opacity(0,1.2),
        code1().edit(1.2,false)`12 | 2, 2, 3
8  | ${remove('2, ')}2`,
    )
    l2Box().fill('#22dd22')

    //remove second 2
    yield* waitUntil('move top box2')
    yield* l1Box().position.x(331.1,0.8)

    yield* waitUntil('show bottom box3')
    yield* l2Box().opacity(0.6,0.8)

    yield* waitUntil('hide boxes')
    yield* all(
        l1Box().opacity(0,0.8),
        l2Box().opacity(0,0.8),
    )

    //move up and away
    yield* waitUntil('swap parts')
    yield* all(
        lcmP1().position.y(-350,0.8),
        lcmP1().scale(0.7,0.8),
        lcmP2().position.y(0,0.8),
        lcmP2().scale(1.5,0.8),
    )

    yield* waitUntil('add nums')
    yield * code2().edit(1.2)`${insert('2*2*2*3')} = lcm`;

    yield* waitUntil('replace lcm')
    yield * code2().edit(1.2)`${edit('2*2*2*3','2³*3')} = lcm`;

    yield* waitUntil('shorten lcm')
    yield * code2().edit(1.2)`2³*3 = ${edit('lcm','24')}`;

    yield* waitUntil('reset colors2')
    yield* code2().selection(range(0, 0, Infinity, Infinity),1)

    yield* waitUntil('End')
    //bring screen out
    yield* screenNode().position.x(-1920,0.5)
});

// To render:
// 1. Open terminal in the main folder
// 2. Run this command for no audio
// ffmpeg -framerate 60 -pattern_type glob -i 'output/project/*.png' -c:v libx264 -pix_fmt yuv420p output/output.mp4
//    Or this with audio
// ffmpeg -framerate 60 -pattern_type glob -i 'output/project/*.png' -i audio/voice.mp3 -shortest -c:v libx264 -pix_fmt yuv420p output/output.mp4