import NewTriggerInput from "./new-trigger-input";
import TriggersTable from "./triggers-table";

export default function TriggersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Triggers</h1>
      <NewTriggerInput />
      <TriggersTable />
    </div>
  );
}
