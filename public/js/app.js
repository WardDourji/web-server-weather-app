const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const errorMsg = document.getElementById('errorMsg')
const finalValue = document.getElementById('finalValue')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    fetch('/weather?location='+location).then((response) =>{
        response.json().then((data) => {
            if (data.error){
                errorMsg.innerText = data.error
            } else {
                errorMsg.innerText = ''
                finalValue.innerText = (data.temperature +' '+ data.weatherForeCast)
            }
        })
    })
})