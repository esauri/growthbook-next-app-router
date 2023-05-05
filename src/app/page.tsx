import Link from "next/link";

export default function Home() {
  const isInColorTest = false;
  const colorClassName = isInColorTest ? "bg-purple-500" : "bg-blue-500";

  return (
    <main className="container p-4 flex flex-col gap-4 items-start">
      <h1 className="text-2xl font-bold">Next App Router + Growthbook</h1>
      <p>
        This is a <strong>server</strong> component.
      </p>
      <Link
        className={`${colorClassName} text-white px-4 py-2 rounded-2xl`}
        href="/client"
      >
        Go to client component page
      </Link>
    </main>
  );
}
