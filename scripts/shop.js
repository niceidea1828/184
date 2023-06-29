if (!localStorage.items_g184) {
  localStorage.items_g184 = JSON.stringify(["1"]);
}

$(".balance").html(localStorage.balance_g184);

let bought = JSON.parse(localStorage.items_g184);
let selected = localStorage.selected_g184;

let shopItems = [
  { name: "1", price: 0 },
  { name: "2", price: 500 },
  { name: "3", price: 700 },
  { name: "4", price: 900 }
];

shopItems.forEach((item) => {
  item.bought = bought.includes(item.name);
  item.selected = item.name == selected;
});

renderCards();

$(".hidden").removeClass("hidden");

function renderCards() {
  $(".shop").html("");

  shopItems.forEach((item) => {
    let cardHtml = `
            <div class="card" data-name="${item.name}">
                <img src="../png/p${item.name}.png" alt="" class="card_pic" />
                ${getCardHTML(item)}
            </div>
        `;

    $(".shop").append(cardHtml);

    function getCardHTML(item) {
      if (!item.bought) {
        return `
                    <div class="card_btn block" data-price="${item.price}">
                      <img src="../png/coin.png"/>  
                      <div>${item.price}</div>
                    </div>
                    `;
      } else {
        return `
                <div class="card_btn btn gray" data-price="${item.price}">
                    <div>${item.selected ? "Selected" : "Select"}</div>
                </div>
                `;
      }
    }
  });

  $(".card_btn").click(function () {
    let btnIndex = $(".card_btn").index($(this));
    let shopItem = shopItems[btnIndex];

    if (!shopItem.bought) {
      if (localStorage.balance_g184 < shopItem.price) {
        return;
      }

      changeBalance(-$(this).data("price"));
      shopItem.bought = true;
      localStorage.items_g184 = JSON.stringify([
        ...JSON.parse(localStorage.items_g184),
        shopItem.name
      ]);
      renderCards();
      console.log(shopItems);
    } else if (!shopItem.selected) {
      localStorage.selected_g184 = shopItem.name;
      shopItems.forEach((item) => (item.selected = false));
      shopItem.selected = true;
      renderCards();
    }
  });
}

function changeBalance(amount) {
  localStorage.balance_g184 = +localStorage.balance_g184 + amount;
  $(".balance").html(localStorage.balance_g184);
}
