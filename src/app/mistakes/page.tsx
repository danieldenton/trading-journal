import NewMistakeInput from "../components/new-mistake-input";
import MistakesTable from "./mistakes-table";

export default function MistakesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Triggers</h1>
      <NewMistakeInput />
      <MistakesTable />
    </div>
  );
}
