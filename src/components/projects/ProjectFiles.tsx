import React from 'react';
import { File, Download } from 'lucide-react';

interface ProjectFilesProps {
  projectId: number;
}

export function ProjectFiles({ projectId }: ProjectFilesProps) {
  const files = [
    { id: 1, name: 'Project Brief.pdf', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'Design Assets.zip', size: '15.8 MB', type: 'ZIP' },
    { id: 3, name: 'Technical Specs.docx', size: '1.2 MB', type: 'DOCX' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-400">Project Files</h4>
        <File className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-2">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1E2E42]">
            <div className="flex items-center space-x-3">
              <File className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-white text-sm">{file.name}</p>
                <p className="text-gray-400 text-xs">{file.size} • {file.type}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}