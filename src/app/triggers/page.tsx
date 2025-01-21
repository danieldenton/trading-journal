import NewTriggerInput from "../components/new-trigger-input";
import TriggersTable from "../components/Triggers-table";

export default function TriggersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Triggers</h1>
      <NewTriggerInput />
      <TriggersTable />
    </div>
  );
}
