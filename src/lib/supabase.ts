
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lgwffpdljflqpyyhsbsr.supabase.co'
const supabaseKey = 'sb_publishable_WlTPH0CvXyQfCgRKUmxUiA_2VeK2gWh'

export const supabase = createClient(supabaseUrl, supabaseKey)
