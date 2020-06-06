import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import "./style.css";

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setFileUrl] = useState("");

    const onDrop = useCallback(
        (acceptedFiles) => {
            // console.log(acceptedFiles);
            const file = acceptedFiles[0];
            const fileUrl = URL.createObjectURL(file);

            setFileUrl(fileUrl);
            onFileUploaded(file);
        },
        [onFileUploaded]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />

            {selectedFileUrl ? (
                <img src={selectedFileUrl} alt="Point thumbnail" />
            ) : (
                <p>
                    <FiUpload />
                    Arraste e solte a imagem do estabelecimento aqui
                    <br /> ou clique para selecionar alguma.
                </p>
            )}
        </div>
    );
};

export default Dropzone;
