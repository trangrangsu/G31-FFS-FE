import { createStore } from 'redux';

const initialState = {
    sidebarShow: true,
    account: {
        id: '123',
        role: 2,
    },
};

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest };
        default:
            return state;
    }
};

const store = createStore(changeState);
export default store;
