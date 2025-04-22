// Project Cards Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const body = document.body;
    
    // Create modal element
    const modal = document.createElement('div');
    modal.classList.add('project-modal');
    
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    
    // Modal close button
    const modalClose = document.createElement('div');
    modalClose.classList.add('modal-close');
    modalClose.innerHTML = '<i class="fas fa-times"></i>';
    
    modalContainer.innerHTML = `
        <div class="modal-header">
            <div class="placeholder"></div>
        </div>
        <div class="modal-body">
            <h2 class="modal-title"></h2>
            <div class="modal-company"><i class="fas fa-building"></i> <span class="company-name"></span></div>
            <p class="modal-summary"></p>
            
            <div class="impact-badges"></div>
            
            <div class="modal-details">
                <div class="detail-section">
                    <h4><i class="fas fa-laptop-code"></i> Tech Stack</h4>
                    <ul class="tech-stack-list"></ul>
                </div>
                
                <div class="detail-section problem">
                    <h4><i class="fas fa-exclamation-triangle"></i> Problem</h4>
                    <div class="problem-content"></div>
                </div>
                
                <div class="detail-section solution">
                    <h4><i class="fas fa-wrench"></i> Solution</h4>
                    <div class="solution-content"></div>
                </div>
                
                <div class="detail-section design">
                    <h4><i class="fas fa-brain"></i> Key Design Decisions</h4>
                    <div class="design-decisions-content design-list"></div>
                </div>
                
                <div class="detail-section results">
                    <h4><i class="fas fa-chart-line"></i> Results/Impact</h4>
                    <div class="impact-content results-list"></div>
                </div>
                
                <div class="detail-section bonus bonus-section">
                    <h4><i class="fas fa-plus-circle"></i> Bonus/Notes</h4>
                    <div class="bonus-content"></div>
                </div>
            </div>
            
            <div class="modal-links"></div>
        </div>
    `;
    
    modalContainer.appendChild(modalClose);
    modal.appendChild(modalOverlay);
    modal.appendChild(modalContainer);
    body.appendChild(modal);
    
    // Store original project data before minimizing cards
    const projectData = [
        {
            // Dockerized Airflow Project
            img: '<div class="placeholder placeholder-airflow"></div>',
            title: 'Dockerized Airflow QA Environment',
            company: 'Capital One',
            companyLogo: 'assets/cap-one-logo.png',
            summary: 'Built a containerized Airflow testing environment that accelerated development and reduced integration failures.',
            impactBadges: [
                { value: '60%', label: 'Testing cycle reduction' },
                { value: '40%', label: 'Fewer integration failures' }
            ],
            techStack: [
                'Docker', 'Python', 'Airflow', 'Jenkins CI/CD', 'AWS EC2', 'Bash'
            ],
            problem: 'Development team suffered from lengthy QA cycles and frequent integration failures when testing Airflow data pipelines, causing significant project delays.',
            solution: 'Led the setup of a containerized Airflow environment using Docker for local development and testing, creating a standardized test environment for all engineers.',
            designDecisions: 'Implemented volume mounting for DAG directory to enable live code changes without container rebuilds. Created custom Docker network configuration to simulate production services.',
            impact: 'Reduced testing cycle time by 60%, enabled faster development iterations, and significantly decreased integration failures in production.',
            bonus: 'Developed documentation and onboarding guides that reduced new engineer ramp-up time from weeks to days.',
            links: [
                {
                    text: 'Case Study',
                    href: '#',
                    icon: '<i class="fas fa-file-alt"></i> '
                }
            ],
            category: 'devops'
        },
        {
            // Pycube MDM Project 
            img: '<div class="placeholder placeholder-mdm"></div>',
            title: 'Healthcare Asset Management System',
            company: 'Pycube Inc',
            companyLogo: 'assets/pycube-logo.png',
            summary: 'Built a Master Data Management system for healthcare asset tracking across multiple hospitals.',
            impactBadges: [
                { value: '35%', label: 'Reduction in misplacements' },
                { value: '70%', label: 'Increased savings' }
            ],
            techStack: [
                'Python', 'Flask', 'PostgreSQL', 'Redis', 'AWS S3', 'Docker', 'Data Management', 'Healthcare'
            ],
            problem: 'Healthcare organizations struggled with tracking medical equipment across multiple facilities, leading to inefficient asset utilization and compliance issues.',
            solution: 'Built a Master Data Management system for healthcare asset tracking that processed 50K+ medical devices across 12 hospitals using Python and modern data management techniques.',
            designDecisions: 'Implemented a flexible schema to accommodate diverse device types and attributes. Created a robust deduplication algorithm to identify and merge duplicate asset records.',
            impact: 'Reduced asset misplacements by 35% and improved maintenance compliance by 28%, saving hospitals significant operational costs.',
            bonus: 'Integrated with RFID tracking systems for real-time location data from multiple vendors.',
            links: [
                {
                    text: 'View Code',
                    href: 'https://github.com/Pycube-FP/Pycube-MDM',
                    icon: '<i class="fas fa-code"></i> '
                },
                {
                    text: 'Live Demo',
                    href: '#',
                    icon: '<i class="fas fa-external-link-alt"></i> '
                }
            ],
            category: 'data-engineering'
        },
        {
            // EMR Log Retrieval Project
            img: '<div class="placeholder placeholder-emr-logs"></div>',
            title: 'Automated EMR Log Retrieval Pipeline',
            company: 'Capital One',
            companyLogo: 'assets/cap-one-logo.png',
            summary: 'Automated log analysis system that drastically reduced debugging time for ML features in production.',
            impactBadges: [
                { value: '70%', label: 'Less debugging time' },
                { value: '90%', label: 'Faster issue detection' }
            ],
            techStack: [
                'Python', 'AWS EMR', 'AWS Lambda', 'Airflow', 'Slack API', 'S3', 'CloudWatch'
            ],
            problem: 'Data scientists were spending hours manually retrieving and parsing EMR logs to debug failed ML feature jobs, delaying critical model updates.',
            solution: 'Developed an automated system with Airflow to retrieve and parse EMR logs for failed ML features, with integrated real-time Slack alerts and enhanced exception handling.',
            designDecisions: 'Created a serverless architecture using Lambda for log processing to minimize costs. Implemented smart filtering to reduce noise and highlight critical errors.',
            impact: 'Cut down manual debugging time by 70%, enabling faster issue resolution and significantly improving ML feature deployment reliability.',
            bonus: 'Added a self-service UI that allowed data scientists to query historical logs without engineering assistance.',
            links: [
                {
                    text: 'Details',
                    href: '#',
                    icon: '<i class="fas fa-info-circle"></i> '
                }
            ],
            category: 'automation'
        },
        {
            // ML Monitoring Project
            img: '<div class="placeholder placeholder-monitoring"></div>',
            title: 'ML Feature Observability Dashboard',
            company: 'Capital One',
            companyLogo: 'assets/cap-one-logo.png',
            summary: 'Developed a centralized monitoring system called OneDash that provides real-time visibility into ML feature pipeline performance, data quality, and failure patterns.',
            impactBadges: [
                { value: '80%', label: 'Reduced incident resolution time' },
                { value: '30%', label: 'Improved feature data accuracy' },
                { value: '75%', label: 'Less debugging time' }
            ],
            techStack: [
                'Python', 'AWS Lambda', 'CloudWatch', 'New Relic', 'Grafana', 'Flask', 'React', 'Machine Learning', 'AWS', 'Monitoring'
            ],
            problem: 'Data scientists lacked visibility into which ML features were running successfully, failing silently, or producing bad data. Debugging issues required manually inspecting logs, wasting hours of valuable time and allowing bad data to persist undetected.',
            solution: 'Developed a centralized ML observability dashboard called OneDash that pulls real-time metrics from the feature ETL pipelines and New Relic into a visual summary, showing feature status, failures with error categorization, data quality check failures, active Glue jobs, and filters by feature owner, domain, and data source.',
            designDecisions: 'Built a custom New Relic Monitor Class to standardize metric pushes from feature codebases. Used NRQL queries to fetch metrics efficiently by feature group, owner, and failure type. Built backend filters and metadata tagging so users could view only their features. Implemented standardized categorization of error types for consistent reporting.',
            impact: 'Achieved 80% reduction in incident resolution time. Improved feature data accuracy by 30%. Decreased manual root-cause debugging from 2-3 hours to under 30 minutes. Dashboard was adopted by 50+ data scientists within the organization within just 2 months.',
            bonus: 'Integrated alerting via Slack for real-time issue notifications. Planned next iteration to include anomaly detection on feature value distributions to catch subtle data drift issues before they impact models.',
            links: [
                {
                    text: 'Dashboard Demo',
                    href: '#',
                    icon: '<i class="fas fa-chart-line"></i> '
                }
            ],
            category: 'monitoring'
        },
        {
            // Data Quality Project
            img: '<div class="placeholder placeholder-data-quality"></div>',
            title: 'Data Quality & Submission Tracker',
            company: 'Capital One',
            companyLogo: 'assets/cap-one-logo.png',
            summary: 'Built a data validation pipeline that ensured regulatory compliance for healthcare data submissions.',
            impactBadges: [
                { value: '99.8%', label: 'Data accuracy achieved' },
                { value: '45%', label: 'Less manual verification' },
                { value: '100%', label: 'Compliance rate' }
            ],
            techStack: [
                'Python', 'Airflow', 'AWS S3', 'Snowflake', 'Tableau', 'Data Quality', 'Healthcare'
            ],
            problem: 'Healthcare data submissions to regulatory bodies were error-prone, requiring extensive manual verification and risking costly compliance violations.',
            solution: 'Built a comprehensive data validation pipeline with automated DAG tracking to ensure quality, completeness, and timeliness of regulatory submissions.',
            designDecisions: 'Implemented a multi-stage validation approach with increasingly strict checks. Created a tracking system to ensure every submission was accounted for.',
            impact: 'Achieved 99.8% data accuracy, maintained perfect compliance record, and reduced manual verification time by 45%.',
            bonus: 'Developed a historical validation tool that allowed reprocessing past submissions against new regulatory rules.',
            links: [
                {
                    text: 'Demo',
                    href: '#',
                    icon: '<i class="fas fa-desktop"></i> '
                }
            ],
            category: 'data-quality'
        },
        {
            // Migration Project
            img: '<div class="placeholder placeholder-migration"></div>',
            title: 'Cloud Data Migration Framework',
            company: 'Capital One',
            companyLogo: 'assets/cap-one-logo.png',
            summary: 'Led the design and implementation of a framework to migrate petabyte-scale data environments to AWS.',
            impactBadges: [
                { value: '$2.1M', label: 'Annual cost savings' },
                { value: '30%', label: 'Performance improvement' },
                { value: '0', label: 'Data loss incidents' }
            ],
            techStack: [
                'Python', 'AWS Glue', 'S3', 'DynamoDB', 'Lambda', 'Step Functions', 'AWS', 'Data Migration'
            ],
            problem: 'Legacy on-premise data warehouses were costly to maintain, difficult to scale, and lacked modern features needed for advanced analytics.',
            solution: 'Architected a comprehensive migration framework with automated validation, reconciliation, and rollback capabilities to safely transfer petabyte-scale data to AWS.',
            designDecisions: 'Implemented a multi-phase migration approach with staged validation gates. Designed a metadata-driven reconciliation engine that ensured data integrity.',
            impact: 'Successfully migrated 18 critical data environments with zero data loss, achieving $2.1M annual cost savings and 30% performance improvement.',
            bonus: 'Created a reusable toolkit that reduced subsequent migration times by 60%, accelerating the company\'s cloud transformation initiative.',
            links: [
                {
                    text: 'Architecture',
                    href: '#',
                    icon: '<i class="fas fa-sitemap"></i> '
                }
            ],
            category: 'cloud-migration'
        },
        {
            // Hospital Dashboard
            img: '<div class="placeholder placeholder-hospital"></div>',
            title: 'Hospital Supply Chain Dashboard',
            company: 'Pycube Inc',
            companyLogo: 'assets/pycube-logo.png',
            summary: 'Created an interactive supply chain visualization system that optimized inventory management across multiple facilities.',
            impactBadges: [
                { value: '32%', label: 'Inventory cost reduction' },
                { value: '98%', label: 'Critical supply availability' },
                { value: '4hrs', label: 'To emergency response' }
            ],
            techStack: [
                'Python', 'Flask', 'PostgreSQL', 'AWS EC2', 'Healthcare', 'Supply Chain', 'Data Visualization'
            ],
            problem: 'Hospital network lacked real-time visibility into supply chain status, leading to overstock of some items and critical shortages of others.',
            solution: 'Developed an interactive dashboard that visualized inventory levels, predicted stockouts, and optimized procurement across multiple hospital facilities.',
            designDecisions: 'Implemented predictive analytics to forecast seasonal demand patterns. Created an alert system prioritized by clinical impact of potential shortages.',
            impact: 'Reduced inventory costs by 32% while maintaining 98% availability of critical supplies, even during demand surges.',
            bonus: 'Added an emergency response mode that could rapidly locate and redistribute critical supplies during mass casualty events.',
            links: [
                {
                    text: 'Dashboard Demo',
                    href: '#',
                    icon: '<i class="fas fa-chart-line"></i> '
                }
            ],
            category: 'data-visualization'
        },
        {
            // Prototyping MVPs
            img: '<div class="placeholder placeholder-prototyping"></div>',
            title: 'Rapid Prototyping: Full-Stack MVPs',
            company: 'Pycube Inc',
            companyLogo: 'assets/pycube-logo.png',
            summary: 'Led a fast-paced team building proof-of-concept applications for healthcare data solutions.',
            impactBadges: [
                { value: '60%', label: 'Faster product validation' },
                { value: '3', label: 'Successful products launched' },
                { value: '5x', label: 'ROI on prototyping investment' }
            ],
            techStack: [
                'React', 'Node.js', 'Python', 'Flask', 'AWS', 'MongoDB', 'Prototyping', 'Full-Stack', 'Healthcare'
            ],
            problem: 'Traditional development cycles were too slow to validate market fit for new product ideas, resulting in wasted development resources.',
            solution: 'Established a lean prototyping team that rapidly built MVPs using modern tools like React, AWS serverless, and Python to validate product concepts before full investment.',
            designDecisions: 'Prioritized speed over perfection, using serverless architecture to minimize infrastructure setup. Created reusable component libraries to accelerate UI development.',
            impact: 'Accelerated product validation by 60%, leading to 3 successful commercial product launches with 5x return on prototyping investment.',
            bonus: 'Developed an innovation pipeline process that helped business stakeholders better define and prioritize product features based on user feedback from prototypes.',
            links: [
                {
                    text: 'Gallery',
                    href: '#',
                    icon: '<i class="fas fa-images"></i> '
                }
            ],
            category: 'rapid-development'
        }
    ];
    
    // Project card click handler
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // If clicking on a link inside the card, don't open modal
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Get project data from our stored array
            const project = projectData[index];
            
            // Populate modal with the saved data
            const modalHeader = modalContainer.querySelector('.modal-header');
            modalHeader.innerHTML = project.img;
            
            modalContainer.querySelector('.modal-title').textContent = project.title;
            
            // Update company display with logo if available
            const modalCompany = modalContainer.querySelector('.modal-company');
            if (project.companyLogo) {
                modalCompany.innerHTML = `<img src="${project.companyLogo}" alt="${project.company}" class="company-logo-small" title="${project.company}">`;
            } else {
                modalCompany.innerHTML = `<i class="fas fa-building"></i> ${project.company}`;
            }
            
            modalContainer.querySelector('.modal-summary').textContent = project.summary;
            
            // Populate impact badges
            const impactBadges = modalContainer.querySelector('.impact-badges');
            impactBadges.innerHTML = '';
            
            project.impactBadges.forEach(badge => {
                const badgeElement = document.createElement('div');
                badgeElement.className = 'impact-badge';
                badgeElement.innerHTML = `<span class="impact-value">${badge.value}</span><span class="impact-label">${badge.label}</span>`;
                impactBadges.appendChild(badgeElement);
            });
            
            // Populate tech stack list
            const techStackList = modalContainer.querySelector('.tech-stack-list');
            techStackList.innerHTML = '';
            
            // Add all tech stack items with consistent project-tag styling
            project.techStack.forEach(tag => {
                const tagItem = document.createElement('li');
                tagItem.textContent = tag;
                tagItem.className = 'project-tag'; // Use the consistent project-tag styling
                techStackList.appendChild(tagItem);
            });
            
            // Populate content sections
            modalContainer.querySelector('.problem-content').innerHTML = project.problem;
            modalContainer.querySelector('.solution-content').innerHTML = project.solution;
            
            // Format design decisions as a list with icons
            const designContent = modalContainer.querySelector('.design-decisions-content');
            const designPoints = project.designDecisions.split('. ').filter(p => p.trim() !== '');
            if (designPoints.length > 1) {
                designContent.innerHTML = '';
                designPoints.forEach(point => {
                    if (point.trim()) {
                        designContent.innerHTML += `<li><i class="fas fa-cog"></i>${point.trim()}${!point.endsWith('.') ? '.' : ''}</li>`;
                    }
                });
            } else {
                designContent.innerHTML = project.designDecisions;
            }
            
            // Format impact results as a list with icons
            const impactContent = modalContainer.querySelector('.impact-content');
            const impactPoints = project.impact.split('. ').filter(p => p.trim() !== '');
            
            if (impactPoints.length > 1) {
                impactContent.innerHTML = '';
                impactPoints.forEach((point, index) => {
                    if (point.trim()) {
                        let iconClass = 'fas fa-check-circle result-success';
                        
                        // Assign different icons based on content
                        if (point.toLowerCase().includes('time') || point.toLowerCase().includes('faster') || 
                            point.toLowerCase().includes('speed') || point.toLowerCase().includes('quick')) {
                            iconClass = 'fas fa-clock result-time';
                        } else if (point.toLowerCase().includes('accuracy') || point.toLowerCase().includes('quality') || 
                                  point.toLowerCase().includes('improv')) {
                            iconClass = 'fas fa-bullseye result-accuracy';
                        } else if (point.toLowerCase().includes('user') || point.toLowerCase().includes('adopt') || 
                                  point.toLowerCase().includes('team')) {
                            iconClass = 'fas fa-users result-users';
                        }
                        
                        impactContent.innerHTML += `<li><i class="${iconClass}"></i>${point.trim()}${!point.endsWith('.') ? '.' : ''}</li>`;
                    }
                });
            } else {
                impactContent.innerHTML = project.impact;
            }
            
            modalContainer.querySelector('.bonus-content').innerHTML = project.bonus;
            
            // Show/hide bonus section if there's content
            const bonusSection = modalContainer.querySelector('.bonus-section');
            bonusSection.style.display = project.bonus ? 'block' : 'none';
            
            // Populate links
            const modalLinks = modalContainer.querySelector('.modal-links');
            modalLinks.innerHTML = '';
            
            project.links.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.href = link.href;
                linkElement.className = 'btn-link';
                linkElement.innerHTML = link.icon + link.text;
                modalLinks.appendChild(linkElement);
            });
            
            // Show modal
            modal.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Ensure modal content is scrolled to the top
            const modalBody = modalContainer.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        });
    });
    
    // Close modal when clicking overlay or close button
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
    }
    
    // Update project cards to show compact version of the data
    function updateProjectCards() {
        projectCards.forEach((card, index) => {
            const project = projectData[index];
            if (!project) return;
            
            // Update image placeholder
            const imgContainer = card.querySelector('.project-img');
            if (imgContainer) {
                imgContainer.innerHTML = project.img;
            }
            
            // Clear card content and rebuild with compact info
            const content = card.querySelector('.project-content');
            if (!content) return;
            
            content.innerHTML = '';
            
            // Add title
            const titleElement = document.createElement('h3');
            titleElement.className = 'project-title';
            titleElement.textContent = project.title;
            content.appendChild(titleElement);
            
            // Add company
            const companyElement = document.createElement('div');
            companyElement.className = 'project-company';
            
            // Use company logo if available, otherwise fallback to text with icon
            if (project.companyLogo) {
                companyElement.innerHTML = `<img src="${project.companyLogo}" alt="${project.company}" class="company-logo-small" title="${project.company}">`;
            } else {
                companyElement.innerHTML = `<i class="fas fa-building"></i> ${project.company}`;
            }
            
            content.appendChild(companyElement);
            
            // Add brief description
            const brief = document.createElement('p');
            brief.className = 'project-brief';
            brief.textContent = project.summary;
            content.appendChild(brief);
            
            // Add impact badges (up to 2)
            if (project.impactBadges && project.impactBadges.length > 0) {
                const badgesContainer = document.createElement('div');
                badgesContainer.className = 'card-impact-badges';
                
                const maxBadges = Math.min(2, project.impactBadges.length);
                for (let i = 0; i < maxBadges; i++) {
                    const badge = project.impactBadges[i];
                    const badgeElement = document.createElement('div');
                    badgeElement.className = 'card-impact-badge';
                    badgeElement.innerHTML = `<span class="card-impact-value">${badge.value}</span> <span class="card-impact-label">${badge.label}</span>`;
                    badgesContainer.appendChild(badgeElement);
                }
                
                content.appendChild(badgesContainer);
            }
            
            // Add tags (up to 3)
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'card-tags';
            
            const maxTags = Math.min(4, project.techStack.length);
            for (let i = 0; i < maxTags; i++) {
                const tag = document.createElement('span');
                tag.className = 'project-tag';
                tag.textContent = project.techStack[i];
                tagsContainer.appendChild(tag);
            }
            
            if (project.techStack.length > maxTags) {
                const more = document.createElement('span');
                more.className = 'project-tag more-tag';
                more.textContent = '+' + (project.techStack.length - maxTags);
                tagsContainer.appendChild(more);
            }
            
            content.appendChild(tagsContainer);
            
            // Add view details indicator
            const viewDetails = document.createElement('div');
            viewDetails.className = 'view-details';
            viewDetails.innerHTML = 'View Details <i class="fas fa-arrow-right"></i>';
            content.appendChild(viewDetails);
        });
    }
    
    // Initialize compact cards
    updateProjectCards();
}); 