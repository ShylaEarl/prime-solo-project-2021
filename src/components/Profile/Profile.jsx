
function Profile(){

    //instance of client redux store to display client info

    //instance of appointment redux store to display appointment info?

    //PUT route to update client information

    return(
        <div>
            {/* add client redux store to render client info */}
            <p>Client Name</p>
            <p>Address</p>
            <p>City, State, Zip</p>
            <p>Phone</p>
            <p>Email</p>
            {/* onClick renders to editable input feilds for client info and submit button, on click of submit renders back to updated info view */}
            <button >Update Info</button>
            <h3>Appointment History</h3>
            {/* Appointment details also conditionally render depending on date */}
            <p>Date   Appointment Name</p>
        </div>
    );
}

export default Profile;