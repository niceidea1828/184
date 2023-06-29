const row = [3, 6, 2, 4, 5, 1];

let active = true;
let current = 0;

$(".balance").html(localStorage.balance_g184);

$(".modal").click(function () {
  $(".modal").addClass("hidden");
});

$(".spin").click(function () {
  if (!active) {
    return;
  }

  active = false;

  $(".wheel").css({
    transform: `rotate(${720 * (1 + current) + current * 60}deg)`
  });

  setTimeout(() => {
    if (current == row.length) {
      current = 0;
    }

    $(`.modal_${row[current]}`).removeClass("hidden");

    active = true;
    current++;
  }, 2200);
});

window.onload = () => {
  $(".wrapper").removeClass("hidden");
};
