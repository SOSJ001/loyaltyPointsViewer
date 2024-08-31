<script lang="ts">
	//@ts-nocheck
	import { getClientSession } from '$lib/supabase/store';
	import { Chart } from 'flowbite-svelte';
	import RecentlyClaimed from '$lib/components/recentlyClaimed.svelte';
	export let data;
	//  barchart below
	const options = {
		series: [
			{
				name: 'Points',
				color: '#31C48D',
				data: data.barChart.points
			}
		],
		chart: {
			sparkline: {
				enabled: false
			},
			type: 'bar',
			width: '',
			height: 230,
			toolbar: {
				show: false
			}
		},
		fill: {
			opacity: 1
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '60%',
				borderRadiusApplication: 'end',
				borderRadius: 0,
				dataLabels: {
					position: 'top'
				}
			}
		},
		legend: {
			show: false,
			position: 'top'
		},
		dataLabels: {
			enabled: false
		},
		tooltip: {
			shared: true,
			intersect: false,
			theme: 'dark',
			formatter: function (value: string) {
				return value;
			}
		},
		xaxis: {
			labels: {
				show: true,
				style: {
					fontFamily: '',
					cssClass: 'text-xs  font-normal fill-gray-300 font-mono'
				},
				formatter: function (value) {
					return value;
				}
			},
			categories: data.barChart.rewards,
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		},
		yaxis: {
			labels: {
				show: true,
				style: {
					fontFamily: '',
					cssClass: 'text-xs font-mono font-normal fill-gray-500 dark:fill-gray-400'
				}
			}
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: -20
			}
		}
	};
	const donut_options = {
		series: data.barChart.points,
		colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'],
		chart: {
			height: 320,
			width: '100%',
			type: 'donut'
		},
		stroke: {
			colors: ['transparent'],
			lineCap: ''
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: false,
						name: {
							show: true,
							fontFamily: '',
							offsetY: 20
						},
						total: {
							showAlways: true,
							show: true,
							label: 'Users With Most Point',
							fontFamily: '',
							formatter: function (w) {
								const sum = w.globals.seriesTotals.reduce((a, b) => {
									return a + b;
								}, 0);
								return `${sum}`;
							}
						},
						value: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: -20,
							formatter: function (value) {
								return value + ' points';
							}
						}
					},
					size: '30%'
				}
			}
		},
		grid: {
			padding: {
				top: -2
			}
		},
		labels: data.barChart.rewards,
		dataLabels: {
			enabled: false
		},
		legend: {
			position: 'bottom',
			fontFamily: 'Inter, sans-serif',
			labels: {
				colors: 'gray',
				useSeriesColors: false
			}
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return value + ' points';
				}
			}
		},
		xaxis: {
			labels: {
				formatter: function (value) {
					return value + '';
				}
			},
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		}
	};

	// getClientSession().then((RESPONSE) => {
	// 	console.log('getting session', RESPONSE);
	// });
</script>

<!-- this is a grid that is divided into 2 left and right col  -->
<div class="grid h-full grid-cols-12 gap-3">
	<!-- left col below  -->
	<div class="order-2 col-span-12 flex h-full flex-col gap-3 md:col-span-6">
    <!-- bar chart  -->
		<div class=" rounded-lg bg-gray-500 bg-opacity-5 p-2 text-center shadow-lg">
			<div>Rewards & Points Earned</div>
			<Chart class="" {options} />
		</div>
    <!-- recently claimed  -->
		<div
			class="h-full overflow-y-auto rounded-lg bg-gray-500 bg-opacity-5 p-2 text-center shadow-lg"
		>
			<span>Recently Earned Rewards</span>
			<RecentlyClaimed>
        <div slot="claimData" class="w-full">
					{#each data.user_View_response.data as row, i}
          <div  class="mt-2 hover:bg-gray-600 grid grid-cols-2 gap-y-2 overflow-y-auto">
						<div class="bg-gray-500 bg-opacity-10 ">{row.name}</div>
						<div class="bg-gray-500 bg-opacity-10">{row.point_balance}</div>
          </div>
					{/each}
        </div>
				
			</RecentlyClaimed>
		</div>
	</div>
	<!-- right col below  -->
	<div class="col-span-12 flex h-full flex-col gap-3 md:col-span-6">
    <!-- total point  -->
		<div class=" flex h-full flex-col items-center justify-center rounded-lg bg-gray-500 bg-opacity-5 px-5 py-10 text-center shadow-lg">
			<div class="font-mono text-6xl">{data.totalPoint}</div>
			<div class="text-3xl">Total points</div>
			<div class="text-3xl">Earned</div>
		</div>
    <!-- donut chart  -->
		<div class="rounded-lg bg-gray-500 bg-opacity-5 p-2 text-center shadow-lg">
			<div>Top Earned Rewards</div>
			<Chart class="" options={donut_options} />
		</div>
	</div>
</div>
