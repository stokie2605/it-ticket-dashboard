import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jsxgojjxvxydqrjuwpie.supabase.co'
const supabaseAnonKey = 'sb_publishable_3n8GrrK3iKw1ZNNPYWm0TQ_biLiW9Ub'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)