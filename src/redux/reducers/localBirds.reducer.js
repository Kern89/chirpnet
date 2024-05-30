const localBirdsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_BIRDS':
            return action.payload;
        case 'NEW_STATE':
            return {};
        default:
            return state;
    }
};

export default localBirdsReducer;