"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import { Sliders, Calendar, RotateCcw, Loader2 } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { handleAxiosError } from "@/utility/axios-err-handler";
import Breadcrumb from "../ui/breadcrum";

interface Submission {
  id: string;
  createdAt: string;
  content: string;
}

interface Pagination {
  nextCursor: string;
  hasMore: boolean;
}

interface FormData {
  title: string;
  workspace: {
    id: string;
    name: string;
  };
}

interface SubmissionResponse {
  data: {
    submissions: Submission[];
    pagination: Pagination;
    form: FormData;
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

interface FilterControlsProps {
  draftDateRange: DateFilter;
  onDraftChange: (newDates: DateFilter) => void;
  onApply: () => void;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  onReset: () => void;
}

const FilterControls = ({
  draftDateRange,
  onDraftChange,
  onApply,
  setFilterModal,
  onReset,
}: FilterControlsProps) => (
  <div className=" bg-white rounded-xl flex flex-col items-start p-5 gap-5 border">
    <div className="flex items-center gap-3">
      <Sliders size={18} />
      <p className="text-2xl text-black font-semibold">Select date</p>
    </div>

    <div className="flex flex-col md:flex-row items-end gap-5 w-full">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">From</p>
        <DateInput
          value={draftDateRange.from}
          onChange={(val) => onDraftChange({ ...draftDateRange, from: val })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">to</p>
        <DateInput
          value={draftDateRange.till}
          onChange={(val) => onDraftChange({ ...draftDateRange, till: val })}
        />
      </div>

      <RotateCcw className="pb-2" onClick={onReset} />
    </div>

    <div className="w-full flex justify-end gap-1 items-center">
      <button
        onClick={() => setFilterModal(false)}
        className="ml-2 px-3 py-1.5 text-sm flex items-center gap-2 border text-black rounded-lg hover:bg-gray-200 transition-colors"
      >
        cancel
      </button>

      <button
        onClick={onApply}
        className="ml-2 px-3 py-1.5 text-sm flex items-center gap-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Apply
      </button>
    </div>
  </div>
);

interface DateInputProps {
  value?: string;
  onChange: (value: string) => void;
}

const DateInput = ({ value, onChange }: DateInputProps) => (
  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
    <Calendar className="h-4 w-4 text-gray-500" />
    <input
      type="date"
      className="text-sm outline-none bg-transparent"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

interface ResponseCardProps {
  response: ModifiedResponseEntity;
  index: number;
  ref?: React.Ref<HTMLDivElement>;
}

const ResponseCard = ({ response, index, ref }: ResponseCardProps) => (
  <div ref={ref} className="w-[95%] md:w-[45%] lg:w-[24%] border rounded-lg p-4 flex flex-col gap-4 justify-center items-start">
    <p className="bg-black text-white w-5 h-5 flex justify-center items-center rounded-md text-sm">
      {index + 1}
    </p>

    {response.content.map((res, idx) => (
      <div key={idx} className="flex flex-col justify-start w-full">
        <span className="font-bold text-lg">{res.label}</span>
        <span className="text-black/80">- {res.value}</span>
      </div>
    ))}

    <p className="text-[12px]">
      Made on:{" "}
      {new Date(response.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  </div>
);

interface ResponseGridProps {
  responses: ModifiedResponseEntity[];
  hasMoreResults: boolean;
  onLastElement: (node: HTMLDivElement | null) => void;
}

const ResponseGrid = ({
  responses,
  hasMoreResults,
  onLastElement,
}: ResponseGridProps) => (
  <div className=" flex gap-3 flex-wrap items-start justify-start">
    {responses.map((response, index) => (
      <ResponseCard
        key={index}
        response={response}
        index={index}
        ref={index === responses.length - 1 ? onLastElement : undefined}
      />
    ))}
    {!hasMoreResults && responses.length > 0 && (
      <div className="w-full text-center text-gray-500 flex justify-center items-center" >
        <p className=" px-4 text-xs py-1.5 border rounded-full">No more submissions</p>
        </div>
    )}
  </div>
);

const SubmissionsLayout = ({ formId }: { formId: string }) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateFilter>({});
  const [draftDateRange, setDraftDateRange] = useState<DateFilter>({});
  const [paginationCursor, setPaginationCursor] = useState<string | null>(null);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [responses, setResponses] = useState<ModifiedResponseEntity[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isFilterModalOn, setFilterModal] = useState<boolean>(false);
  const { data: currentUserData, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchSubmissions = useCallback(async () => {
    try {
      const baseUrl = `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/responses`;
      const queryParams = new URLSearchParams();

      if (selectedDateRange.from)
        queryParams.append("from", selectedDateRange.from);
      if (selectedDateRange.till)
        queryParams.append("till", selectedDateRange.till);

      if (status !== "authenticated") return;
      setIsLoading(true);
      const { data: response } = await axios.get<SubmissionResponse>(
        `${baseUrl}?${queryParams.toString()}`,
        { headers: { Authorization: `Bearer ${currentUserData?.accessToken}` } }
      );
      setIsLoading(false);

      setPaginationCursor(response.data.pagination.nextCursor);
      setHasMoreResults(response.data.pagination.hasMore);
      setResponses(modifiedSubmissions(response.data.submissions));
      setFormData(response.data.form);
    } catch (error) {
      console.log(handleAxiosError(error));
      setIsLoading(false);
    }
  }, [currentUserData, selectedDateRange, formId, status]);

  const loadMoreResults = useCallback(async () => {
    if (!paginationCursor || !hasMoreResults) return;

    try {
      const queryParams = new URLSearchParams({
        ...selectedDateRange,
        cursor: paginationCursor,
      });

      setIsLoading(true);
      const { data: response } = await axios.get<SubmissionResponse>(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/responses?${queryParams}`,
        { headers: { Authorization: `Bearer ${currentUserData?.accessToken}` } }
      );
      setIsLoading(false);

      setPaginationCursor(response.data.pagination.nextCursor);
      setHasMoreResults(response.data.pagination.hasMore);
      setResponses((prev) => [
        ...prev,
        ...modifiedSubmissions(response.data.submissions),
      ]);
    } catch (error) {
      console.log(handleAxiosError(error));
    }
  }, [
    currentUserData,
    formId,
    hasMoreResults,
    paginationCursor,
    selectedDateRange,
  ]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastSubmissionRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!hasMoreResults && observer.current) observer.current.disconnect();
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreResults) {
          loadMoreResults();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMoreResults, loadMoreResults]
  );

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return (
    <div className="w-full h-screen flex flex-col gap-2 bg-[#f1f1f1] md:px-6 px-2 py-1.5 md:pt-2.5 relative">
      <div className="flex">
        <Breadcrumb
          workspaceId={formData?.workspace.id}
          workspaceName={formData?.workspace.name}
          formTitle={formData?.title}
        />
      </div>

      <div className="w-full h-[95%] flex flex-col justify-center items-center border rounded-tr-xl rounded-tl-xl  bg-white">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="w-full h-full flex flex-col justify-center gap-2 p-3">
            <button
              className="flex self-start py-2 px-3 gap-2 hover:bg-gray-200 rounded-md"
              onClick={() => setFilterModal((prev) => !prev)}
            >
              <Sliders className=" text-gray-600" size={14} />
              <p className="text-xs">Filters</p>
            </button>

            {responses.length === 0 ? (
              <div className="text-md text-center w-full h-full flex items-center justify-center">
                 <p className="px-4 py-2 text-xs border rounded-full">Zero submissions yet.</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col  gap-2 overflow-y-scroll">
                <ResponseGrid
                  responses={responses}
                  hasMoreResults={hasMoreResults}
                  onLastElement={lastSubmissionRef}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {isFilterModalOn && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <FilterControls
            draftDateRange={draftDateRange}
            onDraftChange={setDraftDateRange}
            onApply={() => {
              setSelectedDateRange(draftDateRange);
              setFilterModal(false);
            }}
            setFilterModal={setFilterModal}
            onReset={() => {
              setDraftDateRange({});
              setSelectedDateRange({});
              setFilterModal(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SubmissionsLayout;
