import './Practice.css';

function cssGridTemplate(){
    return(
        <div className="practice-container">
            
            <header>
            <img id="header-banner" rel="header-banner" 
                src="Web-Header-C.png" 
                alt="Acorn to Oak Herbal Header Banner"
            />
            </header>
            <main>Main</main>
            <nav>SideNavBar
                <br/>
                <p>Client Table</p>
                <p>Bill of Rights</p>
                <p>Heatlh History</p>
                <p>Aftercare Instructions</p>
                <p>Add New Client</p>
            </nav>
            <div id="content1">content1</div>
            <div id="content2">content2</div>
            <div id="content3">content3</div>
            <footer>footer</footer>
            
        </div>
    )
}

export default cssGridTemplate;