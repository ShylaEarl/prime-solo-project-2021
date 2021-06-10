import remediesReducer from './remedies.reducer';

describe('test remediesReducer', () => {

    test('Initial state should be an empty array', () => {
        let action = [];
        let state = undefined;
        let returnedState = remediesReducer(state, action);
        expect( returnedState ).toEqual( [] );
    })

    test('Set remedies', () => {
        let remedy = { name: 'Calendula', dose: '5 drops', frequency: '1 x daily', appointment_id: 7 }; 
        let action = { type: 'SET_REMEDIES', payload: remedy };
        let state = [];
        let returnedState = remediesReducer(state, action);
        expect( returnedState ).toEqual( remedy );
    })

})