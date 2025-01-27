import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

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
    <div className="space-y-8 pt-14">
      <h1 className="text-2xl font-bold">Form Submissions</h1>
      
      {submissions.length > 0 ? (
        <div className='flex justify-center items-start gap-2 flex-wrap'>
          {submissions.map(submission => (
            <div key={submission.id} className="border rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="font-medium">Submission {submission.id.slice(0, 6)}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>
              
              <div className="grid gap-4">
                {Object.entries(submission.content).map(([label, value]) => (
                  <div key={label} className="border-b pb-2">
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-sm text-gray-900 mt-1">
                      {value || <span className="text-gray-400">(empty)</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !errMsg && <p className="text-gray-500">No submissions found</p>
      )}

      {errMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className='text-red-600'>{errMsg}</p>
        </div>
      )}
    </div>
  );
};

const createFieldMap = (formData: FormData['data']) => {
  const map = new Map<string, string>();
  
  formData.pages.forEach((page) => {
    try {
      const elements: FormElement[] = JSON.parse(page.content);
      elements.forEach(element => {
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
      
      Object.entries(content).forEach(([fieldId, value]) => {
        const label = fieldMap.get(fieldId) || fieldId;
        transformedContent[label] = value as string;
      });

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