import {
	reactive
} from 'vue'

export const weatherStore = reactive({
	icon: null,
	data: null,
	loading: true,
	location: null
})