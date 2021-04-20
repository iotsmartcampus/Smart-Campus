<template>
    <div>
        <HeaderBlock />
         <Card ><LoginForm /> </Card>   
    </div>
</template>

<script>
import Card from '../components/Card/Card'
import HeaderBlock from '../components/header/HeaderBlock'
import LoginForm from '../components/Form/LoginForm'
export default {

    components: {
        Card,
        LoginForm,
        HeaderBlock
    }
}
</script>
<style>

</style>