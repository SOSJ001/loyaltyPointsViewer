<script lang="ts">
	//@ts-nocheck
	import { getClientSession } from '$lib/supabase/store';
	import { Chart } from 'flowbite-svelte';
	import RecentlyClaimed from '$lib/components/recentlyClaimedBrandView.svelte';
	import { getServerSession } from '$lib/supabase/store.js';
	export let data;
	const options = {
		series: [
			{
				name: 'Points',
				color: '#31C48D',
				data: data.bar.rewardTotalClaimed
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
			categories: data.bar.rewardTotalAbb,
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
		series: data.donut.rewardCount,
		colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'],
		chart: {
			height: 250,
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
								return `${sum}k`;
							}
						},
						value: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: -20,
							formatter: function (value) {
								return value + 'k';
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
		labels: data.donut.rewardAbb,
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
					return value + ' Claimed';
				}
			}
		},
		xaxis: {
			labels: {
				formatter: function (value) {
					return value + 'k';
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
	const radial_options = {
		series: [90, 85, 70],
		colors: ['#1C64F2', '#16BDCA', '#FDBA8C'],
		chart: {
			height: '280px',
			width: '100%',
			type: 'radialBar',
			sparkline: {
				enabled: true
			}
		},
		plotOptions: {
			radialBar: {
				track: {
					background: '#E5E7EB'
				},
				dataLabels: {
					show: false
				},
				hollow: {
					margin: 0,
					size: '32%'
				}
			}
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: -23,
				bottom: -20
			}
		},
		labels: ['Done', 'In progress', 'To do'],
		legend: {
			show: true,
			position: 'bottom',
			fontFamily: 'Inter, sans-serif',
			labels: {
				colors: 'gray',
				useSeriesColors: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		yaxis: {
			show: false,
			labels: {
				formatter: function (value) {
					return value + '%';
				}
			}
		}
	};

	// getClientSession().then((RESPONSE) => {
	// 	console.log('getting session', RESPONSE);
	// });
</script>

<!-- this is a grid that is divided into 2 left and right col  -->
<div class="grid h-full grid-cols-12 gap-3 overflow-y-auto">
	<!-- left col below  -->
	<div class="order-2 col-span-12 flex h-full flex-col gap-3 md:col-span-6">
		<div class=" rounded-lg bg-gray-500 bg-opacity-5 p-2 text-center shadow-lg">
			<div>Rewards & Points Claimed</div>
			<Chart class="" {options} />
		</div>
		<!-- recently claimed customers  -->
		<div
			class=" h-full overflow-y-auto rounded-lg bg-gray-500 bg-opacity-5 p-2 text-center shadow-lg"
		>
			<span>Recently claimed Customers</span>
			<RecentlyClaimed>
				<div slot="claimData" class="w-full">
					{#each data.brand_overview_response as row, i}
						<div class="mt-2 grid grid-cols-3 gap-y-2 overflow-y-auto hover:bg-gray-600">
							<div class="bg-gray-500 bg-opacity-10">user00{i + 1}</div>
							<div class="bg-gray-500 bg-opacity-10">{row.name}</div>
							<div class="bg-gray-500 bg-opacity-10">{row.point_balance}</div>
						</div>
					{/each}
				</div>
			</RecentlyClaimed>
		</div>
	</div>
	<!-- right col below  -->
	<div class="col-span-12 flex h-full flex-col gap-3 md:col-span-6">
		<!-- total reward listed  -->
		<div
			class=" flex h-full flex-col items-center justify-center rounded-lg bg-gray-500 bg-opacity-5 px-5 py-10 text-center shadow-lg"
		>
			<div class="font-mono text-6xl">{data.totalRewards}</div>
			<div class="text-3xl">Total {#if data.totalRewards >1}
        Rewards
        {:else}
        Reward
      {/if}</div>
			<div class="text-3xl">Listed</div>
		</div>
		<!-- donut chart  -->
		<div class=" rounded-lg bg-gray-500 bg-opacity-5 p-2 text-center shadow-lg">
			<div>Top 5 Claimed Rewards</div>
			<Chart class="" options={donut_options} />
		</div>
	</div>
</div>
