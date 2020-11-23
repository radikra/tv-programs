import axios from 'axios'

export default ({
  state: {
		channels: []
  },
  mutations: {
		SET_CHANNELS_TO_STATE: (state, channels) => {
			state.channels = channels
				.filter(channel => channel.button != null)
				.sort((a,b) => a.button - b.button)
		}
  },
  actions: {
		async GET_CHANNELS_LIST({commit}) {
			await axios.get(process.env.VUE_APP_CHANNELS_LIST)
				.then(response => commit('SET_CHANNELS_TO_STATE', response.data))
				.catch(e => console.error(e))
		}
	},
	getters: {
		CHANNELS(state) {
			return state.channels
		}
	}
})