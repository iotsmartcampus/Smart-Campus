const router = require('express').Router();
const state = {
    count: 0,
    logs: 0
}
module.exports = (io)=>{
    io.on('connection', function (socket){
            console.log("connected")
            })
  
            router.post('/notification/block/:id/consume', async (req,res)=>{
                return res;
            })

            router.post("/notification/test/sense",async (req,res)=>{
                //Create the mongodb model;
                //Create a connection
                //Always take the last result and add it to data
                const {data} = req.body;
                const nowTime = new Date();
                const realTimeSeconds = nowTime.getSeconds() * 1000 + nowTime.getMilliseconds()
                const senserTime  = req.body.data[0].temperature.value
                realTimeSeconds = realTimeSeconds - senserTime;
                if(realTimeSeconds<0){
                    realTimeSeconds = realTimeSeconds + 60000
                }
                //salvar no log
                return res.status(401);
            })
        
            router.post("/notification/room/:id/temperatureSensor", async (req,res)=>{
                const {id} = req.params
                const {data} = req.body
                console.log(req.body)
                
                try{
                    
                    io.sockets.emit(`${id}_temperature_humildity`, {...data[0],id
                    });    
                }
                catch(error){
                    console.log(error)
                }finally{
                    state.count+=count+1
                    
                    const nowTime = new Date();
                    const realTimeSeconds = nowTime.getSeconds() * 1000 + nowTime.getMilliseconds()
                    const senserTime  = req.body.data[0].temperature.value
                    realTimeSeconds = realTimeSeconds - senserTime;
                    if(realTimeSeconds<0){
                        realTimeSeconds = realTimeSeconds + 60000
                    }
                    state.logs+=realTimeSeconds;
                    console.log("Count times: "+count)
                    console.log("real time logs temperature: "+state.logs/count)
                    return res.send({});
                }
            })
            router.post("/notification/room/temperatureSensor", async (req,res)=>{
                const {id} = req.params
                const {data} = req.body
                console.log(req.body)
                
                try{
                    
                    io.sockets.emit(`${id}_temperature_humildity`, {...data[0],id
                    });    
                }
                catch(error){
                    console.log(error)
                }finally{
                    state.count=state.count+1
                    
                    const nowTime = new Date();
                    let realTimeSeconds = nowTime.getSeconds() * 1000 + nowTime.getMilliseconds()
                    const senserTime  = req.body.data[0].temperature.value || 0
                    realTimeSeconds = realTimeSeconds - senserTime;
                    if(realTimeSeconds<0){
                        realTimeSeconds = realTimeSeconds + 60000
                    }
                    state.logs+=realTimeSeconds;
                    console.log("Count times: "+state.count)
                    console.log("real time logs temperature: "+state.logs/state.count)
                    return res.send({});
                }
            })
            router.get("/logs",async (req,res)=>{
                return res.json({data: state.logs/state.count, count: state.count})
            })
            router.put("/logs",async (req,res)=>{
                state.logs = 0;
                state.count = 0;
                return res.json({data: state.logs, count: state.count})
            })
            router.get("/",async (req,res)=>{
                return res.json({status:"is working"})
            })

        
    return router;
}
