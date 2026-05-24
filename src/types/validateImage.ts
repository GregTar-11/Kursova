import { FILE_CONFIG } from '@/constant/regular';
import { getImageDimensions } from '@/helpers/image-utils';
// import { getImageDimensions } from '@/utilities/image-utils';

export const validateFile = async (file: File | undefined): Promise<void> => {
  if (!file) {
    throw new Error('Фотография обязательна');
  }
  if (file.size > FILE_CONFIG.MAX_SIZE_BYTES) {
    throw new Error('Размер файла не валидный');
  }

  const isImage = file.type.startsWith('image/');
  if (isImage) {
    if (
      !(FILE_CONFIG.ALLOWED_FORMATS as readonly string[]).includes(file.type)
    ) {
      throw new Error('Формат фотографии не валидный');
    }

    return getImageDimensions(file)
      .then(({ width, height }) => {
        // const isWithinBounds =
        //   width >= DIMENSIONS.MIN &&
        //   width <= DIMENSIONS.MAX &&
        //   height >= DIMENSIONS.MIN &&
        //   height <= DIMENSIONS.MAX;

        // if (!isWithinBounds) {
        //   throw new Error('validation.IMAGE_PIXEL_SIZE');
        // }
        return;
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw error;
        }

        throw new Error('validation.IMAGE_INVALID');
      });
  }else{
    if (!(FILE_CONFIG.ALLOWED_DOC_FORMATS as readonly string[]).includes(file.type)) {
      throw new Error('DOCUMENT_FORMAT');
    }
    return
  }
};
