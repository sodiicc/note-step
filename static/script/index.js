let noteList = document.querySelector('#noteList')
let createBtn = document.getElementById('addButton')
let currentId

createBtn.addEventListener('click', (e)=>{
  e.stopPropagation()
  if(!noteList.classList.contains('activated')){
    noteList.appendChild(getCardTemplate(Date.now(), "", "", true))    
    noteList.classList.add('activated')
  }else{
    deleteNote(currentId)
    noteList.classList.remove('activated')
  }
})

document.addEventListener('click', (e) => {
  if(noteList.classList.contains('activated')){
    let currentCard = document.querySelector(`.bg-warning[data-idc="${currentId}"]`)
    console.log('currentCard', currentCard)
    if (!currentCard.contains(e.target)) {
        deleteNote(currentId)
        noteList.classList.remove('activated')
    }
  }
})

async function createNote(id) {
  let data = {
    id: id,
    title: getTitleVal(id, true),
    text: getTextVal(id, true)
  }
  console.log('data', data)
  let req = await fetch('http://127.0.0.1:3000/create', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  console.log('req',req)  
  let ans = await req.json()
  if(ans.created){
    let currentCol = getCol(id)
    let newCol = getCardTemplate(data.id, data.title, data.text, false)
    currentCol.innerHTML = newCol.innerHTML
  }
}

async function editNote(id){
  let data = {
      id: id,
      title: getTitleVal(id, true),
      text: getTextVal(id, true)
  }
  console.log(data)
  let req = await fetch("http://127.0.0.1:3000/edit", {
      method: "POST",
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
  })

  let answer = await req.json()
  console.log(answer)
  if(answer.edited){
      let currentCol = getCol(id)
      let newCol = getCardTemplate(data.id, data.title, data.text, false)
      currentCol.innerHTML = newCol.innerHTML
  }  
}

noteList.addEventListener('click', (e) => {
  console.log('e.target', e.target)
  let id = e.target.dataset.id
  if (e.target.classList.contains('btn-danger')) {
    console.log('delete')
    deleteNote(id)
    noteList.classList.remove('activated')
    console.log('id', id)
    e.stopPropagation()
  }
  else if(e.target.classList.contains('save-btn')){
    console.log('save')
    noteList.classList.remove('activated')
    if(getCardBody(id).dataset.edit){
      editNote(id)
    }else{
      createNote(id)
    }
  }else if(e.target.classList.contains('edit-btn')){
    // let cardBody = document.querySelector(`.card-body[data-id="${id}"]`)
    let currentCol = getCol(id)
    let newCol = getCardTemplate(id, getTitleVal(id,false), getTextVal(id,false), 1)
    currentCol.innerHTML = newCol.innerHTML
    getCardBody(id).setAttribute("data-edit", "true")
    e.stopPropagation()
  }else if(e.target.classList.contains('card-body')){
    if(e.target.dataset.created !== false){
      window.location.href = `/${id}`  }
  }
})

async function deleteNote(id) {
  let data = {
    id: id
  }
  let req = await fetch('http://127.0.0.1:3000/delete', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  console.log('JSON.stringify(data)', JSON.stringify(data))

  let answer = await req.json()
    if(answer.deleted){
    let currentCol = getCol(id)
    currentCol.remove()
  }
}

function getCardTemplate(id, title, text, editStatus) {
  currentId = id
  
  let inputElems = `
  <div class="form-group">
    <label for="note-title">Title</label>
    <input type="text" class="form-control" id="note-title" value ="${title}">
    </div>
  <div class="form-group">
    <label for="note-text">Text</label>
    <textarea class="form-control" id="note-text" rows="3">${text}</textarea>
  </div>`

  let textElems = `
  <h3 class="card-title alert-link">${title}</h3>
  <h4 class="card-text">${text}</h4>`
  let neededContent
  let submitBtn
  if(editStatus){
    submitBtn = `<button class="btn btn-primary badge-pill save-btn" data-id="${id}">Save</button>`
    neededContent = inputElems
  }else{
    submitBtn = `<button class="btn btn-primary badge-pill edit-btn" data-id="${id}">Edit</button>`    
    neededContent = textElems
  }

  let cardContainer = `  
  <div class="card bg-warning m-3" data-idc="${id}">
    <div class="card-body" style="cursor: pointer" data-id="${id}">
      <div class="text-right">
          <button type="button" data-id="${id}" class="btn btn-danger alert-link badge-pill">X</button>
      </div> 
      ${neededContent}
      ${submitBtn}     
    </div>
  </div>`

let cardWrapper = document.createElement('div')
cardWrapper.innerHTML = cardContainer
cardWrapper.classList.add('col-4')
return cardWrapper

}

function getTitleVal(id, editStatus){
  const tag = editStatus ? "input" : "h3"
  if(editStatus){
    return document.querySelector(`.card-body[data-id="${id}"] ${tag}`).value
  }else{
    return document.querySelector(`.card-body[data-id="${id}"] ${tag}`).innerText
  }
}
function getTextVal(id, editStatus){
  const tag = editStatus ? "textarea" : "h4"
  if(editStatus){
    return document.querySelector(`.card-body[data-id="${id}"] ${tag}`).value
  }else{
    return document.querySelector(`.card-body[data-id="${id}"] ${tag}`).innerText
  }
}
function getCol(id){
  return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
}

function getCardBody(id){
  return document.querySelector(`.card-body[data-id="${id}"]`)
}