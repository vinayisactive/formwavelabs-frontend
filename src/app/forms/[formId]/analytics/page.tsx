import Analytics from '@/components/section/analytics';

const page = async({params}: { params: Promise<{formId: string}>}) => {
  const { formId } = (await params)

  return (
    <div className="w-screen h-screen absolute top-0 left-0 justify-start items-start bg-white">
      <Analytics formId={formId} />
    </div>
  )
}; 

export default page
