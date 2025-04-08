
import Sidebar from "../Components/Sidebar"
import ChatContainer from "../components/ChatContainer";
import { UseChatStore } from "../Store/UseChatStore";
import NoChatSelected from "../Components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = UseChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;