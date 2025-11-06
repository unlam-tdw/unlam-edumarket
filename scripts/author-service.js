import { AUTHORS } from "./constants.js";

export class AuthorService {
    constructor() {
        this.authors = AUTHORS;
    }

    getAuthorById(id) {
        const author = this.authors.find(author => author.id === id);

        if (!author) {
            console.warn(`No se encontró el autor con ID ${id}.`);
            return null;
        }
        
        return author;
    }
}