const renderEvent = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop(), 10)

  const response = await fetch('/events')
  const data = await response.json()

  const eventContent = document.getElementById('event-content')
  let evt = null
  if (data) {
    evt = data.find((e) => e.id === requestedID)
  }

  if (!evt) {
    const h2 = document.createElement('h2')
    h2.textContent = 'No Events Available 😞'
    eventContent.replaceChildren(h2)
    return
  }

  document.getElementById('image').src = evt.image
  document.getElementById('name').textContent = evt.name
  document.getElementById('artists').textContent = `Artists: ${evt.artists.join(', ')}`
  document.getElementById('datetime').textContent = `When: ${new Date(evt.datetime).toLocaleString()}`
  document.getElementById('venue').textContent = `Venue: ${evt.venue}`
  document.getElementById('genre').textContent = `Genre: ${evt.genre}`
  document.getElementById('price').textContent = `Tickets: ${evt.price}`
  document.getElementById('description').textContent = evt.description
  document.title = `Discover Local Music - ${evt.name}`
}

renderEvent()
