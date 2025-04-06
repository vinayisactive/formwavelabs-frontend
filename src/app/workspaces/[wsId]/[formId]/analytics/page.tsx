import Analytics from '@/components/section/analytics';

const page = async({params}: { params: Promise<{formId: string, wsId: string}>}) => {
  const { formId, wsId } = (await params)

  return (
    <div className="w-screen h-screen absolute top-0 left-0 justify-start items-start bg-white">
      <Analytics formId={formId} workspaceId={wsId} />
    </div>
  )
}; 

export default page
