const UploadContext = ({ files }: { files: File | FileList | null }) => {
  const internalFiles = files instanceof File ? [files] : Array.from(files || [])

  return (
    <div style={{ marginTop: '20px' }}>
      {internalFiles.map((file, index) => (
        <div key={`${index + 1}:${file.name}`}>
          <p>物件 {index + 1}</p>
          <p>檔案名稱：{file.name}</p>
          <p>檔案類型：{file.type}</p>
          <p>檔案大小：{`${file.size} Bytes`}</p>
        </div>
      ))}
    </div>
  )
}

export default UploadContext
