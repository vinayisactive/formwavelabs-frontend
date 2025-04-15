"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import { Sliders, Calendar, RotateCcw, ChevronsRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { FormDataInterface } from "./analytics";

interface Submission {
  id: string;
  createdAt: string;
  content: string;
}

interface Pagination {
  nextCursor: string;
  hasMore: boolean;
}

interface SubmissionResponse {
  data: {
    submissions: Submission[];
    pagination: Pagination;
  };
}

interface DateFilter {
  from?: string;
  till?: string;
}

interface contentEntity {
  id: string;
  label: string;
  value: string;
}

interface ContentEntityWithKey {
  [key: string]: contentEntity;
}

interface ResponseEntity {
  label: string;
  value: string;
}

interface ModifiedResponseEntity {
  content: ResponseEntity[];
  createdAt: string;
}

const modifiedSubmissions = (submissions: Submission[]) => {
  return submissions.map((sub) => {
    const parsedContent = JSON.parse(sub.content) as ContentEntityWithKey;

    return {
      createdAt: sub.createdAt,
      content: Object.values(parsedContent).map((ent) => ({
        label: ent.label,
        value: ent.value,
      })),
    };
  });
};


const Breadcrumb = ({ workspaceId, workspaceName, formTitle }: { 
  workspaceId: string | undefined;
  workspaceName: string | undefined;
  formTitle: string | null | undefined;
}) => (
  <div className="flex items-center text-sm text-gray-500">
    <HiOutlineSquare3Stack3D className="mr-2 h-4 w-4" />
    <Link
      href={`/workspaces/${workspaceId}`}
      className="hover:text-gray-700 hover:underline"
    >
      {workspaceName || "Loading..."}
    </Link>
    <ChevronsRight className="mx-2 h-4 w-4" />
    <span className="font-medium text-gray-900">
      {formTitle ? `${formTitle.slice(0, 15)}${formTitle.length > 15 ? "..." : ""}` : "Loading..."}
    </span>
  </div>
);


