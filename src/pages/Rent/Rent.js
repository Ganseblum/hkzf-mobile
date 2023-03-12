import React, { useState } from 'react'
import { ImageUploader } from 'antd-mobile'

export default function Rent () {
  const [fileList, setFileList] = useState([
    {
      url: '',
    },
  ])

  async function mockUpload (file) {


    return {
      url: URL.createObjectURL(file),
    }
  }

  console.log(fileList)

  return (
    <div>
      <div>
        <ImageUploader
          value={fileList}
          onChange={setFileList}
          upload={mockUpload}
        />
      </div>
    </div>
  )
}
