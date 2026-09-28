/* Public anon credentials only. Never put a service_role key in this file. */
window.NATIVO_SUPABASE_URL = 'https://bgawmzqwnopndfwjvsma.supabase.co';
window.NATIVO_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXdtenF3bm9wbmRmd2p2c21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MjMzNjMsImV4cCI6MjEwNjE5OTM2M30.1lYwb1hHlLhWdS97m3-oA7bwOK5IR7eOUHyMEoAuzh8';

window.nativoSupabase = null;
window.nativoSupabaseConfigured = false;

const hasSupabaseConfig =
    window.NATIVO_SUPABASE_URL.startsWith('https://') &&
    !window.NATIVO_SUPABASE_URL.includes('TU-PROYECTO') &&
    window.NATIVO_SUPABASE_ANON_KEY.length > 20 &&
    !window.NATIVO_SUPABASE_ANON_KEY.includes('TU_ANON_KEY');

if (hasSupabaseConfig && window.supabase?.createClient) {
    window.nativoSupabase = window.supabase.createClient(
        window.NATIVO_SUPABASE_URL,
        window.NATIVO_SUPABASE_ANON_KEY
    );
    window.nativoSupabaseConfigured = true;
}