type DashboardNavProps = {
	children: React.ReactNode;
};
const DashboardNav = ({ children }: DashboardNavProps) => {
	return <header>{children}</header>;
};

export default DashboardNav;
