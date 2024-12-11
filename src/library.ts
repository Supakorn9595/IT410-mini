

enum Genre {
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Science = "Science",
    History = "History",
}

interface Book {
    id: number;
    title: string;
    author: string;
    genre: Genre;
    publishedYear: number;
    availability: boolean;
}

class Library {
    private books: Book[] = [];

    // เพิ่มหนังสือใหม่
    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Added: ${book.title}`);
    }

    // แสดงหนังสือทั้งหมด
    listBooks(): void {
        this.books.forEach((book) => {
            console.log(`${book.id}: ${book.title} by ${book.author} - ${book.availability ? 'Available' : 'Not Available'}`);
        });
    }

    // ค้นหาหนังสือตาม property ต่างๆ
    public searchBooks<K extends keyof Book>(key: K, value: Book[K]): Book[] | string {
        const results = this.books.filter(book => book[key] === value);
        return results.length > 0 ? results : "not found";
    }

    // อัปเดตหนังสือ
    updateBook(id: number, updatedData: Partial<Book>): void {
        const book = this.books.find(book => book.id === id);
        if (book) {
            Object.assign(book, updatedData);
            console.log(`Updated: ${book.title}`);
        } else {
            console.log(`Book with ID ${id} not found.`);
        }
    }

    // ลบหนังสือ
    deleteBook(id: number): void {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.id !== id);

        if (this.books.length < initialLength) {
            console.log(`Deleted book with ID: ${id}`);
        } else {
            console.log(`Book with ID ${id} not found.`);
        }
    }
}

// ทดสอบการทำงาน
const myLibrary = new Library();

// เพิ่มหนังสือ
myLibrary.addBook({
    id: 1,
    title: "1984",
    author: "George Orwell",
    genre: Genre.Fiction,
    publishedYear: 1949,
    availability: true
});

myLibrary.addBook({
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: Genre.NonFiction,
    publishedYear: 2011,
    availability: true
});

// แสดงหนังสือทั้งหมด
myLibrary.listBooks();

// ทดสอบการค้นหาหนังสือ
const foundBooks = myLibrary.searchBooks("author", "Yuval Noah Harari");
console.log("ค้นหาหนังสือ:", foundBooks);

// ทดสอบการลบหนังสือ
myLibrary.deleteBook(1);

// ทดสอบการแสดงรายการหนังสือทั้งหมด
myLibrary.listBooks();

// ทดสอบการอัปเดตหนังสือ

// เพิ่มหนังสือเข้าไปใน Library ก่อน
myLibrary.addBook({
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: Genre.Fiction,
    publishedYear: 1960,
    availability: true
});

// แสดงข้อมูลหนังสือก่อนการอัปเดต
console.log("ก่อนอัปเดตหนังสือ:");
myLibrary.listBooks();

// อัปเดตหนังสือ
myLibrary.updateBook(4, {
    title: "LOve u eieii",
});

// แสดงข้อมูลหนังสือหลังการอัปเดต
console.log("\nหลังอัปเดตหนังสือ:");
myLibrary.listBooks();

//ค้นหาที่ไม่มี
console.log("\nค้นหาหนังสือตามชื่อ 'Neweiei':");
const tryme = myLibrary.searchBooks('title', 'Neweiei');
console.log(tryme);


