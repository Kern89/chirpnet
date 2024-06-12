const localBirdsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BIRDS':
            return action.payload;
        case 'NEW_LOC':
            return [];
        default:
            return state;
    }
};

export default localBirdsReducer;