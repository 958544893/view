<template>
	<div class='first-app'>
		{{msg}}
		<HeaderServer></HeaderServer>
	</div>
	
</template>

<script>
	import HeaderServer from '../../layout/components/HeaderServer'
	export default{
		name:'First',	
		components:{HeaderServer},
		data(){
			return{
				msg:'Welcome to FirstApp'
			}
		},
	}
	
</script>