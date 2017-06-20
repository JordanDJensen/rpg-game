var readlineSync = require("readline-sync");



var genNumInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

var PlayerStatus = function (name, hp, inv) {
    this.name = name;
    this.hp = hp || 100;
    this.inv = inv || [];
    this.printPlayer = function () {
        console.log("Sergeant:" + this.name + " , Hp: " + this.hp);
        console.log("Inventory");
        for (var i = 0; i < this.inv; i++) {
            console.log(inv[i]);
        }
    }
};

var Enemy = function (type, hitPoints) {
    this.type = type;
    this.hitPoints = hitPoints;
    this.printEnemy = function () {
        console.log("[+] The " + this.type + " has " + this.hitPoints + " hp.");
    }
};

var genEnemy = function () {
    var enemyType = ["Imperial Heavy Stormtrooper", "Heavy Weapon Stormtrooper", "Stormtrooper"];
    var randomEnemy = enemyType[genNumInRange(0, enemyType.length)];
    var randomHitpoints = 0;
    if (randomEnemy === "Imperial Heavy Stormtrooper") {
        randomHitpoints = genNumInRange(80, 100);
    } else if (randomEnemy === "Heavy Weapon Stormtrooper") {
        randomHitpoints = genNumInRange(50, 79);
    } else {
        randomHitpoints = genNumInRange(20, 49);
    }
    var randomEnemy = new Enemy(randomEnemy, randomHitpoints);
    return randomEnemy;
};

console.log("[+] Help us against the Galatic Empire. Let's prepare you for battle.");
var name = readlineSync.question("[+] What is your name?");
var user = new PlayerStatus(name);

var weapon = readlineSync.question("[+] Which weapon will you like to pick DH-17 pistol or A280 rifle?");

if (weapon === "DH-17") {
    console.log("[+] Pistol gun! Let's get this party started!");
} else {
    console.log("[+] Rifle gun! Now that is what I am talking about!");
};
console.log("[+] Sergeant " + name + " you are ready for battle. May the force be with you!")

while (true) {
    var input = readlineSync.question("[*] Enter 'w' to walk");
    if (input == "w") {
        var chance = genNumInRange(0, 100);
        if (chance >= 50) {
            var trooper = genEnemy();
            trooper.printEnemy();
            while (user.hp > 0 && trooper.hitPoints > 0) {
                input = readlineSync.question("[+] Do you want to flee or attack?");
                if (input == "attack") {
                    var damage = genNumInRange(20, 50);
                    trooper.hitPoints -= damage;
                    console.log("[+] You hit " + trooper.type + " for " + damage + " points");

                    if (trooper.hitPoints < 0) {
                        console.log("[+] You killed the " + trooper.type);
                        var upgrade = genNumInRange(20, 40);
                        user.hp += upgrade;
                        console.log("[+] You now have " + user.hp + " hp.");
                        break;
                    }
                    console.log("[+] Your enemy has " + trooper.hitPoints + " hp.");

                    var damage2 = genNumInRange(20, 50);
                    user.hp -= damage2;
                    console.log("[+] The enemy " + trooper.type + " hit you for " + damage2 + " points.");
                    console.log("[+] You have " + user.hp + " hp left.");

                } else {
                    var fiftyFifty = genNumInRange(0, 10);
                    if (fiftyFifty < 5) {
                        var losePoints = genNumInRange(20, 40);
                        user.hp -= losePoints;
                        console.log("[+] You have escape from " + trooper.type + " but you now have " + user.hp + " hp.");
                        break;


                    } else {
                        console.log("[+] You did not escape attack the trooper");
                        var losePoints = genNumInRange(20, 40);
                        user.hp -= losePoints;
                        console.log("[+] Enemy has hit you. You lost " + losePoints);
                        console.log("[+] You have " + user.hp + " hp.");

                    }

                }
            }

        } else {
            console.log("[+] No enemies near by. Continue to walk.");

        }
        if (user.hp < 0) {
            console.log("[+] " + trooper.type + " has killed you.")
            console.log("[+] Sergeant " + name + " you have died." + " GAME OVER.")
            break

        } else {
            console.log("")
        }
    } else if (input == "print") {
        user.printPlayer();
    }
};
