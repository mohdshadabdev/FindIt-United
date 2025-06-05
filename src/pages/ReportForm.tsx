
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Upload, AlertCircle, LogIn } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  "Electronics",
  "Books & Stationery",
  "Clothing & Accessories",
  "ID Cards & Documents",
  "Keys",
  "Bags & Luggage",
  "Other"
];

const locations = [
  "Library",
  "Student Center",
  "Main Building",
  "Science Building",
  "Arts Building",
  "Sports Complex",
  "Cafeteria",
  "Dormitory",
  "Parking Lot",
  "Other"
];

export const ReportForm = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") || "lost";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login Required",
        description: "You must be logged in to report an item.",
        variant: "destructive",
      });
      // Redirect to login page with a return URL
      navigate(`/login?returnTo=${encodeURIComponent("/report")}`);
    }

    // Reset form when tab changes
    setItemName("");
    setCategory("");
    setDate(undefined);
    setLocation("");
    setDescription("");
    setImage(null);
    setImagePreview("");
  }, [activeTab, navigate, toast, user]);

  // If not authenticated, don't render the form
  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <LogIn className="h-12 w-12 text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You need to be logged in to report an item.
          </p>
          <Button onClick={() => navigate("/login")} className="gap-2">
            <LogIn className="h-4 w-4" />
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {      
      // Use the authenticated user's ID directly
      const userId = user.id;
      console.log("Submitting with user ID:", userId);
      
      // Create the new item report
      const newItem = {
        user_id: userId,
        name: itemName,
        category,
        location,
        date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        description,
        image: imagePreview, // Store base64 image
        type: activeTab, // "lost" or "found"
        status: "pending", // Needs admin approval
      };
      
      console.log("Submitting item:", newItem);
      
      // Save to Supabase
      const { error, data } = await supabase.from('reported_items').insert(newItem);
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      console.log("Successfully saved item:", data);
      
      // Show success message
      toast({
        title: `${activeTab === "lost" ? "Lost" : "Found"} item reported!`,
        description: "Your report has been submitted and is pending admin approval.",
        variant: "default",
      });
      
      // Navigate to listings
      navigate("/listings");
    } catch (error: any) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: error.message || "There was a problem submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Report an Item</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto animate-fade-in animate-delay-100">
          Please provide as much detail as possible to help reunite lost items with their owners.
        </p>
      </div>

      <Alert className="mb-6 animate-fade-in animate-delay-150">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          All submitted reports require admin approval before they appear in the listings.
          This process usually takes 24-48 hours.
        </AlertDescription>
      </Alert>

      <Card className="animate-fade-in animate-delay-200">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lost">Report Lost Item</TabsTrigger>
              <TabsTrigger value="found">Report Found Item</TabsTrigger>
            </TabsList>
          </Tabs>
          <CardDescription className="pt-4">
            {activeTab === "lost" 
              ? "Fill out this form to report an item you've lost on campus." 
              : "Fill out this form to report an item you've found on campus."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="itemName">Item Name</Label>
                <Input 
                  id="itemName" 
                  placeholder="e.g., Blue Backpack, MacBook Pro, Student ID" 
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label>Date {activeTab === "lost" ? "Lost" : "Found"}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation} required>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide as many details as possible about the item..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="image">Upload Photo (optional)</Label>
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer">
                      <Upload className="h-10 w-10 text-slate-400 mb-2" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        PNG, JPG or JPEG (max. 5MB)
                      </span>
                      <Input 
                        id="image-upload" 
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-40 w-auto rounded-md object-cover mx-auto"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImage(null);
                          setImagePreview("");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : `Submit ${activeTab === "lost" ? "Lost" : "Found"} Item Report`}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ReportForm;
