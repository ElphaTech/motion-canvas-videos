import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line, Circle, Rect, Text} from '@motion-canvas/2d/lib/components/'
import { createRef, useDuration } from '@motion-canvas/core/lib/utils';
import {all, waitUntil, waitFor, sequence, delay} from '@motion-canvas/core/lib/flow';
import { createEaseOutBack, createEaseInOutBack, createEaseInBack } from '@motion-canvas/core/lib/tweening';
import { CodeBlock, insert } from '@motion-canvas/2d/lib/components/CodeBlock';

export default makeScene2D(function* (view) {
    // screen
    const screenNode = createRef<Node>();

    const definitionsT = createRef<Text>();
    const defLine = createRef<Line>();
    const defTermTitle = createRef<Text>();
    const defExpText = createRef<CodeBlock>();
    const equation = createRef<CodeBlock>();
    const equatLine = createRef<Line>();
    const equatText = createRef<Text>();
    const wipe = createRef<Rect>();


    view.add(
        <Node ref={screenNode} x={1920}>
            <Text text={'Definitions:'} fontFamily={'monospace'} fill={'#6f95ed'} fontSize={80} lineHeight={80} y={-80} ref={definitionsT}/>
            <Line ref={defLine} points={[[0,0],[632,0]]} lineWidth={15} stroke={'#414141'} lineCap={'round'} y={-360} x={-930} opacity={0}/>
            
            <Text text={'Factors'} fontFamily={'monospace'} fill={'#6f95ed'} fontSize={150} lineHeight={150} y={45} ref={defTermTitle}/>
            <CodeBlock ref={defExpText} fontSize={80} lineHeight={100} offset={-1} y={-300} x={-923} />,

            <CodeBlock ref={equation} fontSize={150} lineHeight={150} y={170} code={`2 * 5 = 10`} opacity={0}/>,
            <Line ref={equatLine} points={[[-451.5,0],[0,0]]} lineWidth={15} stroke={'#414141'} lineCap={'round'} y={270} opacity={0}/>
            <Text text={'Factors of 10'} fontFamily={'monospace'} fill={'#C0C7CF'} fontSize={60} lineHeight={60} y={340} x={-225.75} ref={equatText} opacity={0}/>
            <Rect ref={wipe} rotation={15} size={2200} x={2500} fill={'#000'}/>            
        </Node>
    );

    yield* waitUntil('start')
    yield* screenNode().position.x(0,1)

    yield* waitUntil('factorT')
    yield* all(
        defTermTitle().offset(-1,0.8),
        defTermTitle().position.y(-510,0.8),
        defTermTitle().position.x(-930,0.8),
        definitionsT().position.y(-1020,0.8),
    )
    yield* defLine().opacity(1,0.2)

    yield* waitUntil('FactorsDef')
    yield* defExpText().edit(0.8)`${insert(`Factors are numbers that can be
multiplied to make up another
number.`)}`

    yield* waitUntil('Factor Equat')
    yield* equation().opacity(1,0.8)

    yield* waitUntil('FactEq note')
    yield* all(
        equatLine().opacity(1,0.8),
        equatText().opacity(1,0.8),
    )

    //multiples 
    yield* waitUntil('end Factor')
    yield* all(
        wipe().position.x(-2500,1),
        delay(0.5, all(
            equatText().opacity(0,0),
            equatLine().opacity(0,0),
            equation().opacity(0,0),
            defExpText().code(``,0),
            defTermTitle().text('Multiples',0),
            defLine().points([[0,0],[813,0]],0),
            equation().edit(0.8)`${insert(`3| 3, 6, 9, 12`)}`,
            equatLine().points([[0,0],[993.3,0]],1),
            equatLine().position.x(-361.2,1),
            equatText().position.x(135.45,1),
            equatText().text('First Four Multiples of 3',1)
            )
        )
    )
    wipe().position.x(2500)

    yield* waitUntil('MultiplesDef')
    yield* defExpText().edit(0.8)`${insert(`A multiple is a number you get by
multiplying two numbers together.`)}`

    yield* waitUntil('Multiples Equat')
    yield* equation().opacity(1,0.8)

    yield* waitUntil('MultEq note')
    yield* all(
        equatLine().opacity(1,0.8),
        equatText().opacity(1,0.8),
    )

    //prime numbers 
    yield* waitUntil('end PrimeN')
    yield* all(
        wipe().position.x(-2500,1),
        delay(0.5, all(
            equatText().opacity(0,0),
            equatLine().opacity(0,0),
            equation().opacity(0,0),
            defExpText().code(``,0),
            defTermTitle().text('Prime Numbers',0),
            defLine().points([[0,0],[1173.9,0]],0),
            equation().edit(0.8)`${insert(`2, 3, 5, 7, 11`)}`,
            equatLine().points([[0,0],[1264.2,0]],1),
            equatLine().position.x(-632.1,1),
            equatText().position.x(0,1),
            equatText().text('First Five Prime Numbers',1)
            )
        )
    )
    wipe().position.x(2500)

    yield* waitUntil('PrimeN')
    yield* defExpText().edit(0.8)`${insert(`Prime numbers are numbers that can
only be divided by one and themselves
to give a whole number.`)}`

    yield* waitUntil('PrimeN Equat')
    yield* equation().opacity(1,0.8)

    yield* waitUntil('PrimeN note')
    yield* all(
        equatLine().opacity(1,0.8),
        equatText().opacity(1,0.8),
    )


    defExpText().edit()`PrimeN`
    defExpText().edit()`${insert(`Factors are numbers that can be
multiplied to make up another
number.`)}`

    wipe().opacity(0)
    yield* waitUntil('End')
    yield* screenNode().position.x(-1920,1)

});

// To render:
// 1. Open terminal in output folder
// 2. Run this command
// ffmpeg -framerate 60 -pattern_type glob -i 'project/*.png' -c:v libx264 -pix_fmt yuv420p output.mp4