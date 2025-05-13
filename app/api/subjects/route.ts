import { NextRequest, NextResponse } from 'next/server';
import { searchSubjects } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    
    const results = await searchSubjects(query);
    
    // Format the response to match the expected format in the Searchbar component
    const formattedResults = results.map(subject => ({
      id: subject.subject_code,
      name: subject.subject_name
    }));
    
    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error('Error searching subjects:', error);
    return NextResponse.json(
      { error: 'Failed to search subjects' },
      { status: 500 }
    );
  }
}