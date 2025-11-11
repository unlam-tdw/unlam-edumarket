import { AUTHORS } from "./constants.js";

export class AuthorService {
    constructor() {
        this.authors = AUTHORS;
    }

    getAuthorById(id) {
        const author = this.authors.find(author => author.id === id);

        if (!author) {
            return null;
        }
        
        return author;
    }
}