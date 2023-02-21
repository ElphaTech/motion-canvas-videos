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
    const checkBox = createRef<Rect>();

    const lcmP2 = createRef<Rect>();
    const code2 = createRef<CodeBlock>();

    const textS = {
        fontFamily: 'monospace',
        fill: '#8FB974',
    };

    yield view.add(
        <Node ref={screenNode} x={1920}>
            <Node ref={titleN}>
                <Text text={'Section 2:'} {...textS} fontSize={80} lineHeight={80} y={-235} ref={title0}/>
                <Text text={'How to Calculate'} {...textS} fontSize={150} lineHeight={150} y={-110} ref={title1}/>
                <Text text={'The Highest Common'} {...textS} fontSize={150} lineHeight={150} y={50} ref={title2}/>
                <Text text={'Factor (HCF)'} {...textS} fontSize={150} lineHeight={150} y={210} ref={title3}/>
                {/* <Rect width={1000} height={560} fill={'#2222dd'} opacity={0.5}/> */}
            </Node>
            <Rect ref={lcmP1} y={1020}>
                <Rect ref={checkBox} width={70.2} height={195} fill={'#444444'} radius={25} y={-8} x={-331.1} opacity={0}/>
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
        title2().position.x(-273.975,0.8),
        title3().position.x(400.425,0.8),
        title2().position.y(-480,0.8),
        title3().position.y(-480,0.8),
    )
    yield* lcmP1().position.y(0,0.8)

    yield* waitUntil('add 1-1st 2') //12 | 1, 2, 3, 4, 6, 12  //8  | 1, 2, 4, 8
    yield * code1().edit(0.8)`12 |${insert(' 1, 12')}
8  |`;

    yield* waitUntil('add 1-2nd 2')
    yield * code1().edit(0.8)`12 | 1, ${insert('2, 6, ')}12
8  |`;

    yield* waitUntil('add 1-1st 3')
    yield * code1().edit(0.8)`12 | 1, 2, ${insert('3, 4, ')}6, 12
8  |`;

    yield* waitUntil('add 2-1st 2')
    yield * code1().edit(0.8)`12 | 1, 2, 3, 4, 6, 12
8  |${insert(' 1, 8')}`;

    yield* waitUntil('add 2-2nd 2')
    yield * code1().edit(0.8)`12 | 1, 2, 3, 4, 6, 12
8  | 1, ${insert('2, 4, ')}8`;

    yield* waitUntil('reset highlighting')
    yield* code1().selection(range(0, 0, Infinity, Infinity),1)

    //remove first 2
    yield* waitUntil('show check box')
    yield* checkBox().opacity(1,0.8)
    yield* waitUntil('check 1')
    yield* checkBox().fill('#21ba21',0.4).to('#444444',0.4)

    yield* waitUntil('move 2')
    yield* checkBox().position.x(-150.5, 0.6)
    yield* waitUntil('check 2')
    yield* checkBox().fill('#21ba21',0.4).to('#444444',0.4)

    yield* waitUntil('move 3')
    yield* checkBox().position.x(30.1, 0.6)
    yield* waitUntil('check 3')
    yield* checkBox().fill('#ff2222',0.4).to('#444444',0.4)

    yield* waitUntil('1st remove')
    yield* all(
        code1().edit(0.8,false)`12 | 1, 2,${remove(' 3,')} 4, 6, 12
8  | 1, 2, 4, 8`,
    checkBox().position.x(120.4, 0.6),
    )
    yield* waitUntil('check 4')
    yield* checkBox().fill('#21ba21',0.4).to('#444444',0.4)

    yield* waitUntil('move 4')
    yield* checkBox().position.x(301, 0.6)
    yield* waitUntil('check 5')
    yield* checkBox().fill('#ff2222',0.4).to('#444444',0.4)

    yield* waitUntil('2nd remove')
    yield* all(
        code1().edit(0.8,false)`12 | 1, 2, 4,${remove(' 6,')} 12
8  | 1, 2, 4, 8`,
        checkBox().position.x(421.4, 0.6),
        checkBox().size.x(140.4, 0.6),
    )
    yield* waitUntil('check 6')
    yield* checkBox().fill('#ff2222',0.4).to('#444444',0.4)

    yield* waitUntil('3rd remove')
    yield* all(
        code1().edit(0.8,false)`12 | 1, 2, 4${remove(', 12')}
8  | 1, 2, 4${remove(', 8')}`,
        checkBox().opacity(0, 0.6),
    )
    checkBox().position.x(-30.1),
    checkBox().size.x(70.2)

    yield* waitUntil('move 5')
    yield* checkBox().opacity(1, 0.6),
    yield* checkBox().position.x(331.1, 0.6)
    yield* waitUntil('check 7')
    yield* checkBox().fill('#21ba21',0.4).to('#444444',0.4).to('#21ba21',0.4).to('#444444',0.4).to('#21ba21',0.4).to('#444444',0.4)
    
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