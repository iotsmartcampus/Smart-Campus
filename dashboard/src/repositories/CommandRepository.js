import Repository from './Repository.js'
const headers = {
    "Content-Type": 'application/json',
    "fiware-service": 'openiot',
    "fiware-servicepath":'/'
}
export default {
    
    sendCommand({type,...otherProperties}){
        const body={
            type: ''
        }
        return Repository.post(`${RESOURCE_SERVER}v2/op/update`,{...otherProperties},{
            headers
        })
    }
}
