const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2905555084421a8c70cb2b9bbfb7fe07&query='+ encodeURIComponent(lat)+','+ encodeURIComponent(long)+'&units=m'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to weather API",undefined)
        }else if(response.body.error){
            callback("Unable to find location",undefined)
        }else{
            const data = response.body.current
            callback(undefined,{
                weather_description:data.weather_descriptions,
                temperature:data.temperature,
                feelslike:data.feelslike
            })

        }
    })
}

module.exports=forecast