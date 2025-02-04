import NewSetupInput from "../components/new-setup-input";
import MiniSetupTable from "./mini-setup-table";

export default function TradePageSetups() {
  return (
    <div className="flex flex-col justify-center items-center w-1/4 border-white border-2">
      <h1 className="font-bold p-2 text-xl">Setups</h1>
      <MiniSetupTable />
    </div>
  );
}
