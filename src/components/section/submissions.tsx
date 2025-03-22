import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SubmissionWithAnalytics from "../ui/submission/submission-with-analytics";
interface FormElement {
  id: string;
  type: string;
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
    title: string; 
    pages: {
      content: string;
    }[];
  };
}

interface SubmissionsData {
  data: {
    submissions: {
      content: string;
      id: string;
      createdAt: string;
    }[];
  };
  status: boolean;
  message: string;
}

const Submissions = async ({
  formId,
  workspaceId,
}: {
  formId: string;
  workspaceId: string;
}) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  let submissions: ProcessedSubmission[] = [];
  let formTitle = ""; 
  let errMsg = "";

  try {
    if (!token) {
      throw new Error("No authentication token available");
    }

    const [submissionsRes, formRes] = await Promise.all([
      fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}/forms/${formId}/responses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ),
      fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ),
    ]);

    if (!submissionsRes.ok) {
      const errorData = await submissionsRes.text();
      throw new Error(
        `Submissions fetch failed: ${submissionsRes.status} - ${errorData}`
      );
    }

    if (!formRes.ok) {
      const errorData = await formRes.text();
      throw new Error(`Form fetch failed: ${formRes.status} - ${errorData}`);
    }

    const submissionsData: SubmissionsData = await submissionsRes.json();
    const formData: FormData = await formRes.json();

    if (!submissionsData?.data?.submissions || !formData?.data?.pages) {
      throw new Error("Invalid response data structure");
    }

    formTitle = formData.data.title;
    const fieldMap = createFieldMap(formData.data); 
    submissions = transformSubmissions(submissionsData.data.submissions, fieldMap);
  } catch (error) {
    errMsg =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error in Submissions component:", error);
  }

  return <SubmissionWithAnalytics submissions={submissions} errMsg={errMsg} formTitle={formTitle}workspaceId={workspaceId}/>;
};

export default Submissions;

const createFieldMap = (formData: FormData["data"]) => {
  const map = new Map<string, string>();

  formData.pages?.forEach((page) => {
    try {
      const elements: FormElement[] = JSON.parse(page.content);
      elements?.forEach((element) => {
        if (
          element.extraAttributes?.label &&
          element.type !== "FormHeader" &&
          element.type !== "LayoutImage"
        ) {
          map.set(element.id, element.extraAttributes.label);
        }
      });
    } catch (error) {
      console.error("Error parsing page content:", error);
    }
  });

  return map;
};

const transformSubmissions = (
  responses: SubmissionsData["data"]["submissions"],
  fieldMap: Map<string, string>
): ProcessedSubmission[] => {
  const transformedData = responses.map((response) => {
    try {
      const content: Record<string, string> = JSON.parse(response.content);
      const transformedContent: Record<string, string> = {};

      fieldMap?.forEach((label, elementId) => {
        transformedContent[label] = content[elementId] ?? "";
      });

      return {
        id: response.id,
        content: transformedContent,
        createdAt: response.createdAt,
      };
    } catch (error) {
      console.error("Error transforming submission:", error);
      return {
        id: response.id,
        content: {},
        createdAt: response.createdAt,
      };
    }
  });

  return transformedData;
};