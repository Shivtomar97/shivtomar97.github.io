// Central skills data repository
const skillsData = {
    // Key skills with proficiency levels for progress bars
    keySkills: [
        { name: "Python", level: 90 },
        { name: "AWS", level: 85 },
        { name: "ETL", level: 83 },
        { name: "Analytics", level: 85 },
        { name: "Engineering", level: 85 },
        { name: "AI", level: 75 }
    ],
    
    // Categorized skills for both pages
    categories: [
        {
            name: "Programming",
            resumeCategory: "Languages",
            skills: ["Python", "SQL", "Java", "JavaScript", "Shell Scripting"]
        },
        {
            name: "Data Engineering",
            resumeCategory: "Data Engineering",
            skills: ["ETL", "Data Pipelines", "Jenkins", "Apache Spark", "Hadoop", "Workflow Orchestration", "Airflow", "Kafka", "AWS Glue"]
        },
        {
            name: "Artificial Intelligence",
            resumeCategory: "AI & Analytics",
            skills: ["Cursor AI", "Machine Learning", "Generative AI", "NLP", "Predictive Analytics", "AI Prototyping"]
        },
        {
            name: "Data Analysis",
            resumeCategory: "AI & Analytics",
            skills: ["Pandas", "NumPy", "Data Visualization", "Machine Learning", "Tableau", "Looker Studio", "Power BI"]
        },
        {
            name: "Databases",
            resumeCategory: "Databases",
            skills: ["MySQL", "PostgreSQL", "MongoDB", "Snowflake", "DynamoDB", "NRQL"]
        },
        {
            name: "Cloud Technologies",
            resumeCategory: "Cloud & DevOps",
            skills: ["AWS", "AWS EMR", "AWS IAM", "AWS S3", "AWS Lambda", "AWS EC2", "AWS CloudWatch", "Serverless", "Docker", "Kubernetes"]
        },
        {
            name: "Tools & Methodologies",
            resumeCategory: "Tools & Methodologies",
            skills: ["Git", "CI/CD", "Agile", "Jira", "Data Modeling", "New Relic", "Datadog", "Postman", "Jupyter Notebooks", "Lucidchart"]
        }
    ]
};

// Function to populate skills on the main portfolio page
function populateMainPageSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;
    
    // Clear existing content
    skillsContainer.innerHTML = '';
    
    // Add each category and its skills
    skillsData.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category fade-in';
        
        categoryDiv.innerHTML = `
            <h3>${category.name}</h3>
            <div class="skills-list">
                ${category.skills.map(skill => `<span>${skill}</span>`).join('')}
            </div>
        `;
        
        skillsContainer.appendChild(categoryDiv);
    });
}

// Function to populate skills on the resume page
function populateResumeSkills() {
    // Populate key skills in sidebar
    const keySkillsBars = document.querySelector('.skills-section .skill-bars');
    if (keySkillsBars) {
        keySkillsBars.innerHTML = '';
        
        skillsData.keySkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-name">${skill.name}</span>
                <div class="skill-progress">
                    <div class="skill-level" style="width: ${skill.level}%"></div>
                </div>
            `;
            keySkillsBars.appendChild(skillItem);
        });
    }
    
    // Populate technologies and tools section
    const techCategories = document.querySelector('.technology-categories');
    if (techCategories) {
        // Create an object to group skills by resume category
        const resumeCategoryMap = {};
        
        skillsData.categories.forEach(category => {
            if (!resumeCategoryMap[category.resumeCategory]) {
                resumeCategoryMap[category.resumeCategory] = [];
            }
            
            // Add skills to this resume category, avoiding duplicates
            category.skills.forEach(skill => {
                if (!resumeCategoryMap[category.resumeCategory].includes(skill)) {
                    resumeCategoryMap[category.resumeCategory].push(skill);
                }
            });
        });
        
        // Clear existing content
        techCategories.innerHTML = '';
        
        // Add each resume category and its skills
        Object.keys(resumeCategoryMap).forEach(categoryName => {
            const skills = resumeCategoryMap[categoryName];
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'tech-category';
            
            categoryDiv.innerHTML = `
                <h4>${categoryName}</h4>
                <div class="tech-tags">
                    ${skills.map(skill => `<span>${skill}</span>`).join('')}
                </div>
            `;
            
            techCategories.appendChild(categoryDiv);
        });
    }
}

// Initialize skills based on the current page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('resume.html')) {
        populateResumeSkills();
    } else {
        populateMainPageSkills();
    }
}); 