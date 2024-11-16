const listItems = document.querySelectorAll(".expertise-list li");

listItems.forEach((item) => {
  const content = item.querySelector(".expertise-list-item-desc");
  const icon = item.querySelector("img");

  item.addEventListener("click", () => {
    content.classList.toggle("show-list-item-desc");
    item.classList.toggle("show-expertise-list-item");
    icon.classList.toggle("expertise-list-icon-spin");
  });
});

let nav = document.querySelector(".nav-wrap");

if (
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
  let observer = new IntersectionObserver((entries) => {
    console.log(entries[0].boundingClientRect.y);
    if (entries[0].boundingClientRect.y < 0) {
      nav.classList.add("nav-not-at-top");
    } else {
      nav.classList.remove("nav-not-at-top");
    }
  });
  observer.observe(document.getElementById("nav-observer"));
}
