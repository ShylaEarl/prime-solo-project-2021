### Project Set-Up (M 5.24.21)
- [x] Create `prime_app` database 
    - [x] create `user` table from database.sql file
- [x] run `npm install`
- [x] create `.env` file and add SERVER_SESSION_SECRET=randomstring
- [x] add `.env` file to `.gitignore` file
- [x] spin up server and client
- [x] register for an account w/ username and password
- [x] test routes w/ postman (see project readme for instructions)
- [x] watch instructional videos in project readme
- [x] look through starter code base to familiarlize yourself

### Additonal Database Set-Up (M 5.24.21)
- [x] Create `client-information` table, `appointment-information` table, and `remedies` tables 
- [x] Create test data for all tables 

### App & Login 1.1 (T 5.25.21)
- [x] source in sweet alert to index.html
- [x] Grid-responsive page styling template in App moved to Practice.jsx/css
    - [x] base css for landing page
    - [x] base css for login page
    - [x] base css for login form
- [x] Authenticate and Authorize admin user 
    - [x] Test POST & GET routes in Postman
- [x] Add A2O branding/style guide assets
    - [x] change favicon and browser tab header
    - [x] add heading banner w A2O branding assets 

### Add New Client 1.3 (T 5.25.21)
- [x] add input feilds
- [x] add buttons
    - [x] add cancel functionality - routes to client table 1.2 (/user)
    - [x] add submit functionality - POST route
        - [x] add client side input validation
        - [x] alert user if input is not valid w sweet alert
        - [x] add sweet alert to notify of successful POST
- [x] write POST endpoint on sever
    - [] add server side validation? 
    - [x] test route in Postman
    - [x] route adding data to DB!
- [x] Grid-responsive page styling

### CSS grid template/Responsive styling (worked on T 5.25.21 & W 5.26.21)
- [x] header rendering from App across all views
- [x] navbar rendering from App across all views
    - [x] create all links for nav
- [x] main rendering from App across all views

### Client Table 1.2 (W 5.26.21)
- [x] write GET route endpoint on server
    - [] with sql JOINS query to get latest appt info
- [x] create client saga & reducer
- [x] create appointment saga & reducer
- [x] map client info array to DOM/table 
- [x] add 'Add Appt' button
    - [x] add functionality - route to Add New Appointment page 
- [x] add 'Edit' button
    - [x] add functionality - route to Client Profile page 
- [x] add 'Delete' button
    - [x] add functionality
        - [x] write delete route endpoint on server
        - [x] add swal to double check on deletion
        - [x] swal to notify that delete was successful
        - [x] rerender DOM/remove table row
- [x] table css
    - [] make it responsive!
- [x] navbar

### Client Profile 1.4 (TH 5.27.21)
- [x] dynamically display client information on DOM
- [x] add 'Update Info' button
    - [x] add functionality
        - [x] conditionally render view to editable input feilds when clicked on
        - [x] add 'Submit' button on this view
            - [x] add functionality 
            - [x] add PUT route
            - [x] when 'Submit' clicked, renders to client profile view with updated information and 'Update Info' button (useParams)
- [x] add 'Add Appointment' button
    - [x] add functionality by routing to add appt page
- [x] dynamically display client appointment history on DOM
    - [x] add links and icons to rows if date is current/past
    - [x] route to Appointment Notes page 1.6 if current
    - [x] route to Appointment Details page 1.7 if past date

### Add New Appointment 1.5 
- [x] create clientInfo store to access specific client's info to add appt to
- [x] add input fields for appt name, date, primary concern
- [x] add state to hold values to be POSTED to DB
- [x] add submit button
    - [x] add functionality (POST route)
    - [x] add validation (input and successful post)
    - [x] route to client profile page
- [x] add POST route end point on server
- [x] add cancel button
    - [x] add functionality (route back to client table)

### Appointment Notes 1.6 
- [] PUT route for updating appointment table 'notes' and 'summary' columns
- [] POST route for creating remedies in remedy table

### Appointment Details Page 1.7 
- [x] GET route to get appt specific remedies
