const totalWord = document.getElementById('totalWord')
const selectMode = document.getElementById('selectMode')
const selectWord = document.getElementById('selectWord')
const btnGenerates = document.getElementById('btnGenerates')
const listQuestionnaire = document.getElementById('listQuestionnaire')

totalWord.innerHTML = data.length

btnGenerates.onclick = () => {
  if (data.length <= 0) {
    alert('data null')
  }
  const lengthData = data.length
  const lengthSelect = selectWord.value
  const listValue = Array.from({ length: lengthSelect }, () =>
    Math.floor(Math.random() * lengthData)
  )
  listQuestionnaire.innerHTML = ''
  switch (selectMode.value) {
    case 'both':
      listValue.forEach((e) => {
        const rand = Math.floor(Math.random() * 2)
        if (rand === 0) {
          generateEnglish(data[e])
        } else {
          generateVietnam(data[e])
        }
      })
      break
    case 'english':
      listValue.forEach((e) => {
        generateEnglish(data[e])
      })
      break
    case 'vietnam':
      listValue.forEach((e) => {
        generateVietnam(data[e])
      })
      break
  }
}

const generateEnglish = (data) => {
  const { en, vi } = data
  listQuestionnaire.innerHTML += `
    <div class="item" data-value="${vi}" data-result="${en}">
      <div class="text" onclick="showResult(this)">${vi}</div>
      <input type="text" class="input result" oninput="checkResult(this)" />
    </div>`
}

const generateVietnam = (data) => {
  const { en, vi } = data
  listQuestionnaire.innerHTML += `
    <div class="item" data-value="${en}" data-result="${vi}">
      <div class="text" onclick="showResult(this)">${en}</div>
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
