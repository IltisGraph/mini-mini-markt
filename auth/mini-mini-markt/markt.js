console.log(localStorage.getItem("loggedin"));
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("loggedin") == "false" || localStorage.getItem("user") == "null");
if(localStorage.getItem("loggedin") == 'false' || localStorage.getItem("user") == 'null'){
    console.log("Not logged in!");
    window.location.href = "https://iltisgraph.github.io/mini-mini-markt/";
    throw new Error("User is not logged in!");
}

let userName = localStorage.getItem("user");


document.getElementById("welcome").innerHTML = "Willkommen " + userName + "!";


//load the items in

// document.getElementById("main").innerHTML = ""


// Get the target div element
const targetDiv = document.querySelector('#main');

// Create three item boxes with different names and images
for (let i = 1; i <= 7; i++) {
  // Create a new item box element
  const itemBox = document.createElement('div');
  itemBox.classList.add('itemBox');

  // Create a new link element
  const link = document.createElement('a');
  link.href = 'view.html';

  // Create a new item picture element
  const itemPicture = document.createElement('div');
  itemPicture.classList.add('itemPicture');

  // Create a new image element
  const image = document.createElement('img');
  image.classList.add('itemImage');
  image.src = `./img/(${i}).jpg`;
  itemPicture.appendChild(image);

  // Create a new item description element
  const itemDescription = document.createElement('div');
  itemDescription.classList.add('ItemDescription');

  // Create a new h2 element for the item name
  const itemName = document.createElement('h2');
  itemName.textContent = `Name ${i}`;
  itemDescription.appendChild(itemName);

  // Create a new p element for the item price
  const itemPrice = document.createElement('p');
  itemPrice.classList.add('itemPreis');
  itemPrice.textContent = 'Preis: 1,23€/100g';
  itemDescription.appendChild(itemPrice);

  // Create a new p element for the item slogan
  const itemSlogan = document.createElement('p');
  itemSlogan.classList.add('itemWerbeSatz');
  itemSlogan.textContent = 'Immer! Sehr! Lecker!';
  itemDescription.appendChild(itemSlogan);

  // Append the link, item picture and item description to the item box
  link.appendChild(itemPicture);
  link.appendChild(itemDescription);
  itemBox.appendChild(link);

  // Append the item box to the target div
  targetDiv.appendChild(itemBox);
}



