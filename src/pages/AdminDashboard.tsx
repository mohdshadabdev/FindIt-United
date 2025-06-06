import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Users, Package, FileCheck, AlertCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

// Sample items data
const sampleItems = [
  {
    id: "sample-1",
    name: "iPhone 14 Pro",
    category: "Electronics",
    location: "Library - 2nd Floor",
    description: "Space Gray iPhone 14 Pro with a cracked screen protector. Has a blue case with 'Priya' written on it.",
    type: "lost",
    status: "active",
    reported_at: "2024-05-20T10:30:00Z",
    user_id: "user-1",
    date: "2024-05-20",
    image: "https://placehold.co/600x400/1e40af/FFFFFF/png?text=iPhone+14+Pro"
  },
  {
    id: "sample-2",
    name: "MacBook Pro",
    category: "Electronics",
    location: "Student Center",
    description: "13\" MacBook Pro (2020) with a blue hard shell case. Slight crack on the bottom right corner.",
    type: "lost",
    status: "active",
    reported_at: "2024-05-21T12:00:00Z",
    user_id: "user-2",
    date: "2024-05-21",
    image: "https://placehold.co/600x400/0284c7/FFFFFF/png?text=MacBook+Pro"
  },
  {
    id: "sample-3",
    name: "Engineering Textbook",
    category: "Books",
    location: "Engineering Building - Room 301",
    description: "Engineering Mathematics by K.A. Stroud, 7th edition. Has handwritten notes in Hindi and English.",
    type: "lost",
    status: "pending",
    reported_at: "2024-05-22T09:45:00Z",
    user_id: "user-3",
    date: "2024-05-22",
    image: "https://placehold.co/600x400/16a34a/FFFFFF/png?text=Engineering+Book"
  },
  {
    id: "sample-4",
    name: "Black Wallet",
    category: "Personal Items",
    location: "Student Center",
    description: "Black leather wallet containing student ID, some cash, and a photo of family.",
    type: "found",
    status: "active",
    reported_at: "2024-05-23T16:20:00Z",
    user_id: "user-4",
    date: "2024-05-23",
    image: "https://placehold.co/600x400/0f172a/FFFFFF/png?text=Black+Wallet"
  },
  {
    id: "sample-5",
    name: "Wireless Earbuds",
    category: "Electronics",
    location: "Dormitory - Building A",
    description: "White AirPods Pro with charging case. Small scratch on the case lid.",
    type: "lost",
    status: "active",
    reported_at: "2024-05-24T11:30:00Z",
    user_id: "user-5",
    date: "2024-05-24",
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=Earbuds"
  },
  {
    id: "sample-6",
    name: "Scientific Calculator",
    category: "Electronics",
    location: "Mathematics Department",
    description: "Casio FX-991EX scientific calculator with 'DI' initials written on back.",
    type: "found",
    status: "pending",
    reported_at: "2024-05-25T13:10:00Z",
    user_id: "user-6",
    date: "2024-05-25",
    image: "https://placehold.co/600x400/f59e0b/FFFFFF/png?text=Calculator"
  },
  {
    id: "sample-7",
    name: "Student ID Card",
    category: "Documents",
    location: "Sports Complex",
    description: "University ID card for Anita Singh, student ID UU2024003.",
    type: "found",
    status: "active",
    reported_at: "2024-05-26T15:45:00Z",
    user_id: "user-7",
    date: "2024-05-26",
    image: "https://placehold.co/600x400/8b5cf6/FFFFFF/png?text=ID+Card"
  }
];

// Mock data for claims
const mockClaims = [
  {
    id: 1,
    itemId: "sample-7",
    itemName: "Student ID Card",
    claimant: "Priya Patel",
    contact: "priya.patel@united.edu",
    date: "May 20, 2024",
    status: "approved",
    proof: "It's my ID card with ID number UU2024001. The card has a small scratch on the back from when I dropped it near the cafeteria."
  },
  {
    id: 2,
    itemId: "sample-2",
    itemName: "MacBook Pro",
    claimant: "Rahul Kumar",
    contact: "rahul.kumar@united.edu",
    date: "May 21, 2024",
    status: "pending",
    proof: "It's a 13\" MacBook Pro (2020) with a grey hard shell case. The password is my student ID UU2024002 and there's a cracked pixel in the bottom right corner of the screen."
  },
  {
    id: 3,
    itemId: "sample-1",
    itemName: "iPhone 14 Pro",
    claimant: "Vikram Sharma",
    contact: "vikram.sharma@united.edu",
    date: "May 22, 2024",
    status: "pending",
    proof: "It's a blue colour iPhone 14 with a cracked screen protector. I have photos of it and can provide the IMEI number for verification."
  },
  {
    id: 4,
    itemId: "sample-4",
    itemName: "Black Wallet",
    claimant: "Neha Joshi",
    contact: "neha.joshi@united.edu",
    date: "May 24, 2024",
    status: "approved",
    proof: "It's a black leather wallet with my driving license and student ID inside. The wallet has a small tear on the right corner."
  }
];


