export type UploadFileRequestBody = File | Blob;

export interface UploadFileResponse {
  asset_id: string;
  public_id: string;
  version: number;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  [key: string]: any;
}
