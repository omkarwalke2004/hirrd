
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseclient=async(supabaseAccesstoken)=>{
    const supaase=createClient(supabaseUrl,supabaseKey,{
        global:{
            headers:{
                Authorization:`Bearer ${supabaseAccesstoken}`
            }
        }
    })
    return supaase;
}

export default supabaseclient
        