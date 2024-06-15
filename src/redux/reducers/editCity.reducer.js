const editCityReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_CITY":
            return action.payload;
        default:
            return state;
    }
};

export default editCityReducer;