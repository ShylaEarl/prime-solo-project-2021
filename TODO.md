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
    - [] base css grid for login page
    - [] base css grid for login form
- [x] Authenticate and Authorize admin user 
    - [x] Test POST & GET routes in Postman
- [x] Add A2O branding/style guide assets
    - [x] change favicon and browser tab header
    - [x] add heading banner w A2O branding assets 

### Add New Client 1.3 (T 5.25.21)
- [x] add input feilds
- [x] add buttons
    - [x] add cancel functionality - routes to client table 1.2 (/user)
    - [] add submit functionality - POST route
        - [] add client side input validation
        - [] add sweet alert to notify of successful POST
- [] write POST endpoint on sever
    - [] add server side validation?
    - [] test route in Postman
- [] Grid-responsive page styling
- [] Add A2O branding/style guide assets

### CSS grid template/Responsive styling (worked on T 5.25.21 & )
- [] header - created, but needs to be moved to component, or something!
- [] navbar - figure this out!
    - [] add 'Logout' link to nav
- [] main - keep it simple sagitarius 

### Client Table 1.3 (W 5.26.21)
- [] write GET route w sql JOINS query
- [] design table
- [] map client and appt info array to DOM/table
- [] add 'Add Appt' button
    - [] add functionality - route to Add New Appointment page /new-appt
- [] add 'Edit' button
    - [] add functionality - route to Client Profile page /client-profile
- [] add 'Delete' button
    - [] add functionality
        - [] write delete route
        - [] add swal to double check on deletion
        - [] swal to notify that delete was successful
        - [] rerender DOM/remove table row
- [] navbar? This is the first view it appears in. 

### Client Profile 1.4 (W 5.26.21)
- [] GET route to display client appointment history on DOM
    - [] add links and icons to rows if date is current/past
    - [] route to Appointment Notes page 1.6 if current
    - [] route to Appointment Details page 1.7 if past date
- [] GET route to display client information on DOM
- [] add 'Update Info' button
    - [] add functionality
        - [] conditionally render view to editable input feilds when clicked on
        - [] add 'Submit' button on this view
            - [] add functionality 
            - [] add PUT route
            - [] when 'Submit' clicked, renders to client profile view with updated information and 'Update Info' button

### Add New Appointment 1.5 (TH 5.27.21)

### Appointment Notes 1.6 (TH 5.27.21)

### Details Page 1.7 (TH 5.27.21)
