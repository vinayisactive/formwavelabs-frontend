import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { 
  BarChart2, 
  Hash, 
  Pin, 
  Calendar, 
  Inbox, 
  AlertTriangle,
  HelpCircle
} from 'lucide-react';


interface FormElement {
  id: string;
  extraAttributes: {
    label: string;
  };
}

interface ProcessedSubmission {
  id: string;
  content: Record<string, string>;
  createdAt: string;
}

interface FormData {
  data: {
    pages: {
      content: string;
    }[];
  };
}

interface SubmissionsData {
  data: {
    responses: {
      content: string;
      id: string;
      createdAt: string;
    }[];
  };
}

const Submissions = async ({ formId }: { formId: string }) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  let submissions: ProcessedSubmission[] = [];
  let errMsg = "";

  try {
    if (!token) {
      throw new Error('No authentication token available');
    }

    const [submissionsRes, formRes] = await Promise.all([
      fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/submissions`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      ),
      fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      ),
    ]);

    if (!submissionsRes.ok) {
      const errorData = await submissionsRes.text();
      throw new Error(`Submissions fetch failed: ${submissionsRes.status} - ${errorData}`);
    }

    if (!formRes.ok) {
      const errorData = await formRes.text();
      throw new Error(`Form fetch failed: ${formRes.status} - ${errorData}`);
    }

    const submissionsData: SubmissionsData = await submissionsRes.json();
    const formData: FormData = await formRes.json();

    if (!submissionsData?.data?.responses || !formData?.data?.pages) {
      throw new Error('Invalid response data structure');
    }

    const fieldMap = createFieldMap(formData.data);
    submissions = transformSubmissions(submissionsData.data.responses, fieldMap);

  } catch (error) {
    errMsg = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in Submissions component:', error);
  }

  return (
    <div className=" w-full space-y-5 py-2 px-4">
      <div className="">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <span>Submissions</span>
          {submissions.length > 0 && (
            <span className="text-lg font-medium text-gray-500 flex items-center gap-2 pt-1">
              <BarChart2 className="w-5 h-5 text-gray-400" />
              {submissions.length} responses
            </span>
          )}
        </h1>
      </div>

      {submissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {submissions.map(submission => (
            <div 
              key={submission.id}
              className="relative bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Hash className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-700">Response</h3>
                  </div>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(submission.createdAt).toLocaleDateString('en-GB')}
                  </p>
                </div>

                <div className="space-y-3">
                  {Object.entries(submission.content).map(([label, value]) => (
                    <div 
                      key={label}
                      className="p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100"
                    >
                      <div className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                        <Pin className="w-4 h-4 text-gray-400" />
                        {label}
                      </div>
                      <p className="text-sm text-gray-900 break-words flex items-center gap-1">
                        {value || (
                          <>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                            <span className="italic text-gray-400">No response provided</span>
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover effect decorator */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-xl pointer-events-none transition-all duration-300" />
            </div>
          ))}
        </div>
      ) : (
        !errMsg && (
          <div className="p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center flex flex-col items-center gap-3">
            <Inbox className="w-12 h-12 text-gray-400" />
            <p className="text-gray-500">
              No submissions received yet
            </p>
          </div>
        )
      )}

      {errMsg && (
        <div className="p-4 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <p className='text-red-600 font-medium'>{errMsg}</p>
        </div>
      )}
    </div>
  );
};

const createFieldMap = (formData: FormData['data']) => {
  const map = new Map<string, string>();
  
  formData.pages?.forEach((page) => {
    try {
      const elements: FormElement[] = JSON.parse(page.content);
      elements?.forEach(element => {
        if (element.extraAttributes?.label) {
          map.set(element.id, element.extraAttributes.label);
        }
      });
    } catch (error) {
      console.error('Error parsing page content:', error);
    }
  });
  
  return map;
};

const transformSubmissions = (
  responses: SubmissionsData['data']['responses'],
  fieldMap: Map<string, string>
): ProcessedSubmission[] => {
  return responses.map(response => {
    try {
      const content: Record<string, string> = JSON.parse(response.content);
      const transformedContent: Record<string, string> = {};

      fieldMap?.forEach((label, fieldId) => {
        transformedContent[label] = content[fieldId] ?? "";
      })

      return {
        id: response.id,
        content: transformedContent,
        createdAt: response.createdAt
      };
    } catch (error) {
      console.error('Error transforming submission:', error);
      return {
        id: response.id,
        content: {},
        createdAt: response.createdAt
      };
    }
  });
};

export default Submissions;