import Link from "next/link";

type Props = {
  isInTest: boolean;
};

export default function BackLink({ isInTest }: Props) {
  const className = isInTest ? "bg-purple-500" : "bg-blue-500";

  return (
    <Link
      className={`${className} text-white px-4 py-2.5 rounded-md no-underline hover:opacity-90 active:opacity-80`}
      href="/"
    >
      Back to home
    </Link>
  );
}
