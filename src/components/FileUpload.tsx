import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Attachment } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface FileUploadProps {
  onFilesSelected: (attachments: Attachment[]) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function FileUpload({ onFilesSelected, isVisible, onClose }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isVisible) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (selectedFiles: File[]) => {
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    const attachments: Attachment[] = files.map(file => ({
      id: uuidv4(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      size: file.size,
    }));
    
    onFilesSelected(attachments);
    setFiles([]);
    onClose();
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg bg-background rounded-lg shadow-lg p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Upload Files</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div
          className={`upload-area ${dragActive ? 'border-primary' : 'border-muted'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleChange}
          />
          <Upload className="h-8 w-8 mb-2 mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag and drop files here, or click to select files
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Selected Files:</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center space-x-2 truncate">
                    {getFileIcon(file.type)}
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={files.length === 0} onClick={handleSubmit}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
