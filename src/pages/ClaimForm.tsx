
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";

// Mock data for demonstration
const mockItems = [
  {
    id: "1",
    name: "Blue Backpack",
    category: "Bags & Luggage",
    location: "Library",
    date: new Date(2023, 4, 12),
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/rucksack/y/z/b/33l-water-resistant-bag-backpack-for-laptop-15-6inch-for-office-original-imag8gs8jhxy3zek.jpeg?q=90&crop=false",
    description: "A blue Jansport backpack with a laptop sleeve inside. Has a small tear on the front pocket.",
    type: "lost"
  },
  {
    id: "2",
    name: "MacBook Pro",
    category: "Electronics",
    location: "Student Center",
    date: new Date(2023, 4, 15),
    image: "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8fDA%3D",
    description: "13-inch MacBook Pro (2020) with stickers on the cover. Left on a table in the study area.",
    type: "lost"
  },
  {
    id: "3",
    name: "Student ID Card",
    category: "ID Cards & Documents",
    location: "Cafeteria",
    date: new Date(2023, 4, 18),
    image: "https://images.template.net/21918/Printable-University-ID-Card-Template.jpg",
    description: "Student ID card for Anita Singh. Found near the salad bar.",
    type: "found"
  },
  {
    id: "4",
    name: "iPhone 14",
    category: "Electronics",
    location: "Science Building",
    date: new Date(2024, 4, 20),
    image: "https://cdn.zeebiz.com/sites/default/files/2022/09/21/201340-14c.jpg",
    description: "Black iPhone 14 with a transparent case. Found near the lab benches.",
    type: "found"
  },
  {
    id: "5",
    name: "Nike Water Bottle",
    category: "Other",
    location: "Sports Complex",
    date: new Date(2023, 4, 20),
    image: "https://imgs.search.brave.com/MNvAElLrcGq83m71Jt7a0Q7Xc22v79qrb-jxX4fIW54/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly94Y2Ru/Lm5leHQuY28udWsv/Q29tbW9uL0l0ZW1z/L0RlZmF1bHQvRGVm/YXVsdC9JdGVtSW1h/Z2VzLzNfNFJhdGlv/L1NlYXJjaC9MZ2Uv/NjA5NTA0LmpwZz9p/bT1SZXNpemUsd2lk/dGg9NDUw",
    description: "Black Nike water bottle with a flip-top lid. Found in the gym.",
    type: "found"
  },
  {
    id: "6",
    name: "Engineering Textbook",
    category: "Books",
    location: "Main Building",
    date: new Date(2024, 4, 25),
    image: "https://www.cl.cam.ac.uk/archive/rja14/Papers/book2coverlarge.jpg",
    description: "Thermodynamics textbook with notes inside. Found in the lecture hall.",
    type: "found"
  },
  {
    id: "7",
    name: "Black Wallet",
    category: "Accessories",
    location: "Parking Lot",
    date: new Date(2024, 4, 28),
    image: "https://teakwoodleathers.com/cdn/shop/products/T_WLT_485_BL_1_1aea31b8-cf7b-4b08-b964-7a9712e8609c.jpg?v=1684316527",
    description: "Black leather wallet containing cash and ID. Found beside a parked bike.",
    type: "found"
  },
  {
    id: "8",
    name: "Wireless Earbuds",
    category: "Electronics",
    location: "Dormitory",
    date: new Date(2024, 5, 2),
    image: "https://i.rtings.com/assets/products/jmVQj3MR/jbl-vibe-100tws-true-wireless/design-medium.jpg?format=auto",
    description: "Black wireless earbuds in a charging case. Last seen near bunk beds.",
    type: "lost"
  }
];


export const ClaimForm = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [proofDescription, setProofDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching item data
    setTimeout(() => {
      const foundItem = mockItems.find(item => item.id === id);
      if (foundItem) {
        setItem(foundItem);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Implement Supabase claim submission here when connected
      // For now, simulate submission
      setTimeout(() => {
        setIsSuccess(true);
        toast({
          title: "Claim submitted!",
          description: "We will contact you once your claim has been reviewed.",
          variant: "default",
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your claim. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            The item you are looking for could not be found.
          </p>
          <Button onClick={() => navigate("/listings")}>Return to Listings</Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Card className="text-center py-12 animate-fade-in">
          <CardContent>
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="h-24 w-24 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Claim Submitted!</h2>
            <p className="mb-8 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Your claim for <strong>{item.name}</strong> has been submitted successfully. We'll review your claim and contact you shortly.
            </p>
            <Button onClick={() => navigate("/listings")}>Return to Listings</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Submit a Claim</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto animate-fade-in animate-delay-100">
          Please provide information to verify your claim for this item.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="animate-fade-in animate-delay-200">
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover" 
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
            <CardTitle>{item.name}</CardTitle>
            <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
              {item.category} • {item.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300">{item.description}</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in animate-delay-300">
          <CardHeader>
            <CardTitle>Verification Information</CardTitle>
            <CardDescription>
              {item.type === "lost" 
                ? "Provide details to confirm you found this item" 
                : "Provide details to confirm this is your item"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Contact Information</Label>
                  <Input
                    id="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Email or phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proofDescription">
                    {item.type === "lost" 
                      ? "Describe how you found this item" 
                      : "Provide details that prove ownership"}
                  </Label>
                  <Textarea
                    id="proofDescription"
                    value={proofDescription}
                    onChange={(e) => setProofDescription(e.target.value)}
                    placeholder={item.type === "lost" 
                      ? "Where and when did you find it? Any unique details?" 
                      : "Describe unique identifying details about this item that only the owner would know"
                    }
                    required
                    rows={5}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Claim"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ClaimForm;
