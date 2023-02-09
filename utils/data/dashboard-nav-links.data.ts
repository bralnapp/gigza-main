export const dashboardNavLinks = [
	{
		title: "find work",
		to: "/dashboard/find-work"
	},
	{
		title: "Find talent",
		to: "/dashboard/find-talents"
	},
	{
		title: "proposals",
		to: '',
		categories: [
			{
				name: 'Sent proposals',
				to: '/dashboard/proposal/sent'
			},
			{
				name: 'Received proposals',
				to: '/dashboard/proposal/received'
			},
		]
	},
	{
		title: "contract",
		to: "/dashboard/contract"
	},
	// {
	// 	title: "wallet",
	// 	to: "/dashboard/wallet"
	// }
];
