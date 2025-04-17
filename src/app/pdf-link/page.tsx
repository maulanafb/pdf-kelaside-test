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
import Link from 'next/link';

const PDFViewerPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10; // Increase progress by 10%
        });
      }, 500); // Update every 500ms
    }
  }, [isLoading]);

  const PDFComponent = useMemo(() => (
    <RPConfig>
      <RPProvider
        src="https://is3.cloudhost.id/kelaside/pdf/baabb56c-247f-4705-8221-56f06c2385b3-GROUP.pdf"
        initialScale={80}
        onLoaded={() => {
          setIsLoading(false);
          setLoadingProgress(100); // Set progress to 100 when loaded
        }}
      >
        <div className="max-w-6xl mx-auto h-screen w-full">
          <RPTheme
            customVariables={{
              "--rp-sidebar-width": "0px",
            }}
          >
            <RPDefaultLayout
              style={{ height: "100vh",userSelect: "none", WebkitUserSelect: "none", }}
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
  ), []); // <- Will not re-render because of empty dependency

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">KONTOOOO</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">PDF NORMAL KELASIDE</h1>
        <nav className="flex space-x-4">
          <Link
            href="/pdf-berat"
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            PDF BERAT
          </Link>
          <Link
            href="/pdf-link"
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            PDF LINK
          </Link>
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            PDF NORMAL
          </Link>
        </nav>
      </div>
    </header>

      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="w-full flex flex-col items-center px-4 sm:px-2 md:px-2">
            {isLoading && (
              <div className="w-full flex flex-col items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500">KONTOO</div>
                <div className="mt-4 text-gray-700">Loading... {loadingProgress}%</div>
              </div>
            )}
            {PDFComponent}
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ),
  });

  return <DynamicPDFViewer />;
};

export default Page;