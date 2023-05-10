// //connect to API first 
// var request = new XMLHttpRequest();
// //adding the ? after the link tells it that everything after is a  parameter
// request.open('GET', 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=10')
// request.onload = function() {
//     //response is the response from the API in the form of a string
//     var response = request.responseText;
//     var parsedData = JSON.parse(response);
//     console.log(parsedData)

    

// 	var description = parsedData.results[1].mission.description;
// 	console.log(description, "DESCRIPTION")
// }

// request.send();

let spaceXZoneDocument = document.getElementById("spacexTitleZone");
let otherLaunchZoneDocument = document.getElementById("otherLaunches");

function loadInAllRockets(){
    console.log("LOADING IN ALL ROCKETS FROM CLASSES")
    //loads in all the rocket functions
    getSpaceXLaunches()
    callAllOtherRockets()

}


async function callAllOtherRockets(){
    let generalLaunchCall = await fetch ('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=5');
    let generalLaunchJson = await generalLaunchCall.json();

    await generalLaunchJson.results.forEach(createAndLoadOtherModules);
}



async function getSpaceXLaunches() {
    let x = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&search=spacex');
    let y = await x.json();

    //sort through each item from the results list 
    await y.results.forEach(createAndLoadSpaceXModules);







    
}


var side = "right";
async function createAndLoadSpaceXModules(item, index){
    console.log(item)
    console.log("\n\n\n\n")
    let rocketName = item.rocket.configuration.full_name
    let missionName = item.mission.name
    let rocketImage = item.image
    let windowEnd = new Date(item.window_end);
    let windowEndDay = windowEnd.toLocaleDateString();
    let windowEndTime = windowEnd.toLocaleTimeString();

    console.log(rocketName, "\n",missionName, "\n",rocketImage, "\n",windowEnd)
    if (side === "right"){
        let rocketInnerHtml =
        `<h1>${missionName}</h1>` +
        `<h2>Launch Vehicle: ${rocketName}</h2>` +
        `<img src=${rocketImage} alt=${rocketName}>` +
        `<h3>Launch Window End: ${windowEndTime} on ${windowEndDay}</h3>`;

        let newRightCard = document.createElement("div");
        newRightCard.id = "upcoming-space-X-Card--RIGHT";
        newRightCard.setAttribute("data-aos", "fade-up");
        newRightCard.setAttribute("data-aos-duration", "3000");
        newRightCard.setAttribute("onclick", `takeToCorrespondingPage("${item.id}")`);
        newRightCard.innerHTML = rocketInnerHtml;



        side = "left";
        spaceXZoneDocument.append(newRightCard);




    }else{
        //craft new div each button ACTUALLY sending correct data to next screen
        let rocketInnerHtml =  `<h1>${missionName}</h1>` +
        `<h2>Launch Vehicle: ${rocketName}</h2>` +
        `<img src=${rocketImage} alt=${rocketName}>` +
        `<h3>Launch Window End: ${windowEndTime} on ${windowEndDay}</h3>`;

        let newLeftCard = document.createElement("div");
        newLeftCard.id = "upcoming-space-X-Card--LEFT";
        newLeftCard.setAttribute("data-aos", "fade-up");
        newLeftCard.setAttribute("data-aos-duration", "3000");
        newLeftCard.setAttribute("onclick", `takeToCorrespondingPage("${item.id}")`);
        newLeftCard.innerHTML = rocketInnerHtml;

        
        
        side = "right";
        spaceXZoneDocument.append(newLeftCard);
    }
    
}
var side2 = "right";
async function createAndLoadOtherModules(item, index){

    console.log(item)
    console.log("\n\n\n\n")
    let rocketName = item.rocket.configuration.full_name;
    
    let missionName;
    if (item.mission === null ) {
        missionName = "No Mission Name Available";
    }else{
        missionName = item.mission.name

    };             
    let rocketImage = item.image;
    let windowEnd = new Date(item.window_end);
    let windowEndDay = windowEnd.toLocaleDateString();
    let windowEndTime = windowEnd.toLocaleTimeString();
    //convert windowEnd to local date and time object with the time zone of the browser

    console.log(rocketName, "\n",missionName, "\n",rocketImage, "\n",windowEnd)
    if (side2 === "right"){
        let rocketInnerHtml =
        `<h1>${missionName}</h1>` +
        `<h2>Launch Vehicle: ${rocketName}</h2>` +
        `<img src=${rocketImage} alt=${rocketName}>` +
        `<h3>Launch Window End: ${windowEndTime} on ${windowEndDay}</h3>`;

        let newRightCard = document.createElement("div");
        newRightCard.id = "upcoming-launch-Card--RIGHT";
        newRightCard.setAttribute("data-aos", "fade-up");
        newRightCard.setAttribute("data-aos-duration", "3000");
        newRightCard.setAttribute("onclick", `takeToCorrespondingPage("${item.id}")`);
        newRightCard.innerHTML = rocketInnerHtml;



        side2 = "left";
        otherLaunchZoneDocument.append(newRightCard);




    }else{
        //craft new div each button ACTUALLY sending correct data to next screen
        let rocketInnerHtml =  `<h1>${missionName}</h1>` +
        `<h2>Launch Vehicle: ${rocketName}</h2>` +
        `<img src=${rocketImage} alt=${rocketName}>` +
        `<h3>Launch Window End: ${windowEndTime} on ${windowEndDay}</h3>`;

        let newLeftCard = document.createElement("div");
        newLeftCard.id = "upcoming-launch-Card--LEFT";
        newLeftCard.setAttribute("data-aos", "fade-up");
        newLeftCard.setAttribute("data-aos-duration", "3000");
        newLeftCard.setAttribute("onclick", `takeToCorrespondingPage("${item.id}")`);
        newLeftCard.innerHTML = rocketInnerHtml;

        
        
        side2 = "right";
        otherLaunchZoneDocument.append(newLeftCard);
    }





}






