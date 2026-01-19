import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const client = createClient(SUPABASE_URL || '', SERVICE_KEY || '');

export async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    const action = (body.action || 'list').toString();

    if (action === 'list') {
      const { data, error } = await client.from('shares').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify(data), { status: 200 });
    }

    if (action === 'create') {
      const resumeId = body.resumeId;
      const token = randomUUID();
      const url = `${process.env.PUBLIC_URL || ''}/r/${token}`;
      const payload = { resume_id: resumeId, token, url };
      const { data, error } = await client.from('shares').insert([payload]).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { status: 201 });
    }

    if (action === 'delete') {
      const id = body.id;
      const { error } = await client.from('shares').delete().eq('id', id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'unknown action' }), { status: 400 });
  } catch (err:any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500 });
  }
}

export default handler;
