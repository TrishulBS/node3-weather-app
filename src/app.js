const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const port = process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname,'../public')) 
const app = express()

const dirc = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,"../templates/partials")

app.set('view engine','hbs')
app.set('views',viewpath)


hbs.registerPartials(partialspath)
app.use(express.static(dirc))

app.get('',(request,response)=>{
    response.render('index',{
        title:"Weather app",
        name:"Trishul B S"
    })
})

app.get('/help',(request,response)=>{
    response.render('help',{
        title:"Help",
        helptext:"This is some helpful text",
        name:"Trishul B S"
    })
})

app.get('/about',(request,response)=>{
    response.render('about',{
        title:"About me",
        name:"Trishul B S"
    })
})

app.get('/weather', (requ, resp) => {
    if (!requ.query.address) {
        return resp.send({
            error: 'You must provide an address!'
        })
    }
    const location = requ.query.address

    geocode(location,(error,response) => {
        if(error){
            return resp.send({error:error})
        }

        forecast(response.latitude,response.longitude,(error,res)=>{
                if(error){
                    return resp.send({error:error})
                }
                resp.send({
                    address:response.location,
                    weather_description:res.weather_description,
                    Actual_temperature:res.temperature,
                    feelslike_temperature:res.feelslike
            })
        }
        )
    })
})





app.get('/help/*',(request,response)=>{
    response.render('404',{
        title:"404",
        name:"Trishul B S",
        error:"Help article not found"
    })
})


app.get('*',(request,response)=>{
    response.render('404',{
        title:"404",
        name:"Trishul B S",
        error:"Page not found"
    })
})


 app.listen(port,()=>{
     console.log(`server is running on port ${port}`)
 })