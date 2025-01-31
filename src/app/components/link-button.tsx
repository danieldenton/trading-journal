import Link from "next/link";

type LinkButtonProps = {
  href: string;
  text: string;
};

export default function LinkButton({ href, text }: LinkButtonProps) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className="bg-red-700 p-4 m-4 font-bold hover:text-yellow-200 hover:bg-red-800 rounded"
      >
        {text}
      </Link>
    </div>
  );
}
