import Workspace from "@/components/section/workspace";

const workspace = async({params} : { params: Promise<{wsId: string}>}) => {
    const wsId = (await params).wsId; 
    return(
    <div className='w-full h-full flex justify-center items-center'>
        <Workspace wsId={wsId}/>0
    </div>
    )
}

export default workspace; 