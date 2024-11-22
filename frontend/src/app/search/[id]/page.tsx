import React from "react";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the financial expert
const expertData = {
  name: "Jane Smith",
  title: "Certified Financial Planner (CFP)",
  profilePicture: "/placeholder-avatar.jpg",
  summary:
    "Experienced financial advisor with over 15 years of expertise in personal and corporate finance. Specializing in investment strategies, retirement planning, and tax optimization.",
  yearsOfExperience: 15,
  primaryExpertise: [
    "Investment Strategies",
    "Retirement Planning",
    "Tax Optimization",
  ],
  contact: {
    email: "jane.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
  },
  expertise: [
    "Financial Planning",
    "Investment Management",
    "Retirement Strategies",
    "Tax Planning",
    "Estate Planning",
    "Risk Management",
  ],
  credentials: [
    { title: "Certified Financial Planner (CFP)", year: 2008 },
    { title: "Chartered Financial Analyst (CFA)", year: 2010 },
    {
      title: "Master of Business Administration (MBA)",
      institution: "Harvard Business School",
      year: 2006,
    },
  ],
  experience: [
    {
      role: "Senior Financial Advisor",
      company: "Global Wealth Management Inc.",
      duration: "2015 - Present",
      description:
        "Lead advisor for high-net-worth clients, managing portfolios exceeding $500M.",
    },
    {
      role: "Financial Analyst",
      company: "Investment Strategies LLC",
      duration: "2010 - 2015",
      description:
        "Conducted in-depth market research and developed investment strategies for institutional clients.",
    },
  ],
  reviews: [
    {
      author: "John D.",
      rating: 5,
      comment:
        "Jane's expertise in retirement planning has been invaluable. Highly recommended!",
    },
    {
      author: "Sarah M.",
      rating: 4,
      comment:
        "Great insights on tax optimization strategies. Very knowledgeable and professional.",
    },
    {
      author: "Robert L.",
      rating: 5,
      comment:
        "Jane's investment advice has significantly improved our company's financial position.",
    },
  ],
  overallRating: 4.8,
  availability: "Available for consultations Mon-Fri, 9 AM - 5 PM ET",
  pricing: {
    hourlyRate: "$250 - $350",
    projectBased: "Custom quotes based on project scope",
  },
};

export default function ExpertDetailsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="w-32 h-32">
          <AvatarImage src={expertData.profilePicture} alt={expertData.name} />
          <AvatarFallback>{expertData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{expertData.name}</h1>
          <p className="text-xl text-muted-foreground">{expertData.title}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            {expertData.primaryExpertise.map((expertise, index) => (
              <Badge key={index} variant="secondary">
                {expertise}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full">Request Quote</Button>
          <Button variant="outline" className="w-full">
            Schedule Consultation
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{expertData.summary}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-500" />
              <span>{expertData.yearsOfExperience} years of experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail />
              <a
                href={`mailto:${expertData.contact.email}`}
                className="hover:underline"
              >
                {expertData.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone />
              <a
                href={`tel:${expertData.contact.phone}`}
                className="hover:underline"
              >
                {expertData.contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin />
              <span>{expertData.contact.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="expertise">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="expertise">Expertise</TabsTrigger>
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="expertise">
          <Card>
            <CardHeader>
              <CardTitle>Expertise and Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                {expertData.expertise.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="credentials">
          <Card>
            <CardHeader>
              <CardTitle>Credentials and Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {expertData.credentials.map((credential, index) => (
                  <li key={index}>
                    <h3 className="font-semibold">{credential.title}</h3>
                    {credential.institution && (
                      <p className="text-sm text-muted-foreground">
                        {credential.institution}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Year: {credential.year}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle>Professional Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {expertData.experience.map((exp, index) => (
                  <li key={index}>
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company} | {exp.duration}
                    </p>
                    <p className="mt-1">{exp.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews and Ratings</CardTitle>
              <CardDescription>
                Overall Rating: {expertData.overallRating} / 5
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(expertData.overallRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {expertData.reviews.map((review, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.author}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Availability and Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Availability:</strong> {expertData.availability}
          </p>
          <Separator className="my-4" />
          <h3 className="font-semibold mb-2">Pricing:</h3>
          <ul>
            <li>
              <strong>Hourly Rate:</strong> {expertData.pricing.hourlyRate}
            </li>
            <li>
              <strong>Project-Based:</strong> {expertData.pricing.projectBased}
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Profile
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Bookmark className="w-4 h-4" />
          Save Profile
        </Button>
      </div>
    </div>
  );
}
