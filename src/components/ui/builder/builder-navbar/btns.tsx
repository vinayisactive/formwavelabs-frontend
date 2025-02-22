import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowLeftIcon, ArrowRightIcon, Earth, Edit, Eye, Loader, Save } from "lucide-react";

interface BuilderTabButtonProps {
  setTab: React.Dispatch<React.SetStateAction<"builder" | "preview">>;
  tab: "builder" | "preview";
}

export const BuilderTabButton = ({ setTab, tab }: BuilderTabButtonProps) => {
  return (
    <button
      onClick={() => setTab(tab)}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
        shadow-inner border border-gray-200
        ${
          tab === "builder" 
            ? "bg-gray-50 text-gray-900" 
            : "text-gray-600 hover:bg-gray-50"
        }`}
    >
      {tab === "builder" ? (
        <Edit className="w-4 h-4 stroke-[1.5]" />
      ) : (
        <Eye className="w-4 h-4 stroke-[1.5]" />
      )}
      <span className="hidden md:inline">{tab === "builder" ? "Builder" : "Preview"}</span>
    </button>
  );
};

interface SaveBtnProps {
  savePageMutation: UseMutationResult<void, AxiosError, void, unknown>;
  isSaveAllowed: boolean;
}

export const SaveBtn = ({ savePageMutation, isSaveAllowed }: SaveBtnProps) => {
  return (
    <button
      onClick={() => savePageMutation.mutate()}
      disabled={!isSaveAllowed || savePageMutation.isPending}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          !isSaveAllowed || savePageMutation.isPending
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <Save className="w-4 h-4 stroke-[1.5]" />
      <span className="hidden md:inline">
        {savePageMutation.isPending ? "Saving..." : "Save Changes"}
      </span>
    </button>
  );
};

interface PreviousBtnProps {
  handlePrevious: () => void;
  isSaveAllowed: boolean;
}

export const PreviousBtn = ({ handlePrevious, isSaveAllowed }: PreviousBtnProps) => {
  return (
    <button
      onClick={handlePrevious}
      disabled={isSaveAllowed}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${isSaveAllowed ? "text-gray-400 cursor-not-allowed bg-gray-100" : "text-gray-900 hover:bg-gray-50 bg-white"}`}
    >
      <ArrowLeftIcon className="w-4 h-4 stroke-[1.5]" />
      <span className="hidden md:inline">Previous</span>
    </button>
  );
};

interface NextBtnProps {
  handleNextPage: () => void;
  isNextFetching: boolean;
  isSaveAllowed: boolean;
}

export const NextBtn = ({ handleNextPage, isNextFetching, isSaveAllowed }: NextBtnProps) => {
  return (
    <button
      onClick={handleNextPage}
      disabled={isNextFetching || isSaveAllowed}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          isNextFetching || isSaveAllowed
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <span className="hidden md:inline">Next</span>
      {isNextFetching ? (
        <Loader className="w-4 h-4 stroke-[1.5] animate-spin" />
      ) : (
        <ArrowRightIcon className="w-4 h-4 stroke-[1.5]" />
      )}
    </button>
  );
};

interface CreateNextBtnProps {
  createNextMutation: UseMutationResult<void, AxiosError, void, unknown>;
  isSaveAllowed: boolean;
}

export const CreateNextBtn = ({ createNextMutation, isSaveAllowed }: CreateNextBtnProps) => {
  return (
    <button
      onClick={() => createNextMutation.mutate()}
      disabled={isSaveAllowed}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          createNextMutation.isPending || isSaveAllowed
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      {createNextMutation.isPending ? (
        <Loader className="w-4 h-4 stroke-[1.5] animate-spin" />
      ) : (
        <span>Create Next</span>
      )}
    </button>
  );
};

interface PublishBtnProps {
  savePublishMutation: UseMutationResult<void, AxiosError, void, unknown>;
  isSaveAllowed: boolean;
}

export const PublishBtn = ({ savePublishMutation, isSaveAllowed }: PublishBtnProps) => {
  return (
    <button
      onClick={() => savePublishMutation.mutate()}
      disabled={isSaveAllowed}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          isSaveAllowed
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <Earth className="w-4 h-4 stroke-[1.5]" />
      <span className="hidden md:inline">
        {savePublishMutation.isPending ? "Publishing..." : "Publish Form"}
      </span>
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
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
        shadow-inner border border-gray-200
        ${
          savePublishMutation.isPending
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-900 hover:bg-gray-50 bg-white"
        }`}
    >
      <Earth className="w-4 h-4 stroke-[1.5]" />
      <span className="hidden md:inline">
        {savePublishMutation.isPending ? "Unpublishing..." : "Unpublish Form"}
      </span>
    </button>
  );
};