import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Loader } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Plant {
  id: string;
  name: string;
  scientific_name: string | null;
  category: string | null;
  difficulty: string | null;
  created_at: string;
}

const AdminPlants = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  
  const [newPlant, setNewPlant] = useState({
    name: "",
    scientific_name: "",
    category: "",
    description: "",
    care_water: "",
    care_light: "",
    difficulty: "medium",
  });

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .order('name');

      if (error) throw error;
      setPlants(data || []);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleAddPlant = async () => {
    if (!newPlant.name) {
      toast({
        variant: "destructive",
        title: "Name required",
        description: "Please enter a plant name.",
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('plants')
        .insert(newPlant);

      if (error) throw error;

      toast({
        title: "Plant added",
        description: "The plant has been added to the database.",
      });
      
      setIsDialogOpen(false);
      setNewPlant({
        name: "",
        scientific_name: "",
        category: "",
        description: "",
        care_water: "",
        care_light: "",
        difficulty: "medium",
      });
      fetchPlants();
    } catch (error) {
      console.error("Error adding plant:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not add plant.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePlant = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plant?")) return;

    try {
      const { error } = await supabase
        .from('plants')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Plant deleted",
        description: "The plant has been removed from the database.",
      });
      fetchPlants();
    } catch (error) {
      console.error("Error deleting plant:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete plant.",
      });
    }
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (plant.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout title="Plant Database">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Plants ({plants.length})</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search plants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plant
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Plant</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={newPlant.name}
                        onChange={(e) => setNewPlant(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Rose"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scientific">Scientific Name</Label>
                      <Input
                        id="scientific"
                        value={newPlant.scientific_name}
                        onChange={(e) => setNewPlant(prev => ({ ...prev, scientific_name: e.target.value }))}
                        placeholder="Rosa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newPlant.category}
                        onChange={(e) => setNewPlant(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Flowers"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newPlant.description}
                        onChange={(e) => setNewPlant(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="A beautiful flowering plant..."
                      />
                    </div>
                    <Button onClick={handleAddPlant} className="w-full" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader className="h-4 w-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Add Plant"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredPlants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No plants found. Add your first plant to the database.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Scientific Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlants.map((plant) => (
                  <TableRow key={plant.id}>
                    <TableCell className="font-medium">{plant.name}</TableCell>
                    <TableCell className="text-muted-foreground italic">
                      {plant.scientific_name || "-"}
                    </TableCell>
                    <TableCell>
                      {plant.category ? (
                        <Badge variant="secondary">{plant.category}</Badge>
                      ) : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        plant.difficulty === "easy" ? "default" :
                        plant.difficulty === "hard" ? "destructive" : "secondary"
                      }>
                        {plant.difficulty || "medium"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeletePlant(plant.id)}
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
    </AdminLayout>
  );
};

export default AdminPlants;
