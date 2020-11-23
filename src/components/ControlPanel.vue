<template>
	<div class="panel">
		<div class="panel__list">
			<button 
				class="panel__item channel" 
				v-for="channel in channels" 
				:key="channel.chid"
				@click="showDates(channel)"
			>
				<img 
					:src="channel.logo ? ('http://epg.domru.ru' + channel.logo) : '../assets/logo.png'"
					alt="Логотип канала" 
					class="channel__logo">
				<p class="channel__title">{{ channel.title }}</p>
			</button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ControlPanel',
	props: {
		channels: {
			type: Array,
			required: true,
			default: []
		}
	},
	methods: {
		showDates(channel) {
			this.$emit('showDates', channel)
		}
	}
}
</script>