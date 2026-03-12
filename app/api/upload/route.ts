import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    const blob = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        // Configure the upload - allow video files up to 100MB
        return {
          allowedContentTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          maximumSizeInBytes: 100 * 1024 * 1024, // 100MB
        };
      },
      onUploadCompleted: async (uploadResult) => {
        console.log('Upload completed:', uploadResult.blob.url);
      },
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
