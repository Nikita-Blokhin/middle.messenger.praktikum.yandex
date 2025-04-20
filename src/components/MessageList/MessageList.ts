import Block from '../../utils/Block';
import isEqual from '../../utils/IsEqual';
import { createMessage } from '../Message/Message';
import store, { State } from '../../utils/Store';
import cloneDeep from '../../utils/CloneDeep';

class createMessageList extends Block {
    constructor() {
        super('<div><div/>', {});
    };
    // @ts-ignore
    componentDidUpdate(oldProps, newProps): boolean {
        if (isEqual(oldProps, newProps)) return false;
        this.children.messagesList = newProps.messages.map(
            (message: createMessage) =>
                new createMessage({
                    id_name: this.message.id_name,
                    class_name_position: message.class_name_position,
                    message_text: message.message_text,
                    time_text: message.time_text
                })
        );
        return true;
    }

    render() {
        return this.compile('', this.props);
    };
};

function connect (
    selector: (State: State) => Record<string, any> = (State) => State
) {
    return class extends createMessageList {
        private currentState: Record<string, any>;

        constructor(props:  Record<string, any>) {
            const fullState = store.getState();
            const selectedState = selector(fullState);

            //@ts-ignore
            super({ ...props, ...selectedState });

            this.currentState = cloneDeep(selectedState);

            store.on('updated', () => {
                const newState = selector(store.get(''));
                if (!isEqual(this.currentState, newState)) {
                    ;(this as Block).setProps({ ...newState });
                }

                this.currentState = newState;
            });
        }
    };
}

const ConnectedMessageList = connect((State: State) => {
    return {
        // @ts-ignore
        messages: State.messages?.[State.currentChat as number] || []
    };
});

export default ConnectedMessageList;
