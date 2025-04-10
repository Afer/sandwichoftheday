const ingredients = {
    "bread": [
        {"name": "Marbled Rye", "img": "./ingredient-pics/marbled-rye.png", "savoryIndex": 0},
        {"name": "Sourdough", "img": "./ingredient-pics/sourdough.png", "savoryIndex": 1},
        {"name": "Panini", "img": "./ingredient-pics/panini.png", "savoryIndex": 1},
        {"name": "Wheat", "img": "./ingredient-pics/Wheat.png", "savoryIndex": 0},
        {"name": "Italian Roll", "img": "./ingredient-pics/italian-roll.png", "savoryIndex": 2}
    ],

    "main": [
        {"name": "Salami", "img": "./ingredient-pics/Salami.png", "savoryIndex": 0},
        {"name": "Bratwurst", "img": "./ingredient-pics/Bratwurst.png", "savoryIndex": 1},
        {"name": "Ham", "img": "./ingredient-pics/ham-slice.png", "savoryIndex": 0},
        {"name": "Turkey", "img": "./ingredient-pics/Turkey.png", "savoryIndex": 0},
        {"name": "Roast Beef", "img": "./ingredient-pics/Roast Beef.png", "savoryIndex": 0},
        {"name": "Steak", "img": "./ingredient-pics/Steak.png", "savoryIndex": 2},
        {"name": "Grilled Chicken", "img": "./ingredient-pics/Grilled Chicken.png", "savoryIndex": 1},
        {"name": "Fried Chicken", "img": "./ingredient-pics/Fried Chicken.png", "savoryIndex": 2}
    ],

    "cheese": [
        {"name": "Blue Cheese", "img": "./ingredient-pics/Blue Cheese.png"},
        {"name": "Gouda", "img": "./ingredient-pics/Gouda.png"},
        {"name": "Smoked Gouda", "img": "./ingredient-pics/Smoked Gouda.png"},
        {"name": "Sharp Cheddar", "img": "./ingredient-pics/cheddar-cheese-slice.png"},
        {"name": "Cheddar", "img": "./ingredient-pics/cheddar-cheese-slice.png"},
        {"name": "Swiss", "img": "./ingredient-pics/Swiss.png"},
        {"name": "Baby Swiss", "img": "./ingredient-pics/Baby Swiss.png"},
        {"name": "Dill Havarti", "img": "./ingredient-pics/Dill Havarti.png"},
        {"name": "Feta", "img": "./ingredient-pics/Feta.png"}
    ],
    "roughage": [
        {"name": "Pickled Asparagus", "img": "./ingredient-pics/pickled-asparagus.png"},
        {"name": "Cucumber", "img": "./ingredient-pics/cucumber.png"},
        {"name": "Green Leaf Lettuce", "img": "./ingredient-pics/green-leaf-lettuce.png"},
        {"name": "Romaine Lettuce", "img": "./ingredient-pics/romaine-lettuce.png"},
        {"name": "Tomato", "img": "./ingredient-pics/tomato.png"},
        {"name": "Pickles", "img": "./ingredient-pics/Pickles.png"},
        {"name": "Green Onion", "img": "./ingredient-pics/green-onion.png"},
        {"name": "Green Pepper", "img": "./ingredient-pics/green-pepper.png"},
        {"name": "Red Pepper", "img": "./ingredient-pics/red-pepper.png"},
        {"name": "Roasted Red Pepper", "img": "./ingredient-pics/roasted-red-pepper.png"},
        {"name": "Onion", "img": "./ingredient-pics/onion.png"},
        {"name": "Carmalized Onion", "img": "./ingredient-pics/carmalized-onion.png"}
    ],
    "wildcard": [
        {"name": "Crispy Onions", "img": "./ingredient-pics/crispy-onions.png"},
        {"name": "Potato Chips", "img": "./ingredient-pics/potato-chips.png"},
        {"name": "French Fries", "img": "./ingredient-pics/french-fries.png"},
        {"name": "Steak Seasoning", "img": "./ingredient-pics/steak-seasoning.png"}
    ],
    "condiments": [
        {"name": "Ketchup", "img": "./ingredient-pics/ketchup.png"},
        {"name": "Mustard", "img": "./ingredient-pics/mustard.png"},
        {"name": "Spicy Brown Mustard", "img": "./ingredient-pics/spicy-brown-mustard.png"},
        {"name": "Kewpie Mayo", "img": "./ingredient-pics/kewpie-mayo.png"},
        {"name": "Mayonaise", "img": "./ingredient-pics/mayonaise.png"},
        {"name": "Arby's Sauce", "img": "./ingredient-pics/arbys-sauce.png"},
        {"name": "Chik-fil-a Sauce", "img": "./ingredient-pics/chik-fil-a-sauce.png"}
    ],
    "sauce": [
        {"name": "Mango Salsa", "img": "./ingredient-pics/mango-salsa.png"},
        {"name": "Buffalo Sauce", "img": "./ingredient-pics/buffalo-sauce.png"},
        {"name": "Burger Sauce", "img": "./ingredient-pics/burger-sauce.png"},
        {"name": "Sweet and Spicy Sauce", "img": "./ingredient-pics/sweet-and-spicy-sauce.png"}
    ]
}

