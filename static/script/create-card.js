let saveBtn = document.querySelector('.save-btn')
let closeBtn = document.querySelector('.btn-danger')
let form = document.querySelector('.col-4')

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
    console.log('data', data)
    let req = await fetch('http://127.0.0.1:3000/api/notes', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    console.log('req',req)  
    let ans = await req.json()
    window.location.href = `/`
  }