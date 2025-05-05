import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import Block from '../utils/Block.ts';
import router from './router.ts';

class Test extends Block {
    constructor(props: { content: string, onClick?: Function }) {
        super(`<button>${props.content}<button/>`, { ...props, events: { click: props.onClick }});
    };

    render() {
        return this.compile('', this.props);
    };
};

describe('Тест роутера:', () => {
    before(() => {
        router
            .use('/a', Test)
            .use('/b', Test)
            .use('/c', Test)
            .use('/', Test);
        router.start();
    });

    it('Корректный переход по страницам', () => {
        const pushStub: SinonStub = stub(window.history, 'pushState');
        router.go('/a');
        router.go('/b');
        router.go('/c');
        expect(pushStub.callCount).to.equal(3);
    });

    it('Корректное перемещение вперед в браузере', () => {
        const forwardStub: SinonStub = stub(window.history, 'forward');
        router.forward();
        expect(forwardStub.calledOnce).to.equal(true);
    });

    it('Корректное перемещение назад в браузере', () => {
        const backStub: SinonStub = stub(window.history, 'back');
        router.back();
        expect(backStub.calledOnce).to.equal(true);
    });
});
