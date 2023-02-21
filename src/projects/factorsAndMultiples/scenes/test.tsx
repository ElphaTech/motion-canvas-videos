import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Shape, Rect } from '@motion-canvas/2d/lib/components/';
import { createRef, Reference } from '@motion-canvas/core/lib/utils';
import { all } from '@motion-canvas/core/lib/flow';
import { createEaseOutBack } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
    const example1 = createRef<Rect>();

    view.add(
        <Rect
            ref={example1}
            opacity={0}
            scale={0}
            size={500}
            fill={'#ffffff'}
        />
    )

    function *pop<T extends Shape>(ref: Reference<T>) {
        yield *all(
            ref().opacity(1,0.5),
            ref().scale(1,0.5, createEaseOutBack(1.3))
        )
    }

    yield* pop(example1)
});