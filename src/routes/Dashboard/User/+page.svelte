<script lang="ts">
	//@ts-nocheck
	import { getClientSession } from '$lib/supabase/store';
	import { Chart } from 'flowbite-svelte';
    import RecentlyClaimed from "$lib/components/recentlyClaimed.svelte"
	const options = {
		series: [
			{
				name: 'Income',
				color: '#31C48D',
				data: ['1420', '1620', '1820', '1420', '1650', '2120']
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
				show: false,
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
            theme: "dark",
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
			categories: ['rewards', 'rewards', 'rewards', 'rewards', 'rewards', 'rewards'],
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
    series: [35.1, 23.5, 2.4, 5.4],
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
    labels: ['Direct', 'Sponsor', 'Affiliate', 'Email marketing'],
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif',
       labels: {
          colors: "gray",
          useSeriesColors: false
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + 'k';
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
 const radial_options =  {
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
          colors: "gray",
          useSeriesColors: false
      },
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
	<div class="order-2 col-span-12 md:col-span-6 flex h-full flex-col gap-3">
		<div class=" rounded-lg bg-gray-500 bg-opacity-5 p-2  shadow-lg text-center">
            <div>Rewards & Points Earned</div>
            <Chart class="" {options} />
        </div>
		<div class="h-full rounded-lg bg-gray-500 bg-opacity-5 p-2 shadow-lg text-center overflow-y-auto">
            <span>Recently Earned Rewards</span>
            <RecentlyClaimed/>
        </div>
	</div>
    <!-- right col below  -->
	<div class="col-span-12 md:col-span-6 flex h-full flex-col gap-3">
		<div class=" rounded-lg bg-gray-500 bg-opacity-5 p-2 shadow-lg text-center">
            <div>Top 5 Earned Rewards</div>
            <Chart class="" options={donut_options} />
        </div>
		<div class=" rounded-lg bg-gray-500 bg-opacity-5 p-2 shadow-lg h-full text-center">
            <div class="">Top 3 Brands With Most Earned Points</div>
            <Chart class="" options={radial_options} />
        </div>
	</div>
</div>
