import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Workspace from "@/components/ui/workspace/workspace";
import { getServerSession } from "next-auth";

const workspace = async({params} : { params: Promise<{wsId: string}>}) => {
    const wsId = (await params).wsId; 

    const session = await getServerSession(authOptions); 
    const token = session?.accessToken; 

    const data = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }); 

    const workspace = await data.json(); 

    return(
    <div className='w-full h-full flex justify-center items-center'>
        <Workspace workspace={workspace}/>
    </div>
    )
}

export default workspace; 