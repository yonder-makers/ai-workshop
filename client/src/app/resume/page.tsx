"use client";

import { ChangeEvent, useState } from "react";

type ClassificationResult = {
  cv_line: string;
  label: {
    label: "Exp" | "Oth" | "Edu" | "Skill";
    score: number;
  };
};

export default function ResumePage() {
  const [result, setResult] = useState<ClassificationResult[]>([]);
  const [ready, setReady] = useState<boolean | null>(null);

  const classifySentences = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!ready) setReady(false);

    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("api/sentence-classification", {
        method: "POST",
        body: formData,
      });

      if (!ready) {
        setReady(true);
      }

      const json: ClassificationResult[] = await response.json();
      setResult(json);
    }
  };

  const getLabelText = (label: string) => {
    switch (label) {
      case "Exp":
        return "Experience";
      case "Oth":
        return "Other";
      case "Edu":
        return "Education";
      case "Skill":
        return "Skills";
      default:
        return label;
    }
  };

  const getPercentage = (score: number) => {
    return Math.round(score * 100);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">
        Sentence Classification
      </h1>
      <h2 className="text-2xl mb-4 text-center">
        Please upload your resume. It is recommended to use a PDF file written
        in english
      </h2>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={classifySentences}
          />
        </label>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      {ready !== null && (
        <pre className="bg-gray-900 p-2 rounded">
          {!ready || !result ? (
            "Loading..."
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sentence
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Label
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((row) => (
                    <tr
                      key={row.cv_line}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-semibold">{row.cv_line}</td>
                      <td className="px-6 py-4">
                        {getLabelText(row.label.label)}
                      </td>
                      <td className="px-6 py-4">
                        {getPercentage(row.label.score)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </pre>
      )}
    </main>
  );
}
