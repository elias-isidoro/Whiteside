import axios from 'axios';
import ImageKit from 'imagekit';
import { nanoid } from 'nanoid';
import { toastDefault, toastError } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';
import { ImageKitCredsValidator } from '@/lib/validators/imagekit';

let imagekit: ImageKit | null = null;

interface Props {
  toastOnSuccess?: boolean
}

const useImageUploader = ({ toastOnSuccess = true }:Props = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<({url: string})[]>([]);

  const fetchImageKitClient = useCallback(async () => {
    try {
      const { data: result } = await axios.get('/api/imagekit/credentials');
      const imageKitCredentials = ImageKitCredsValidator.parse(result);
      imagekit = new ImageKit(imageKitCredentials);
    } catch (error) {
      toastError('Error', 'You are not authorized to upload an image.')
    }
  },[])

  const uploadImages = useCallback(async (inputs: {file:File, id:string}[] | null) => {
    if (!inputs || inputs === null) {
      toastError('Error', 'Please input an image file');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const imagesToUpload = inputs.filter(input => allowedTypes.includes(input.file.type));

    setIsUploading(true);

    try {
      if (!imagekit) {
        await fetchImageKitClient();
      }

      const uploadedImages = await Promise.all(imagesToUpload.map(async (input) => {
        return new Promise<UploadResponse>((resolve, reject) => {
          imagekit?.upload(
            {
              file: input.file as any,
              fileName: input.id || nanoid(),
            },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result as UploadResponse);
              }
            }
          );
        });
      }));
      
      const newUploadedImages = uploadedImages.map(({url}) => ({url}));
      setUploadedImages(prevUrls => [...prevUrls, ...newUploadedImages]);
      toastOnSuccess && toastDefault('Cheers!', `${newUploadedImages.length>1?'Images have':'Image has'} been successfully uploaded.`);
      return newUploadedImages
    } catch (error) {
      toastError('Error', `${inputs.length>1?'Images':'Image'} could not be uploaded.`);
    }

    setIsUploading(false);
  },[fetchImageKitClient, toastOnSuccess])

  useEffect(() => {
    if (!imagekit) {
      fetchImageKitClient();
    }
  }, [fetchImageKitClient]);

  return { isUploading, uploadedImages, uploadImages };
};

export default useImageUploader;