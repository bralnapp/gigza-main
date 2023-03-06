import DashboardLayout from "@/modules/dashboard/components/layout";
import { ChatSideBar } from "@/modules/dashboard/sections/message";

const Message = () => {
	return (
		<DashboardLayout>
			<div className="h-[calc(100vh_-_80px)] overflow-hidden bg-white ">
				<div className="flex h-full max-w-7xl lg:mx-auto lg:w-11/12 lg:pt-[41px]">
					<div className="mx-auto h-full w-11/12 pt-[34px] lg:mx-0 lg:w-fit lg:pt-0">
						<ChatSideBar />
					</div>
					<div className="hidden w-full lg:block">
						<div className="h-full rounded-r-lg border-[#F0F0F0] py-4 px-6 lg:border lg:border-l-0"></div>
						{/* <Chat /> */}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Message;
