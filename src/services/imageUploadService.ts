import axios from 'axios';

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return 'An unknown error occurred during image upload';
};

export const uploadImage = async (imageFile: File): Promise<string> => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

  const uniqueUploadId = `uqid-${Date.now()}`;
  const totalChunks = Math.ceil(imageFile.size / CHUNK_SIZE);

  const uploadChunk = async (start: number, end: number): Promise<any> => {
    const formData = new FormData();
    formData.append('file', imageFile.slice(start, end));
    formData.append('cloud_name', CLOUD_NAME);
    formData.append('upload_preset', UPLOAD_PRESET);
    const contentRange = `bytes ${start}-${end - 1}/${imageFile.size}`;

    try {
      const response = await axios.post(
        `${CLOUDINARY_API_URL}/${CLOUD_NAME}/auto/upload`,
        formData,
        {
          headers: {
            'X-Unique-Upload-Id': uniqueUploadId,
            'Content-Range': contentRange,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      throw new Error(handleApiError(error));
    }
  };

  try {
    let uploadResult: any;

    for (let currentChunk = 0; currentChunk < totalChunks; currentChunk++) {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, imageFile.size);
      uploadResult = await uploadChunk(start, end);
    }

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Image upload failed, no secure URL returned.');
    }

    return uploadResult.secure_url;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};
