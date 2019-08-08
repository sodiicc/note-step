let saveBtn = document.querySelector('.save-btn')

saveBtn.addEventListener('click', () => {
  let id = saveBtn.getAttribute('data-id')
  edNote(id)
})

async function edNote(id) {
  let noteTitle = document.getElementById('note-title')
  let noteText = document.getElementById('note-text')
    let data = {
      id: id,
      title: noteTitle.value,
      text: noteText.value
    }
  let req = await fetch(`http://127.0.0.1:3000/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  )
  window.location.href = `/`
}