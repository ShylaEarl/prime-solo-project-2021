
function AddNewAppt(){

    //instance of client redux store for name? or props?

    //POST route to submit new appointment information
        //input validation
        //swal success
        //route to /Profile

    //cancel button routes to /user (Client Table)

    return(
        <div>
            <h3>New Appointment Information</h3>
            <p>Client Name(will use redux)</p>
            <input type="text"
                placeholder="Appointment Name" 
            />
            <input type="date"
                placeholder="Appointment Date"
            />
            <input type="text"
                placeholder="Primary Concern"
            />
            <button>Submit</button>
            <button>Cancel</button>
        </div>
    );
}

export default AddNewAppt;