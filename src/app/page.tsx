import LoginForm from "./login-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-100 p-10 rounded-lg border-4 border-red-600">
      <h1 className="m-10 font-bold text-black text-4xl">Trade Journal</h1>
      <LoginForm />
      </div>
    </div>
  );
}
