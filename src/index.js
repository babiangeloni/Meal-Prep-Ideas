function displayRecipe(response) {
  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let daysInput = document.querySelector("#user-days");
  let apiKey = "2046c535afeb092fo82f1d306d8a2b2t";
  let context =
    "You are a nutrition expert and love creating healthy meal plans. Your mission is to generate a meal plan based on the user's dietary preferences and health goals. Format the meal plan as a list in basic HTML, with each day labeled as 'Day 1', 'Day 2', and so on. Each day should have breakfast, lunch, dinner, and a snack, clearly identified. Ensure the meal plan is balanced, and use healthy ingredients. Sign the meal plan with 'MealPrep AI' inside a <strong> element at the end and NOT at the beginning.";
  let prompt = `User instructions: Generate a healthy ${daysInput.value}-day meal plan featuring ${instructionsInput.value} as a key ingredient.`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="generating">⏳ Generating a ${daysInput.value}-day meal plan featuring ${instructionsInput.value}...</div>`;

  axios.get(apiURL).then(displayRecipe);
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
