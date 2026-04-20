import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { google } = await import('googleapis')
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    const folderId = process.env.DRIVE_FOLDER_ID

    // Ensure privateKey is correctly formatted and not a placeholder
    if (!clientEmail || !privateKey || privateKey.includes('your_worker_email') || !folderId) {
      return NextResponse.json({ error: 'Missing or invalid Google Drive credentials' }, { status: 500 })
    }

    let auth;
    try {
      auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
      })
    } catch (authError) {
      console.error('GOOGLE_AUTH_INIT_ERROR:', authError)
      return NextResponse.json({ error: 'Failed to initialize Google Auth' }, { status: 500 })
    }

    const drive = google.drive({ version: 'v3', auth })

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, webContentLink, thumbnailLink)',
      pageSize: 50,
    })

    const files = response.data.files?.map(file => ({
      id: file.id,
      name: file.name,
      // For Google Drive, the webContentLink is the direct download/source link
      // But we often need to format it for high-res preview
      url: file.webContentLink?.replace('&export=download', ''),
      thumbnail: file.thumbnailLink,
    })) || []

    return NextResponse.json(files)
  } catch (error: any) {
    console.error('GOOGLE_DRIVE_ERROR:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
