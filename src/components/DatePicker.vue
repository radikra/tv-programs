<template>
	<div class="date">
		<div class="date__display">
			<button type="button" class="date__prev" @click="prevDate"></button>
			<div class="date__inside">
				<p v-if="dateRange == dateStart" class="date__numbers">
					<span class="date__prevnext">{{ dateEnd }}</span>
					<span class="date__actual">{{ dateRange }}</span>
					<span class="date__prevnext">{{ dateRange+1 }}</span>
				</p>
				<p v-else-if="dateRange == dateEnd" class="date__numbers">
					<span class="date__prevnext">{{ dateRange-1 }}</span>
					<span class="date__actual">{{ dateRange }}</span>
					<span class="date__prevnext">{{ dateStart }}</span>
				</p>
				<p v-else class="date__numbers">
					<span class="date__prevnext">{{ dateRange-1 }}</span>
					<span class="date__actual">{{ dateRange }}</span>
					<span class="date__prevnext">{{ dateRange + 1 }}</span>
				</p>
			</div>
			<button type="button" class="date__next" @click="nextDate"></button>
			<button type="button" class="date__done" @click="confirmData"></button>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs'

export default {
	props: {
		channel: {
			type: Object,
			required: true,
			default: {}
		}
	},
	data() {
		return {
			dateStart: 0,
			dateEnd: 0,
			dateRange: 0,
			week: []
		}
	},
	mounted() {
		this.dateRange = this.dateStart = dayjs().get('date')
		this.dateEnd = this.dateStart + 5

		for (let i = 0; i <= 5; i++) {
			this.week.push({
				day: dayjs().add(i, 'day').get('date'),
				date_from: dayjs().add(i, 'day').format('YYYY-MM-DD'),
				date_to: dayjs().add(i + 1, 'day').format('YYYY-MM-DD')
			})
		}
	},
	methods: {
		prevDate() {
			if (this.dateRange > this.dateStart) {
				this.dateRange--
			} else {
				this.dateRange = this.dateEnd
			}
		},
		nextDate() {
			if (this.dateRange < this.dateEnd) {
				this.dateRange++
			} else {
				this.dateRange = this.dateStart
			}
		},
		confirmData() {
			let weekDay = this.week.find(item => item.day == this.dateRange)

			let {date_from, date_to} = weekDay
			let xvid = this.channel.xvid

			// передача данных через адресную строку,
			// вместо передачи (dispatch) в стор
			this.$router.push({path: 'programs', query: {date_from, date_to, xvid}})
		}
	}
}
</script>