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

const form = document.getElementById("contact-form");
const responseMessage = document.getElementById("response-message");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/.netlify/functions/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      responseMessage.style.display = "block";
      errorMessage.style.display = "none";
      form.reset();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    errorMessage.style.display = "block";
    responseMessage.style.display = "none";
  }
});
