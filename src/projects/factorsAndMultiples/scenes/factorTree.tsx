import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line, Circle, Rect, Text, Shape} from '@motion-canvas/2d/lib/components/';
import { createRef, makeRef, useDuration,Reference } from '@motion-canvas/core/lib/utils';
import {all, waitUntil, waitFor, sequence} from '@motion-canvas/core/lib/flow';
import { createEaseOutBack, createEaseInOutBack, createEaseInBack } from '@motion-canvas/core/lib/tweening';
import { SignalValue, createSignal } from '@motion-canvas/core/lib/signals';
import { CodeBlock, insert, range, remove, edit } from '@motion-canvas/2d/lib/components/CodeBlock';

export default makeScene2D(function* (view) {
    //title
    const textS = {
        fontFamily: 'monospace',
        fill: '#8FB974',
    };

    // text
    const ftNumsStyle = {
        fontSize: 50, // width={() => chars*30}
        fontFamily: 'JetBrains Mono',
        fill: '#ffffff',
        lineHeight: 50
    };

    // rects
    const ftRectsStyle = {
        width: 160,
        height: 80,
        radius: 30,
        opacity: 0,
        scale: 0.1,
        y: 170,
        fill: '#141414',
    };

    // lines
    const lineCapSignal: SignalValue<CanvasLineCap> = createSignal<CanvasLineCap>('round')
    const ftLinesStyle = {
        end: 0,
        opacity: 0,
        endArrow: true,
        arrowSize: 25,
        lineCap: lineCapSignal,
        y: 60,
        lineWidth: 15,
        stroke: '#ffffff'
    };

    // whole screen
    const screenNode = createRef<Node>();
    // title
    const titleN = createRef<Node>();
    const title0 = createRef<Text>();
    const title1 = createRef<Text>();
    const title2 = createRef<Text>();
    // example 1
    const example1 = createRef<Rect>();
    // first line
    const ex1First = createRef<Rect>();
    const ex1FirstLL = createRef<Line>();
    const ex1FirstRL = createRef<Line>();
    const ex1FirstLR = createRef<Rect>();
    // Second line
    const ex1Second = createRef<Rect>();
    const ex1SecondLL = createRef<Line>();
    const ex1SecondRL = createRef<Line>();
    const ex1SecondLR = createRef<Rect>();
    // Third line
    const ex1Third = createRef<Rect>();
    const ex1ThirdLL = createRef<Line>();
    const ex1ThirdRL = createRef<Line>();
    const ex1ThirdLR = createRef<Rect>();
    // Fourth line
    const ex1Fourth = createRef<Rect>();
    //code
    const code2 = createRef<CodeBlock>();

    view.add(
        <Node ref={screenNode} x={1920}>
            <Node ref={titleN}>
                <Text text={'Section 3:'} {...textS} fontSize={80} lineHeight={80} y={-155} ref={title0}/>
                <Text text={'How to Calculate'} {...textS} fontSize={150} lineHeight={150} y={-30} ref={title1}/>
                <Text text={'Prime Factors'} {...textS} fontSize={150} lineHeight={150} y={125} ref={title2}/>
                {/* <Rect width={3000} height={400} fill={'#4444dd'} opacity={0.2}/> */}
            </Node>
            <CodeBlock ref={code2} fontSize={100} lineHeight={100} y={480}/>
            <Rect ref={example1} opacity={0} fill={'#414141'} size={800} radius={50} scale={0.1}>
                <Rect ref={ex1First} {...ftRectsStyle} opacity={1} scale={1} y={0}>
                    <Text {...ftNumsStyle} text={'24'} />

                    <Line ref={ex1FirstLL} {...ftLinesStyle} points={[[0,0],[-40,60]]} x={-40}/>
                    <Rect ref={ex1FirstLR} {...ftRectsStyle} x={-100}>
                        <Text {...ftNumsStyle} text={'2'} />
                    </Rect>

                    <Line ref={ex1FirstRL} {...ftLinesStyle} points={[[0,0],[40,60]]} x={40}/>
                    {/* Second sect */}
                    <Rect ref={ex1Second} {...ftRectsStyle} x={100}>
                        <Text {...ftNumsStyle} text={'12'} />

                        <Line ref={ex1SecondLL} {...ftLinesStyle} points={[[0,0],[-40,60]]} x={-40}/>
                        <Rect ref={ex1SecondLR} {...ftRectsStyle} x={-100}>
                            <Text {...ftNumsStyle} text={'2'} />
                        </Rect>

                        <Line ref={ex1SecondRL} {...ftLinesStyle} points={[[0,0],[40,60]]} x={40}/>
                        {/* Third sect */}
                        <Rect ref={ex1Third} {...ftRectsStyle} x={100}>
                            <Text {...ftNumsStyle} text={'6'} />

                            <Line ref={ex1ThirdLL} {...ftLinesStyle} points={[[0,0],[-40,60]]} x={-40}/>
                            <Rect ref={ex1ThirdLR} {...ftRectsStyle} x={-100}>
                                <Text {...ftNumsStyle} text={'2'} />
                            </Rect>

                            <Line ref={ex1ThirdRL} {...ftLinesStyle} points={[[0,0],[40,60]]} x={40}/>
                            <Rect ref={ex1Fourth} {...ftRectsStyle} x={100}>
                                <Text {...ftNumsStyle} text={'3'} />
                            </Rect>
                        </Rect>
                    </Rect>
                </Rect>
            </Rect>
        </Node>
    )
    function *pop<T extends Shape>(ref: Reference<T>) {
        yield *all(
            ref().opacity(1,0.5),
            ref().scale(1,0.5, createEaseOutBack(1.3))
        )
    }
    //bring screen in
    yield* screenNode().position.x(0,0.5)
    
    // show example 1
    yield* waitUntil('Show Ex1')
    yield* all(
        title0().position.y(-1020,0.8),
        title1().position.y(-1130,0.8),
        title2().fontSize(70,0.8),
        title2().position.y(-480,0.8),
    )
    yield* pop(example1)

    //show first row
    yield* waitUntil('Show Ex1FirstA')
    yield* all(
        ex1First().position.y(-85,0.8),
        ex1FirstLL().end(1,0.8),
        ex1FirstLL().opacity(1,0.8),
        ex1FirstRL().end(1,0.8),
        ex1FirstRL().opacity(1,0.8),
    )
    yield* waitUntil('Show Ex1FirstLR')
    yield* pop(ex1FirstLR)
    yield* waitUntil('Show Ex1FirstRR')
    yield* pop(ex1Second)
    yield* waitUntil('Color 1')
    yield* ex1FirstLR().fill('#f73d4d',0.5)

    //show second row
    yield* waitUntil('Show Ex1SecondA')
    yield* all(
        ex1First().position.y(-170,0.8),
        ex1First().position.x(-50,0.8),
        ex1SecondLL().end(1,0.8),
        ex1SecondLL().opacity(1,0.8),
        ex1SecondRL().end(1,0.8),
        ex1SecondRL().opacity(1,0.8),
    )
    yield* waitUntil('Show Ex1SecondLR')
    yield* pop(ex1SecondLR)
    yield* waitUntil('Show Ex1SecondRR')
    yield* pop(ex1Third)
    yield* waitUntil('Color 2')
    yield* ex1SecondLR().fill('#f73d4d',0.5)

    //show third row
    yield* waitUntil('Show Ex1ThirdA')
    yield* all(
        ex1First().position.y(-255,0.8), //add 85
        ex1First().position.x(-100,0.8), //add 60
        ex1ThirdLL().end(1,0.8),
        ex1ThirdLL().opacity(1,0.8),
        ex1ThirdRL().end(1,0.8),
        ex1ThirdRL().opacity(1,0.8),
    )
    yield* waitUntil('Show Ex1ThirdLR')
    yield* pop(ex1ThirdLR)
    yield* waitUntil('Show Ex1ThirdRR')
    yield* pop(ex1Fourth)
    yield* waitUntil('Color 3')
    yield* ex1ThirdLR().fill('#f73d4d',0.5)
    yield* waitUntil('Color 4')
    yield* ex1Fourth().fill('#f73d4d',0.5)

    yield* waitUntil('show Numbs')
    yield* code2().edit(0.8)`${insert(`2, 2, 2, 3`)}`
    
    yield* waitUntil('change2star')
    yield* code2().edit(0.8)`${edit(`2, 2, 2, 3`,`2*2*2*3`)}`

    yield* waitUntil('addEqual24')
    yield* code2().edit(0.8)`2*2*2*3${insert(` = 24`)}`
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
// ffmpeg -framerate 60 -pattern_type glob -i 'output/factorsAndMultiples/*.png' -i src/projects/factorsAndMultiples/audio/voice.mp3 -shortest -c:v libx264 -pix_fmt yuv420p output/output.mp4