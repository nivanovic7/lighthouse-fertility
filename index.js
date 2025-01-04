const listItems = document.querySelectorAll(".expertise-list li");

listItems.forEach((item) => {
  console.log(item);
  const content = item.querySelector(".expertise-list-item-desc");
  const icon = item.querySelector("img");

  item.addEventListener("click", () => {
    content.classList.toggle("show-list-item-desc");
    item.classList.toggle("show-expertise-list-item");
    icon.classList.toggle("expertise-list-icon-spin");
  });
});
