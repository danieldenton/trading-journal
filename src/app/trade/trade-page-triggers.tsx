import NewTriggerInput from "../components/new-trigger-input";
import MiniTriggerTable from "../components/mini-trigger-table";

export default function TradePageTriggers() {
  return (
    <div className="flex flex-col justify-center items-center w-1/4 border-white border-2">
      <h1 className="font-bold p-2 text-xl">Triggers</h1>
      <MiniTriggerTable setup={undefined} />
    </div>
  );
}
