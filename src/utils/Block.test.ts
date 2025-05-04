import Block from './Block.ts';
import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { SinonStub, stub } from 'sinon';

class Test extends Block {
    constructor(props: { content: string, onClick?: Function }) {
        super(`<button>${props.content}<button/>`, { ...props, events: { click: props.onClick }});
    };

    render() {
        return this.compile('', this.props);
    };
};

describe('Тест компонента:', () => {
    it('Создан корректный компонент', () => {
        const block = new Test({ content: 'test' });
        assert.equal(block.element!.tagName, 'BUTTON');
    });

    it('В компонент корректно передаются пропсы', () => {
        const block = new Test({ content: 'test' });
        assert.equal(block.element!.textContent, 'test');
    });

    it('В компонент корректно изменяются пропсы', () => {
        const block = new Test({ content: 'test' });
        block.setProps({ content: 'newTest' });
        assert.deepEqual(block.props.content, 'newTest');
    });

    it('Компонент корректно обрабатывает события', () => {
        const testHandleEvent: SinonStub = stub();
        const block = new Test({ content: 'test', onClick: testHandleEvent});
        block.element!.click();
        expect(testHandleEvent.calledOnce).to.equal(true);
    });
});
