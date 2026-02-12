import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Eye, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  title: string | null;
  content: string;
  is_approved: boolean;
  is_reported: boolean;
  created_at: string;
  user_id: string;
}

const AdminCommunity = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ is_approved: true, is_reported: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Post approved",
        description: "The post is now visible to all users.",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ is_approved: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Post rejected",
        description: "The post has been hidden from users.",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error rejecting post:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Post deleted",
        description: "The post has been permanently removed.",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const reportedPosts = posts.filter(p => p.is_reported);
  const pendingPosts = posts.filter(p => !p.is_approved && !p.is_reported);

  return (
    <AdminLayout title="Community Moderation">
      <div className="space-y-6">
        {/* Reported Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Reported Posts
              {reportedPosts.length > 0 && (
                <Badge variant="destructive">{reportedPosts.length}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reportedPosts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No reported posts to review.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <p className="font-medium">{post.title || "Untitled"}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.content}
                        </p>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApprove(post.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* All Posts */}
        <Card>
          <CardHeader>
            <CardTitle>All Posts ({posts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No posts in the community yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <p className="font-medium">{post.title || "Untitled"}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {post.content}
                        </p>
                      </TableCell>
                      <TableCell>
                        {post.is_reported ? (
                          <Badge variant="destructive">Reported</Badge>
                        ) : post.is_approved ? (
                          <Badge variant="default">Approved</Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!post.is_approved && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleApprove(post.id)}
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                          )}
                          {post.is_approved && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleReject(post.id)}
                            >
                              <X className="h-4 w-4 text-orange-500" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCommunity;
