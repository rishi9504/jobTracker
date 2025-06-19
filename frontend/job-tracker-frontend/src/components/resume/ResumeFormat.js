const resumeData = {
    header: {
      name: "John Doe",
      title: "Software Engineer",
      phone: "XXX-XXXX-XXXX",
      email: "abV0F@example.com",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      location: "Bengaluru, India"
    },
    summary: "A full-stack engineer with ...",
    experience: [
      {
        title: "Software Engineer Advanced",
        company: "  ABC Corp",
        period: "07/2021 – Present",
        location: "Bangalore",
        bullets: [
          "Developed a recommendation-based full-stack application...",
          "Implemented Redis caching and Celery task queue...",
          // more
        ]
      },
      {
        title: "Software Engineer",
        company: "ABC Corp",
        period: "12/2018 – 07/2021",
        location: "Bengaluru",
        bullets: [
          "Developed modular front-end using Angular...",
          "Collaborated with the data analytics team..."
        ]
      }
    ],
    education: {
      degree: "Master's in Computer Application",
      university: "National Institute of Technology",
      period: "07/2016 – 05/2019",
      location: "Wisconsin, USA"
    },
    languages: ["English", "Hindi", "Marathi"],
    achievements: [
      "Security Champion at ABC Corp – 2021",
      "Best Employee of the Quarter – Q1 2022",
      "Emerging Talent of the Year – 2020"
    ],
    skills: [
      "Python", "JavaScript", "React", "Node.js", "SQL", "Angular", 
      "Django", "Flask", "AWS", "Redis", "Celery", "MongoDB", "Jenkins"
    ],
    projects: [
      {
        name: "Recommendation App",
        stack: ["React", "Flask", "PostgreSQL", "AWS"],
        description: "Developed a recommendation app..."
      },
      {
        name: "Medical Data Validation",
        stack: ["React", "Angular", "Django"],
        description: "Designed and implemented a medical data validation app..."
      }
    ],
    interests: ["Travelling", "Photography", "Writing Technical Blogs"]
  };
  
  export default resumeData;  