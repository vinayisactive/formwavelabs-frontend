import { Inbox } from "lucide-react";

const EmptyDataState = () => (
  <div className="p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center flex flex-col items-center gap-3">
    <Inbox className="w-12 h-12 text-gray-400" />
    <p className="text-gray-500">No submissions received yet</p>
  </div>
);

export default EmptyDataState;
