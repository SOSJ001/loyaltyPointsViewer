<script lang="ts">
	//@ts-nocheck
	import { Chart } from 'flowbite-svelte';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import { getServerSession } from '$lib/supabase/store.js';
	export let data
	let userPoint = data.totalPoint //getting the point from the +page.server.ts
	let user_id: any
	getServerSession().then((data) => {
		// get the user id from the server and set it
		user_id = data.user?.id;
	});
	let options = {
		chart: {
			height: '100%',
			maxWidth: '',
			type: 'line',
			fontFamily: '',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			theme: 'dark',
			x: {
				show: true
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 6,
			curve: 'smooth'
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: -26
			}
		},
		series: [
			{
				name: 'Points',
				data: data.lineChart.points,
				color: '#1A56DB'
			}
		],
		legend: {
			show: true,
			labels: {
				colors: 'white',
				useSeriesColors: false
			}
		},
		xaxis: {
			categories: data.lineChart.created,
			labels: {
				show: true,
				style: {
					fontFamily: '',
					cssClass: 'text-xs font-normal fill-gray-300 '
				}
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			show: true,
			labels: {
				show: true,
				style: {
					fontFamily: '',
					cssClass: 'text-xs font-normal fill-gray-300 '
				}
			}
		}
	};
</script>

<div
	class="grid h-full grid-rows-12 space-y-1 overflow-hidden rounded-lg bg-gray-500 bg-opacity-5 px-3 py-3"
>
	<div class="row-span-1 flex justify-between">
		<span class="text-sm md:text-2xl">⚒ Points: {userPoint} Total Earned</span>
	</div>
	<div class="row-span-11">
		<Chart {options} />
	</div>
</div>
