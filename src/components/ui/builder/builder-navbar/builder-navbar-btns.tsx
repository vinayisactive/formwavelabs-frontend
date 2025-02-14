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

interface PreviousBtnProps {
  handlePrevious: () => void;
  isSaveAllowed: boolean
}

export const PreviousBtn = ({ handlePrevious, isSaveAllowed }: PreviousBtnProps) => {
  return (
    <button
      onClick={handlePrevious}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors 
       text-white hover:bg-black/70 ${isSaveAllowed ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-black cursor-pointer "}`}
    >
      <span className="hidden md:flex">Previous</span>
   
      <span className="flex md:hidden py-1">
        <MoveLeft size={15} />
      </span>
    </button>
  );
};

interface NextBtnProps {
  handleNextPage: () => void;
  isNextFetching: boolean;
  isSaveAllowed: boolean
}

export const NextBtn = ({ handleNextPage, isNextFetching, isSaveAllowed }: NextBtnProps) => {
  return (
    <button
      onClick={handleNextPage}
      disabled={isNextFetching || isSaveAllowed}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex gap-2 
        ${
          isNextFetching || isSaveAllowed
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-black/70"
        }`}
    >
      <span className="hidden md:flex gap-1">
        Next {isNextFetching && <Loader />}
      </span>
      
      <span className="flex md:hidden py-1">
        <MoveRightIcon size={15}/>
      </span>
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
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex gap-2 
        ${
          createNextMutation.isPending || isSaveAllowed
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-black/70"
        }`}
    >
      <span className="flex whitespace-nowrap">
        Create Next {createNextMutation.isPending && <Loader />}
      </span>
    </button>
  );
};


interface PublishBtnProps {
  savePublishMutation: UseMutationResult<void, AxiosError, void, unknown>;
  isNextAvailable: boolean;
  isSaveAllowed: boolean
}

export const PublishBtn = ({
  savePublishMutation,
  isNextAvailable,
  isSaveAllowed
}: PublishBtnProps) => {
  return (
    <button
      onClick={() => savePublishMutation.mutate()}
      disabled={isNextAvailable}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors 
        ${
          isNextAvailable || isSaveAllowed
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
