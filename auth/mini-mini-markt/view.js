






const parentElement = document.getElementById("main"); // replace "parent" with the ID of the parent element
const numItems = 1; // replace 10 with the desired number of items

for (let i = 1; i <= numItems; i++) {
  const divElement = document.createElement("div");
  divElement.innerHTML = `
    <div id="foto">
      <img id="simg" src="./img/(${sessionStorage.getItem("selected")}).jpg">
    </div>
    <div id="description">
      <h2>Name</h2>
      <p>Preis:</p>
      <p>Slogan</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, beatae laudantium, atque vitae ea quibusdam reiciendis quia aliquid necessitatibus quod vel tenetur libero molestiae deleniti? Non debitis omnis fuga recusandae.</p>
    </div>
    <div class="counter">
      <span style="padding-right: 10px">Preis:</span>
      <button class="counter-button" id="decrement">-</button>
      <input type="number" id="counter-value" value="0">
      <button class="counter-button" id="increment">+</button>
    </div>
    <div id="buy">
      <button id="buybutton">Kaufen</button>
    </div>
  `;
  parentElement.appendChild(divElement);
}






const counterValue = document.getElementById("counter-value");

document.getElementById("increment").addEventListener("click", function() {
  counterValue.value++;
});

document.getElementById("decrement").addEventListener("click", function() {
  if (counterValue.value > 0) {
    counterValue.value--;
  }
});



