let noteList = document.querySelector('#noteList')
let createBtn = document.getElementById('addButton')
let currentId

createBtn.addEventListener('click', createNote)

noteList.addEventListener('click', (e) => {
  let id = e.target.dataset.id
  if (e.target.classList.contains('btn-danger')) {
    console.log('delete')
    deleteNote(id)
  }else if (e.target.classList.contains('edit-btn')) {
    console.log('Edit')
    editNote(id)
  } else if (e.target.classList.contains('card-body')) {
    window.location.href = `/id/${id}`
    }
  })

async function createNote() {
  window.location.href = `/notes`
  let req = await fetch('http://127.0.0.1:3000/notes', {
    method: 'GET',
    headers: {
      "Content-type": "application/json"
    }
  })
}

async function editNote(id) {
  let data = {
    id: id,
    title: getTitleVal(id),
    text: getTextVal(id)
  }
  console.log('data', data)
  let req = await fetch(`http://127.0.0.1:3000/api/notes/${id}`, {
    method: 'GET',
    headers: {
      "Content-type": "application/json"
    },
  }
  )
  // let ans = await req.json()
  window.location.href = `/api/notes/${id}`
}

async function deleteNote(id) {
  let data = {
    id: id
  }
  let req = await fetch(`http://127.0.0.1:3000/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  console.log('JSON.stringify(data)', JSON.stringify(data))

  let answer = await req.json()
  if (answer.deleted) {
    let currentCol = getCol(id)
    currentCol.remove()
  }
}

function getTitleVal(id) {
    return document.querySelector(`.card-body[data-id="${id}"] h3`).innerText  
}
function getTextVal(id) {
    return document.querySelector(`.card-body[data-id="${id}"] h4`).innerText  
}
function getCol(id) {
  return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
}
function getCardBody(id) {
  return document.querySelector(`.card-body[data-id="${id}"]`)
}