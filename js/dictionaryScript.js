const btnDictionary = document.getElementById('btnDictionary')
const btnLearning = document.getElementById('btnLearning')
const learning = document.getElementById('learning')
const dictionary = document.getElementById('dictionary')
const inputSearch = document.getElementById('inputSearch')
const btnSearch = document.getElementById('btnSearch')

btnDictionary.onclick = () => {
  btnDictionary.classList.add('display-none')
  btnLearning.classList.remove('display-none')
  dictionary.classList.remove('display-none')
  learning.classList.add('display-none')
  listQuestionnaire.innerHTML = ''
  inputSearch.focus()
}

btnLearning.onclick = () => {
  btnDictionary.classList.remove('display-none')
  btnLearning.classList.add('display-none')
  dictionary.classList.add('display-none')
  learning.classList.remove('display-none')
  listQuestionnaire.innerHTML = ''
}

const handelSearch = () => {
  const value = inputSearch.value

  const newData = data.filter((e) => {
    return e.en.includes(value) || e.vi.includes(value)
  })

  listQuestionnaire.innerHTML = ''

  newData.forEach((e) => {
    listQuestionnaire.innerHTML += `
    <div class="item" onclick="highlightInfo(this)">
      <div class="text">${e.en}</div>
      <div class="text">${e.vi}</div>
    </div>
  `
  })
}

const highlightInfo = (e) => {
  e.classList.add('help')
  setTimeout(() => {
    e.classList.remove('help')
  }, 2000)
}

btnSearch.onclick = handelSearch

inputSearch.onkeydown = (e) => {
  if (e.key === 'Enter') {
    handelSearch()
  }
}
