import Home from './_components/home/Home'
import {createClient} from "@/lib/supabase/server";
const AdminPage = async() => {
  const supabase = await createClient();
  //project data
   const {data:projectData,error} = await supabase.from("projects").select("*")
    if(error) return;
    
    //message data 
    const { data:messageData, error:errorForMessage } = await supabase
      .from("messages")
      .select("*")
      .order('created_at', { ascending: false });

    if (errorForMessage) return errorForMessage;
    
    
    //visitor data 
    const { initialCount, error:errorForVisitor } = await supabase
      .from("analytics")
      .select('*', { count: 'exact', head: true });

    if (errorForVisitor) return errorForVisitor;
  return (
    <div>
      <Home projectData={projectData} messageData={messageData} initialCount={initialCount} />
    </div>
  );
};

export default AdminPage;