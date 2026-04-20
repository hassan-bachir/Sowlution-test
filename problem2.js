const fs = require("fs");

const rawData = fs.readFileSync("prediction.csv", "utf-8");

const dataArray = rawData.split(/\r?\n/);
let rows = dataArray.slice(1);
// console.log(rows);
const data = rows.map((row) => {
  const values = row.split(",");
  const obj = {
    suit: values[0],
    animal: values[1],
    fruit: values[2],
    won: Number(values[3] == "True"),
  };

  return obj;
});
// this one is the empty last slot NOT NEEDED
const emptyLastEntry = data.pop();
// console.log(data);

const totalWon = data.filter((entry) => entry.won === 1).length;
const totalLost = data.filter((entry) => entry.won === 0).length;
const totalplayers = data.length;
const winRate = totalWon / totalplayers;
const lossRate = totalLost / totalplayers;

const checkCardType = (str) => {
  const allowedValues = ["diamonds", "spades", "hearts", "joker", "clubs"];
  return allowedValues.includes(str);
};
const checkAnimalType = (str) => {
  const allowedValues = ["lion", "parrot", "fox", "seal", "snake"];
  return allowedValues.includes(str);
};
const checkFruitType = (str) => {
  const allowedValues = ["apple", "banana", "mango", "papaya", "watermelon"];
  return allowedValues.includes(str);
};

function probabilityToBeatBoss(targetSuit, targetAnimal, targetFruit) {
  if (
    !checkCardType(targetSuit) ||
    !checkAnimalType(targetAnimal) ||
    !checkFruitType(targetFruit)
  ) {
    return "Invalid Input";
  }
  const winners = data.filter((entry) => entry.won === 1);
  const losers = data.filter((entry) => entry.won === 0);

  const suitWinRate =
    winners.filter((entry) => entry.suit === targetSuit).length / totalWon;
  const animalWinRate =
    winners.filter((entry) => entry.animal === targetAnimal).length / totalWon;
  const fruitWinRate =
    winners.filter((entry) => entry.fruit === targetFruit).length / totalWon;

  const winScore = suitWinRate * animalWinRate * fruitWinRate * winRate;
  //   console.log(winScore);

  const suitLossRate =
    losers.filter((entry) => entry.suit === targetSuit).length / totalLost;
  const animalLossRate =
    losers.filter((entry) => entry.animal === targetAnimal).length / totalLost;
  const fruitLossRate =
    losers.filter((entry) => entry.fruit === targetFruit).length / totalLost;

  const lossScore = suitLossRate * animalLossRate * fruitLossRate * lossRate;

  const probability = (winScore / (winScore + lossScore)) * 100;

  return probability.toFixed(2) + "%";
}

const result = probabilityToBeatBoss("Hearts", null, "Mango");
console.log(`${result}`);
