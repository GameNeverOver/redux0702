import { ADD, TOGGLE, DEL} from './actions';

export default {
    todo(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ADD:
                return [...state, payload]
            case DEL:
                return [...state.filter(item => item.id !== payload)]
            case TOGGLE:
                return [...state.map(item => {
                    if (item.id == payload) {
                        return {
                            ...item,
                            toggle: !item.toggle
                        }
                    }
                    return item
                })];
            default:
                return state;
        }
    }
};
