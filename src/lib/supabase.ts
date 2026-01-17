
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lgwffpdljflqpyyhsbsr.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WlTPH0CvXyQfCgRKUmxUiA_2VeK2gWh'

export const supabase = createClient(supabaseUrl, supabaseKey)
