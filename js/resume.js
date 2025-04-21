// Resume Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log("Resume.js loaded - initializing...");
    
    // Initialize skills from skills-data.js
    if (typeof populateResumeSkills === 'function') {
        console.log("Calling populateResumeSkills()");
        populateResumeSkills();
    } else {
        console.error("populateResumeSkills function not found");
        
        // Fallback implementation if the function is not available
        const techCategories = document.querySelector('.technology-categories');
        if (techCategories && typeof skillsData !== 'undefined') {
            console.log("Using fallback implementation for tech categories");
            
            // Create category map
            const categoryMap = {};
            skillsData.categories.forEach(cat => {
                if (!categoryMap[cat.resumeCategory]) {
                    categoryMap[cat.resumeCategory] = [];
                }
                
                cat.skills.forEach(skill => {
                    if (!categoryMap[cat.resumeCategory].includes(skill)) {
                        categoryMap[cat.resumeCategory].push(skill);
                    }
                });
            });
            
            // Populate categories
            techCategories.innerHTML = '';
            Object.keys(categoryMap).forEach(catName => {
                const skills = categoryMap[catName];
                
                const catDiv = document.createElement('div');
                catDiv.className = 'tech-category';
                
                catDiv.innerHTML = `
                    <h4>${catName}</h4>
                    <div class="tech-tags">
                        ${skills.map(skill => `<span>${skill}</span>`).join('')}
                    </div>
                `;
                
                techCategories.appendChild(catDiv);
            });
        }
    }
}); 