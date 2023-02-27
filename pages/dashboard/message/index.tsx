import DashboardLayout from "@/modules/dashboard/components/layout";
import { ChatList } from "@/modules/dashboard/sections/message";

const Message = () => {
	return (
		<DashboardLayout>
			<div className="layout-container pt-[34px]">
				<ChatList />
			</div>
		</DashboardLayout>
	);
};

export default Message;
