import {
	systemStore
} from '@/store/systemStore.js';

export async function getSystemInfo() {
	return new Promise((resolve) => {
		const sysInfo = uni.getWindowInfo();
		const menuInfo = uni.getMenuButtonBoundingClientRect();

		const navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
		systemStore.data.navBarHeight = navBarHeight;

		resolve(navBarHeight);
	})
}