// Mock data for contact queries with Indian names
const mockContactQueries = [
  {
    id: "1",
    name: "Arjun Nair",
    email: "arjun.nair@united.edu",
    message: "I lost my wireless earbuds in the dormitory yesterday. They are white AirPods Pro with a small scratch on the case. Has anyone found them?",
    created_at: "2024-05-10T14:30:00Z"
  },
  {
    id: "2",
    name: "Anita Singh",
    email: "anita.singh@united.edu",
    message: "Hello, I found a set of keys near the science building entrance. They have a red keychain with a star. Where should I bring them?",
    created_at: "2024-05-12T09:45:00Z"
  },
  {
    id: "3",
    name: "Amit Gupta",
    email: "amit.gupta@united.edu",
    message: "I'm trying to report a lost textbook but the form keeps giving me an error. Can someone help me with this technical issue? The book is 'Engineering Mathematics' by Stroud.",
    created_at: "2024-05-13T16:20:00Z"
  },
  {
    id: "4",
    name: "Deepika Iyer",
    email: "deepika.iyer@united.edu",
    message: "I found a calculator in the library study room. It's a scientific calculator with 'DI' written on it. How can I report this as found?",
    created_at: "2024-05-14T11:15:00Z"
  },
  {
    id: "5",
    name: "Rajesh Verma",
    email: "rajesh.verma@united.edu",
    message: "My laptop bag was stolen from the cafeteria. It had my laptop, charger, and some important documents. Is there any way to check if it has been found?",
    created_at: "2024-05-15T13:45:00Z"
  }
];

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<"approve" | "reject" | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      toast({
        title: "Admin Access Required",
        description: "You must be logged in as an admin to access this page.",
        variant: "destructive",
      });
      navigate("/admin-login");
      return;
    }

    // Load items from Supabase
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase.from("reported_items").select("*");
        if (error) {
          console.error("Error fetching items:", error);
          toast({
            title: "Error",
            description: "Failed to load items. Using sample data instead.",
            variant: "destructive",
          });
          
          // Use sample data if we can't fetch from Supabase
          setItems(sampleItems);
          return;
        }
        
        if (data && data.length > 0) {
          // Combine real data with sample data, but avoid duplicates by ID
          const realIds = new Set(data.map(item => item.id));
          const filteredSamples = sampleItems.filter(item => !realIds.has(item.id));
          setItems([...data, ...filteredSamples]);
        } else {
          // If no data is returned, use sample data
          setItems(sampleItems);
        }
      } catch (err) {
        console.error("Failed to fetch items:", err);
        // Use sample data as fallback
        setItems(sampleItems);
      }
    };

    // Load queries (or use mock data if access is denied)
    const fetchQueries = async () => {
      try {
        const { data, error } = await supabase
          .from("queries")
          .select("*")
          .order('created_at', { ascending: false });
          
        if (error) {
          // If there's a permission error, use mock data instead
          console.error("Error fetching queries:", error);
          setQueries(mockContactQueries);
          return;
        }
        
        if (data && data.length > 0) {
          setQueries([...data, ...mockContactQueries]); // Combine real and mock data
        } else {
          // If no data is returned, use mock data
          setQueries(mockContactQueries);
        }
      } catch (err) {
        console.error("Failed to fetch queries:", err);
        // Use mock data as fallback
        setQueries(mockContactQueries);
      }
    };

    fetchItems();
    fetchQueries();
    
    // Set up real-time subscription to the queries table
    const querySubscription = supabase
      .channel('public:queries')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'queries' 
      }, (payload) => {
        console.log('New query received:', payload);
        // Add the new query to the top of the list
        setQueries(prev => [payload.new, ...prev]);
        
        toast({
          title: "New Contact Query",
          description: "A new contact query has been submitted.",
        });
      })
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(querySubscription);
    };
  }, [navigate, toast]);

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter claims based on search
  const filteredClaims = mockClaims.filter(claim =>
    claim.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter queries based on search
  const filteredQueries = queries.filter(query =>
    query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemAction = (item: any, action: "approve" | "reject") => {
    setSelectedItem(item);
    setSelectedAction(action);
    setDialogOpen(true);
  };

  const handleClaimAction = (claim: any, action: "approve" | "reject") => {
    setSelectedClaim(claim);
    setSelectedAction(action);
    setDialogOpen(true);
  };

  const confirmItemAction = async () => {
    if (!selectedItem) return;
    
    // Update the item status in Supabase
    const { error } = await supabase
      .from('reported_items')
      .update({ status: selectedAction === "approve" ? "active" : "rejected" })
      .eq('id', selectedItem.id);

    if (error) {
      console.error("Error updating item:", error);
      toast({
        title: "Error",
        description: "Failed to update item status. Please try again.",
        variant: "destructive",
      });
      setDialogOpen(false);
      return;
    }
    
    // Update local state
    const updatedItems = items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          status: selectedAction === "approve" ? "active" : "rejected"
        };
      }
      return item;
    });
    
    setItems(updatedItems);
    
    toast({
      title: `Item ${selectedAction === "approve" ? "approved" : "rejected"}`,
      description: `You have ${selectedAction === "approve" ? "approved" : "rejected"} the ${selectedItem.name}.`,
      variant: selectedAction === "approve" ? "default" : "destructive",
    });
    
    setDialogOpen(false);
  };

  const confirmClaimAction = () => {
    // In a real app, would update the claim status in the database
    toast({
      title: `Claim ${selectedAction === "approve" ? "approved" : "rejected"}`,
      description: `You have ${selectedAction === "approve" ? "approved" : "rejected"} the claim for ${selectedClaim.itemName}.`,
      variant: selectedAction === "approve" ? "default" : "destructive",
    });
    setDialogOpen(false);
  };

  const deleteItem = async (id: string) => {
    // Delete the item from Supabase
    const { error } = await supabase
      .from('reported_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Update local state
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    
    toast({
      title: "Item deleted",
      description: "The item has been removed from the listings.",
      variant: "default",
    });
  };

  const viewQueryDetails = (query: any) => {
    setSelectedQuery(query);
    setDialogOpen(true);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return dateString || 'Unknown date';
    }
  };

  // Calculate counts for stats
  const pendingItems = items.filter(i => i.status === "pending").length;
  const activeItems = items.filter(i => i.status === "active").length;
  const lostItems = items.filter(i => i.type === "lost").length;
  const foundItems = items.filter(i => i.type === "found").length;
  const totalQueries = queries.length;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 animate-fade-in animate-delay-100">
          Manage lost and found items, review claims, and administer the system.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 animate-fade-in animate-delay-200">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package size={18} className="text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-xs text-slate-500">
              {lostItems} lost, {foundItems} found
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Users size={18} className="text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingItems}</div>
            <p className="text-xs text-slate-500">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <FileCheck size={18} className="text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockClaims.filter(c => c.status === "pending").length}
            </div>
            <p className="text-xs text-slate-500">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <AlertCircle size={18} className="text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeItems}</div>
            <p className="text-xs text-slate-500">
              Approved and visible listings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Queries</CardTitle>
            <Mail size={18} className="text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQueries}</div>
            <p className="text-xs text-slate-500">
              User submitted inquiries
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search bar */}
      <div className="relative mb-6 animate-fade-in animate-delay-300">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
        <Input
          placeholder="Search items, claims or queries..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="queries">Contact Queries</TabsTrigger>
        </TabsList>

        {/* Items Tab */}
        <TabsContent value="items">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>All Items</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredItems.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{formatDate(item.reported_at)}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === "lost" ? "destructive" : "default"}>
                            {item.type === "lost" ? "Lost" : "Found"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              item.status === "active" 
                                ? "default" 
                                : item.status === "pending" 
                                  ? "outline" 
                                  : "destructive"
                            }
                          >
                            {item.status === "active" 
                              ? "Approved" 
                              : item.status === "pending" 
                                ? "Pending"
                                : "Rejected"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {item.status === "pending" && (
                              <>
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  onClick={() => handleItemAction(item, "approve")}
                                >
                                  Approve
                                </Button>
                                <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedClaim(null);
                  setSelectedQuery(null);
                  setSelectedAction(null);
                  setDialogOpen(true);
                }}
              >
                View
              </Button>
              <Button variant="destructive\" 
                                  size="sm"
                                  onClick={() => handleItemAction(item, "reject")}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => deleteItem(item.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No items found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Claims Tab */}
        <TabsContent value="claims">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Claim Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredClaims.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Claimant</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.itemName}</TableCell>
                        <TableCell>{claim.claimant}</TableCell>
                        <TableCell>{claim.contact}</TableCell>
                        <TableCell>{claim.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              claim.status === "approved"
                                ? "default"
                                : claim.status === "rejected"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {claim.status === "approved"
                              ? "Approved"
                              : claim.status === "rejected"
                              ? "Rejected"
                              : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedClaim(claim);
                                setSelectedAction(null);
                                setDialogOpen(true);
                              }}
                            >
                              View
                            </Button>
                            {claim.status === "pending" && (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleClaimAction(claim, "approve")}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleClaimAction(claim, "reject")}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No claims found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Queries Tab */}
        <TabsContent value="queries">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>User Queries</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredQueries.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message Preview</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQueries.map((query) => (
                      <TableRow key={query.id}>
                        <TableCell className="font-medium">{query.name}</TableCell>
                        <TableCell>{query.email}</TableCell>
                        <TableCell>
                          {query.message.length > 50 
                            ? `${query.message.substring(0, 50)}...` 
                            : query.message}
                        </TableCell>
                        <TableCell>{formatDate(query.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewQueryDetails(query)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No contact queries found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View/Action Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedAction && !selectedQuery
                ? selectedAction === "approve"
                  ? "Approve Item/Claim"
                  : "Reject Item/Claim"
                : "Details"}
            </DialogTitle>
            <DialogDescription>
              {selectedAction && !selectedQuery
                ? selectedAction === "approve"
                  ? "Are you sure you want to approve? This will make it visible to users."
                  : "Are you sure you want to reject?"
                : "Review the details."}
            </DialogDescription>
          </DialogHeader>

          
  {/* Scrollable section */}
  <div className="space-y-4 max-h-[65vh] overflow-y-auto px-1">
{selectedClaim && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Item</h4>
                <p>{selectedClaim.itemName}</p>
              </div>
              <div>
                <h4 className="font-semibold">Claimant</h4>
                <p>{selectedClaim.claimant}</p>
              </div>
              <div>
                <h4 className="font-semibold">Contact Information</h4>
                <p>{selectedClaim.contact}</p>
              </div>
              <div>
                <h4 className="font-semibold">Proof/Details</h4>
                <p>{selectedClaim.proof}</p>
              </div>
            </div>
          )}

          {selectedItem && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Item</h4>
                <p>{selectedItem.name}</p>
              </div>
              <div>
                <h4 className="font-semibold">Category</h4>
                <p>{selectedItem.category}</p>
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p>{selectedItem.location}</p>
              </div>
              <div>
                <h4 className="font-semibold">Description</h4>
                <p>{selectedItem.description}</p>
              </div>
              {selectedItem.image && (
                <div>
                  <h4 className="font-semibold">Image</h4>
                  <img src={selectedItem.image} alt={selectedItem.name} className="max-h-40 rounded-md" />
                </div>
              )}
            </div>
          )}

          {selectedQuery && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">From</h4>
                <p>{selectedQuery.name} ({selectedQuery.email})</p>
              </div>
              <div>
                <h4 className="font-semibold">Date</h4>
                <p>{formatDate(selectedQuery.created_at)}</p>
              </div>
              <div>
                <h4 className="font-semibold">Message</h4>
                <p className="whitespace-pre-wrap">{selectedQuery.message}</p>
              </div>
            </div>
          )}

          </div>
  <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {selectedQuery ? "Close" : "Cancel"}
            </Button>
            {selectedAction && selectedClaim && (
              <Button
                variant={selectedAction === "approve" ? "default" : "destructive"}
                onClick={confirmClaimAction}
              >
                {selectedAction === "approve" ? "Approve Claim" : "Reject Claim"}
              </Button>
            )}
            {selectedAction && selectedItem && (
              <Button
                variant={selectedAction === "approve" ? "default" : "destructive"}
                onClick={confirmItemAction}
              >
                {selectedAction === "approve" ? "Approve Item" : "Reject Item"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
