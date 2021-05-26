//stores appointment details returned from the DB
const apptReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_APPT':
        return action.payload;
    //   case 'CLEAR_APPT':
    //     return [] or action.payload;
      default:
        return state;
    }
  };
  
  export default apptReducer;