const SubmissionsLayout = ({
  formId,
}: {
  formId: string;
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateFilter>({});
  const [draftDateRange, setDraftDateRange] = useState<DateFilter>({});

  const [paginationCursor, setPaginationCursor] = useState<string | null>(null);
  const [hasMoreResults, setHasMoreResults] = useState(false);

   const [responses, setResponses] = useState<ModifiedResponseEntity[]>([]);
    const [formData, setFormData] = useState<FormDataInterface | undefined | null>(null);
    const { data: currentUserData, status } = useSession();
    // const [workspaceName, setWorkspaceName] = useState<null | string>(null);

    // const [workspaceId, setWorkspaceId] = useState<null | string>(null); 

    const observer = useRef<IntersectionObserver | null>(null);

    // useEffect(() => {
    //   const fetchWorkspace = async() => {
    //     if(!workspaceId) return; 
    //     const workspaceRes = await axios.get(
    //       `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}`,
    //       { headers: { Authorization: `Bearer ${currentUserData?.accessToken}` } }
    //     );
    //     setWorkspaceName(workspaceRes.data.data.name);
    //   }

    //   fetchWorkspace();
    // },[workspaceId, currentUserData])

    useEffect(() => {
      if(status === "authenticated" && currentUserData.accessToken){
       const fetchData = async () => {
          try {
          // const workspaceRes = await axios.get(
          //   `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}`,
          //   { headers: { Authorization: `Bearer ${currentUserData?.accessToken}` } }
          // );
          // setWorkspaceName(workspaceRes.data.data.name);
  
          const formRes = await axios.get(
            `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}`,
            { headers: { Authorization: `Bearer ${currentUserData?.accessToken}` } }
          );
          setFormData(formRes.data.data);
          console.log(formRes);
            
        } catch (error) {
          console.error(handleAxiosError(error));
        }
      };
        fetchData();
      }else if (status === "unauthenticated") {

      }
    }, [formId, currentUserData, status]);

  const fetchSubmissions = useCallback(async () => {
    const baseUrl = `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/responses`;
    const queryParams = new URLSearchParams();

    if (selectedDateRange.from)
      queryParams.append("from", selectedDateRange.from);
    if (selectedDateRange.till)
      queryParams.append("till", selectedDateRange.till);

    if(status !== "authenticated") return; 
    const { data: response }: { data: SubmissionResponse } = await axios.get(
      `${baseUrl}?${queryParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${currentUserData?.accessToken}` },
      }
    );

    setPaginationCursor(response.data.pagination.nextCursor);
    setHasMoreResults(response.data.pagination.hasMore);

    console.log(modifiedSubmissions(response.data.submissions));
    setResponses(modifiedSubmissions(response.data.submissions));
  }, [ currentUserData, selectedDateRange, formId, status]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);



  const loadMoreResults = useCallback(async () => {
    if (!paginationCursor || !hasMoreResults) return;

    const baseUrl = `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/responses`;
    const queryParams = new URLSearchParams({ cursor: paginationCursor });

    if (selectedDateRange.from)
      queryParams.append("from", selectedDateRange.from);
    if (selectedDateRange.till)
      queryParams.append("till", selectedDateRange.till);

    const { data: response }: { data: SubmissionResponse } = await axios.get(
      `${baseUrl}?${queryParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${currentUserData?.accessToken}` },
      }
    );

    setPaginationCursor(response.data.pagination.nextCursor);
    setHasMoreResults(response.data.pagination.hasMore);

    setResponses((prev) => [
      ...prev,
      ...modifiedSubmissions(response.data.submissions),
    ]);

    console.log(modifiedSubmissions(response.data.submissions));
  }, [currentUserData, formId, hasMoreResults, paginationCursor, selectedDateRange])


  const lastSubmissionHTMLElement = useCallback((elementNode: HTMLDivElement | null) => {
    if (!hasMoreResults) {
      if (observer.current) observer.current.disconnect();
      return;
    }

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(enteries => {
        if(enteries[0].isIntersecting && hasMoreResults){
          loadMoreResults(); 
        }
    }); 

    if(elementNode) observer.current.observe(elementNode); 

  }, [hasMoreResults, loadMoreResults]);  


  const handleApplyFilters = () => {
    setSelectedDateRange(draftDateRange);
  };

  const handleResetFilters = () => {
    setDraftDateRange({});
    setSelectedDateRange({});
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className=" w-full flex flex-col md:flex-row justify-between px-8 items-center py-2">
        <Breadcrumb workspaceId={formData?.workspace.id} workspaceName={formData?.workspace.name} formTitle={formData?.title} />

        <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Sliders className="h-4 w-4 text-gray-600" />
          <span className="text-gray-600">Filters</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              className="text-sm outline-none bg-transparent"
              value={draftDateRange.from || ""}
              onChange={(e) =>
                setDraftDateRange((prev) => ({ ...prev, from: e.target.value }))
              }
            />
          </div>

          <span className="text-gray-400">–</span>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              className="text-sm outline-none bg-transparent"
              value={draftDateRange.till || ""}
              onChange={(e) =>
                setDraftDateRange((prev) => ({ ...prev, till: e.target.value }))
              }
            />
          </div>
        </div>

        <button
          onClick={handleApplyFilters}
          className="ml-2 px-3 py-1.5 text-sm flex items-center gap-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Apply
        </button>

        <button
          onClick={handleResetFilters}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Reset filters"
        >
          <RotateCcw className="h-4 w-4 text-gray-600" />
        </button>
        </div>
      </div>

      <div className=" h-[90%]">
        <div className="w-full h-full flex justify-center">
          {responses.length === 0 ? (
            <p className="text-md text-center">Zero submissions yet.</p>
          ) : (
            <div className="w-full h-full overflow-y-auto flex gap-3 flex-wrap items-start justify-start  p-6">
            
              {responses.map((response, index) => {
                return (
                  <div
                    key={index}
                    ref={index === responses.length-1 ? lastSubmissionHTMLElement : null}
                    className="max-w-[300px] w-full border rounded-lg p-4 flex flex-col gap-4 justify-start items-start"
                  >
                    <p className="bg-black text-white w-5 h-5 flex justify-center items-center  rounded-md text-sm">{index+1}</p>

                    {response.content.map((res, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col justify-start w-full"
                        >
                            <span className="font-bold text-lg">{res.label}</span>
                             <span className="text-black/80">- {res.value}</span>
                        </div>
                      );
                    })}
                    <p className="text-[12px]">
                      made on: 
                      {new Date(response.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionsLayout;

{
  /* {hasMoreResults && (
          <button
            onClick={loadMoreResults}
            className="mt-4 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Load More
          </button>
        )} */
}