import React from 'react';
import { File, Download, Share2, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';

const files = [
  { id: 1, name: 'Logo Design Brief.pdf', type: 'PDF', size: '2.4 MB', date: '2024-02-20' },
  { id: 2, name: 'Brand Guidelines.ai', type: 'AI', size: '15.8 MB', date: '2024-02-19' },
  { id: 3, name: 'Website Mockup.fig', type: 'Figma', size: '8.2 MB', date: '2024-02-18' }
];

export function MyFiles() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          <GradientText>My Files</GradientText>
        </h1>
        <Button>Upload New File</Button>
      </div>

      <div className="bg-[#1A2737] rounded-lg border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Name</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Type</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Size</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Date</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b border-gray-800 last:border-0 hover:bg-[#1E2E42]">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <File className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-white">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{file.type}</td>
                  <td className="px-6 py-4 text-gray-400">{file.size}</td>
                  <td className="px-6 py-4 text-gray-400">{file.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-white">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-red-400">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}