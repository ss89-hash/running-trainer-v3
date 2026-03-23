// ========================================
// Running Trainer - Modern Wizard App
// ========================================

// State Management
let currentStep = 1;
const totalSteps = 4;

const stepNames = {
    1: 'Race Selection',
    2: 'Experience Level',
    3: 'Training Duration',
    4: 'Goals & Mileage'
};

const formData = {
    raceType: '',
    experienceLevel: '',
    weeksAvailable: '12',
    runningDaysPerWeek: '',
    currentMileage: '',
    goal: ''
};

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupValidation();
    animateOnScroll();
});

function initializeForm() {
    // Set initial progress
    updateProgress();
    
    // Initialize range slider value display
    const weeksSlider = document.getElementById('weeksAvailable');
    if (weeksSlider) {
        updateWeeksValue(weeksSlider.value);
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

function setupValidation() {
    // Real-time validation for text inputs
    const mileageInput = document.getElementById('currentMileage');
    const goalInput = document.getElementById('goal');
    
    if (mileageInput) {
        mileageInput.addEventListener('input', function() {
            validateTextInput(this);
        });
    }
    
    if (goalInput) {
        goalInput.addEventListener('input', function() {
            validateTextInput(this);
        });
    }
}

// ========================================
// Wizard Navigation
// ========================================
function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    // Animate out current step
    const currentStepEl = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
    currentStepEl.classList.add('fade-out');
    
    setTimeout(() => {
        currentStepEl.classList.remove('active', 'fade-out');
        
        currentStep++;
        
        const nextStepEl = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
        nextStepEl.classList.add('active');
        
        updateProgress();
        updateButtons();
        
        // Trigger animations for new step elements
        animateStepElements(currentStep);
    }, 300);
}

function previousStep() {
    if (currentStep <= 1) return;
    
    // Animate out current step
    const currentStepEl = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
    currentStepEl.classList.add('fade-out');
    
    setTimeout(() => {
        currentStepEl.classList.remove('active', 'fade-out');
        
        currentStep--;
        
        const prevStepEl = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
        prevStepEl.classList.add('active');
        
        updateProgress();
        updateButtons();
    }, 300);
}

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const currentStepNum = document.getElementById('currentStepNum');
    const totalStepsEl = document.getElementById('totalSteps');
    const stepName = document.getElementById('stepName');
    
    const progress = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
    currentStepNum.textContent = currentStep;
    totalStepsEl.textContent = totalSteps;
    stepName.textContent = stepNames[currentStep];
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generateBtn = document.getElementById('generateBtn');
    
    // Previous button
    if (currentStep === 1) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    
    // Next vs Generate button
    if (currentStep === totalSteps) {
        nextBtn.classList.add('hidden');
        generateBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        generateBtn.classList.add('hidden');
    }
}

// ========================================
// Selection Functions
// ========================================
function selectRace(value) {
    formData.raceType = value;
    
    // Update UI
    document.querySelectorAll('.race-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.value === value) {
            card.classList.add('selected');
        }
    });
    
    // Clear error
    clearError('raceError');
    
    // Auto-advance after short delay
    setTimeout(() => {
        if (currentStep === 1 && validateStep1()) {
            nextStep();
        }
    }, 400);
}

function selectExperience(value) {
    formData.experienceLevel = value;
    
    // Update UI
    document.querySelectorAll('.experience-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.value === value) {
            card.classList.add('selected');
        }
    });
    
    // Clear error
    clearError('experienceError');
    
    // Auto-advance after short delay
    setTimeout(() => {
        if (currentStep === 2 && validateStep2()) {
            nextStep();
        }
    }, 400);
}

function selectDays(value) {
    formData.runningDaysPerWeek = value;
    
    // Update UI
    document.querySelectorAll('.day-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.value === value) {
            card.classList.add('selected');
        }
    });
}

function updateWeeksValue(value) {
    formData.weeksAvailable = value;
    document.getElementById('weeksValue').textContent = value;
}

// ========================================
// Validation
// ========================================
function validateCurrentStep() {
    switch(currentStep) {
        case 1: return validateStep1();
        case 2: return validateStep2();
        case 3: return validateStep3();
        case 4: return validateStep4();
        default: return false;
    }
}

function validateStep1() {
    if (!formData.raceType) {
        showError('raceError', 'Please select a race distance to continue');
        return false;
    }
    clearError('raceError');
    return true;
}

