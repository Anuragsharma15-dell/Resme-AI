import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const client = createClient(SUPABASE_URL || '', SERVICE_KEY || '');

export async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    const action = (body.action || 'get').toString();

    if (action === 'get') {
      const { data, error } = await client.from('settings').select('*').limit(1).single();
      if (error) {
        // if table doesn't exist or empty, return default
        return new Response(JSON.stringify({}), { status: 200 });
      }
      return new Response(JSON.stringify(data), { status: 200 });
    }

    if (action === 'save') {
      const settings = body.settings || {};
      // try upsert
      const { data, error } = await client.from('settings').upsert(settings, { onConflict: 'id' }).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'unknown action' }), { status: 400 });
  } catch (err:any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500 });
  }
}

export default handler;
