import Repository from './Repository.js'

export default {
    login(email, password){
        return Repository.post('login',{email,password})
    },
    singup(email,password,name,siape){
        return Repository.post('singup', {email,password,name,siape})
    }

}