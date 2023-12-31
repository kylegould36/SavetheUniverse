//Make game
let game = {
  round: 0,
  targetShip: 0,
  userResponse: "",
};

//Make ship
let ussSchwartz = {
  name: "USS Schwartznegger",
  hull: 20,
  firePower: 5,
  accuracy: 0.7,
  attack: function () {
    //This is my attack function using math.random
    let attackChance = Math.random();
    if (attackChance <= this.accuracy) {
      return true;
    } else {
      return false;
    }
  },
};

//Alien ship
class AlienShip {
  constructor(name, hull, firePower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
  }
  attack() {
    //Attack function using math.random
    let attackChance = Math.random();
    if (attackChance <= this.accuracy) {
      return true;
    } else {
      return false;
    }
  }
}

// Alien Arrays-Will Loop through these values to configure ship
//Alien ships
let alienShips = [];
//Alien hull
let alienHullValues = [3, 4, 5, 6];
//Alien firepower
let alienFirePowerValues = [2, 3, 4];
//Alien values
let alienAccValues = [0.6, 0.7, 0.8];

// Build Alien Ship Function. Create a For loop that uses the arrays above using math.floor & math.random
let createAlienShips = () => {
  for (let i = 0; i < 6; i++) {
    //Iterate 6 ships
    let name = "Alien Ship " + (i + 1);
    let hull = alienHullValues[Math.floor(Math.random() * 4)];
    let firePower = alienFirePowerValues[Math.floor(Math.random() * 3)];
    let accuracy = alienAccValues[Math.floor(Math.random() * 3)];
    alienShips[i] = new AlienShip(name, hull, firePower, accuracy); //The result will be a new alien ship with the new parameters
  }
};

//Ship battle
let shipsBattle = (ship1, ship2) => {
  //Put the ships into an array
  let ships = [ship1, ship2];
  let attack = false;
  let attacking = 0;
  let beingAttacked = 1;
  let temp;
  console.log("%c Attack Begins =================", "font-size: 30px");
  while (ships[beingAttacked].hull > 0) {
    //While the hull is greater than 0 keep attacking
    //Attacking Sequence
    if (ships[beingAttacked].hull > 0) {
      //Console log the attack information
      console.log("\n");
      console.log(
        `%c ${ships[attacking].name} attacked ${ships[beingAttacked].name}`,
        "color: purple; border: 1px solid grey; font-size: 18px;"
      );
      //Generate the attack on the enemy ship
      attack = ships[attacking].attack();
      if (attack === true) {
        ships[beingAttacked].hull -= ships[attacking].firePower; //Increase Firepower
        console.log(
          `%c Attack Successful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`,
          "color: green; font-weight: bold; font-size: 16px;"
        );
      } else {
        console.log(
          `%c Attack Unsuccessful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`,
          "color: red; font-size: 16px;"
        );
      }
      //Check if the ship being attacked is still alive
      if (ships[beingAttacked].hull <= 0) {
        console.log(
          `%c ${ships[beingAttacked].name} has been destroyed`,
          "color: red; border: 1px solid grey; font-size: 16px;"
        );
        if (ships[beingAttacked] === ussSchwartz) {
          ///If the USS Ship is being attacked and is destroyed then alert player Game is Over
          alert("Game Over!!!");
        } else if (
          ships[beingAttacked].name === alienShips[alienShips.length - 1].name
        ) {
          alert(
            `${ships[beingAttacked].name} destroyed!\nAlien fleet has been destroyed!\nYou have been victorious`,
            "color: green;"
          );
        } //If USS destroys alien fleet then alert player of victory
        else {
          game.userResponse = prompt(
            `${alienShips[game.targetShip].name} destroyed!!\n${
              ussSchwartz.name
            } Hull: ${
              ussSchwartz.hull
            }\nWould you like to ATTACK the next ship or RETREAT from battle?`,
            ""
          );
          game.targetShip += 1;
          //Prompt player if they want to attack or retreat
          checkUserPrompt();
          return;
        }
      } else {
        //Switch the attacking/attacked ships
        temp = attacking;
        attacking = beingAttacked;
        beingAttacked = temp;
      }
    }
  }
};
//Function to check user prompts
let checkUserPrompt = () => {
  let responseUpperCase = game.userResponse.toUpperCase();
  if (responseUpperCase === "ATTACK") {
    shipsBattle(ussSchwartz, alienShips[game.targetShip]);
  } else if (responseUpperCase === "RETREAT") {
    alert("Game Over! You Live to Fight Again Another Day.");
  }
};

let startGame = () => {
  //Build alien fleets
  createAlienShips();

  game.userResponse = prompt(
    "Alien fleet approaching\nWould you like to ATTACK the first ship or RETREAT?",
    ""
  );
  checkUserPrompt();
};

//Initialize game
startGame();