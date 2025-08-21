import {
	formatStore
} from '@/store/formatStore.js';

export async function formatDate() {
	return new Promise((resolve, reject) => {
		const date = new Date();

		const year = date.getFullYear().toString().substr(2, 2);
		const month = date.getMonth().toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");

		const formatDate = `${year}:${month}:${day}`;
		const formatTime = `${hours}:${minutes}`;

		formatStore.data = {
			date: formatDate,
			time: formatTime
		}
	})
}