function validateStep2() {
    if (!formData.experienceLevel) {
        showError('experienceError', 'Please select your experience level');
        return false;
    }
    clearError('experienceError');
    return true;
}

function validateStep3() {
    // Weeks available is always valid (has default)
    // Running days is optional
    return true;
}

function validateStep4() {
    // Both fields are optional
    return true;
}

function validateTextInput(input) {
    const value = input.value.trim();
    
    if (value.length === 0) {
        input.classList.remove('valid', 'invalid');
        return;
    }
    
    if (value.length < 3) {
        input.classList.remove('valid');
        input.classList.add('invalid');
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
    }
}

function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'flex';
        
        // Add shake animation to current step
        const currentStepEl = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
        currentStepEl.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            currentStepEl.style.animation = '';
        }, 500);
    }
}

function clearError(elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }
}

// ========================================
// Generate Plan
// ========================================
async function generatePlan() {
    if (!validateCurrentStep()) {
        return;
    }
    
    const generateBtn = document.getElementById('generateBtn');
    const placeholder = document.getElementById('placeholder');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const planContent = document.getElementById('planContent');
    const errorMessage = document.getElementById('errorMessage');
    
    // Update UI state
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating...';
    placeholder.classList.add('hidden');
    error.classList.add('hidden');
    planContent.classList.add('hidden');
    loading.classList.remove('hidden');
    
    try {
        const response = await fetch('/api/generate-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.details?.message || data.error || 'Failed to generate training plan');
        }
        
        if (data.success) {
            // Render the markdown plan as HTML
            const planText = document.getElementById('planText');
            planText.innerHTML = marked.parse(data.plan);
            
            loading.classList.add('hidden');
            planContent.classList.remove('hidden');
            
            // Scroll to plan on mobile
            if (window.innerWidth < 1024) {
                planContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            throw new Error('Failed to generate training plan');
        }
        
    } catch (err) {
        console.error('Error:', err);
        loading.classList.add('hidden');
        error.classList.remove('hidden');
        errorMessage.textContent = err.message || 'An error occurred while generating your plan. Please try again.';
    } finally {
        // Reset button state
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-magic mr-2"></i>Generate Plan';
    }
}

function retryGenerate() {
    generatePlan();
}

function resetForm() {
    // Reset form data
    formData.raceType = '';
    formData.experienceLevel = '';
    formData.weeksAvailable = '12';
    formData.runningDaysPerWeek = '';
    formData.currentMileage = '';
    formData.goal = '';
    
    // Reset UI selections
    document.querySelectorAll('.race-card, .experience-card, .day-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Reset inputs
    document.getElementById('raceType').value = '';
    document.getElementById('experienceLevel').value = '';
    document.getElementById('weeksAvailable').value = '12';
    document.getElementById('runningDaysPerWeek').value = '';
    document.getElementById('currentMileage').value = '';
    document.getElementById('goal').value = '';
    document.getElementById('weeksValue').textContent = '12';
    
    // Clear errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    // Reset to step 1
    document.querySelectorAll('.wizard-step').forEach(step => {
        step.classList.remove('active');
    });
    currentStep = 1;
    document.querySelector('.wizard-step[data-step="1"]').classList.add('active');
    
    updateProgress();
    updateButtons();
    
    // Show placeholder
    document.getElementById('planContent').classList.add('hidden');
    document.getElementById('placeholder').classList.remove('hidden');
}

// ========================================
// Print & Copy Functions
// ========================================
function printPlan() {
    window.print();
}

function copyPlan() {
    const planText = document.getElementById('planText');
    const text = planText.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const btn = event.target.closest('button');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
        btn.classList.remove('btn-action');
        btn.classList.add('bg-green-600', 'text-white', 'border-green-600');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy to clipboard. Please select and copy manually.');
        console.error('Copy error:', err);
    });
}

// ========================================
// Animations
// ========================================
function animateStepElements(step) {
    const stepEl = document.querySelector(`.wizard-step[data-step="${step}"]`);
    const cards = stepEl.querySelectorAll('.race-card, .experience-card, .day-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeIn 0.6s ease forwards`;
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card-glass').forEach(card => {
        observer.observe(card);
    });
}

function handleKeyboard(e) {
    // Enter key to proceed
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        if (currentStep < totalSteps) {
            nextStep();
        } else if (currentStep === totalSteps) {
            generatePlan();
        }
    }
    
    // Escape key to go back
    if (e.key === 'Escape' && currentStep > 1) {
        previousStep();
    }
}

// ========================================
// Utility Functions
// ========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
