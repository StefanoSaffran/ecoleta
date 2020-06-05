import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { FiUpload } from 'react-icons/fi';
import { Container } from './styles';

interface IProps {
  onFileUploaded: (file: File) => void;
  preview: string;
}

const Dropzone: React.FC<IProps> = ({ onFileUploaded, preview }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState(() => {
    if (preview) return preview;

    return '';
  });

  useEffect(() => {
    setSelectedFileUrl(preview);
  }, [preview]);

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point thumbnail" />
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </Container>
  );
};

export default Dropzone;
