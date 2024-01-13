"use client";

type Props = {
  isInTest: boolean;
  timestamp: number;
};

export default function FormattedDate({ isInTest, timestamp }: Props) {
  const date = new Date(timestamp);
  const colorClassName = isInTest ? "text-purple-500" : "text-blue-500";

  return (
    <time className={colorClassName} dateTime={date.toISOString()}>
      {date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })}
    </time>
  );
}
