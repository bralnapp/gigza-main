export const reviews = Array(4).fill({
	noOfReviews: Math.floor(Math.random() * 5) + 1,
	gig: "We're a startup company that need a UI designer.",
	clientName: "raphael Benjamin",
	date: "Tue Oct 06 2020",
	review:
		"We're a startup company that need a UI designer. I found Ofspace on Dribbble. We reviewed Ofspace's previous works and found his works are amazing! After we worked with Ofspace, we realized they ha..."
});

export const recentJobs = [
	{
		jobTitle: "Graphics design",
		jobDescription:
			"I'm looking for someone who can handle a logo designing project. If you are interested, kindly send a message.",
		skills: ["logo design", "Brand/graphics design"],
		client: "raphael Benjamin",
		time: "3 hours ago",
		budget: 250
	},
	{
		jobTitle: "Tech company pitch deck",
		jobDescription:
			"I work for a tech start-up called MODCLUB, and we are looking to have our 15-page investor deck refreshed by a professional designer. We are looking for a clean and simple final product that is not overly designed. Timeline- asap.",
		skills: ["Brand/graphics design"],
		client: "raphael Benjamin",
		time: "3 hours ago",
		budget: 500
	},
	{
		jobTitle: "UI app design",
		jobDescription:
			"Hi, I'm looking for a designer to help me create 20 screen UI designs for Android and iOS. Kindly send your portfolio and your quote for this job. Thanks!",
		skills: ["mobile design", "UI/UX design"],
		client: "raphael Benjamin",
		time: "3 hours ago",
		budget: 1500
	}
];