TEST_ONLY = {
    useTestObj: false,
    fullyRandom: false,
    testObj: {
        "bread": 3,
        "main": 2,
        "cheese": 4,
        "sauce": 0,
        "condiments": 3,
        "roughage": 2,
        "wildcard": 0
    }
};

function getRandomNumber(modifer, modulo) {
    // get todays date at 12AM
    let today = new Date();
    let seed = today.getDay() * today.getMonth() * today.getFullYear() * 1987;
    // add the modifer to the seed
    seed += modifer;

    if (TEST_ONLY.fullyRandom) {
        seed = Math.random()*10000;
    }

    str = `${(2**31-1&Math.imul(48271,seed))/2**31}`
    .split('')
    .slice(-10)
    .join('') % modulo;

    return str;
}

$(function() {
    let ingredientMap = ["bread", "main", "cheese", "roughage", "sauce", "condiments", "wildcard"];
    let sandwhich = [];
    let data = ingredients;
    let modifier = 0;

    $("#date-display").html(new Date().toLocaleDateString());

    // Get object from ingredients.json file
    //$.getJSON("./ingredients.json", function(data) {
        // get random bread item from ingredientMap
        let bread = data[ingredientMap[0]][getRandomNumber(modifier++, data[ingredientMap[0]].length)];
        sandwhich.push(bread);

        // Get a random main entry until we get one that has a savoryIndex of 1 or 2
        let main = data[ingredientMap[1]][getRandomNumber(modifier++, data[ingredientMap[1]].length)];
        while (main.savoryIndex > bread.savoryIndex) {
            main = data[ingredientMap[1]][getRandomNumber(modifier++, data[ingredientMap[1]].length)];
        }
        sandwhich.push(main);

        // get a random cheese and add it to the sandwhich
        let cheese = data[ingredientMap[2]][getRandomNumber(modifier++, data[ingredientMap[2]].length)];
        sandwhich.push(cheese);

        // roughage
        let roughage = data[ingredientMap[3]][getRandomNumber(modifier++, data[ingredientMap[3]].length)];
        sandwhich.push(roughage);

        // add a second "roughage" ingredient with a 25% chance
        if (getRandomNumber(modifier++, 4) === 1) {
            let roughage2 = data[ingredientMap[3]][getRandomNumber(modifier++, data[ingredientMap[3]].length)];
            sandwhich.push(roughage2);
        }

        // add a sauce ingredient if the bread.savoryIndex plus the main.savoryIndex is greater than 1
        if (bread.savoryIndex + main.savoryIndex > 1) {
            let sauce = data[ingredientMap[4]][getRandomNumber(modifier++, data[ingredientMap[4]].length)];
            sandwhich.push(sauce);
        }

        // add a condiment ingredient if the bread.savoryIndex plus the main.savoryIndex is less than or equal 1
        if (bread.savoryIndex + main.savoryIndex <= 1) {
            let condiment = data[ingredientMap[5]][getRandomNumber(modifier++, data[ingredientMap[5]].length)];
            sandwhich.push(condiment);
        }

        // add a wildcard ingredient with a 15% chance
        if (getRandomNumber(modifier++, 4) === 1) {
            let wildcard = data[ingredientMap[6]][getRandomNumber(modifier++, data[ingredientMap[6]].length)];
            sandwhich.push(wildcard);
        }

        if (TEST_ONLY.useTestObj) {
            sandwhich = [];
            for (let key in TEST_ONLY.testObj) {
                let ingredient = data[key][TEST_ONLY.testObj[key]];
                sandwhich.push(ingredient);
            }
        }

        // build an html template for the sandwhich
        let sandwhichHtml = '<div class="sandwhich">';
        for (let i = 0; i < sandwhich.length; i++) {
            sandwhichHtml += `<div class="ingredient ${ingredientMap[i]} ${sandwhich[i].name.replaceAll(' ', '-').replaceAll('\'', '')}">${sandwhich[i].name}</div>`;
        }
        
        // end with upsidedown bread
        sandwhichHtml += `<div class="ingredient rotated-bread ${ingredientMap[0]} ${sandwhich[0].name.replaceAll(' ', '-')}"></div>`;

        // Add the sandwhich to the page
        $("#sandwhich").append(sandwhichHtml);
        
        // Add a click event to the sandwhich
        $("#sandwhich").click(function() {
            // Get the current sandwhich
            let currentSandwhich = $(this);
            // Get the current sandwhich's class
            let currentSandwhichClass = currentSandwhich.attr("class");
        });
    //});
});