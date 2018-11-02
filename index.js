const form = document.getElementById("create-monster")
const container = document.getElementById('monster-container')
const nextPageButton = document.getElementById('forward')
const previousPageButton = document.getElementById('back')
let monsterNameField
let monsterAgeField
let monsterDescriptionField
let page = 1
let monsters = null;

(function addForm() {
form.innerHTML += `
    <form class="create-monster-form">
      <label for="monster-name">Monster Name</label>
      <input id="monster-name-input" type="text" placeholder="name">
      <label for="monster-age">Age</label>
      <input id="monster-age-input" type="text" placeholder="age">
      <label for="monster-age">Description</label>
      <input id="monster-description-input" type="text" placeholder="description">
      <input type="submit" value="Create Monster" ></button>
    </form>
  `
  monsterNameField = document.getElementById("monster-name-input")
  monsterAgeField = document.getElementById("monster-age-input")
  monsterDescriptionField = document.getElementById("monster-description-input")
})()

form.addEventListener("submit", event => {
  event.preventDefault()
  attributes = {name: monsterNameField.value,
                age: monsterAgeField.value,
                description: monsterDescriptionField.value}
  createMonster(attributes)
})

function createMonster(attributes) {
  fetch('http://localhost:3000/monsters?_limit=50&_page=1',
      {method: 'POST',
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(attributes)})
    .then(() => {
      monsterNameField.value = ""
      monsterAgeField.value = ""
      monsterDescriptionField.value = ""
      window.alert("Monster created!")
      if (monsters.length < 50) {
        monsters.push(attributes)
        displayMonster(attributes)
      }
    })

}

document.addEventListener("DOMContentLoaded", function(event){
  fetch('http://localhost:3000/monsters?_limit=50&_page=1')
    .then((result)=> result.json())
    .then((data)=> monsters = data)
    .then(monsters => monsters.forEach (monster => displayMonster(monster)))

    nextPageButton.addEventListener("click", nextPage)
    previousPageButton.addEventListener("click", previousPage)

  })

  function displayMonster(monster) {
    container.innerHTML += `<div class="monster"><h2>${monster.name}</h2><h4>${monster.age}</h4><p>${monster.description}<h4></div>`
  }

  function nextPage() {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page+1}`)
      .then((result)=> result.json())
      .then((data)=> monsters = data)
      .then(monsters => {
        if (!monsters[0]) {
          window.alert("No more monsters over there!!")
        } else {
          container.innerHTML = ""
          page++
          window.scrollTo(0, 0);
          monsters.forEach (monster => displayMonster(monster))}
        })
  }

  function previousPage() {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page-1}`)
      .then((result)=> result.json())
      .then((data)=> monsters = data)
      .then(monsters => {
        if (page === 1) {
          window.alert("No more monsters over there!!")
        } else {
          container.innerHTML = ""
          page--
          window.scrollTo(0, 0);
          monsters.forEach (monster => displayMonster(monster))}
        })
  }
