import { Header } from "./scripts/sections/header.js";
import { Footer } from "./scripts/sections/footer.js";
import { UsersService } from "./scripts/users-service.js";

UsersService.syncUsers();
Header.render();
Footer.render();