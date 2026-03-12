import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('Uploading file:', file.name, 'size:', file.size);

    // Generate a unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const ext = file.name.split('.').pop() || 'mp4';
    const filename = `videos/${timestamp}-${random}.${ext}`;

    // Upload to Vercel Blob using server-side put
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    console.log('Upload success:', blob.url);

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error details:', error);
    
    let errorMessage = 'Upload failed';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for specific error types
      if (errorMessage.includes('BLOB_READ_WRITE_TOKEN')) {
        errorMessage = 'Blob store token not configured. Please check Vercel project settings.';
      } else if (errorMessage.includes('blob store')) {
        errorMessage = 'Blob store not found. Please create a Blob store in Vercel Dashboard.';
      }
    }
    
    return NextResponse.json(
      { error: errorMessage, details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
