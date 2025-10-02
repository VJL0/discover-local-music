const renderEvents = async () => {
  const response = await fetch("/events");
  const data = await response.json();
  const mainContent = document.getElementById("main-content");

  if (!data || data.length === 0) {
    const h2 = document.createElement("h2");
    h2.textContent = "No Events Available 😞";
    mainContent.appendChild(h2);
    return;
  }

  data.map((evt) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const top = document.createElement("div");
    top.className = "top-container";
    top.style.backgroundImage = `url(${evt.image})`;

    const bottom = document.createElement("div");
    bottom.className = "bottom-container";

    const h3 = document.createElement("h3");
    h3.textContent = evt.name;
    const pVenue = document.createElement("p");
    pVenue.textContent = `${evt.venue} • ${evt.genre}`;
    const pWhen = document.createElement("p");
    pWhen.textContent = new Date(evt.datetime).toLocaleString();
    const pPrice = document.createElement("p");
    pPrice.textContent = `Tickets: ${evt.price}`;

    const link = document.createElement("a");
    link.textContent = "Read More >";
    link.href = `/events/${evt.id}`;
    link.setAttribute("role", "button");

    bottom.append(h3, pVenue, pWhen, pPrice, link);
    card.append(top, bottom);
    mainContent.appendChild(card);
  });
};

const requestedUrl = window.location.pathname.slice(1);
if (requestedUrl && requestedUrl !== "") {
  if (requestedUrl !== "") {
    window.location.href = "/404.html";
  }
} else {
  renderEvents();
}
