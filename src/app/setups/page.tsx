import NewSetupInput from "./new-setup-input";
import SetupsTable from "./setups-table";

export default function SetupPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Setups</h1>
      <NewSetupInput />
      <SetupsTable />
    </div>
  );
}
