import DateTime from "./date-time";
import LinkButton from "../components/link-button";

export default function TodayPage() {
  return (
    <div className="p-6 w-full h-screen">
      <DateTime />
      <div className="flex justify-center">
        <LinkButton href="/trade" text="journal a trade" />
      </div>
    </div>
  );
}
