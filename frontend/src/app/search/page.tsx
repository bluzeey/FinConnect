"use client";
import React, { useState } from "react";
import { Search, MapPin, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Import the Sidebar component
import Sidebar from "@/components/sidebar"; // Adjust the import path as needed

// Mock data for financial experts
const mockExperts = [
  {
    id: 1,
    name: "John Doe",
    expertise: "Accounting",
    rating: 4.8,
    priceRange: "$100-$150/hr",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Jane Smith",
    expertise: "CFO Services",
    rating: 4.9,
    priceRange: "$150-$200/hr",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    name: "Mike Johnson",
    expertise: "AR Revenue Collection",
    rating: 4.7,
    priceRange: "$80-$120/hr",
    location: "Chicago, IL",
  },
];

const expertiseOptions = [
  "Accounting",
  "CFO Services",
  "AR Revenue Collection",
  "Financial Planning",
  "Tax Consulting",
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredExperts = mockExperts.filter((expert) => filterExperts(expert));

  function filterExperts(expert: (typeof mockExperts)[0]): boolean {
    return (
      (searchTerm === "" ||
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.expertise.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedExpertise.length === 0 ||
        selectedExpertise.includes(expert.expertise)) &&
      (selectedLocation === "" || expert.location.includes(selectedLocation)) &&
      expert.rating >= minRating &&
      parseInt(expert.priceRange.split("-")[0].replace("$", "")) >=
        priceRange[0] &&
      parseInt(
        expert.priceRange.split("-")[1].replace("$", "").replace("/hr", "")
      ) <= priceRange[1]
    );
  }

  const sortedExperts = [...filteredExperts].sort((a, b) => sortExperts(a, b));

  function sortExperts(
    a: (typeof mockExperts)[0],
    b: (typeof mockExperts)[0]
  ): number {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "priceLowToHigh":
        return (
          parseInt(a.priceRange.split("-")[0].replace("$", "")) -
          parseInt(b.priceRange.split("-")[0].replace("$", ""))
        );
      case "priceHighToLow":
        return (
          parseInt(
            b.priceRange.split("-")[1].replace("$", "").replace("/hr", "")
          ) -
          parseInt(
            a.priceRange.split("-")[1].replace("$", "").replace("/hr", "")
          )
        );
      default:
        return 0;
    }
  }

  const pageCount = Math.ceil(sortedExperts.length / itemsPerPage);
  const displayedExperts = sortedExperts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTab="Search" />

      {/* Main content area */}
      <main className="flex-1 p-4">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8">Find Financial Experts</h1>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for experts by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Panel */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location Filter */}
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select onValueChange={setSelectedLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New York, NY">
                          New York, NY
                        </SelectItem>
                        <SelectItem value="Los Angeles, CA">
                          Los Angeles, CA
                        </SelectItem>
                        <SelectItem value="Chicago, IL">Chicago, IL</SelectItem>
                        {/* Add more locations as needed */}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Expertise Filter */}
                  <div>
                    <Label>Expertise</Label>
                    {expertiseOptions.map((expertise) => (
                      <div
                        key={expertise}
                        className="flex items-center space-x-2 mt-2"
                      >
                        <Checkbox
                          id={expertise}
                          checked={selectedExpertise.includes(expertise)}
                          onCheckedChange={(checked) => {
                            setSelectedExpertise(
                              checked
                                ? [...selectedExpertise, expertise]
                                : selectedExpertise.filter(
                                    (e) => e !== expertise
                                  )
                            );
                          }}
                        />
                        <label
                          htmlFor={expertise}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {expertise}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Ratings Filter */}
                  <div>
                    <Label>Minimum Rating</Label>
                    <RadioGroup
                      defaultValue="0"
                      onValueChange={(value) => setMinRating(parseFloat(value))}
                    >
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={rating.toString()}
                            id={`rating-${rating}`}
                          />
                          <Label htmlFor={`rating-${rating}`}>
                            {rating === 0 ? "Any" : `${rating}+`}{" "}
                            <Star className="inline-block w-4 h-4" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <Label>Price Range (per hour)</Label>
                    <Slider
                      min={0}
                      max={200}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Results */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-4">
                <p>{filteredExperts.length} experts found</p>
                <Select onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="priceLowToHigh">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="priceHighToLow">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {displayedExperts.map((expert) => (
                <Card key={expert.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{expert.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{expert.expertise}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{expert.rating}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{expert.location}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>{expert.priceRange}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Profile</Button>
                    <Button>Request Quote</Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="mx-4">
                  Page {currentPage} of {pageCount}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, pageCount))
                  }
                  disabled={currentPage === pageCount}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
