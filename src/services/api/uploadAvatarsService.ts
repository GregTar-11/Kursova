import { UploadFileRequestBody, UploadFileResponse } from '@/types/cloudinary';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';
const API_URL = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL || '';

class FileService {
  private cloudName: string;
  private uploadPreset: string;
  private apiUrl: string;

  constructor(cloudName: string, uploadPreset: string, apiUrl: string) {
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
    this.apiUrl = apiUrl;
  }

  uploadFileToCloudinary = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset ?? '');

    const response = await fetch(`${this.apiUrl}${this.cloudName}/auto/upload`, {
      method: 'POST',
      body: formData,
    });
    const data: UploadFileResponse = await response.json();
    return data;
  };
}

const uploadFileService = new FileService(CLOUD_NAME, UPLOAD_PRESET, API_URL);

export { uploadFileService };
