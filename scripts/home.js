const navLinks = document.querySelector(".navigation");
const toggleButton = document.querySelector("#menu");

toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    toggleButton.classList.toggle("show");
});

let now = new Date();
let year = now.getFullYear();
document.querySelector("#currentYear").textContent = year;
let date = now.toLocaleString();
document.querySelector("#lastModified").textContent = date;

// Course Data

const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const wddCourse = courses.filter(course => course.subject === "WDD");
const cseCourse = courses.filter(course => course.subject === "CSE");

const listedCourses = document.querySelector(".listed-courses");
const theCredits = document.querySelector("#credits");

function displayAll(){
    listedCourses.innerHTML = "";
    courses.forEach(c => {
        const particularCourse = document.createElement("div");
        if (c.completed === true){
            particularCourse.className = "completed";
            particularCourse.innerHTML = `<p>✔️${c.subject} ${c.number}</p>`;
        }else{
            particularCourse.className = "notCompleted";
            particularCourse.innerHTML = `<p>${c.subject} ${c.number}</p>`;
        }
        listedCourses.appendChild(particularCourse);
    });
    // Calculate total credits using reduce
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    console.log(`Total credits: ${totalCredits}`);
    theCredits.textContent = totalCredits;

}
function displayCse(){
    listedCourses.innerHTML = "";
    cseCourse.forEach((c) => {
        const particularCourse = document.createElement("div");
        if (c.completed === true) {
            particularCourse.className = "completed";
            particularCourse.innerHTML = `<p>✔️${c.subject} ${c.number}</p>`;
        }else{
            particularCourse.className = "notCompleted";
            particularCourse.innerHTML = `<p>${c.subject} ${c.number}</p>`;
        }
        listedCourses.appendChild(particularCourse);
    });
    // Calculate total credits using reduce
    const totalCredits = cseCourse.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    console.log(`Total credits: ${totalCredits}`);
    theCredits.textContent = totalCredits;
}

function displayWdd(){
    listedCourses.innerHTML = "";
    wddCourse.forEach((c) => {
        const particularCourse = document.createElement("div");
        if (c.completed === true) {
            particularCourse.className = "completed";
            particularCourse.innerHTML = `<p>✔️${c.subject} ${c.number}</p>`;
        } else{
            particularCourse.className = "notCompleted";
            particularCourse.innerHTML = `<p>${c.subject} ${c.number}</p>`;
        }
        listedCourses.appendChild(particularCourse);
    });
    // Calculate total credits using reduce
    const totalCredits = wddCourse.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    console.log(`Total credits: ${totalCredits}`);
    theCredits.textContent = totalCredits;
}

function setActiveButton(activeId) {
    // Remove active class from all buttons
    document.querySelectorAll('.specific').forEach(button => {
        button.classList.remove('active');
    });
    // Add active class to the clicked button
    document.querySelector(`#${activeId}`).classList.add('active');
}

document.querySelector("#All").addEventListener("click", function (event) {
    event.preventDefault();
    setActiveButton('All');
    displayAll();
});

document.querySelector("#CSE").addEventListener("click", function (event) {
    event.preventDefault();
    setActiveButton('CSE');
    displayCse();
});

document.querySelector("#WDD").addEventListener("click", function (event) {
    event.preventDefault();
    setActiveButton('WDD');
    displayWdd();
});

// Display all courses when the page loads and set All button as active
displayAll();
setActiveButton('All');
