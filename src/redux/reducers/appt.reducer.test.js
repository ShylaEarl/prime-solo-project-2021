import apptReducer from './appt.reducer';

describe('test apptReducer', () => {

    test('Initial state should be an empty array', () => {
        let action = [];
        let state = undefined;
        let returnedState = apptReducer(state, action);
        expect( returnedState ).toEqual( [] );
    })

    test('Set appt', () => {
        let appt = { appt_name: 'Anxiety', date: '2021/06/09', primary_concern: 'Support mental health...', client_id: 3 }; 
        let action = { type: 'SET_APPT', payload: appt };
        let state = [];
        let returnedState = apptReducer(state, action);
        expect( returnedState ).toEqual( appt );
    })

})