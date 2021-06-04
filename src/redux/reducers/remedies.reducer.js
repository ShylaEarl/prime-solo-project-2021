//stores remedies returned from the DB
const remediesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_REMEDIES':
        return action.payload;
    //   case 'CLEAR_REMEDIES':
    //     return [] or action.payload;
      default:
        return state;
    }
  };
  
  export default remediesReducer;