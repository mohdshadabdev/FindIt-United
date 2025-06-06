import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, Calendar, MapPin, AlertCircle } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format, parseISO } from "date-fns";

// sample listings
const fallbackItems = [
  {
    id: 1,
    name: "Blue Backpack",
    category: "Bags & Luggage",
    location: "Library",
    date: new Date(2024, 4, 12),
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/rucksack/y/z/b/33l-water-resistant-bag-backpack-for-laptop-15-6inch-for-office-original-imag8gs8jhxy3zek.jpeg?q=90&crop=false",
    type: "lost",
    status: "active",
    reporter: "priya.patel@united.edu"
  },
  {
    id: 2,
    name: "MacBook Pro",
    category: "Electronics",
    location: "Student Center",
    date: new Date(2024, 4, 15),
    image: "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8fDA%3D",
    type: "lost",
    status: "active",
    reporter: "rahul.kumar@united.edu"
  },
  {
    id: 3,
    name: "Student ID Card",
    category: "ID Cards & Documents",
    location: "Cafeteria",
    date: new Date(2024, 4, 18),
    image: "https://images.template.net/21918/Printable-University-ID-Card-Template.jpg",
    type: "found",
    status: "active",
    reporter: "anita.singh@united.edu"
  },
  {
    id: 4,
    name: "iPhone 14",
    category: "Electronics",
    location: "Science Building",
    date: new Date(2024, 4, 20),
    image: "https://cdn.zeebiz.com/sites/default/files/2022/09/21/201340-14c.jpg",
    type: "found",
    status: "active",
    reporter: "vikram.sharma@united.edu"
  },
  {
    id: 5,
    name: "Nike Water Bottle",
    category: "Other",
    location: "Sports Complex",
    date: new Date(2024, 4, 22),
    image: "https://imgs.search.brave.com/MNvAElLrcGq83m71Jt7a0Q7Xc22v79qrb-jxX4fIW54/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly94Y2Ru/Lm5leHQuY28udWsv/Q29tbW9uL0l0ZW1z/L0RlZmF1bHQvRGVm/YXVsdC9JdGVtSW1h/Z2VzLzNfNFJhdGlv/L1NlYXJjaC9MZ2Uv/NjA5NTA0LmpwZz9p/bT1SZXNpemUsd2lk/dGg9NDUw",
    type: "lost",
    status: "active",
    reporter: "kavya.reddy@united.edu"
  },
  {
    id: 6,
    name: "Engineering Textbook",
    category: "Books & Stationery",
    location: "Main Building",
    date: new Date(2024, 4, 25),
    image: "https://www.cl.cam.ac.uk/archive/rja14/Papers/book2coverlarge.jpg",
    type: "found",
    status: "active",
    reporter: "amit.gupta@united.edu"
  },
  {
    id: 7,
    name: "Black Wallet",
    category: "Other",
    location: "Parking Lot",
    date: new Date(2024, 4, 28),
    image: "https://teakwoodleathers.com/cdn/shop/products/T_WLT_485_BL_1_1aea31b8-cf7b-4b08-b964-7a9712e8609c.jpg?v=1684316527",
    type: "found",
    status: "active",
    reporter: "neha.joshi@united.edu"
  },
  {
    id: 8,
    name: "Wireless Earbuds",
    category: "Electronics",
    location: "Dormitory",
    date: new Date(2024, 5, 2),
    image: "https://i.rtings.com/assets/products/jmVQj3MR/jbl-vibe-100tws-true-wireless/design-medium.jpg?format=auto",
    type: "lost",
    status: "active",
    reporter: "arjun.nair@united.edu"
  }
];

const categories = [
  "All Categories",
  "Electronics",
  "Books & Stationery",
  "Clothing & Accessories",
  "ID Cards & Documents",
  "Keys",
  "Bags & Luggage",
  "Other"
];

