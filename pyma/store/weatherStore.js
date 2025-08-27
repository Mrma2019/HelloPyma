import {
	reactive
} from 'vue'

export const weatherStore = reactive({
	data: {},
	loading: true,
	girdInfo: null,
	indices: null
})