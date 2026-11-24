// Common JavaScript for GCET Jammu website

// Light mode and dark mode
function setTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    let themeButton = document.getElementById("themeButton");
    if (themeButton) {
        themeButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }
}

// Mobile navigation menu
function setMenu() {
    let nav = document.querySelector("nav");
    if (nav) {
        let menuButton = document.createElement("button");
        menuButton.textContent = "☰ Menu";
        menuButton.className = "menu-button";
        nav.parentNode.insertBefore(menuButton, nav);

        menuButton.addEventListener("click", function () {
            nav.classList.toggle("show-menu");
        });
    }
}

// Add common buttons and features
let nav = document.querySelector("nav");

if (nav) {
    let themeButton = document.createElement("button");
    themeButton.id = "themeButton";
    themeButton.className = "theme-button";
    themeButton.textContent = "Light / Dark Mode";

    let loginLink = nav.querySelector(".login-button");

    if (loginLink) {
        nav.insertBefore(themeButton, loginLink);
    } else {
        nav.appendChild(themeButton);
    }

    setTheme();
}

    let topButton = document.createElement("button");
    topButton.textContent = "Back to Top";
    topButton.className = "top-button";
    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(topButton);

    setMenu();


// Homepage date, time and college information
let dateTime = document.getElementById("dateTime");
if (dateTime) {
    dateTime.textContent = new Date().toLocaleString();
}

let infoButton = document.getElementById("infoButton");
if (infoButton) {
    infoButton.addEventListener("click", function () {
        let extraInfo = document.getElementById("extraInfo");
        if (extraInfo.style.display === "none") {
            extraInfo.style.display = "block";
            infoButton.textContent = "Show Less";
        } else {
            extraInfo.style.display = "none";
            infoButton.textContent = "Show More";
        }
    });
}

// Student login
let loginButton = document.getElementById("loginBtn");
if (loginButton) {
    const students = [
        { roll: "2512007", password: "12345", name: "Paramveer Singh",
          branch: "Computer Science Engineering", semester: "3rd Semester" },
        { roll: "CS102", password: "23456", name: "Riya Gupta",
          branch: "Computer Science Engineering", semester: "3rd Semester" },
        { roll: "IT103", password: "34567", name: "Kabir Singh",
          branch: "Information Technology", semester: "3rd Semester" }
    ];

    loginButton.addEventListener("click", function () {
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value;
        let message = document.getElementById("loginMessage");

        if (username === "" || password === "") {
            message.textContent = "Please enter both fields.";
            return;
        }

        let student = students.find(function (s) {
            return s.roll === username && s.password === password;
        });

        if (student) {
            sessionStorage.setItem("loggedInStudent", JSON.stringify(student));
            window.location.href = "student-portal.html";
        } else {
            message.textContent = "Invalid roll number or password.";
        }
    });
}

// Student portal: show the logged-in student's details
let studentName = document.getElementById("portalName");
if (studentName) {
    let student = JSON.parse(sessionStorage.getItem("loggedInStudent"));

    if (student === null) {
        window.location.href = "login.html";
    } else {
        studentName.textContent = student.name;
        document.getElementById("welcomeName").textContent = student.name;
        document.getElementById("portalRoll").textContent = student.roll;
        document.getElementById("portalBranch").textContent = student.branch;
        document.getElementById("portalSemester").textContent = student.semester;
    }
}

// Logout //
document.getElementById("logoutButton").addEventListener("click", function(event) {
    event.preventDefault();

    if (confirm("Are you sure you want to logout?")) {
        sessionStorage.removeItem("loggedInStudent");
        window.location.href = "login.html";
    }
});

// Admission form validation
let admissionForm = document.getElementById("admissionForm");

if (admissionForm) {
    admissionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("adName").value.trim();
        let email = document.getElementById("adEmail").value.trim();
        let dob = document.getElementById("adDob").value;
        let mobile = document.getElementById("adMobile").value.trim();
        let gender = document.querySelector('input[name="gender"]:checked');
        let course = document.getElementById("adCourse").value;
        let message = document.getElementById("admissionMessage");

        if (name === "" || email === "" || dob === "" ||
            mobile === "" || !gender || course === "") {
            message.textContent = "Please complete all required fields.";
        }
        else if (!/^[^ ]+@[^ ]+\.[a-z]{2,}$/i.test(email)) {
            message.textContent = "Please enter a valid email address.";
        }
        else if (!/^[0-9]{10}$/.test(mobile)) {
            message.textContent = "Mobile number must contain 10 digits.";
        }
        else {
        window.location.href = "submit.html";
}
    });
}


// Marks calculator
let calculateButton = document.getElementById("calculateBtn");
if (calculateButton) {
    calculateButton.addEventListener("click", function () {
        let marks = [];
        for (let i = 1; i <= 5; i++) {
            let value = document.getElementById("mark" + i).value;
            if (value === "" || Number(value) < 0 || Number(value) > 100) {
                document.getElementById("marksResult").textContent =
                    "Enter marks between 0 and 100 in all five subjects.";
                return;
            }
            marks.push(Number(value));
        }

        let total = marks[0] + marks[1] + marks[2] + marks[3] + marks[4];
        let percentage = total / 5;
        let grade;

        if (percentage >= 90) grade = "A";
        else if (percentage >= 80) grade = "B";
        else if (percentage >= 70) grade = "C";
        else if (percentage >= 60) grade = "D";
        else grade = "F";

        document.getElementById("marksResult").textContent =
            "Total: " + total + "/500 | Percentage: " +
            percentage.toFixed(2) + "% | Grade: " + grade;
    });
}

// Gallery: click an image to view it larger
let galleryImages = document.querySelectorAll(".gallery img");
galleryImages.forEach(function (img) {
    img.addEventListener("click", function () {
        let viewer = document.getElementById("imageViewer");
        if (!viewer) {
            viewer = document.createElement("div");
            viewer.id = "imageViewer";
            viewer.innerHTML = '<span id="closeViewer">×</span><img id="largeImage">';
            document.body.appendChild(viewer);
            document.getElementById("closeViewer").addEventListener("click", function () {
                viewer.style.display = "none";
            });
        }
        document.getElementById("largeImage").src = img.src;
        viewer.style.display = "flex";
    });
});

addCommonFeatures();
