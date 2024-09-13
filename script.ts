document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get input elements
  const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
  const firstNameElement = document.getElementById('firstName') as HTMLInputElement;
  const lastNameElement = document.getElementById('lastName') as HTMLInputElement;
  const emailElement = document.getElementById('email') as HTMLInputElement;
  const phoneElement = document.getElementById('phone') as HTMLInputElement;
  const addressElement = document.getElementById('address') as HTMLInputElement;
  const educationElement = document.getElementById('education') as HTMLTextAreaElement;
  const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
  const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
  const usernameElement = document.getElementById('username') as HTMLInputElement;

  if (profilePictureInput && firstNameElement && lastNameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement && usernameElement) {
      const firstName = firstNameElement.value;
      const lastName = lastNameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const address = addressElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const username = usernameElement.value;

      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

      // Creating Resume Output
      const resumeOutput = `
          <h2>Resume</h2>
          ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
          <p><strong>Full Name:</strong> <span id="edit-name" class="editable">${firstName} ${lastName}</span></p>
          <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
          <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
          <p><strong>Address:</strong> <span id="edit-address" class="editable">${address}</span></p>
          <h3>Education</h3>
          <p id="edit-education" class="editable">${education}</p>
          <h3>Experience</h3>
          <p id="edit-experience" class="editable">${experience}</p>
          <h3>Skills</h3>
          <p id="edit-skills" class="editable">${skills}</p>
      `;

      const resumeOutputElement = document.getElementById('resumeOutput');
      if (resumeOutputElement) {
          resumeOutputElement.innerHTML = resumeOutput;
          makeEditable();
      } else {
          console.error('Resume output element not found');
      }
  } else {
      console.error('One or more input elements are missing');
  }
});

function makeEditable() {
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(element => {
      element.addEventListener('click', function() {
          const currentElement = element as HTMLElement;
          const currentValue = currentElement.textContent || '';

          if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
              const input = document.createElement('input');
              input.type = 'text';
              input.value = currentValue;
              input.classList.add('editing-input');

              input.addEventListener('blur', function() {
                  currentElement.textContent = input.value;
                  currentElement.style.display = 'inline';
                  input.remove();
              });

              currentElement.style.display = 'none';
              currentElement.parentNode?.insertBefore(input, currentElement);
              input.focus();
          }
      });
  });
}
