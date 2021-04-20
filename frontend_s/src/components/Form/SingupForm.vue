<template>
  <form method="post" class="form">
    <div class="inputContainers">
      <div class="formItem">
        <input
          class="formInput"
          type="text"
          name="name"
          v-model="name"
          placeholder="Nome"
        />
      </div>
      <div class="formItem">
        <input
          class="formInput"
          type="email"
          name="email"
          v-model="email"
          placeholder="Email"
        />
      </div>
      <div class="formItem">
        <input
          class="formInput"
          type="number"
          name="number"
          v-model="siape"
          placeholder="Siape"
        />
      </div>

      <div class="formItem">
        <input
          class="formInput"
          type="password"
          name="password"
          v-model="password"
          placeholder="Senha"
        />
      </div>
    </div>
    <button type="submit" @click="register" class="mainButtonForm">Cadastrar</button>
    <div class="linksContainer">

               
        <router-link  class="linksForm" to="/login">
          Entrar
        </router-link>
    </div>
  </form>
</template>
<script>
import {RepositoryFactory} from "../../repositories/RepositoryFactory"
const repository = RepositoryFactory.get('authentication');
export default {
  data: function() {
    return {
      email: "",
      name:"",
      siape:"",
      password: "",
    };
  },
  methods:{
    register: async function(e){
      try{
          e.preventDefault()
          await repository.singup(this.email,this.password,this.name,this.siape)
          this.$router.push('/login')
      }catch(error){
        console.log(error)
      }
  }
  }
    
};
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  height: inherit;
}
.formItem {
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
}

.inputContainers {
  justify-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}
.formInput {
  border: none;
  border-bottom: 1px solid #c4c4c4;
  width: 80%;
  align-self: center;
  font-size: 1.3rem;
}
.formInput:hover,
.formInput:focus {
  outline: none;
}

::placeholder {
  color: #c4c4c4;
  
}
.mainButtonForm {
  background-color: #637fd9;
  border-radius: 10px;
  border: none;
  color: white;
  width: 80%;
  height: 13%;
  align-self: center;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  font-weight: bold;
  cursor: pointer;
}
.linksContainer {
  display: inherit;
  justify-content: flex-end;
  margin-right: 10%;
  margin-top: 10%;
  font-weight: 500;
}

.linksForm {
  text-decoration: none;
  font-size: 1.1rem;
  color: #002171;


}
.linksForm:hover,
.linksForm:active {
  font-weight: bold;
}

</style>
