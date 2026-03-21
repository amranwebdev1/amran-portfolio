import Header from "./_components/header/Header"
import Sidebar from "./_components/sidebar/Sidebar"
import { createClient } from "@/lib/supabase/server";
const AdminRootLayout = async({children}) => {
  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex-col relative">
        <Header user={user} />
        {children}
      </div>
    </div>
  );
};

export default AdminRootLayout;