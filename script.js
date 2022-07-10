const currencyFrom = document.getElementById('currencyFrom')
const currencyTo = document.getElementById('currencyTo')
const reverseBtn = document.getElementById('reverseBtn')
const amount = document.getElementById('amount')
const convertBtn = document.getElementById('convertBtn')
const result = document.getElementById('result')

const myHeaders = new Headers();
myHeaders.append("apikey", "LxwjX9eEFes74DUj860UEQvktHIDLG17");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

// Get Data Symbols
const getSymbols = () => {
  return fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    .then(response => response.json())
    .then(result => result.symbols)
    .catch(error => console.log('error', error));
}

const renderSymbols = async () => {
  let symbols = await getSymbols()
  for(i in symbols) {
    currencyFrom.innerHTML += `<option value="${i}">${i} | ${symbols[i]}</option>`
    currencyTo.innerHTML += `<option value="${i}">${i} | ${symbols[i]}</option>`
  }
}

renderSymbols()

// Convert Function 
const convertData = (from,to,amount) => {
  return fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
}


// Convert Button Event
convertBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  const from = currencyFrom.value
  const to = currencyTo.value
  const amounts = amount.value
  const resultData = await convertData(from,to,amounts)
  result.innerHTML = `
                      <h5 class="exchangeRate">Current Rate : 1 ${from} = ${resultData.info.rate} ${to}</h5>
                      <h1>Result</h1>
                      <h1>=</h1>
                      <h2 class="resultAmount">${resultData.result} <span>${to}</span></h2>
                     `
})

// Reverse Button Event
reverseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const a = currencyFrom.value
  const b = currencyTo.value
  currencyFrom.value = b
  currencyTo.value = a
})

