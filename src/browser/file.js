class BaseError {
  constructor ({code = 0, message = 'ok', ...payload}) {
    this.code = code
    this.message = message
    this.payload = payload
  }

  get isError () {
    return true
  }
}

export class FileError extends BaseError {
  constructor (params) {
    let { file, ...rest } = params
    rest.code = 'file:error:' + rest.code
    super(rest)
    this.file = file
  }

  get isFileError () {
    return true
  }
}

export class ImageError extends BaseError {
  constructor (params) {
    let { image, ...rest } = params
    rest.code = 'image:error:' + rest.code
    super(rest)
    this.image = image
  }

  get isImageError () {
    return true
  }
}

export const readFileDataURL = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) reject(new TypeError('not-file'))
    let reader = new FileReader()

    reader.onloadend = (evt) => {
      resolve(reader.result)
    }

    /* eslint-disable prefer-promise-reject-errors */
    reader.onabort = evt => reject({event: evt, progress: 'onabort'})
    reader.onerror = evt => reject({event: evt, progress: 'onerror'})
    /* eslint-enable prefer-promise-reject-errors */

    reader.readAsDataURL(file)
  })
}

export function getFileInfoSync (file) {
  let {
    type, // MIME
    size, // B
    name,
    lastModified,
    lastModifiedDate
  } = file
  return {
    type, // MIME
    size, // B
    name,
    lastModified,
    lastModifiedDate
  }
}

export async function checkFile (file, options) {
  let {
    maxSize = 1024 * 1024 * 2, // 2MB
    minSize = 1024 // 1KB
  } = options || {}

  if (!(file instanceof File)) {
    throw new FileError({code: 'type', error: 'Not File Type', file})
  }

  if (file.size > maxSize) {
    throw new FileError({code: 'over_size', message: `File Over Maxsize: ${maxSize}`, file, maxSize, maxkb: maxSize / 1024})
  }

  if (minSize > 0 && file.size < minSize) {
    throw new FileError({code: 'lower_size', message: `File Lower Minsize: ${minSize}`, file, minSize, minkb: minSize / 1024})
  }

  return file
}

export async function readImageInfo (file, options) {
  let {
    image: img = new Image(),
    reader = new FileReader(),
    acceptPng = true,
    acceptBmp = false,
    acceptJpg = true
  } = options || {}

  return new Promise(function (resolve, reject) {
    if ([acceptPng && 'image/png', acceptJpg && 'image/jpeg', acceptBmp && 'image/bmp'].filter(x => x).indexOf(file.type) === -1) {
      reject(new FileError({code: 'image_mime_type', error: 'Invalid Image Type', file}))
      return
    }

    reader.onload = (e) => {
      img.src = e.target.result
    }

    reader.onabort = evt => reject(new FileError({code: 'onabort'}))
    reader.onerror = evt => reject(new FileError({code: 'onerror'}))

    img.onload = function () {
      resolve({image: img, file, width: img.width, height: img.height, kb: file.size / 1024, mb: file.size / (1024 * 1024), ext: fileExt(file)})
    }

    reader.readAsDataURL(file)
  })
}

export async function checkImage (image, options) {
  if (!(image instanceof Image)) {
    throw new ImageError({code: 'type', error: 'Not Image Type', image})
  }
}

export function filesOfInput (event, options) {
  let el = event.target,
      { files = [] } = el || {}

  let proto = Object.getPrototypeOf(files),
      symbols = Object.getOwnPropertySymbols(proto)

  if (symbols.indexOf(Symbol.iterator) === -1) {
    files = Array.apply(null, files)
  }

  return { event, files, resetInput: async () => (event.target.value = '') }
}

export function fileExt (file) {
  if (!(file instanceof File)) {
    return
  }

  let { name = '' } = file
  return name && name.substr(name.lastIndexOf('.') + 1)
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
