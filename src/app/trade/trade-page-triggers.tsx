import MiniTriggerTable from "../components/mini-trigger-table";
import { useTradeContext } from "../context/trade";

export default function TradePageTriggers() {
  const { triggerIds, setTriggerIds } = useTradeContext();
  return (
    <div className="flex flex-col justify-center items-center w-1/4 border-white border-2">
      <h1 className="font-bold p-2 text-xl">Triggers</h1>
      <MiniTriggerTable
        triggerState={triggerIds}
        setTriggerState={setTriggerIds}
      />
    </div>
  );
}
