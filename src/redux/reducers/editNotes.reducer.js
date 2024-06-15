const editNotesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_NOTES":
            return action.payload;
        default:
            return state;
    }
};

export default editNotesReducer;