const locations = [
  "All Locations",
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

export const Listings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [dateRange, setDateRange] = useState<Date | undefined>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userReportedCount, setUserReportedCount] = useState(0);

  useEffect(() => {
    // Load items from localStorage
    const fetchItems = () => {
      setLoading(true);
      const storedItems = localStorage.getItem("reportedItems");
      
      let loadedItems = [];
      if (storedItems) {
        // Only use approved items for public display
        const parsedItems = JSON.parse(storedItems);
        loadedItems = parsedItems.filter((item: any) => item.status === "active");
        
        // Calculate number of pending items reported by current user
        const user = localStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          const userEmail = userData.email;
          const pendingUserItems = parsedItems.filter(
            (item: any) => item.reporter === userEmail && item.status === "pending"
          );
          setUserReportedCount(pendingUserItems.length);
        }
      }
      
      // Always use fallback items for demo purposes (includes approved items + sample items)
      loadedItems = [...loadedItems, ...fallbackItems];
      
      setItems(loadedItems);
      setLoading(false);
    };
    
    fetchItems();
  }, []);

  // Filter items based on search, category, location, and date
  const filteredItems = items.filter((item) => {
    const matchesType = activeTab === "all" || item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || item.location === selectedLocation;
    
    // Date filter logic
    let matchesDate = true;
    if (dateRange) {
      const itemDate = item.date instanceof Date 
        ? item.date 
        : typeof item.date === 'string' 
          ? new Date(item.date) 
          : null;
      
      if (itemDate) {
        const formattedItemDate = format(itemDate, "yyyy/MM/dd");
        const formattedFilterDate = format(dateRange, "yyyy/MM/dd");
        matchesDate = formattedItemDate === formattedFilterDate;
      }
    }
    
    return matchesType && matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedLocation("All Locations");
    setDateRange(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Item Listings</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto animate-fade-in animate-delay-100">
          Browse lost and found items reported on campus
        </p>
      </div>

      {userReportedCount > 0 && (
        <Alert className="mb-8 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Items Pending Approval</AlertTitle>
          <AlertDescription>
            You have {userReportedCount} reported {userReportedCount === 1 ? "item" : "items"} pending admin approval.
            Once approved, {userReportedCount === 1 ? "it" : "they"} will appear in the listings.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center mb-8 animate-fade-in animate-delay-200">
        {/* Search and filters bar */}
        <div className="w-full max-w-3xl">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search items..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex gap-2 items-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} /> 
                Filters
              </Button>
              <Link to="/report">
                <Button>Report Item</Button>
              </Link>
            </div>
          </div>

          {/* Filters section */}
          {isFilterOpen && (
            <Card className="mt-4 animate-fade-in">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {dateRange ? format(dateRange, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={dateRange}
                          onSelect={setDateRange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="mr-2" onClick={clearFilters}>Clear</Button>
                  <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="found">Found Items</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      <div className="mb-6 text-slate-600 dark:text-slate-400 animate-fade-in animate-delay-300">
        Found {filteredItems.length} results
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        /* Items grid */
        filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              // Format the date properly
              let itemDate;
              try {
                itemDate = item.date instanceof Date 
                  ? item.date 
                  : typeof item.date === 'string' 
                    ? new Date(item.date) 
                    : new Date();
              } catch (e) {
                itemDate = new Date(); // Fallback
              }
              
              return (
                <Card 
                  key={item.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.image || `https://placehold.co/600x400/${item.type === 'lost' ? '3b82f6' : '8b5cf6'}/FFFFFF/png?text=${item.name}`} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.type === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }`}>
                        {item.type === "lost" ? "Lost" : "Found"}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                      <MapPin size={16} />
                      <span className="text-sm">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Calendar size={16} />
                      <span className="text-sm">{format(itemDate, "PPP")}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/claim/${item.id}`} className="w-full">
                      <Button className="w-full">
                        {item.type === "lost" ? "I found this" : "This is mine"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600 dark:text-slate-400">No items found matching your criteria.</p>
            <Button asChild className="mt-4">
              <Link to="/report">Report a New Item</Link>
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default Listings;
