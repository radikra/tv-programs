<template>
  <div class="programs">
		<button class="go-back" @click="goBack">
			<span>&#10094;</span>
		</button>
		<div class="programs__header">
			<img 
				:src="channelDesc.logo ? ('http://epg.domru.ru' + channelDesc.logo) : '../assets/logo.png'" 
				alt="Логотип телеканала"
				class="programs__logo"
			>
			<h2 class="programs__title">{{ channelDesc.title }}</h2>
			<p class="programs__date">Программа на {{ dateFrom }}</p>
		</div>
		<p class="programs__desc">{{ channelDesc.description }}</p>	
		<ul class="programs__list">
			<li class="programs__item details" v-for="pl in programList" :key="pl.start">
				<svg class="details__icon" v-if="pl.show == 'was'">
					<use xlink:href="@/assets/icons.svg#next"></use>
				</svg>
				<svg class="details__icon" v-if="pl.show == 'is'">
					<use xlink:href="@/assets/icons.svg#playing"></use>
				</svg>
				<svg class="details__icon" v-if="pl.show == 'will'">
					<use xlink:href="@/assets/icons.svg#done"></use>
				</svg>
				<p class="details__desc">
					<span>{{pl.formattedStart}}: </span>
					<span>{{pl.title}}</span>
				</p>
			</li>
		</ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/ru'

dayjs.extend(localizedFormat)
dayjs.extend(isBetween)
dayjs.locale('ru')

export default {
	name: 'Programs',
	components: {},
	data() {
		return {
			dateFrom: null,
			xvid: null,
			queryData: '',
			programList: [],
			channelDesc: {}
		}
	},
	computed: {
		...mapGetters(['CHANNELS'])
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.dateFrom = dayjs(to.query.date_from).format('DD.MM.YYYY')
			vm.xvid = to.query.xvid
			vm.queryData = `&date_from=${to.query.date_from}&date_to=${to.query.date_to}&xvid=${vm.xvid}`
		})
	},
	async mounted() {
		await axios.get(process.env.VUE_APP_PROGRAMS_LIST + this.queryData)
			.then(response => this.programList = response.data[this.xvid])

		this.programList.forEach(element => {
			element.end = dayjs(element.start).add(element.duration, 'second')
			element.formattedStart = dayjs(element.start).format('LT')
			if (dayjs().isBetween(element.start, element.end, 'minute')) {
				element.show = 'is'
			}
			if (dayjs().isBefore(element.start, 'minute')) {
				element.show = 'was'
			}
			if (dayjs().isAfter(element.end, 'minute')) {
				element.show = 'will'
			}
		})

		this.channelDesc = this.CHANNELS.find(ch => ch.xvid == this.xvid)
	},
	methods: {
		goBack() {
			this.$router.push('/')
		}
	}
}
</script>