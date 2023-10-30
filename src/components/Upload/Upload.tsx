import { isValidElement, cloneElement, useRef, InputHTMLAttributes, ChangeEvent } from 'react'
import Button from '@/components/Button/Button'

export interface UploadProps {
  resetKey?: number
  accept?: string
  multiple?: boolean
  uploadText?: string
  resetText?: string
  onChange?: (value: FileList) => void
  children?: React.ReactNode
}

const Upload = ({
  resetKey,
  children,
  onChange,
  uploadText = 'Upload',
  ...props
}: UploadProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const handleOnClickUpload = () => {
    if (!inputFileRef.current) return
    inputFileRef.current.click()
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function' && event?.target?.files) {
      onChange(event.target.files)
    }
  }

  return (
    <>
      <input
        key={resetKey}
        ref={inputFileRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleOnChange}
        {...props}
      />
      {isValidElement<UploadProps & InputHTMLAttributes<HTMLInputElement>>(children) ? (
        cloneElement(children, {
          onClick: handleOnClickUpload,
        })
      ) : (
        <Button onClick={handleOnClickUpload}>{uploadText}</Button>
      )}
    </>
  )
}

export default Upload
