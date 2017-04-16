export const readFileDataURL = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) return new Error('not-file')
    let reader = new FileReader()

    reader.onloadend = (evt) => {
      resolve(reader.result)
    }

    reader.readAsDataURL(file)
  })
}

export const readFileArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    // console.info('file', file)
    if (!(file instanceof File)) return new Error('not-file')
    let reader = new FileReader()

    reader.onloadend = (evt) => {
      resolve(reader.result)
    }

    reader.readAsArrayBuffer(file)
  })
}

export function getFileListFromEvent (event) {
  let el = event.target,
      { files = [] } = el || {}

  return files
}
