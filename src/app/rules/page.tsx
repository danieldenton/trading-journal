import NewRuleInput from "./new-rule-input";
import RulesTable from "./rules-table";
export default function MistakesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Mistakes</h1>
      <NewRuleInput />
      <RulesTable />
    </div>
  );
}
