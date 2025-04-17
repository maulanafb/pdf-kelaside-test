'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  RPProvider,
  RPDefaultLayout,
  RPPages,
  RPConfig,
  RPTheme,
} from '@pdf-viewer/react';

const PDFViewerPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulasi progress loading
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 5; // progress naik acak
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  const PDFComponent = useMemo(() => (
    <RPConfig>
      <RPProvider
        src="https://is3.cloudhost.id/kelaside/pdf/ab53ddfc-ba12-4756-af57-44e214136045-KUNCI%20JAWABAN%20MODUL%20PROFESIONAL%20TOPIK%201%20PAI%20(1).pdf"
        initialScale={80}
        onLoaded={() => setIsLoading(false)}
      >
        <div className="max-w-6xl mx-auto h-screen w-full">
          <RPTheme
            customVariables={{
              "--rp-sidebar-width": "0px",
            }}
          >
            <RPDefaultLayout
              style={{ height: "100vh" }}
              slots={{
                downloadTool: false,
                printTool: false,
                openFileTool: false,
              }}
            >
              <RPPages />
            </RPDefaultLayout>
          </RPTheme>
        </div>
      </RPProvider>
    </RPConfig>
  ), []); // Tidak akan re-render karena dependency kosong

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-full max-w-xl mx-auto px-6 py-8">
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
              
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">PDF Viewer</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="w-full flex flex-col items-center px-4 sm:px-2 md:px-2">
            {isLoading && (
              <div className="w-full max-w-xl mx-auto px-6 py-8">
                <div className="h-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {!isLoading && PDFComponent}
          </div>
        </div>
      </main>
    </div>
  );
};

const Page = () => {
  const DynamicPDFViewer = dynamic(() => Promise.resolve(PDFViewerPage), {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-full max-w-xl mx-auto px-6 py-8">
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `50%` }} // Memulai progress dengan nilai 50%
            ></div>
          </div>
        </div>
      </div>
    ),
  });

  return <DynamicPDFViewer />;
};

export default Page;
