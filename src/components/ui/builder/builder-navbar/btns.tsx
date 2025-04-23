import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Earth,
  Loader2,
  Save,
} from "lucide-react";

interface SaveBtnProps {
  savePageMutation: UseMutationResult<void, AxiosError, void, unknown>;
  isSaveAllowed: boolean;
}

export const SaveBtn = ({ savePageMutation, isSaveAllowed }: SaveBtnProps) => {
  return (
    <button
      onClick={() => savePageMutation.mutate()}
      disabled={!isSaveAllowed || savePageMutation.isPending}
      className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          !isSaveAllowed || savePageMutation.isPending
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <Save size={15} />
      <span className="hidden md:inline whitespace-nowrap">
        {savePageMutation.isPending ? "Saving..." : "Save Changes"}
      </span>
    </button>
  );
};

interface PreviousBtnProps {
  handlePrevious: () => void;
  isSaveAllowed: boolean;
}

export const PreviousBtn = ({
  handlePrevious,
  isSaveAllowed,
}: PreviousBtnProps) => {
  return (
    <button
      onClick={handlePrevious}
      disabled={isSaveAllowed}
      className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          isSaveAllowed
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <ArrowLeftIcon className="w-4 h-4 stroke-[1.5]" />
      <span className="hidden md:inline">Previous</span>
    </button>
  );
};

interface NextBtnProps {
  handleNextPage: () => void;
  isSaveAllowed: boolean;
}

export const NextBtn = ({ handleNextPage, isSaveAllowed }: NextBtnProps) => {
  return (
    <button
      onClick={handleNextPage}
      disabled={isSaveAllowed}
      className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          isSaveAllowed
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <span className="hidden md:inline">Next</span>
      <ArrowRightIcon className="w-4 h-4 stroke-[1.5]" />
    </button>
  );
};

interface CreateNextBtnProps {
  createNextMutation: UseMutationResult<void, AxiosError, void, unknown>;
  isSaveAllowed: boolean;
}

export const CreateNextBtn = ({
  createNextMutation,
  isSaveAllowed,
}: CreateNextBtnProps) => {
  return (
    <button
      onClick={() => createNextMutation.mutate()}
      disabled={isSaveAllowed}
      className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200 whitespace-nowrap
        ${
          createNextMutation.isPending || isSaveAllowed
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      Create next
      {createNextMutation.isPending && (
        <Loader2 className="animate-spin" size={15} />
      )}
    </button>
  );
};

interface PublishBtnProps {
  savePublishMutation: UseMutationResult<void, AxiosError, void, unknown>;
  isSaveAllowed: boolean;
}

export const PublishBtn = ({
  savePublishMutation,
  isSaveAllowed,
}: PublishBtnProps) => {
  return (
    <button
      onClick={() => savePublishMutation.mutate()}
      disabled={isSaveAllowed}
      className={`px-2 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all justify-center
        shadow-inner border border-gray-200
        ${
          isSaveAllowed
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <Earth className="w-4 h-4 stroke-[1.5] text-red-500" />
      <span className="hidden md:inline whitespace-nowrap">
        {savePublishMutation.isPending ? "Publishing..." : "Publish"}
      </span>
      {savePublishMutation.isPending && (
        <Loader2 className="animate-spin" size={15} />
      )}
    </button>
  );
};

interface UnPublishBtnProps {
  savePublishMutation: UseMutationResult<void, AxiosError, void, unknown>;
}

export const UnPublishBtn = ({ savePublishMutation }: UnPublishBtnProps) => {
  return (
    <button
      onClick={() => savePublishMutation.mutate()}
      disabled={savePublishMutation.isPending}
      className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          savePublishMutation.isPending
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <Earth className="w-4 h-4 stroke-[1.5] text-green-400" />
      <span className="hidden md:inline">
        {savePublishMutation.isPending ? "Unpublishing..." : "Unpublish"}
      </span>
      {savePublishMutation.isPending && (
        <Loader2 className="animate-spin" size={15} />
      )}
    </button>
  );
};
