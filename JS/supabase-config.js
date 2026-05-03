// JS/supabase-config.js
const SUPABASE_CONFIG = {
    URL: 'https://txmhchiryymmtxqevuip.supabase.co',
    KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4bWhjaGlyeXltbXR4cWV2dWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMjIwNzMsImV4cCI6MjA5Mjc5ODA3M30.movfUmFCQNeZyDHzn4KE7B-unFz7oDVWG6CDJn7OjhM'
};

let supabaseClient = null;

(function() {
    try {
        if (typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.KEY);
            console.log("⚡ NileDrip Cloud Backend: Connected");
        } else {
            console.error("Supabase CDN script not loaded correctly.");
        }
    } catch (error) {
        console.error("Error during Supabase initialization:", error);
    }
})();
