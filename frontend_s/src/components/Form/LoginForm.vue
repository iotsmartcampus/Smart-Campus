<template>
    <form action="/" method="post" class="form">
        <div class="inputContainers">
            <PulseLoader :loading="true" color="red" size="1rem" />
              <div class="formItem">
              <input v-model="email"  class="formInput" type="email" name="email"  placeholder="Email ou Siape">
              <span v-if="hasEmailError" class="errorMensager"> Campo email não pode está vazio </span>

        </div>
        <div class="formItem">
            <input v-model="password" class="formInput" type="password" name="password" placeholder="Senha...">
            <span v-if="hasPasswordError" class="errorMensager"> Campo senha não pode está vazio </span>
        </div>
        </div>
     <button type="submit" @click="login"  ref="EnterButton" class="mainButtonForm">Entrar</button>
     <div class="linksContainer">
         <router-link class="linksForm"  to="/singup" id="singup">Cadastra-se         </router-link>
         <router-link  class="linksForm" to="#">

         Recuperar Senhar
         </router-link>

     </div>
    </form>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'
export default {

    components:[
        PulseLoader
    ],
    data:function(){
        return {
            email: '',
            password:'',
            hasEmailError: false,
            hasPasswordError: false
        }
    },
    methods:{
        login: async function (e){
            e.preventDefault();
            
                this.checkFields();
            try{

                this.$refs.EnterButton.disabled = true

                if(!this.hasEmailError && !this.hasPasswordError){
                    await this.$store.dispatch("auth/login",{"email":this.email,"password":this.password})
                    this.$router.push("/")
                }
                                this.$refs.EnterButton.disabled = false

            
            }
            catch(error){

                console.log(error)
            }
        },
        checkFields: function(){
            if(this.email!=='' && this.password!==''){
                this.hasEmailError = false
                this.hasPasswordError = false
            }


            if(this.email=== '' && this.password===''){
                this.hasEmailError = true
                this.hasPasswordError = true
            }
            if(this.email === '' && this.password !== ''){
                this.hasEmailError = true
                this.hasPasswordError = false
            }
            if(this.email!=='' && this.password===''){
                this.hasEmailError = false
                this.hasPasswordError = true
            }
            console.log(this.hasEmailError,this.hasPasswordError)
        }
    }
}
</script>
<style  >
    .form{
        display: flex;
        flex-direction : column;
        height: inherit;

    }
    .errorMensager{
        color: red;
        align-self: center;
        justify-self: center;
        font-size: 0.8rem;
    }
    .formItem{
        display: flex;
        flex-direction: column;
        margin-bottom: 15%;
    }

    .inputContainers{
        
    
        justify-self: center;
        display: flex;
        flex-direction: column;
        margin-top: 20%;
    }
    .formInput{
        border: none;
        border-bottom: 1px solid #C4C4C4;
        width: 80%;
        align-self: center;
        font-size: 1.3rem;
    }
    .formInput:hover, .formInput:focus{
        outline: none;
        border-bottom-color: #637FD9;
    }

    ::placeholder{
        color: #C4C4C4;
        margin-bottom: 0.2rem;
    }
    .mainButtonForm{

        background-color: #637FD9;
        border-radius: 10px;
        border:none;
        color: white;
        width: 80%;
        height: 13%;
        align-self: center;
        font-size: 1.2rem;
        letter-spacing: 0.05rem;
        font-weight: bold;
        cursor: pointer;
        
    }
    .linksContainer{
        display: flex;
        justify-content: space-around;
        margin-top: 12%;
        font-weight: 500;
    }

    .linksForm{
        text-decoration: none;
    }
      .linksForm:hover,  .linksForm:active{
          font-weight: bold;
    }
    #singup{
       color: #002171
    }


</style>