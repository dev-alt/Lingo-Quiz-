export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "LingoQuiz learning App",
	description: "Learn languages with quizzes and earn rewards",
	navItems: [
		{
			label: "HOME",
			href: "/",
		},
    {
      label: "LEARN",
      href: "/learn",
    },
	{
		label: "LEADERBOARD",
		href: "/leaderboard",
	  },
	  
    {
      label: "STORE",
      href: "/store",
    },
	],
	navMenuItems: [
		{
			label: "PROFILE",
			href: "/profile",
		},
		{
			label: "DASHBOARD",
			href: "/dashboard",
		},
		{
			label: "SETTINGS",
			href: "/settings",
		},
		{
			label: "LOGOUT",
			href: "/logout",
		},
	],

	footerItems: [
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Contact",
			href: "/contact",
		},
		{
			label: "Privacy",
			href: "/privacy",
		},
		{
			label: "Terms",
			href: "/terms",
		},
	],


	links: {
		github: "https://github.com/nextui-org/nextui"
	},
};
