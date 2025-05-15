import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpFromLine } from 'lucide-react';
import TextInput from '../Components/TextInput';
import TextArea from '../Components/TextArea';
import PrimaryButton from '../Components/PrimaryButton';
import InputLabel from '../Components/InputLabel';
import Card from '../Components/dashboard/Card';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
  });

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Tags:', tags);
    console.log('Files:', files);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-3xl space-y-8">
        <Card className="p-6 space-y-6">
          <div>
            <InputLabel htmlFor="title" value="Title" />
            <TextInput id="title" type="text" value={title} className="mt-2 block w-full" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <InputLabel htmlFor="tags" value="Tags" />
            <TextInput id="tags" type="text" value={tags} className="mt-2 block w-full" onChange={(e) => setTags(e.target.value)} />
          </div>
          <div>
            <InputLabel htmlFor="description" value="Description" />
            <TextArea id="description" value={description} className="mt-2 block w-full" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div {...getRootProps({ className: 'dropzone' })} className={`flex flex-col items-center mt-4 justify-center p-8 border-2 border-dashed rounded-md cursor-pointer ${isDragActive ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
            <input {...getInputProps()} />
            <ArrowUpFromLine color="#ffffff" strokeWidth={1.75} className="w-12 h-12 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">{isDragActive ? 'Drop the files here...' : 'Drag & drop some files here, or click to select files'}</p>
          </div>
          <div className="flex mt-4 justify-end">
            <PrimaryButton onClick={handleSubmit}>Upload</PrimaryButton>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
