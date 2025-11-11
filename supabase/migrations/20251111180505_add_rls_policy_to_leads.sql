-- Enable Row Level Security on the leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous users to insert their email into the leads table.
-- This is a public form, so anyone should be able to submit their email.
CREATE POLICY "Allow anonymous inserts on leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);
