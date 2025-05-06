
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Attachment } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface FileUploadProps {
  onFilesSelected: (attachments: Attachment[]) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function FileUpload({ onFilesSelected, isVisible, onClose }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
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
    // Check file size limit - 10MB per file
    const validFiles = selectedFiles.filter(file => file.size <= 10 * 1024 * 1024);
    const overSizeFiles = selectedFiles.length - validFiles.length;
    
    if (overSizeFiles > 0) {
      toast.error(`${overSizeFiles} file(s) exceeded the 10MB limit`);
    }
    
    // Generate preview URLs for images
    const newPreviews: string[] = [];
    validFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newPreviews.push(url);
      } else {
        newPreviews.push('');
      }
    });
    
    setPreviewUrls(prev => [...prev, ...newPreviews]);
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    // Revoke object URL to prevent memory leaks
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    
    setFiles(files.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    const attachments: Attachment[] = files.map((file, index) => ({
      id: uuidv4(),
      name: file.name,
      type: file.type,
      url: previewUrls[index] || URL.createObjectURL(file),
      size: file.size,
    }));
    
    onFilesSelected(attachments);
    
    // Clean up URLs
    previewUrls.forEach(url => {
      if (url) URL.revokeObjectURL(url);
    });
    
    setFiles([]);
    setPreviewUrls([]);
    onClose();
  };

  const getFileIcon = (fileType: string, index: number) => {
    if (fileType.startsWith('image/')) {
      return previewUrls[index] ? (
        <img 
          src={previewUrls[index]} 
          alt="preview" 
          className="h-10 w-10 object-cover rounded-md"
        />
      ) : (
        <ImageIcon className="h-5 w-5" />
      );
    }
    return <FileText className="h-5 w-5" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-background rounded-xl shadow-xl p-6 m-4 border border-border/60 animate-scale-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium font-space-grotesk">Upload Files</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-accent/60">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div
          className={`upload-area ${dragActive ? 'border-primary shadow-inner-glow' : 'border-muted'}`}
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
          <div className="rounded-full bg-primary/10 p-3 mx-auto mb-3 w-fit">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1.5">
            Maximum file size: 10MB
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Selected Files: {files.length}</p>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-custom">
              {files.map((file, index) => (
                <div key={index} 
                  className="flex items-center justify-between p-2 bg-muted/60 rounded-lg border border-border/40 hover:border-border transition-colors"
                >
                  <div className="flex items-center space-x-2 truncate">
                    {getFileIcon(file.type, index)}
                    <div className="flex flex-col">
                      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="h-8 w-8 rounded-full hover:bg-background/80"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-border/60 hover:border-border"
          >
            Cancel
          </Button>
          <Button 
            disabled={files.length === 0} 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90"
          >
            Upload {files.length > 0 && `(${files.length})`}
          </Button>
        </div>
      </div>
    </div>
  );
}
