import { useEffect } from 'react'
import styled from 'styled-components'

const FilesWrapper = styled.div`
  padding: 20px 0px;
  & > *:not(:first-child) {
    margin-top: 12px;
  }
`

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`

const UploadPreview = ({
  files,
  width = 150,
  height = 150,
}: {
  files: File | FileList | null
  width?: number
  height?: number
}) => {
  const internalFiles = files instanceof File ? [files] : Array.from(files || [])
  const objectURLs = internalFiles.map((file) => URL.createObjectURL(file))

  useEffect(() => {
    return () => {
      objectURLs.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [files, objectURLs])

  return (
    <FilesWrapper>
      {internalFiles.map((file, index) => (
        <FileItem key={file.name}>
          <div>{file.name}</div>
          <img
            src={objectURLs[index]}
            alt={file.name}
            width={width}
            height={height}
            style={{ objectFit: 'cover' }}
          />
        </FileItem>
      ))}
    </FilesWrapper>
  )
}

export default UploadPreview
