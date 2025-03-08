const myLibrary = [];
const newBookBtn = document.getElementById("newBookBtn");
const modalOverlay = document.getElementById("modalOverlay");
const bookFormModal = document.getElementById("bookFormModal");
const bookForm = document.getElementById("bookForm");
const libraryContainer = document.getElementById("library");

// Show the modal when clicking the "Add New Book" button
newBookBtn.addEventListener("click", () => {
  modalOverlay.style.display = "block";
  bookFormModal.style.display = "block";
});

// Close the modal when clicking the overlay (background)
modalOverlay.addEventListener("click", () => {
  modalOverlay.style.display = "none";
  bookFormModal.style.display = "none";
});

// Handle form submission
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents page reload

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  // Only add a book if all fields are filled
  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);

    // Close the modal after adding the book
    modalOverlay.style.display = "none";
    bookFormModal.style.display = "none";

    // Reset the form
    bookForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
});

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Manually add books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);

function displayBooks() {
  libraryContainer.innerHTML = ""; // Clear previous content

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card"); // Outer styling

    const bookContent = document.createElement("div");
    bookContent.classList.add("card__content"); // Inner content styling

    bookContent.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
        <button onclick="removeBook(${index})">Remove</button>
      `;

    bookCard.appendChild(bookContent);
    libraryContainer.appendChild(bookCard);
  });
}

// Remove book from library
function removeBook(index) {
  myLibrary.splice(index, 1); // Remove the book from the array
  displayBooks(); // Update the displayed books
}
