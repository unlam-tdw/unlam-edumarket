import { StorageService } from "./scripts/storage-service.js";
import { Header } from "./scripts/sections/header.js";

StorageService.getOrCreateInstance();
Header.render();