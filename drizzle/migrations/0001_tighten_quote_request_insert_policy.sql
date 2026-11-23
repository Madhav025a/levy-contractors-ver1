DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.quote_requests;
CREATE POLICY "Anyone can submit a valid quote request"
ON public.quote_requests FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (company IS NULL OR char_length(company) <= 200)
  AND (phone IS NULL OR char_length(phone) <= 50)
  AND (project_location IS NULL OR char_length(project_location) <= 300)
  AND (service IS NULL OR char_length(service) <= 200)
  AND (message IS NULL OR char_length(message) <= 5000)
  AND (source_page IS NULL OR char_length(source_page) <= 500)
  AND created_at BETWEEN now() - interval '5 minutes' AND now() + interval '5 minutes'
);