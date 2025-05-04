import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import Block from '../utils/Block.ts';
import { Router } from './router.ts';

class Test extends Block {
    constructor(props: { prop: number }) {
        super('p', { ...props });
    }

    render() {
        return this.compile('Dummy', {});
    }
}

describe('Router', () => {
    const pushStateStub: SinonStub = stub(window.history, 'pushState');
    const historyBackStub: SinonStub = stub(history, 'back');
    const historyForwardStub: SinonStub = stub(history, 'forward');
    const router = new Router('#app');

    before(() => {
        
        router
            .use('/test-1', Test as unknown as typeof Block)
            .use('/test-2', Test as unknown as typeof Block)
            .start();
        router.go('/');
    });

    after(() => {
        pushStateStub.restore();
    });

    it('Must return correct history length', () => {
        router.go('/test-1');
        router.go('/test-2');
        expect(pushStateStub.callCount).to.equal(3);
    });

    it('Must navigate back in history', () => {
        router.back();

        expect(historyBackStub.calledOnce).to.equal(true);
    });

    it('Must navigate forward in history', () => {
        router.forward();

        expect(historyForwardStub.calledOnce).to.equal(true);
    });
});