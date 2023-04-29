const totalWord = document.getElementById('totalWord')
const selectMode = document.getElementById('selectMode')
const selectWord = document.getElementById('selectWord')
const btnGenerates = document.getElementById('btnGenerates')
const listQuestionnaire = document.getElementById('listQuestionnaire')

totalWord.innerHTML = data.length

btnGenerates.onclick = () => {
  const lengthData = data.length

  if (lengthData <= 0) {
    alert('data null')
    return
  }

  const lengthSelect = selectWord.value
  for (i = lengthData - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = data[i]
    data[i] = data[j]
    data[j] = k
  }

  const newData = data.slice(0, lengthSelect)
  listQuestionnaire.innerHTML = ''
  switch (selectMode.value) {
    case 'both':
      newData.forEach((e) => {
        const rand = Math.floor(Math.random() * 2)
        if (rand != 0) {
          generates('english', e)
        } else {
          generates('vietnam', e)
        }
      })
      break
    case 'english':
      newData.forEach((e) => generates('english', e))
      break
    case 'vietnam':
      newData.forEach((e) => generates('vietnam', e))
      break
  }
}

const generates = (type, data) => {
  const { en, vi } = data
  listQuestionnaire.innerHTML += `
    <div
      class="item"
      data-value="${type != 'english' ? en : vi}"
      data-result="${type != 'english' ? vi : en}"
    >
    <div class="text" onclick="showResult(this)">
      ${type != 'english' ? en : vi}
    </div>
    <input type="text" class="input result" oninput="checkResult(this)" />
  </div>`
}

const showResult = (e) => {
  const value = e.parentNode.getAttribute('data-value').trim().toLowerCase()
  const result = e.parentNode.getAttribute('data-result').trim().toLowerCase()
  e.innerHTML = result
  e.parentElement.classList.add('help')
  setTimeout(() => {
    e.innerHTML = value
    e.parentElement.classList.remove('help')
  }, 2000)
}

const checkResult = (e) => {
  const result = e.parentNode.getAttribute('data-result').trim().toLowerCase()
  const value = e.value.trim().toLowerCase()
  if (result === value) {
    e.classList.remove('error')
    e.classList.add('success')
    e.parentElement.classList.remove('error')
    e.parentElement.classList.add('success')
  } else {
    e.classList.remove('error')
    e.classList.remove('success')
    e.parentElement.classList.remove('success')
    e.parentElement.classList.add('error')
  }
  if (value === '') {
    e.classList.remove('error')
    e.classList.remove('success')
    e.parentElement.classList.remove('error')
    e.parentElement.classList.remove('success')
  }
}
