<template>
	<div class="widgets">
		<div class="channels" v-if="!isChannel">
			<ControlPanel @showDates='showDates' :channels='CHANNELS' />
		</div>
		<div class="dates" v-else>
			<div class="desc" v-show="isChannel">
				<button class="desc__back" @click="isChannel = !isChannel">&#10094;</button>
				<img :src="'http://epg.domru.ru' + activeChannel.logo" alt="Логотип телеканала" class="desc__logo">
				<h1 class="desc__title">{{ activeChannel.title }}</h1>
			</div>
			<DatePicker :channel='activeChannel' />
		</div>
	</div>
</template>

<script>
import ControlPanel from '@/components/ControlPanel.vue'
import DatePicker from '@/components/DatePicker.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Channels',
  components: {
    ControlPanel, DatePicker
	},
	data() {
		return {
			isChannel: false,
			activeChannel: {}
		}
	},
	computed: {
		...mapGetters(['CHANNELS'])
	},
	methods: {
		...mapActions(['GET_CHANNELS_LIST']),
		showDates(channel) {
			this.activeChannel = channel
			this.isChannel = !this.isChannel
		}
	},
	created() {
		this.GET_CHANNELS_LIST()
	}
}
</script>
