const request = require('request')


const geocode = (location,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoidHJpc2h1bGJzIiwiYSI6ImNrbWZ1ZGhzZjE1NGIybm52bXc2eGcwenEifQ.lQ-OAGEzQyQuMSiJmQ6BTg&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to coonect to web service',undefined)
        }
        else if(response.body.features.length===0){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })

        }
    })
}

module.exports=geocode