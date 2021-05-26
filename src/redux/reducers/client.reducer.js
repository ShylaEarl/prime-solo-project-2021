//stores client details returned from DB
const clientReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLIENT':
        return action.payload;
    //   case 'CLEAR_CLIENT':
    //     return [] or action.payload;
      default:
        return state;
    }
  };
  
  export default clientReducer;