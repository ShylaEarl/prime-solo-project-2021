import { useHistory } from 'react-router-dom';
function Profile(){

    //instance of client redux store to display client info

    //instance of appointment redux store to display appointment info?

    //PUT route to update client information

    //functionality to route to a page
    const history = useHistory();

    //temporary functionality to access ApptDetails page
    const apptDetails = () => {
        console.log('date appt name p tag clicked!');
        history.push('/ApptDetails');
    }

    return(
        <div>
            {/* add client redux store to render client info */}
            <p>Willow Rosa Lee (redux)</p>
            <p>234 Garden St.</p>
            <p>City, State, Zip</p>
            <p>808-345-6789</p>
            <p>plantLove@gmail.com</p>
            {/* onClick renders to editable input feilds for client info and submit button, on click of submit renders back to updated info view */}
            <button >Update Info</button>
            <h3>Appointment History</h3>
            {/* Appointment details also conditionally render depending on date */}
            <p onClick={apptDetails}>12/12/20 Winter Wellness (redux)</p>
        </div>
    );
}

export default Profile;