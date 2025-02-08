import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface RouteParams {
  params: Promise<{
    filename: string;
  }>;
}

export async function GET(
  _req: NextRequest,
  context: RouteParams
) {
  const { filename } = await context.params;

  if (!filename) {
    return NextResponse.json(
      { error: 'Filename is required' },
      { status: 400 }
    );
  }

  if (!filename.endsWith('.json')) {
    return NextResponse.json(
      { error: 'Invalid filename. Must be a JSON file' },
      { status: 400 }
    );
  }

  // Define the path where JSON files are stored
  const filePath = path.join(
    process.cwd(),
    'src',
    'app',
    'api',
    'data',
    filename
  );

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json(jsonData, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Error reading or parsing the JSON file' },
      { status: 500 }
    );
  }
}