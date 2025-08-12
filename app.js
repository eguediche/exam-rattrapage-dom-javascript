const Card = document.querySelector(".card");

document.addEventListener("DOMContentLoaded", function () {
    Card.innerHTML = `
        <form id="form" class="form-card">
            <label for="search">
                <h1 class="text-preset-1">What do you want to COOK ?</h1>
            </label>
            <input
                id="search"
                class="input text-preset-2"
                type="text"
                placeholder="Arrabiata penne"
            />
            <button class="btn rose-800 rose-50-text" type="submit">
                <h2 class="text-preset-2">Rechercher</h2>
            </button>
            <hr class="hr-dark">
        </form>
    `;

    const Form = document.querySelector("#form");
    const SearchInput = document.querySelector("#search");

    Form.addEventListener("submit", function (e) {
        e.preventDefault();

        async function getMeal() {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${(SearchInput.value)}`, {
                method: "GET",
            });

            const data = await res.json();

            console.log(data)

            if (data.meals === null) {
                Card.innerHTML = "<p>Aucune recette trouvée.</p>";
                return;
            }

            let meal = data.meals[0];

            let ingredientsHTML = "";
            for (let i = 1; i <= 20; i++) {
                let ingredient = meal["strIngredient" + i];
                let measure = meal["strMeasure" + i];
                if (ingredient && ingredient.trim() !== "") {
                    ingredientsHTML += `
                        <tr>
                            <th scope="row">
                                <span class="stone-600-text">${ingredient}</span>
                            </th>
                            <td>
                                <span class="brown-800-text bold">${measure}</span>
                            </td>
                        </tr>
                    `;
                }
            }

            let instructionsArray = meal.strInstructions.split("\n");
            let instructionsHTML = "";
            for (let j = 0; j < instructionsArray.length; j++) {
                if (instructionsArray[j].trim() !== "") {
                    instructionsHTML += `
                        <li>
                            <span class="stone-600-text text-preset-body">
                                ${instructionsArray[j]}
                            </span>
                        </li>
                    `;
                }
            }

            Card.innerHTML = `
                <div class="illustration" style="background: center / cover no-repeat url('${meal.strMealThumb}');"></div>
                <div class="card-content">
                    <h1 class="text-preset-1">${meal.strMeal}</h1>
                    <div class="card-chips">
                        <span class="chip lime-100 stone-900-text">${meal.strCategory}</span>
                        <span class="chip yellow-100 stone-900-text">${meal.strArea}</span>
                    </div>
                    <h2 class="text-preset-2 brown-800-text">Ingredients</h2>
                    <table class="card-ingredients-table">
                        <tbody>
                            ${ingredientsHTML}
                        </tbody>
                    </table>
                    <h2 class="text-preset-2 brown-800-text">Instructions</h2>
                    <ul class="card-instructions-list">
                        ${instructionsHTML}
                    </ul>
                    <div class="card-help">
                        <h3 class="text-preset-3 rose-800-text">Help</h3>
                        <ul class="card-help-list">
                            <li>
                                <span class="bold stone-600-text">Youtube:</span>
                                <a class="link" href="${meal.strYoutube}">${meal.strYoutube}</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="hr-light">
                </div>
            `;
        }

        getMeal();
    });
});