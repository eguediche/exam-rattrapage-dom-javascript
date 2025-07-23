const Card = document.querySelector(".card");

document.addEventListener("DOMContentLoaded", () =>{
    Card.innerHTML = `
    			<form id="form" class="card">
				<label for="search">
					<h1 class="text-preset-1">What do you want to COOK ?</h1>
				</label>
				<input
					id="search"
					class="input text-preset-2"
					type="text"
					placeholder="Arrabiata penne..."
				/>
				<button class="btn rose-800 rose-50-text" type="submit">
					<h2 class="text-preset-2">Rechercher</h2>
				</button>
                <hr>
			</form>
            `
            Card.style.display = "flex"
            Card.style.width = "auto"
            const Form = document.querySelector("#form");
            Form.style.width = "max-content"

            const SearchInput = document.querySelector("#search");
    Form.addEventListener("submit", (e) =>{
        e.preventDefault();
        async function test() {
            let resultat = await fetch ("https://www.themealdb.com/api/json/v1/1/search.php?s=" + SearchInput.value, {
                method: "GET",
            })
            let data = await resultat.json();
            console.log(data);
        }
        test();
    })    
})