const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('.msg1')
const msgtwo = document.querySelector('.msg2')



weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    msgone.textContent = 'loading...'
    msgtwo.textContent = ""
    fetch('/weather?address='+location).then((response)=>{
     response.json().then((data)=>{
         if(data.error){
            msgone.textContent = data.error
         }else{
            const value = `${data.weather_description}. It is actually ${data.Actual_temperature} degrees but feels like ${data.feelslike_temperature} degrees`
            msgone.textContent = data.address
            msgtwo.textContent = value
 
         }

     })

   })
})
ssh