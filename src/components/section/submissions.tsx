import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import SubmissionTable from '../ui/submission/submission-table';
interface FormElement {
  id: string;
  extraAttributes: {
    label: string;
  };
}

export interface ProcessedSubmission {
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
    <SubmissionTable submissions={submissions} errMsg={errMsg} />
  );
};

export default Submissions;

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

const transformSubmissions = (responses: SubmissionsData['data']['responses'], fieldMap: Map<string, string>): ProcessedSubmission[] => {
  const transformedData =  responses.map(response => {
    try {
      const content: Record<string, string> = JSON.parse(response.content);
      const transformedContent: Record<string, string> = {};

      fieldMap?.forEach((label, elementId) => {
        transformedContent[label] = content[elementId] ?? "";
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

  return transformedData; 
};