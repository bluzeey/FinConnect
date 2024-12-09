export interface userData {
  id: string;
  name: string;
  role: "expert" | "user";
  email: string;
  phone: string;
  location: string;
  profilePicture: string;

  // Expert-specific fields
  title?: string; // Optional because not all users are experts
  expertise?: string[];
  experience?: {
    role: string;
    company: string;
    duration: string;
  }[];
  certifications?: string[];
  availability?: string;
  pricing?: {
    hourlyRate: string;
    projectBased: string;
  };

  // User-specific fields
  summary?: string; // Optional because not all users are regular users
  savedExperts?: string[];
  pastConsultations?: string[];
  searchPreferences?: string[];
}


export interface ProfileProps {
  userData: userData;
  isEditing: boolean;
  editedUser: userData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
