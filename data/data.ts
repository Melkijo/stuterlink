import { AccountData } from "@/types/types";

export const interest = [
    "Web Development",
    "UI/UX Design",
    "Mobile Development",
    "Machine Learning",
    "Cyber Security",
    "Game Development",
    "Cyber Security",
    "Game Development",
    ];

    export const interestList = [
        "Web Development",
        "UI/UX Design",
        "Mobile Development",
        "Machine Learning",
        "Cyber Security",
        "Game Development",
        "Cyber Security",
        "Game Development",
        ];
        
export const socialMedia = [
    {
        type: "Github",
        url: ""
    },
    {
        type: "Twitter",
        url: ""
    },
    {
        type: "LinkedIn",
        url: ""
    },
    {
        type: "Instagram",
        url: ""
    },
  
    {
        type: "Tiktok",
        url: ""
    },
    ];

    export const usernameDisable = [
        "login",
        "signup",
        "profile",
        "settings",
        "search",
        "explore",
        "notifications",
        "messages",
        "bookmarks",
        "lists",
        "profile",
        "more",
        "home",
        "api",
        "error",
        "404",
        "500",
        "terms",
        "privacy",
        "about",
        "contact",
        "help",
        "support",
        "status",
        "blog",
        "jobs",
        "cookies",
        "ads",
        "info",
        "brand",
        "advertising",
        "business",
        "developers",
        "directory",
        "settings",
        "account",
        "password",
        "security",
        "log-out",
        "log-in",
        "callback",
        "confirm",
      ];

      export const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    

    export const dummyAccount:AccountData = {
        name: "John Doe",
        email: "melkijonathan2@gmail.com",
        password: "password",
        username: "johndoe",
        resume: "https://www.resumemaker.online/es.php",
        profilePicture: "https://dufkorayqhkwairjodcm.supabase.co/storage/v1/object/public/stuterlink/profilePicture/default-image.png",
        pronouns: "He/Him",
        city: "Lagos",
        country: "Nigeria",
        interests: [
            "Web Development",
            "UI/UX Design",
            "Mobile Development",
            "Machine Learning",
            "Cyber Security",
            "Game Development",
            "Cyber Security",
            "Game Development",
        ],
        socialMedia: [{
            type: "Github",
            url: ""
        },
        {
            type: "Twitter",
            url: ""
        },
        {
            type: "LinkedIn",
            url: ""
        },
        {
            type: "Instagram",
            url: ""
        },
      
        {
            type: "Tiktok",
            url: ""
        },
        ],
        portfolios: [
            {
                image: "https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c",
                title: "Project 1",
                description: "This is a project description",
                url: "https://github.com"

            },
        {
            image: "https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c",
            title: "Project 2",
            description: "This is a project description",
            url: "https://github.com"
        },
        {
            image: "https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c",
            title: "Project 3",
            description: "This is a project description",
            url: "https://github.com"
        },
        ],
        
       

      

        otherLinks: [
            {
                image: "https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c",
                title: "Personal Website",
                url: "https://www.johndoe.com"
            },
            {
                image: "https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c",

                title: "Portfolio",
                url: "https://www.johndoe.com"
            },
            {
                image: "https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c",
                title: "Blog",
                url: "https://www.johndoe.com"
            },
        ]
    };