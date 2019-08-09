let saveBtn = document.querySelector('.save-btn')
let closeBtn = document.querySelector('.btn-danger')
let form = document.querySelector('.form-main')

saveBtn.addEventListener('click', ()=>{
  createNote()
})

closeBtn.addEventListener('click', ()=>{
  form.remove()
})


async function createNote() {
  let idDate = Date.now()
  let noteTitle = document.getElementById('note-title')
  let noteText = document.getElementById('note-text')
    let data = {
      id: idDate,
      title: noteTitle.value,
      text: noteText.value
    }
    let req = await fetch(`/api/notes`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })  
    let ans = await req.json()
    window.location.href = `/`
  }