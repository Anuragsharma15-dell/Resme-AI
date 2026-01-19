import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const client = createClient(SUPABASE_URL || '', SERVICE_KEY || '');

export async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    const action = (body.action || 'list').toString();

    if (action === 'list') {
      const { data, error } = await client.from('resumes').select('*').order('updated_at', { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify(data), { status: 200 });
    }

    if (action === 'create') {
      const payload = body.payload || {};
      const { data, error } = await client.from('resumes').insert([payload]).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { status: 201 });
    }

    if (action === 'delete') {
      const id = body.id;
      const { error } = await client.from('resumes').delete().eq('id', id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (action === 'update') {
      const id = body.id;
      const payload = body.payload || {};
      const { data, error } = await client.from('resumes').update(payload).eq('id', id).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'unknown action' }), { status: 400 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500 });
  }
}

export default handler;
