//stores one specific client's details returned from DB based on id
const clientInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CLIENT_INFO':
        return action.payload;
    //   case 'CLEAR_CLIENT':
    //     return [] or action.payload;
      default:
        return state;
    }
  };
  
  export default clientInfoReducer;