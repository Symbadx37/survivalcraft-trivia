import data from"../dat/data.json" with {type: "json"};

let category = "general";
let tier = "veryEasy";
let field = "choice";
let index1 = 0, index2 = 0;

console.log(data["category_" + category][index1]["difficulty_" + tier][index2][field][2]);