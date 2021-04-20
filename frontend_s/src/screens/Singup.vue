<template>
    <div>
        <HeaderBlock />
         <Card ><SingupForm /> </Card>   
    </div>
</template>

<script>
import Card from '../components/Card/Card'
import HeaderBlock from '../components/header/HeaderBlock'
import SingupForm from '../components/Form/SingupForm'
export default {

    components: {
        Card,
        SingupForm,
        HeaderBlock
    }
}
</script>
<style>

</style>