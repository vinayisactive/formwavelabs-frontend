import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Earth,
  Edit,
  Eye,
  Loader,
  MoveLeft,
  MoveRightIcon,
  Save,
  StepForward,
} from "lucide-react";

interface BuilderTabButtonProps {
  setTab: React.Dispatch<React.SetStateAction<"builder" | "preview">>;
  tab: "builder" | "preview";
}

export const BuilderTabButton = ({ setTab, tab }: BuilderTabButtonProps) => {
  return (
    <button
      onClick={() => setTab(tab)}
      className={`px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border`}
    >
      <span className="hidden md:flex">
        {tab === "builder" ? "Builder" : "Preview"}
      </span>

      <span className="flex md:hidden">
        {tab === "builder" ? <Edit /> : <Eye />}
      </span>
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
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors 
        ${
          !isSaveAllowed || savePageMutation.isPending
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
    >
      <p className=" hidden md:flex whitespace-nowrap">
        {savePageMutation.isPending ? "Saving..." : "Save Changes"}
      </p>
      <p className="flex md:hidden">
        <Save />
      </p>
    </button>
  );
};

// PreviousBtn component
interface PreviousBtnProps {
  handlePrevious: () => void;
}

export const PreviousBtn = ({ handlePrevious }: PreviousBtnProps) => {
  return (
    <button
      onClick={handlePrevious}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors 
        bg-black text-white hover:bg-black/70`}
    >
      <span className="hidden md:flex">Previous</span>
      <span className="flex md:hidden">
        <MoveLeft />
      </span>
    </button>
  );
};

// NextBtn component
interface NextBtnProps {
  handleNextPage: () => void;
  isNextFetching: boolean;
}

export const NextBtn = ({ handleNextPage, isNextFetching }: NextBtnProps) => {
  return (
    <button
      onClick={handleNextPage}
      disabled={isNextFetching}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex gap-2 
        ${
          isNextFetching
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-black/70"
        }`}
    >
      <span className="hidden md:flex gap-1">
        Next {isNextFetching && <Loader />}
      </span>
      <span className="flex md:hidden">
        <MoveRightIcon />
      </span>
    </button>
  );
};

// CreateNextBtn component
interface CreateNextBtnProps {
  createNextMutation: UseMutationResult<void, AxiosError, void, unknown>;
}

export const CreateNextBtn = ({ createNextMutation }: CreateNextBtnProps) => {
  return (
    <button
      onClick={() => createNextMutation.mutate()}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex gap-2 
        ${
          createNextMutation.isPending
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-black/70"
        }`}
    >
      <span className="md:flex hidden whitespace-nowrap">
        Create Next {createNextMutation.isPending && <Loader />}
      </span>

      <span className="flex md:hidden">
        <StepForward />
      </span>
    </button>
  );
};

// PublishBtn component
interface PublishBtnProps {
  savePublishMutation: UseMutationResult<void, AxiosError, void, unknown>;
  isNextAvailable: boolean;
}

export const PublishBtn = ({
  savePublishMutation,
  isNextAvailable,
}: PublishBtnProps) => {
  return (
    <button
      onClick={() => savePublishMutation.mutate()}
      disabled={isNextAvailable}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors 
        ${
          isNextAvailable
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}
    >
      <span className="hidden md:flex whitespace-nowrap">
        {savePublishMutation.isPending ? (
          <span className="animate-pulse">Publishing...</span>
        ) : (
          "Publish Form"
        )}
      </span>

      <span className="flex md:hidden">
        {savePublishMutation.isPending ? (
          <Earth className="text-gray-600" />
        ) : (
          <Earth className="text-green-400" />
        )}
      </span>
    </button>
  );
};

// UnPublishBtn component
interface UnPublishBtnProps {
  savePublishMutation: UseMutationResult<void, AxiosError, void, unknown>;
}

export const UnPublishBtn = ({ savePublishMutation }: UnPublishBtnProps) => {
  return (
    <button
      onClick={() => savePublishMutation.mutate()}
      className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-100 
       text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1"
    >
      <span className="hidden md:flex whitespace-normal">
        {savePublishMutation.isPending ? (
          <span className="animate-pulse">unpublishing...</span>
        ) : (
          <span className=" whitespace-nowrap">Unpublish Form</span>
        )}
      </span>

      <span className="flex md:hidden">
        {savePublishMutation.isPending ? (
          <Earth className="text-gray-600" />
        ) : (
          <Earth className="text-red-700" />
        )}
      </span>
    </button>
  );
};
