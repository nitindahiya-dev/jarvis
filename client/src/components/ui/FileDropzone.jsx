import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentTextIcon, PhotoIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import useHapticFeedback from '../../hooks/useHapticFeedback';

const FileDropzone = ({ onFilesAccepted }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { mediumTap } = useHapticFeedback();

  const onDrop = useCallback(acceptedFiles => {
    mediumTap();
    setIsDragging(false);
    if (onFilesAccepted) onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted, mediumTap]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'text/*': ['.txt', '.pdf', '.doc', '.docx'],
      'audio/*': ['.mp3', '.wav']
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const renderFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <PhotoIcon className="w-8 h-8 text-purple-500" />;
    }
    if (file.type.startsWith('audio/')) {
      return <MusicalNoteIcon className="w-8 h-8 text-blue-500" />;
    }
    return <DocumentTextIcon className="w-8 h-8 text-indigo-500" />;
  };

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' 
          : 'border-gray-300 dark:border-slate-700 hover:border-indigo-400'}`}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-gray-200 dark:bg-slate-700 rounded-full p-4">
          <div className="bg-white dark:bg-slate-800 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </div>
        
        {isDragging ? (
          <p className="text-lg font-medium text-indigo-600">Drop files here</p>
        ) : (
          <>
            <p className="text-lg font-medium">Drag & drop files here</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">Supports images, documents, and audio files</p>
            <p className="text-xs text-gray-400 dark:text-slate-500">Max 5 files, 10MB each</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;