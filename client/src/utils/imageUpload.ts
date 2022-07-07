export const checkImg = (file: File) => {
  const types = ['image/png', 'image/jpeg']

  let err = ''
  if (!file) err = 'file does not exists.'
  if (file.size > 1024 * 1024 * 5) err = 'image size should be less than 5mb'

  if (!types.includes(file.type))
    err = 'Imgae type should be either png or jepg'
  return err
}

export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'mehwkmnm')
  formData.append('cloud_name', 'kuga')

  const res = await fetch('https://api.cloudinary.com/v1_1/kuga/upload', {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  return {
    public_id: data.public_id,
    url: data.secure_url
  }
}
