"use client";

import { FormEvent, useState } from "react";
import { DebounceInput } from "react-debounce-input";

export default function Home() {
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState<boolean | null>(null);

  const classify = async (text?: string) => {
    if (!text) return;
    if (!ready) setReady(false);

    const result = await fetch(
      `/api/text-classification?text=${encodeURIComponent(text)}`
    );

    if (!ready) {
      setReady(true);
    }

    const json = await result.json();
    setResult(json);
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    if ("value" in event.target) {
      const value = event.target.value as string | undefined;
      classify(value);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">
        AI in your browser
      </h1>
      <h2 className="text-2xl mb-4 text-center">
        Combining complex AI tasks solutions with web technologies
      </h2>
      <DebounceInput
        type="text"
        minLength={2}
        debounceTimeout={500}
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4 text-slate-950"
        placeholder="Enter text here"
        onChange={handleInputChange}
      />

      {ready !== null && (
        <pre className="bg-gray-900 p-2 rounded">
          {!ready || !result ? "Loading..." : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