var selectedUpcomingLaunch = 0;
function takeToCorrespondingPage(num){
    console.log("SITED", num);


    window.location = (`pages/spaceFullDescription.html#${num}`);



    
    





}


function loadInallLaunchItems(){
    let selectedxSeshNum = window.location.hash;
    let newThing = selectedxSeshNum.slice(1);
    console.log("COOL ASS NUMBER IS......", newThing);
    loadAndCustomizeScreen(newThing)


}


async function loadAndCustomizeScreen(loaded_in_ID){

    let fectReq = await fetch(`https://lldev.thespacedevs.com/2.2.0/launch/upcoming/${loaded_in_ID}/`);
    let displayedLaunch = await fectReq.json();
    console.log(displayedLaunch);

    let missionTitle = displayedLaunch.mission.name;
    let launchProvider = displayedLaunch.launch_service_provider.name;
    let launchImg = displayedLaunch.image;

    let missionDescription = displayedLaunch.mission.description;
    let orbitType = displayedLaunch.mission.orbit.name;
    let rocketName = displayedLaunch.rocket.configuration.full_name;
    let padName = displayedLaunch.pad.name;
    let padLocation = displayedLaunch.pad.location.name;


    if (missionTitle == null) {
        missionTitle = "Unknown";
    }
    if (launchProvider == null) {
        launchProvider = "Unknown";
    }
    if (missionDescription == null) {
        missionDescription = "Unknown Description";
    }

    if (launchImg == null) {
        console.log("No Image Provided");
    }

    if (orbitType == null) {
        orbitType = "Unknown";
    }
    if (rocketName == null) {
        rocketName = "Unknown";
    }
    if (padName == null) {
        padName = "Unknown";
    }
    if (padLocation == null) {
        padLocation = "Unknown";
    }


    document.getElementById("missionTitle").innerHTML = "Mission Name: " + missionTitle;
    document.getElementById("launchProvider").innerHTML = "Launch Agency:" + launchProvider;

    document.getElementById("laucnchImage").src = launchImg;


    document.getElementById("missionDescription").innerHTML = missionDescription;
    document.getElementById("orbitType").innerHTML = "Orbit Type: " + orbitType;
    document.getElementById("rocketName").innerHTML = "Launch Vehicle: " + rocketName;

    document.getElementById("padName").innerHTML = "Pad: " + padName;
    document.getElementById("padLocation").innerHTML = "Location: " + padLocation;

    //load in image if one is avalible in system 

    switch(orbitType){

        case "Low Earth Orbit":
            console.log("Low Earth Orbit", orbitType);
            document.getElementById("orbitImage").src = "../images/LEO_SELECT.png";
            break;

        case "Medium Earth Orbit":
            console.log("Medium Earth Orbit", orbitType);
            document.getElementById("orbitImage").src = "../images/MEO_SELECT.png";
            break;

            case "Geostationary Transfer Orbit":
                console.log("Medium Earth Orbit", orbitType);
                document.getElementById("orbitImage").src = "../images/GEO_SELECT.png";
                break;





        default:
            document.getElementById("orbitImage").src = "../images/gp_orbit_image.png";





    }







}

var slideToggle = true;
$('#spaceTitle').click(function() {
    if (slideToggle == true) {
        $('#spacexTitleZone').slideToggle();
        setTimeout(function() {
            $('#spacexTitleZone').children().remove();
            callAllOtherRockets()
        }, 600);
        slideToggle = false;


    }else{
        console.log("CHEMS");
        getSpaceXLaunches()


        setTimeout(function() {
            $('#spacexTitleZone').slideToggle();


            
        }, 600);



        // setTimeout(function() {
        //     $("#spacexTitleZone").css("display", "");
        // }, 10000);
        
        // slideToggle = true;
        slideToggle = true;


    }
    
    
    
    
    
    

    

  });


$('#globalTitle').click(function() {
    console.log("PRESSED NAME")
    $('#otherLaunches').slideToggle();

    
    
});





// function createAndLoadSpaceXModules(){
//     //connect to API first 
//     console.log("HERE WE GO")
//     var request = new XMLHttpRequest();
//     //adding the ? after the link tells it that everything after is a  parameter
//     request.open('GET', 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=4&search=space')
//     console.log("going in")
//     request.onload = function() {
//         //response is the response from the API in the form of a string
//         var response = request.responseText;
//         var parsedData = JSON.parse(response);
//         console.log(parsedData)

        

//         var description = parsedData.results[1].mission.description;
//         console.log(description, "DESCRIPTION")
//     }







