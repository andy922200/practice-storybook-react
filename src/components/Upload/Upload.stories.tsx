import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import styled from 'styled-components'
import Upload from './Upload'
import UploadContext from './UploadContext'
import UploadPreview from './UploadPreview'
import Button from '@/components/Button/Button'

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// Story Meta
const meta: Meta<typeof Upload> = {
  title: 'Input Elements/Upload',
  component: Upload,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Upload>

export const Default: Story = {
  args: {},
}

const MultipleWithHook = () => {
  const [uploadFile, setUploadFile] = useState<File | FileList | null>(null)
  const [resetKey, setResetKey] = useState(0)

  const handleResetUpload = () => {
    setResetKey((prev) => prev + 1)
    setUploadFile(null)
  }

  return (
    <>
      <SpaceBetween>
        <Upload multiple resetKey={resetKey} onChange={(files) => setUploadFile(files)}></Upload>
        <Button
          themeColor="red"
          variant="outlined"
          endIcon={<BiTrash />}
          onClick={handleResetUpload}
        >
          Delete
        </Button>
      </SpaceBetween>

      {uploadFile && <UploadContext files={uploadFile} />}
    </>
  )
}

export const MultipleTemplate: Story = {
  name: 'Multiple',
  render: () => <MultipleWithHook />,
}

const PreviewWithHook = () => {
  const [uploadFile, setUploadFile] = useState<File | FileList | null>(null)
  const [resetKey, setResetKey] = useState(0)

  const handleOnChange = (files: File | FileList | null) => {
    setUploadFile(files)
  }

  const handleResetUpload = () => {
    setResetKey((prev) => prev + 1)
    setUploadFile(null)
  }

  return (
    <>
      <SpaceBetween>
        <Upload resetKey={resetKey} multiple onChange={handleOnChange}></Upload>
        <Button
          themeColor="red"
          variant="outlined"
          endIcon={<BiTrash />}
          onClick={handleResetUpload}
        >
          Delete
        </Button>
      </SpaceBetween>

      {uploadFile && <UploadPreview files={uploadFile} />}
    </>
  )
}

export const PreviewTemplate: Story = {
  name: 'Preview',
  render: () => <PreviewWithHook />,
}
