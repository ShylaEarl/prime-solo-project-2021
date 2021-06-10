//stores one specific appt's details returned from DB based on id
const apptInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_APPT_INFO':
        return action.payload;
    //   case 'CLEAR_APPT_INFO':
    //     return [] or action.payload;
      default:
        return state;
    }
  };
  
  export default apptInfoReducer;