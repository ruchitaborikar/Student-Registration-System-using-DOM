document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather form data
    let studentName = document.getElementById('student-name').value.trim();
    let studentId = document.getElementById('student-id').value.trim();
    let emailId = document.getElementById('email-id').value.trim();
    let contactNo = document.getElementById('contact-no').value.trim();

    // Validate form inputs
    if (!studentName.match(/^[A-Za-z\s]+$/) || !studentId || !emailId || !contactNo.match(/^\d+$/)) {
        alert("Please fill in valid details.");
        return;
    }

    // Save student record to local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ studentName, studentId, emailId, contactNo });
    localStorage.setItem('students', JSON.stringify(students));

    // Reset form
    document.getElementById('registration-form').reset();

    // Refresh student records display
    displayStudents();
});

function displayStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let tableBody = document.querySelector('#students-table tbody');
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        let row = `<tr>
            <td>${student.studentName}</td>
            <td>${student.studentId}</td>
            <td>${student.emailId}</td>
            <td>${student.contactNo}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function editStudent(index) {
    // Get students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    // Get the student data to edit
    let student = students[index];

    // Populate the form with the student's current data
    document.getElementById('student-name').value = student.studentName;
    document.getElementById('student-id').value = student.studentId;
    document.getElementById('email-id').value = student.emailId;
    document.getElementById('contact-no').value = student.contactNo;

    // Update the submit button text to indicate edit mode
    document.getElementById('submit-button').textContent = "Update Student";

    // Temporarily override the form submission behavior to update the student
    document.getElementById('registration-form').onsubmit = function(event) {
        event.preventDefault();

        // Gather updated form data
        let updatedStudentName = document.getElementById('student-name').value.trim();
        let updatedStudentId = document.getElementById('student-id').value.trim();
        let updatedEmailId = document.getElementById('email-id').value.trim();
        let updatedContactNo = document.getElementById('contact-no').value.trim();

        // Validate form inputs
        if (!updatedStudentName.match(/^[A-Za-z\s]+$/) || !updatedStudentId || !updatedEmailId || !updatedContactNo.match(/^\d+$/)) {
            alert("Please fill in valid details.");
            return;
        }

        // Update the student data in the array
        students[index] = {
            studentName: updatedStudentName,
            studentId: updatedStudentId,
            emailId: updatedEmailId,
            contactNo: updatedContactNo
        };

        // Save the updated data back to localStorage
        localStorage.setItem('students', JSON.stringify(students));

        // Reset form and restore original submission behavior
        document.getElementById('registration-form').reset();
        document.getElementById('submit-button').textContent = "Add Student";
        document.getElementById('registration-form').onsubmit = handleFormSubmit;

        // Refresh the student records display
        displayStudents();
    };
}

// Original form submission logic to add a new student
function handleFormSubmit(event) {
    event.preventDefault();

    // Gather form data
    let studentName = document.getElementById('student-name').value.trim();
    let studentId = document.getElementById('student-id').value.trim();
    let emailId = document.getElementById('email-id').value.trim();
    let contactNo = document.getElementById('contact-no').value.trim();

    

    // Save student record to local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ studentName, studentId, emailId, contactNo });
    localStorage.setItem('students', JSON.stringify(students));

    // Reset form
    document.getElementById('registration-form').reset();

    // Refresh student records display
    displayStudents();
}

// Attach the original submit handler on page load
document.getElementById('registration-form').onsubmit = handleFormSubmit;


function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Display records on page load
window.onload = displayStudents;
