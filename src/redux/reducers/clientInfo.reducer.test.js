import clientInfoReducer from './clientInfo.reducer';

describe('test clientInfoReducer...', () => {

    test('Initial state should be an empty OBJECT', () => {
        let action = {};
        let state = undefined;
        let returnedState = clientInfoReducer(state, action);
        expect( returnedState ).toEqual( {} );
    })

    test('Set client info', () => {
        let client = { full_name: 'Shyla', address: '1004 N Garden St', city: 'New Ulm', state: 'MN', zip_code: '56073', phone: '507-354-4391', email: 'shyla.earl@gmail.com', user_id: 1 }; 
        let action = { type: 'SET_CLIENT_INFO', payload: client };
        let state = { };
        let returnedState = clientInfoReducer(state, action);
        expect( returnedState ).toEqual( client );
    })

})