 export interface PortfolioItem {
    image: string;
    title: string;
    description: string;
    url: string;
  }

  export interface ExperienceItem {
    start_month: string;
    start_year: string;
    end_month: string;
    end_year: string;
    position: string;
    company: string;
    type: string;
    description: string;
    working_here: boolean;
   
  }

 export  interface CertificateItem {
    title: string;
    yearPublished: string;
    publishedBy: string;
    url: string;
  }

 export  interface EducationItem {
    school: string;
    degree: string;
    startYear: string;
    endYear: string;
    }
  
 export  interface AccountData {
    name: string;
    email: string;
    password: string;
    username: string;
    resume: string;
    profilePicture: string;
    pronouns: string;
    city: string;
    country: string;
    interests: string[];
    socialMedia: { type: string; url: string }[];
    portfolios: PortfolioItem[];
    // experiences: ExperienceItem[];
    certificates : CertificateItem[];
    education:  EducationItem[];
    otherLinks: { image:string; title: string; url: string }[];
  }