var State = {
    Sleeping: 1,
    Idling: 2,
    Happy: 3,
    Sad: 4,
    Hungry: 5,
    Tired: 6,
    Lonely: 7,
    Angry: 8
};
var state = State.Idling;
var happiness, loneliness, wakefulness, hunger;


$(document).ready(function () {
    happiness = 50;
    loneliness = 50;
    wakefulness = 50;
    hunger = 0;
    Update();
});

//update is called once, the function inside act timed updates
function Update() {
    function stateToggle() {
        changeState();
    }
    setInterval(stateToggle, 2000);

    function variableToggle() {

        updateDevInformation();
        switch (state) {

            case State.Idling:
                currentImages = idleImages;
                happiness = happiness - .5;
                loneliness = loneliness - .5;
                wakefulness = wakefulness - .5;
                hunger = hunger + .5;
                break;

            case State.Sleeping:
                currentImages = sleepingImages;
                happiness = happiness + .5;
                wakefulness = wakefulness - 1;
                loneliness = loneliness + 1;
                hunger = hunger + .5;
                break;

            case State.Happy:
                currentImages = happyImages;
                loneliness = loneliness + 1;
                wakefulness = wakefulness - .5;
                happiness = happiness - .5;
                hunger = hunger + .5;
                break;

            case State.Sad:
                currentImages = sadImages;
                loneliness = loneliness + 1;
                wakefulness = wakefulness - .5;
                happiness = happiness - .5;
                hunger = hunger + .5;
                break;
                
            case State.Hungry:
                currentImages = hungryImages;
                loneliness = loneliness + 1;
                wakefulness = wakefulness - .5;
                happiness = happiness - .5;
                hunger = hunger + .5;
                break;
        }
        clampEverything();
    }
    setInterval(variableToggle, 200);
}

function changeState() {

    //how to deal with multiple candidates
    var candidateState = [];

    candidateState.push("idle");

    if (happiness >= 50) {
        candidateState.push("happy");
    } else if (happiness < 50) {
        console.log("sad should be added");
        candidateState.push("sad");
    }

    if (hunger >= 50) {
        candidateState.push("hungry");
    }
    if (loneliness >= 50) {
        candidateState.push("lonely");
    }
    if (wakefulness < 10) {
        candidateState.push("sleeping");
    }

    var randomIndex = Math.floor(Math.random() * candidateState.length);
    console.log(candidateState.length);
    futureState = candidateState[randomIndex];
    switch (futureState) {
        case "happy":
            state = State.Happy;
            break;
        case "hungry":
            state = State.Hungry;
            break;
        case "sleeping":
            state = State.Sleeping;
            break;
        case "lonely":
            state = State.Lonely;
        case "sad":
            state = State.Sad;

    }


}

function giveFood() {
    console.log('food given');
    hunger = hunger - 25;
    happiness = happiness + 5;

    clampEverything();
}

function giveHappy() {
    console.log('happy given');
    happiness = happiness + 25;
    clampEverything();
}

function updateDevInformation() {
    document.getElementById("wakefulnessInfo").innerHTML = "Wakefulness: " + wakefulness;
    document.getElementById("happinessInfo").innerHTML = "Happiness: " + happiness;
    document.getElementById("lonelinessInfo").innerHTML = "Loneliness: " + loneliness;
    document.getElementById("hungerInfo").innerHTML = "Hunger: " + hunger;
    document.getElementById("stateInfo").innerHTML = "State: " + state;
}

function clampEverything() {
    happiness = happiness > 100 ? 100 : (happiness < 0 ? 0 : happiness);
    loneliness = loneliness > 100 ? 100 : (loneliness < 0 ? 0 : loneliness);
    wakefulness = wakefulness > 100 ? 100 : (wakefulness < 0 ? 0 : wakefulness);
    hunger = hunger > 100 ? 100 : (hunger < 0 ? 0 : hunger);
}
