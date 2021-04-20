const router = require('express').Router();
const axios = require('axios')


const getTemperatureAndHumidity =  function(id){
    const params = { 
        "q": `refRoom==${id}`,
        "options":"count",
        "type": "TemperatureSensor",
        "attrs": 'temperature,humidity'
    }
  // const {data} = await axios.get(`${process.env.RESOURCE_SERVER}/v2/entities/${req.params.id}`,{headers:headers1, params})
    const mockRequest  = {
        temperature: 20,
        humidity:30
    }
  
   return mockRequest
}



router.get('/entities/block/:id/rooms', async (req,res)=>{
    try{
       // const {status,headers,data} = await axios.get(`${process.env.RESOURCE_SERVER}/v2/entities`, {params})
        const mockRequest = [{
            "id": "urn:ngsi-ld:Room:001001",
            "type": "Room",
            "name": {
                "type": "Text",
                "value": "Sala 1",
                "metadata": {}
            },
            "refBlock": {
                "type": "Relationship",
                "value": "urn:ngsi-ld:Block:001",
                "metadata": {}
            }
        }]
       
        const blockData =   mockRequest.map( item=>{
            const {temperature, humidity} =  getTemperatureAndHumidity(item.id)
            return {...item, temperature,humidity}
        })   
        //return res.header(headers).status(status).json(blockData)
        return res.json(blockData)
    }
    catch(error){
        return res.status(500)
    }
})

router.get('/entities', async (req,res) => {
    try{
        const {status,headers,data} = await axios.get(`${process.env.RESOURCE_SERVER}/v2/entities`)
        
        return res.header(headers).status(status).json(data)
    }
    catch(err){
        return res.status(404);
    }
})

router.get('/entities/blocks', async(req,res)=>{
    try{
        const {status,headers,data} = await axios.get(`${process.env.RESOURCE_SERVER}/v2/entities?type=Block`)
        return res.header(headers).status(status).json(data)
    }
    catch(error){
        return res.status(500)
    }
})


router.get('/entities/block/:id', async(req,res)=>{
    try{
        const {status,headers,data} = await axios.get(`${process.env.RESOURCE_SERVER}/v2/entities/${req.params.id}`)
        
        return res.header(headers).status(status).json(data)
    }
    catch(error){
        return res.status(500)
    }
})

router.get('/entities/room', async(req,res)=>{
    try{
        const {status,headers,data} = await axios.get(`${process.env.RESOURCE_SERVER}/v2/entities?type=Room`)
        
        return res.header(headers).status(status).json(data)
    }
    catch(error){
        return res.status(500)
    }
})

router.get('/entities/room/:id', async(req,res)=>{
    try{
        console.log(req.params.id)
        const headers1 = {
            "fiware-service": 'openiot',
            "fiware-servicepath":'/'
        }


        const {status,headers,data} = await axios.get(`${process.env.RESOURCE_SERVER}/v2/entities/${req.params.id}`,{headers:headers1})
        
        // Search temperature and humidity
        const dataTemperatue =await getTemperatureAndHumidity(req.params.id);        
        const roomData={...data, temperatureSensor:dataTemperatue}
        return res.header(headers).status(status).json(roomData)
    }
    catch(error){
        return res.status(500) 
    }
})



router.post("/sendCommand/", async (req,res)=>{
    //Create headers object to attache to axios request
    const headers = {
        "Content-Type": 'application/json',
        "fiware-service": 'openiot',
        "fiware-servicepath":'/'
    }
    const {id,type,command,value} = req.body
    const body = {id,type,command,value}
    try{
        const {headers, status, data} = await axios.post(`${RESOURCE_SERVER}v2/op/update`, body,{ headers})
        return res.header(headers).status(status).json(data)
    }
    catch(error){
        return res.status(500)
    }
})



module.exports = (io,state)=>{
    const wsHandler = require("./ws/notification")(io)
    router.use(wsHandler)
    return router;
}

