import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const client = createClient(SUPABASE_URL || '', SERVICE_KEY || '');

export async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    const action = (body.action || 'summary').toString();

    if (action === 'summary') {
      // simple aggregations from analytics table
      const { data: totalViewsData } = await client.from('analytics').select('views');
      const totalViews = (totalViewsData || []).reduce((s:any, r:any) => s + (r.views || 0), 0);

      const { data: unique } = await client.from('analytics').select('visitor_id');
      const uniqueVisitors = new Set((unique || []).map((r:any) => r.visitor_id)).size;

      const { data: scores } = await client.from('resumes').select('score');
      const avgScore = scores && scores.length ? Math.round((scores.reduce((s:any, r:any) => s + (r.score || 0), 0) / scores.length) * 10) / 10 : 0;

      return new Response(JSON.stringify({ totalViews, uniqueVisitors, avgScore }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'unknown action' }), { status: 400 });
  } catch (err:any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500 });
  }
}

export default handler;
