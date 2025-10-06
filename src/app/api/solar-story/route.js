// app/api/solar-story/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Busca dados dos últimos 30 dias
    const hoje = new Date();
    const trintaDiasAtras = new Date(hoje);
    trintaDiasAtras.setDate(hoje.getDate() - 30);
    
    const endDate = hoje.toISOString().split('T')[0];
    const startDate = trintaDiasAtras.toISOString().split('T')[0];
    
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    const NASA_API_URL = `https://api.nasa.gov/DONKI/GST?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    
    const response = await fetch(NASA_API_URL, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`NASA API retornou status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Pega o evento mais recente
    const latestStorm = data.length > 0 ? data[data.length - 1] : null;
    
    return NextResponse.json({ 
      stormData: latestStorm,
      total: data.length 
    });

  } catch (error) {
    console.error('Erro ao buscar dados da NASA:', error.message);
    return NextResponse.json(
      { 
        error: 'Falha ao buscar dados solares',
        details: error.message 
      },
      { status: 500 }
    );
  }
}