import { StorageService } from "./scripts/storage-service.js";
import { Header } from "./scripts/sections/header.js";
import { Footer } from "./scripts/sections/footer.js";

StorageService.getOrCreateInstance();
Header.render();
Footer.render();