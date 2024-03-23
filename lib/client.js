import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://keqffnpolfvtrjomwhti.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcWZmbnBvbGZ2dHJqb213aHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExNzU0MzcsImV4cCI6MjAyNjc1MTQzN30.Ajz0HH0WiMwt4bug_ysy419TIONb_PdZmrztaEMa8vE"
export const supabase = createClient(supabaseUrl, supabaseKey)