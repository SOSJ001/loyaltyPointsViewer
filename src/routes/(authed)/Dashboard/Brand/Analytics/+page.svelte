<script lang="ts">
    //@ts-nocheck
	import { Chart } from 'flowbite-svelte';
    import ActionButton from "$lib/components/ActionButton.svelte"
	export let data
	let color = '#7E3AF2'
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
            theme: "dark",
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
				name: 'Points Claimed',
				data: data.bar.rewardTotalClaimed,
				color: '#1A56DB'
			},
		],
		legend: {
			show: true,
            labels: {
          colors: "white",
          useSeriesColors: false,
      },
		},
		xaxis: {
			categories: data.bar.rewardTotalAbb,
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
			},
		}
	};
</script>

<div class="h-full rounded-lg bg-gray-500 bg-opacity-5 px-3 py-3 grid grid-rows-12 space-y-1">
	<div class="flex justify-between row-span-1">
		<span class="text-sm md:text-2xl">🎢 Analytics</span>
            <!-- <button>
                <ActionButton bgColor="gray-400" hoverBgColor="gray-400" hoverTextColor="gray-700 hover:font-bold">
                    <svelte:fragment slot="text">
                        Change Line colors <span class="text-lg">✌</span>	
                    </svelte:fragment>
                </ActionButton>
            </button> -->
	</div>
	<div class="row-span-11 overflow-hidden">
		<Chart {options} />
	</div>
</div>
