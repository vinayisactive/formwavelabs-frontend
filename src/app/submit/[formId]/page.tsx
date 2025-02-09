import Submit from '@/components/section/submit';
import ElementsContextProvider from '@/context/elements-context';
import React from 'react'

const page = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const formId = (await params).formId;

  return (
    <ElementsContextProvider>
      <div className="w-full h-screen absolute top-0 right-0 z-[100] flex justify-cente bg-white">
        <Submit formId={formId} />
      </div>
    </ElementsContextProvider>
  );
};

export default page;

 