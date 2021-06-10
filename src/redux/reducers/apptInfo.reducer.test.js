import apptInfoReducer from './apptInfo.reducer';

describe('test apptInfoReducer...', () => {

    test('Initial state should be an empty OBJECT', () => {
        let action = {};
        let state = undefined;
        let returnedState = apptInfoReducer(state, action);
        expect( returnedState ).toEqual( {} );
    })

    test('Set appt info', () => {
        let appt = { appt_name: 'Anxiety', date: '2021/06/09', primary_concern: 'Support mental health...', client_id: 3 }; 
        let action = { type: 'SET_APPT_INFO', payload: appt };
        let state = { };
        let returnedState = apptInfoReducer(state, action);
        expect( returnedState ).toEqual( appt );
    })

})