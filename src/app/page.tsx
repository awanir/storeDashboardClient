import Live from "../components/Live";
import History from "../components/History";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Store Dashboard</h1>
      <div className="flex w-full max-w-6xl space-x-4">
        <Live />
        <History />
      </div>
    </div>
  );
}
