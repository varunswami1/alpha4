-- Drop the overly permissive notification insert policy
DROP POLICY IF EXISTS "Authenticated users can insert notifications" ON public.notifications;

-- Create a proper notification insert policy - users can only create notifications for themselves
-- (system/admin notifications will use service role which bypasses RLS)
CREATE POLICY "Users can create notifications for themselves" ON public.notifications
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);