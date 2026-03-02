import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const personalContextSchema = z.object({
  userId: z.string(),
  chartId: z.string(),
  
  // Demographics
  ethnicity: z.string().optional(),
  ethnicityDetail: z.string().optional(),
  religion: z.string().optional(),
  religiousPractice: z.enum(['devout', 'moderate', 'cultural', 'none']).optional(),
  nationality: z.string(),
  
  // Birth
  birthLocation: z.object({
    city: z.string(),
    country: z.string(),
    hospital: z.string().optional(),
  }),
  birthOrder: z.number().optional(),
  siblingsCount: z.number().optional(),
  
  // Family
  fatherOccupation: z.string().optional(),
  motherOccupation: z.string().optional(),
  familyEconomicStatus: z.enum(['lower', 'middle', 'upper_middle', 'wealthy']).optional(),
  
  // Cultural
  culturalValues: z.array(z.string()),
  nativeLanguages: z.array(z.string()),
  preferredLanguage: z.string(),
  
  // Location
  currentLocation: z.object({
    city: z.string(),
    country: z.string(),
    since: z.string().transform((str) => new Date(str)),
  }),
  
  // Relocation
  relocationHistory: z.array(z.object({
    id: z.string(),
    fromCity: z.string(),
    fromCountry: z.string(),
    toCity: z.string(),
    toCountry: z.string(),
    movedAt: z.string().transform((str) => new Date(str)),
    reason: z.enum(['birth', 'education', 'career', 'family', 'marriage', 'other']),
    reasonDetail: z.string().optional(),
  })),
  
  // Life
  currentLifeStage: z.enum(['student', 'early_career', 'mid_career', 'senior', 'retirement']),
  relationshipStatus: z.enum(['single', 'dating', 'engaged', 'married', 'divorced', 'widowed']),
  hasChildren: z.boolean(),
  childrenCount: z.number().optional(),
  
  // Career
  educationLevel: z.enum(['high_school', 'bachelor', 'master', 'phd', 'other']).optional(),
  fieldOfStudy: z.string().optional(),
  currentIndustry: z.string().optional(),
  
  // Additional
  healthConsiderations: z.string().optional(),
  significantLifeEvents: z.string().optional(),
});

// GET /api/personal-context?chartId=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chartId = searchParams.get('chartId');
    
    if (!chartId) {
      return NextResponse.json(
        { error: 'Chart ID is required' },
        { status: 400 }
      );
    }
    
    const context = await prisma.personalContext.findUnique({
      where: { chartId },
    });
    
    if (!context) {
      return NextResponse.json(
        { data: null, message: 'No personal context found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: context,
    });
  } catch (error) {
    console.error('Error fetching personal context:', error);
    return NextResponse.json(
      { error: 'Failed to fetch personal context' },
      { status: 500 }
    );
  }
}

// POST /api/personal-context
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = personalContextSchema.parse(body);
    
    const context = await prisma.personalContext.upsert({
      where: { chartId: validated.chartId },
      update: {
        ...validated,
        updatedAt: new Date(),
      },
      create: {
        ...validated,
      },
    });
    
    return NextResponse.json({
      success: true,
      data: context,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: (error as z.ZodError).issues },
        { status: 400 }
      );
    }
    
    console.error('Error saving personal context:', error);
    return NextResponse.json(
      { error: 'Failed to save personal context' },
      { status: 500 }
    );
  }
}

// PUT /api/personal-context
export async function PUT(request: Request) {
  return POST(request);
}

// DELETE /api/personal-context?chartId=xxx
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chartId = searchParams.get('chartId');
    
    if (!chartId) {
      return NextResponse.json(
        { error: 'Chart ID is required' },
        { status: 400 }
      );
    }
    
    await prisma.personalContext.delete({
      where: { chartId },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Personal context deleted',
    });
  } catch (error) {
    console.error('Error deleting personal context:', error);
    return NextResponse.json(
      { error: 'Failed to delete personal context' },
      { status: 500 }
    );
  }
}
