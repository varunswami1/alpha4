-- Fix handle_updated_at function to have search_path set
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Drop the overly permissive notification insert policy and replace with authenticated user only
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

-- Notifications can be created by any authenticated user (for system-generated notifications we'll use service role)
CREATE POLICY "Authenticated users can insert notifications" ON public.notifications
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);
