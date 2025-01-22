import LoginForm from "./login-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="m-10 font-bold text-grey-100 text-4xl">Trade Journal</h1>
        <LoginForm />
      </div>
    </div>
  );
}
