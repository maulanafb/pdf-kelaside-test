'use client';

import {
  RPProvider,
  RPDefaultLayout,
  RPPages,
  RPConfig,
  RPTheme,
} from '@pdf-viewer/react';

interface PDFViewerProps {
  onLoaded: () => void;
}

const PDFViewer = ({ onLoaded }: PDFViewerProps) => {
  return (
    <RPConfig>
      <RPProvider
        src="https://is3.cloudhost.id/kelaside/pdf/ab53ddfc-ba12-4756-af57-44e214136045-KUNCI%20JAWABAN%20MODUL%20PROFESIONAL%20TOPIK%201%20PAI%20(1).pdf"
        initialScale={80}
        onLoaded={onLoaded}
      >
        <div className="max-w-6xl mx-auto h-screen w-full">
          <RPTheme customVariables={{ "--rp-sidebar-width": "0px" }}>
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
  );
};

export default PDFViewer;
