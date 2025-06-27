// resources/js/Pages/Viewer/PdfViewer.tsx

import React from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import PDFViewer from 'pdf-viewer-reactjs';

type Props = PageProps & {
  pdfUrl: string;
};

export default function PdfViewer({ pdfUrl }: Props) {
  return (
    <>
      <Head title="PDF Viewer" />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">📄 PDF Preview</h1>

        <div className="shadow-lg border rounded">
          <PDFViewer
            document={{
              url: pdfUrl,
            }}
            css="w-full h-[80vh]"
            hideNavbar={false}
          />
        </div>
      </div>
    </>
  );
}