export const BASE_IMG_URL = 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg'

export const COURSES = [
    {
        id: 1,
        kind: 'online',
        name: "Curso de Programación Web",
        description: "Aprende a desarrollar aplicaciones web modernas con HTML, CSS y JavaScript",
        price: 89.99,
        duration: 120,
        image: BASE_IMG_URL,
        author: 1,
        prerequisites: "Conocimientos básicos de informática, manejo de navegadores web. No se requiere experiencia previa en programación.",
        relatedCourses: [5, 13, 14],
        modules: [
            {
                title: "MÓDULO 1: FRONTEND CON HTML, CSS Y JAVASCRIPT",
                lessons: [
                    { title: "Estructura HTML semántica", duration: "30 min" },
                    { title: "CSS Grid y Flexbox", duration: "45 min" },
                    { title: "JavaScript ES6+ y DOM", duration: "50 min" }
                ]
            },
            {
                title: "MÓDULO 2: REACT Y DESARROLLO FRONTEND AVANZADO",
                lessons: [
                    { title: "Componentes y JSX", duration: "40 min" },
                    { title: "Hooks y Estado", duration: "35 min" },
                    { title: "Routing y Context API", duration: "45 min" }
                ]
            },
            {
                title: "MÓDULO 3: BACKEND CON NODE.JS Y EXPRESS",
                lessons: [
                    { title: "Servidor con Express.js", duration: "40 min" },
                    { title: "APIs REST y Middleware", duration: "50 min" },
                    { title: "Autenticación y Seguridad", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 4: BASE DE DATOS Y DESPLIEGUE",
                lessons: [
                    { title: "M04-1 MongoDB y Mongoose", duration: "45 min" },
                    { title: "M04-2 Testing y Debugging", duration: "30 min" },
                    { title: "M04-3 Despliegue en la nube", duration: "40 min" }
                ]
            }
        ]
    },
    {
        id: 2,
        kind: 'in-person',
        name: "Programación con Python",
        description: "Domina los fundamentos de Python desde cero. Ideal para principiantes",
        price: 49.99,
        duration: 80,
        image: BASE_IMG_URL,
        author: 3,
        prerequisites: "Conocimientos básicos de informática y lógica básica. No se requiere experiencia previa en programación.",
        relatedCourses: [7, 12, 17],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE PYTHON",
                lessons: [
                    { title: "Introducción a Python y sintaxis básica", duration: "25 min" },
                    { title: "Variables, tipos de datos y operadores", duration: "30 min" },
                    { title: "Estructuras de control (if, for, while)", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 2: ESTRUCTURAS DE DATOS Y FUNCIONES",
                lessons: [
                    { title: "Listas, tuplas y diccionarios", duration: "30 min" },
                    { title: "Funciones y parámetros", duration: "25 min" },
                    { title: "Módulos y paquetes", duration: "20 min" }
                ]
            },
            {
                title: "MÓDULO 3: PROGRAMACIÓN ORIENTADA A OBJETOS",
                lessons: [
                    { title: "Clases y objetos", duration: "30 min" },
                    { title: "Herencia y polimorfismo", duration: "25 min" },
                    { title: "Manejo de archivos y excepciones", duration: "25 min" }
                ]
            }
        ]
    },
    {
        id: 3,
        kind: 'in-person',
        name: "Diseño Gráfico Profesional",
        description: "Crea diseños impactantes usando Photoshop, Illustrator y Figma",
        price: 129.99,
        duration: 150,
        image: BASE_IMG_URL,
        author: 1,
        prerequisites: "Conocimientos básicos de diseño, creatividad y sentido estético. Manejo básico de computadora.",
        relatedCourses: [14, 8, 16],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE DISEÑO GRÁFICO",
                lessons: [
                    { title: "Principios de diseño y composición", duration: "40 min" },
                    { title: "Teoría del color y tipografía", duration: "35 min" },
                    { title: "Herramientas básicas de diseño", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 2: PHOTOSHOP Y EDICIÓN DE IMÁGENES",
                lessons: [
                    { title: "Interfaz y herramientas de Photoshop", duration: "35 min" },
                    { title: "Retoque y manipulación de imágenes", duration: "40 min" },
                    { title: "Capas, máscaras y efectos", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 3: ILLUSTRATOR Y DISEÑO VECTORIAL",
                lessons: [
                    { title: "Trabajo con vectores en Illustrator", duration: "40 min" },
                    { title: "Creación de logos e ilustraciones", duration: "35 min" },
                    { title: "Exportación y preparación de archivos", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 4: FIGMA Y DISEÑO DE INTERFACES",
                lessons: [
                    { title: "M04-1 Introducción a Figma y diseño colaborativo", duration: "35 min" },
                    { title: "M04-2 Componentes y sistemas de diseño", duration: "40 min" },
                    { title: "M04-3 Prototipado y animaciones", duration: "35 min" }
                ]
            }
        ]
    },
    {
        id: 4,
        kind: 'in-person',
        name: "Marketing Digital Completo",
        description: "Estrategias de marketing en redes sociales, SEO y publicidad online",
        price: 99.99,
        duration: 100,
        image: BASE_IMG_URL,
        author: 5,
        prerequisites: "Conocimientos básicos de redes sociales y manejo de internet. No se requiere experiencia previa en marketing.",
        relatedCourses: [16, 20, 18],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE MARKETING DIGITAL",
                lessons: [
                    { title: "Introducción al marketing digital", duration: "30 min" },
                    { title: "Buyer persona y segmentación", duration: "25 min" },
                    { title: "Estrategia de contenido y storytelling", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 2: MARKETING EN REDES SOCIALES",
                lessons: [
                    { title: "Estrategias para Facebook e Instagram", duration: "35 min" },
                    { title: "LinkedIn y Twitter para negocios", duration: "30 min" },
                    { title: "Community management y engagement", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 3: SEO Y OPTIMIZACIÓN WEB",
                lessons: [
                    { title: "Fundamentos de SEO y keywords", duration: "35 min" },
                    { title: "On-page y off-page SEO", duration: "30 min" },
                    { title: "Analytics y medición de resultados", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 4: PUBLICIDAD ONLINE Y PAGOS",
                lessons: [
                    { title: "M04-1 Google Ads y campañas de búsqueda", duration: "35 min" },
                    { title: "M04-2 Facebook Ads y remarketing", duration: "30 min" },
                    { title: "M04-3 Optimización de campañas y ROI", duration: "30 min" }
                ]
            }
        ]
    },
    {
        id: 5,
        kind: 'online',
        name: "Programación React.js Avanzado",
        description: "Construye aplicaciones complejas con React, hooks y context API",
        price: 149.99,
        duration: 180,
        image: BASE_IMG_URL,
        author: 1,
        prerequisites: "Conocimientos sólidos de JavaScript (ES6+), HTML y CSS. Experiencia previa con programación web.",
        relatedCourses: [1, 9, 13],
        modules: [
            {
                title: "MÓDULO 1: REACT AVANZADO Y PATRONES",
                lessons: [
                    { title: "Componentes de alto orden (HOC)", duration: "40 min" },
                    { title: "Render props y composición", duration: "35 min" },
                    { title: "Performance optimization y memoization", duration: "45 min" }
                ]
            },
            {
                title: "MÓDULO 2: HOOKS PERSONALIZADOS Y ESTADO",
                lessons: [
                    { title: "Custom hooks y reutilización de lógica", duration: "40 min" },
                    { title: "Estado global con Context API avanzado", duration: "45 min" },
                    { title: "useReducer y gestión compleja de estado", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 3: ROUTING Y NAVEGACIÓN",
                lessons: [
                    { title: "React Router avanzado y guards", duration: "40 min" },
                    { title: "Lazy loading y code splitting", duration: "35 min" },
                    { title: "Navegación programática y deep linking", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 4: TESTING Y DESPLIEGUE",
                lessons: [
                    { title: "M04-1 Testing con Jest y React Testing Library", duration: "45 min" },
                    { title: "M04-2 E2E testing con Cypress", duration: "40 min" },
                    { title: "M04-3 Despliegue y CI/CD", duration: "40 min" }
                ]
            }
        ]
    },
    {
        id: 6,
        kind: 'in-person',
        name: "Inglés para Negocios",
        description: "Mejora tu inglés profesional con enfoque en comunicación empresarial",
        price: 79.99,
        duration: 90,
        image: BASE_IMG_URL,
        author: 4,
        prerequisites: "Nivel básico-intermedio de inglés y conocimientos básicos de gramática. Motivación para mejorar habilidades de comunicación.",
        relatedCourses: [20, 18, 4],
        modules: [
            {
                title: "MÓDULO 1: COMUNICACIÓN PROFESIONAL",
                lessons: [
                    { title: "Vocabulario empresarial esencial", duration: "30 min" },
                    { title: "Escribir emails profesionales", duration: "25 min" },
                    { title: "Presentaciones y discursos", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 2: REUNIONES Y NEGOCIACIONES",
                lessons: [
                    { title: "Participar en reuniones de trabajo", duration: "30 min" },
                    { title: "Negociaciones y contratos", duration: "30 min" },
                    { title: "Teleconferencias y llamadas internacionales", duration: "25 min" }
                ]
            },
            {
                title: "MÓDULO 3: NETWORKING Y RELACIONES COMERCIALES",
                lessons: [
                    { title: "Networking y small talk profesional", duration: "30 min" },
                    { title: "Entrevistas de trabajo en inglés", duration: "30 min" },
                    { title: "Cultura empresarial internacional", duration: "25 min" }
                ]
            }
        ]
    },
    {
        id: 7,
        kind: 'online',
        name: "Programación con Machine Learning",
        description: "Implementa modelos de inteligencia artificial y aprendizaje automático",
        price: 199.99,
        duration: 200,
        image: BASE_IMG_URL,
        author: 3,
        prerequisites: "Conocimientos sólidos de Python, matemáticas básicas (álgebra, estadística) y programación orientada a objetos.",
        relatedCourses: [2, 12, 17],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE MACHINE LEARNING",
                lessons: [
                    { title: "Introducción a ML y tipos de aprendizaje", duration: "40 min" },
                    { title: "Preprocesamiento de datos con pandas", duration: "45 min" },
                    { title: "Análisis exploratorio de datos", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 2: ALGORITMOS DE APRENDIZAJE SUPERVISADO",
                lessons: [
                    { title: "Regresión lineal y polinómica", duration: "45 min" },
                    { title: "Clasificación con árboles de decisión", duration: "40 min" },
                    { title: "Random Forest y Gradient Boosting", duration: "45 min" }
                ]
            },
            {
                title: "MÓDULO 3: REDES NEURONALES Y DEEP LEARNING",
                lessons: [
                    { title: "Introducción a TensorFlow y Keras", duration: "45 min" },
                    { title: "Redes neuronales convolucionales (CNN)", duration: "50 min" },
                    { title: "Redes LSTM y procesamiento de texto", duration: "45 min" }
                ]
            },
            {
                title: "MÓDULO 4: OPTIMIZACIÓN Y PRODUCCIÓN",
                lessons: [
                    { title: "M04-1 Validación cruzada y tuning de hiperparámetros", duration: "45 min" },
                    { title: "M04-2 Deployment de modelos ML", duration: "40 min" },
                    { title: "M04-3 MLOps y monitoreo de modelos", duration: "40 min" }
                ]
            }
        ]
    },
    {
        id: 8,
        kind: 'in-person',
        name: "Fotografía Digital",
        description: "Técnicas profesionales de fotografía, composición y edición",
        price: 69.99,
        duration: 60,
        image: BASE_IMG_URL,
        author: 5,
        prerequisites: "Cámara digital o smartphone e interés por la fotografía. No se requiere experiencia previa.",
        relatedCourses: [3, 16, 14],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE FOTOGRAFÍA",
                lessons: [
                    { title: "Configuración de cámara y exposición", duration: "25 min" },
                    { title: "Composición y regla de los tercios", duration: "20 min" },
                    { title: "Iluminación natural y artificial", duration: "25 min" }
                ]
            },
            {
                title: "MÓDULO 2: TÉCNICAS AVANZADAS",
                lessons: [
                    { title: "Fotografía de retrato y paisaje", duration: "25 min" },
                    { title: "Fotografía macro y de producto", duration: "20 min" },
                    { title: "Fotografía nocturna y larga exposición", duration: "25 min" }
                ]
            },
            {
                title: "MÓDULO 3: EDICIÓN Y POSTPROCESAMIENTO",
                lessons: [
                    { title: "Lightroom: ajustes básicos y corrección", duration: "25 min" },
                    { title: "Photoshop: retoque y composición", duration: "25 min" },
                    { title: "Exportación y organización de archivos", duration: "20 min" }
                ]
            }
        ]
    },
    {
        id: 9,
        kind: 'online',
        name: "Programación de Apps Móviles",
        description: "Crea aplicaciones para iOS y Android con React Native",
        price: 159.99,
        duration: 160,
        image: BASE_IMG_URL,
        author: 4,
        prerequisites: "Conocimientos de JavaScript, HTML y CSS básicos. Experiencia previa en programación.",
        relatedCourses: [1, 5, 13],
        modules: [
            {
                title: "MÓDULO 1: INTRODUCCIÓN A REACT NATIVE",
                lessons: [
                    { title: "Configuración del entorno de desarrollo", duration: "35 min" },
                    { title: "Componentes nativos y estilos", duration: "40 min" },
                    { title: "Navegación con React Navigation", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 2: FUNCIONALIDADES NATIVAS",
                lessons: [
                    { title: "Acceso a cámara y galería", duration: "35 min" },
                    { title: "Geolocalización y mapas", duration: "40 min" },
                    { title: "Notificaciones push y almacenamiento local", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 3: INTEGRACIÓN CON BACKEND",
                lessons: [
                    { title: "Consumo de APIs REST", duration: "35 min" },
                    { title: "Autenticación y tokens", duration: "40 min" },
                    { title: "Manejo de estado con Redux", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 4: DESPLIEGUE Y PUBLICACIÓN",
                lessons: [
                    { title: "M04-1 Build para iOS y Android", duration: "40 min" },
                    { title: "M04-2 Publicación en App Store y Google Play", duration: "35 min" },
                    { title: "M04-3 Testing y optimización de performance", duration: "40 min" }
                ]
            }
        ]
    },
    {
        id: 10,
        kind: 'online',
        name: "Gestión de Proyectos con Agile",
        description: "Metodologías ágiles, Scrum y Kanban para equipos de desarrollo",
        price: 119.99,
        duration: 110,
        image: BASE_IMG_URL,
        author: 2,
        prerequisites: "Experiencia trabajando en proyectos de software, conocimientos básicos de gestión de proyectos y trabajo en equipo.",
        relatedCourses: [13, 19, 18],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE AGILE",
                lessons: [
                    { title: "Manifesto ágil y principios", duration: "30 min" },
                    { title: "Comparación: Waterfall vs Agile", duration: "25 min" },
                    { title: "Cultura ágil y cambio organizacional", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 2: SCRUM FRAMEWORK",
                lessons: [
                    { title: "Roles, eventos y artefactos de Scrum", duration: "35 min" },
                    { title: "Sprints, planning y retrospectivas", duration: "30 min" },
                    { title: "Product Backlog y estimación", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 3: KANBAN Y LEAN",
                lessons: [
                    { title: "Principios de Kanban y flujo de trabajo", duration: "30 min" },
                    { title: "Tableros Kanban y WIP limits", duration: "30 min" },
                    { title: "Métricas de Kanban y mejora continua", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 4: HERRAMIENTAS Y PRÁCTICAS",
                lessons: [
                    { title: "M04-1 Jira, Trello y herramientas ágiles", duration: "30 min" },
                    { title: "M04-2 Scrum Master y facilitación", duration: "30 min" },
                    { title: "M04-3 Escalado ágil: SAFe y LeSS", duration: "35 min" }
                ]
            }
        ]
    },
    {
        id: 11,
        kind: 'in-person',
        name: "Ciberseguridad y Ethical Hacking",
        description: "Protege sistemas y aprende técnicas de hacking ético",
        price: 179.99,
        duration: 170,
        image: BASE_IMG_URL,
        author: 2,
        prerequisites: "Conocimientos de redes y sistemas operativos, conceptos básicos de programación y Linux básico.",
        relatedCourses: [19, 13, 17],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE CIBERSEGURIDAD",
                lessons: [
                    { title: "Introducción a la seguridad informática", duration: "40 min" },
                    { title: "Tipos de amenazas y vulnerabilidades", duration: "35 min" },
                    { title: "Redes y protocolos de seguridad", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 2: HACKING ÉTICO Y PENTESTING",
                lessons: [
                    { title: "Metodología de pentesting y reconocimiento", duration: "40 min" },
                    { title: "Escaneo y enumeración", duration: "35 min" },
                    { title: "Explotación y post-explotación", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 3: HERRAMIENTAS Y TÉCNICAS",
                lessons: [
                    { title: "Kali Linux y herramientas de hacking", duration: "40 min" },
                    { title: "Metasploit y explotación de vulnerabilidades", duration: "40 min" },
                    { title: "Wireshark y análisis de tráfico", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 4: DEFENSA Y PROTECCIÓN",
                lessons: [
                    { title: "M04-1 Firewalls y sistemas de detección de intrusiones", duration: "40 min" },
                    { title: "M04-2 Criptografía y certificados digitales", duration: "40 min" },
                    { title: "M04-3 Seguridad en aplicaciones web", duration: "40 min" }
                ]
            }
        ]
    },
    {
        id: 12,
        kind: 'in-person',
        name: "Excel Avanzado y Análisis de Datos",
        description: "Domina fórmulas complejas, tablas dinámicas y visualización de datos",
        price: 59.99,
        duration: 70,
        image: BASE_IMG_URL,
        author: 3,
        prerequisites: "Conocimientos básicos de Excel, manejo de hojas de cálculo y lógica básica de fórmulas.",
        relatedCourses: [2, 7, 17],
        modules: [
            {
                title: "MÓDULO 1: FÓRMULAS AVANZADAS",
                lessons: [
                    { title: "Funciones lógicas y de búsqueda", duration: "25 min" },
                    { title: "Funciones de texto y fecha", duration: "20 min" },
                    { title: "Fórmulas matriciales y funciones anidadas", duration: "25 min" }
                ]
            },
            {
                title: "MÓDULO 2: TABLAS DINÁMICAS Y GRÁFICOS",
                lessons: [
                    { title: "Creación y análisis con tablas dinámicas", duration: "25 min" },
                    { title: "Gráficos avanzados y visualización", duration: "20 min" },
                    { title: "Segmentación de datos y filtros", duration: "25 min" }
                ]
            },
            {
                title: "MÓDULO 3: ANÁLISIS DE DATOS Y MACROS",
                lessons: [
                    { title: "Power Query y transformación de datos", duration: "25 min" },
                    { title: "Análisis de escenarios y solver", duration: "25 min" },
                    { title: "Introducción a macros y VBA", duration: "25 min" }
                ]
            }
        ]
    },
    {
        id: 13,
        kind: 'online',
        name: "Programación Backend con Node.js",
        description: "Desarrollo de servidores y APIs RESTful con Node.js",
        price: 139.99,
        duration: 140,
        image: BASE_IMG_URL,
        author: 2,
        prerequisites: "Conocimientos sólidos de JavaScript, conceptos de programación asíncrona y HTTP y REST básicos.",
        relatedCourses: [1, 5, 17, 19],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE NODE.JS",
                lessons: [
                    { title: "Introducción a Node.js y npm", duration: "35 min" },
                    { title: "Módulos y sistema de archivos", duration: "30 min" },
                    { title: "Programación asíncrona y callbacks", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 2: EXPRESS Y SERVIDORES WEB",
                lessons: [
                    { title: "Configuración de Express.js", duration: "35 min" },
                    { title: "Rutas, middleware y controladores", duration: "35 min" },
                    { title: "Manejo de errores y validación", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 3: APIs REST Y AUTENTICACIÓN",
                lessons: [
                    { title: "Diseño de APIs RESTful", duration: "35 min" },
                    { title: "Autenticación JWT y sesiones", duration: "35 min" },
                    { title: "Documentación con Swagger", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 4: BASE DE DATOS Y DESPLIEGUE",
                lessons: [
                    { title: "M04-1 Integración con MongoDB y Mongoose", duration: "35 min" },
                    { title: "M04-2 Testing con Jest y supertest", duration: "30 min" },
                    { title: "M04-3 Despliegue en la nube", duration: "35 min" }
                ]
            }
        ]
    },
    {
        id: 14,
        kind: 'in-person',
        name: "Diseño UX/UI Profesional",
        description: "Principios de experiencia y diseño de interfaces de usuario",
        price: 109.99,
        duration: 130,
        image: BASE_IMG_URL,
        author: 1,
        prerequisites: "Conocimientos básicos de diseño, creatividad y pensamiento analítico. Interés en experiencia de usuario.",
        relatedCourses: [3, 1, 5],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE UX/UI",
                lessons: [
                    { title: "Principios de diseño de interfaces", duration: "35 min" },
                    { title: "Psicología del usuario y usabilidad", duration: "35 min" },
                    { title: "Sistemas de diseño y guías de estilo", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 2: INVESTIGACIÓN Y PROTOTIPADO",
                lessons: [
                    { title: "User research y personas", duration: "35 min" },
                    { title: "Wireframing y arquitectura de información", duration: "35 min" },
                    { title: "Prototipado de baja y alta fidelidad", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 3: DISEÑO VISUAL Y HERRAMIENTAS",
                lessons: [
                    { title: "Figma: diseño de interfaces", duration: "35 min" },
                    { title: "Diseño responsive y mobile-first", duration: "35 min" },
                    { title: "Microinteracciones y animaciones", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 4: TESTING Y OPTIMIZACIÓN",
                lessons: [
                    { title: "M04-1 Testing de usabilidad y A/B testing", duration: "35 min" },
                    { title: "M04-2 Análisis de métricas y analytics", duration: "35 min" },
                    { title: "M04-3 Mejora continua y iteración", duration: "35 min" }
                ]
            }
        ]
    },
    {
        id: 15,
        kind: 'online',
        name: "Blockchain y Criptomonedas",
        description: "Entiende la tecnología blockchain y el desarrollo de smart contracts",
        price: 189.99,
        duration: 190,
        image: BASE_IMG_URL,
        author: 5,
        prerequisites: "Conocimientos de programación (JavaScript o Solidity), conceptos básicos de criptografía y lógica de programación.",
        relatedCourses: [13, 11, 1],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE BLOCKCHAIN",
                lessons: [
                    { title: "Introducción a blockchain y criptografía", duration: "45 min" },
                    { title: "Consenso y minería", duration: "45 min" },
                    { title: "Estructura de bloques y transacciones", duration: "45 min" }
                ]
            },
            {
                title: "MÓDULO 2: ETHEREUM Y SMART CONTRACTS",
                lessons: [
                    { title: "Introducción a Ethereum y EVM", duration: "45 min" },
                    { title: "Solidity: sintaxis y fundamentos", duration: "45 min" },
                    { title: "Desarrollo de smart contracts", duration: "45 min" }
                ]
            },
            {
                title: "MÓDULO 3: DESARROLLO DE DAPPS",
                lessons: [
                    { title: "Web3.js y interacción con blockchain", duration: "45 min" },
                    { title: "Frontend para aplicaciones descentralizadas", duration: "45 min" },
                    { title: "Testing y deployment de smart contracts", duration: "45 min" }
                ]
            },
            {
                title: "MÓDULO 4: CRIPTOMONEDAS Y TOKENS",
                lessons: [
                    { title: "M04-1 Creación de tokens ERC-20 y ERC-721", duration: "45 min" },
                    { title: "M04-2 DeFi y protocolos descentralizados", duration: "45 min" },
                    { title: "M04-3 Seguridad en smart contracts", duration: "45 min" }
                ]
            }
        ]
    },
    {
        id: 16,
        kind: 'in-person',
        name: "Marketing con Videos y YouTube",
        description: "Crea contenido viral, edita videos profesionales y haz crecer tu canal",
        price: 89.99,
        duration: 95,
        image: BASE_IMG_URL,
        author: 4,
        prerequisites: "Cámara o smartphone para grabar, conocimientos básicos de edición de video e interés en creación de contenido.",
        relatedCourses: [4, 8, 20],
        modules: [
            {
                title: "MÓDULO 1: CREACIÓN DE CONTENIDO",
                lessons: [
                    { title: "Estrategia de contenido y planificación", duration: "30 min" },
                    { title: "Grabación profesional con equipos básicos", duration: "30 min" },
                    { title: "Guiones y storytelling para videos", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 2: EDICIÓN DE VIDEO",
                lessons: [
                    { title: "Premiere Pro: edición básica", duration: "30 min" },
                    { title: "Efectos, transiciones y color grading", duration: "30 min" },
                    { title: "Audio, música y subtítulos", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 3: YOUTUBE Y OPTIMIZACIÓN",
                lessons: [
                    { title: "Optimización SEO para YouTube", duration: "30 min" },
                    { title: "Thumbnails, títulos y descripciones", duration: "30 min" },
                    { title: "Analytics y crecimiento del canal", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 4: MONETIZACIÓN Y MARKETING",
                lessons: [
                    { title: "M04-1 Monetización y YouTube Partner Program", duration: "30 min" },
                    { title: "M04-2 Colaboraciones y marca personal", duration: "30 min" },
                    { title: "M04-3 Publicidad en videos y sponsorships", duration: "30 min" }
                ]
            }
        ]
    },
    {
        id: 17,
        kind: 'online',
        name: "Programación de Bases de Datos",
        description: "Aprende MySQL, PostgreSQL, MongoDB y optimización de consultas",
        price: 129.99,
        duration: 125,
        image: BASE_IMG_URL,
        author: 2,
        prerequisites: "Conocimientos básicos de programación, lógica de bases de datos relacionales. SQL básico recomendado.",
        relatedCourses: [13, 2, 12],
        modules: [
            {
                title: "MÓDULO 1: SQL Y BASES DE DATOS RELACIONALES",
                lessons: [
                    { title: "Diseño de bases de datos y normalización", duration: "35 min" },
                    { title: "Consultas SQL avanzadas", duration: "35 min" },
                    { title: "Joins, subconsultas y funciones agregadas", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 2: MYSQL Y POSTGRESQL",
                lessons: [
                    { title: "Administración de MySQL", duration: "35 min" },
                    { title: "PostgreSQL y características avanzadas", duration: "35 min" },
                    { title: "Índices, triggers y stored procedures", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 3: MONGODB Y NOSQL",
                lessons: [
                    { title: "Introducción a MongoDB y documentos", duration: "35 min" },
                    { title: "Consultas y agregaciones en MongoDB", duration: "35 min" },
                    { title: "Modelado de datos NoSQL", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 4: OPTIMIZACIÓN Y PERFORMANCE",
                lessons: [
                    { title: "M04-1 Optimización de consultas y planes de ejecución", duration: "35 min" },
                    { title: "M04-2 Replicación y sharding", duration: "35 min" },
                    { title: "M04-3 Backup, restore y seguridad", duration: "35 min" }
                ]
            }
        ]
    },
    {
        id: 18,
        kind: 'online',
        name: "Emprendimiento Digital",
        description: "De la idea al negocio: estrategias para startups y emprendimientos online",
        price: 99.99,
        duration: 105,
        image: BASE_IMG_URL,
        author: 5,
        prerequisites: "Interés en emprendimiento y mentalidad de negocio. No se requiere experiencia previa.",
        relatedCourses: [4, 20, 10],
        modules: [
            {
                title: "MÓDULO 1: VALIDACIÓN DE IDEA Y MODELO DE NEGOCIO",
                lessons: [
                    { title: "De la idea al negocio viable", duration: "30 min" },
                    { title: "Business Model Canvas y Lean Startup", duration: "35 min" },
                    { title: "Validación de mercado y MVP", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 2: PLANIFICACIÓN Y FINANZAS",
                lessons: [
                    { title: "Plan de negocio y proyecciones financieras", duration: "35 min" },
                    { title: "Fuentes de financiamiento y inversión", duration: "30 min" },
                    { title: "Contabilidad básica para emprendedores", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 3: MARKETING Y VENTAS DIGITALES",
                lessons: [
                    { title: "Estrategia de marketing digital para startups", duration: "35 min" },
                    { title: "Ventas online y e-commerce", duration: "30 min" },
                    { title: "Growth hacking y adquisición de clientes", duration: "35 min" }
                ]
            },
            {
                title: "MÓDULO 4: ESCALAMIENTO Y OPERACIONES",
                lessons: [
                    { title: "M04-1 Operaciones y procesos de negocio", duration: "30 min" },
                    { title: "M04-2 Escalamiento y crecimiento sostenible", duration: "35 min" },
                    { title: "M04-3 Legal y aspectos legales del emprendimiento", duration: "35 min" }
                ]
            }
        ]
    },
    {
        id: 19,
        kind: 'online',
        name: "Docker y Kubernetes",
        description: "Containerización y orquestación de aplicaciones en la nube",
        price: 169.99,
        duration: 165,
        image: BASE_IMG_URL,
        author: 2,
        prerequisites: "Conocimientos de Linux, experiencia con sistemas operativos y conceptos básicos de DevOps.",
        relatedCourses: [13, 11, 10],
        modules: [
            {
                title: "MÓDULO 1: DOCKER Y CONTAINERIZACIÓN",
                lessons: [
                    { title: "Introducción a Docker y containers", duration: "40 min" },
                    { title: "Dockerfiles y construcción de imágenes", duration: "40 min" },
                    { title: "Docker Compose y orquestación básica", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 2: KUBERNETES FUNDAMENTALS",
                lessons: [
                    { title: "Arquitectura de Kubernetes", duration: "40 min" },
                    { title: "Pods, Deployments y Services", duration: "40 min" },
                    { title: "ConfigMaps y Secrets", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 3: KUBERNETES AVANZADO",
                lessons: [
                    { title: "Ingress y networking avanzado", duration: "40 min" },
                    { title: "Volumes y persistencia de datos", duration: "40 min" },
                    { title: "Autoscaling y HPA", duration: "40 min" }
                ]
            },
            {
                title: "MÓDULO 4: CI/CD Y DESPLIEGUE",
                lessons: [
                    { title: "M04-1 Integración con CI/CD pipelines", duration: "40 min" },
                    { title: "M04-2 Helm y gestión de aplicaciones", duration: "40 min" },
                    { title: "M04-3 Monitoreo y observabilidad en K8s", duration: "40 min" }
                ]
            }
        ]
    },
    {
        id: 20,
        kind: 'in-person',
        name: "Copywriting y Redacción Publicitaria",
        description: "Escribe textos persuasivos que convierten visitantes en clientes",
        price: 79.99,
        duration: 85,
        image: BASE_IMG_URL,
        author: 5,
        prerequisites: "Buena ortografía y gramática, creatividad en la escritura. No se requiere experiencia previa en marketing.",
        relatedCourses: [4, 16, 18],
        modules: [
            {
                title: "MÓDULO 1: FUNDAMENTOS DE COPYWRITING",
                lessons: [
                    { title: "Psicología de la persuasión y ventas", duration: "30 min" },
                    { title: "Estructura AIDA y fórmulas de copywriting", duration: "30 min" },
                    { title: "Headlines y títulos que convierten", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 2: COPYWRITING PARA DIFERENTES MEDIOS",
                lessons: [
                    { title: "Copywriting para landing pages", duration: "30 min" },
                    { title: "Emails y secuencias de email marketing", duration: "30 min" },
                    { title: "Redes sociales y anuncios publicitarios", duration: "30 min" }
                ]
            },
            {
                title: "MÓDULO 3: TÉCNICAS AVANZADAS",
                lessons: [
                    { title: "Storytelling y narrativa persuasiva", duration: "30 min" },
                    { title: "Prueba social y testimonios", duration: "30 min" },
                    { title: "Llamados a la acción (CTA) efectivos", duration: "30 min" }
                ]
            }
        ]
    }
]

export const AUTHORS = [
    {
        id: 1,
        name: "Milagros Roggero",
        stars: 4,
        description: "Desarrolladora Frontend con más de 7 años de experiencia especializada en React, Vue.js y TypeScript. Ex-diseñadora de interfaces en Meta y Adobe. Experta en diseño de sistemas de componentes, optimización de rendimiento y accesibilidad web. Ha contribuido a proyectos open source con más de 10k estrellas en GitHub.",
        image: "https://github.com/miliroggero.png",
    },
    {
        id: 2,
        name: "Valentin Virzi",
        stars: 4,
        description: "Ingeniero de Software con más de 9 años de experiencia en arquitectura backend y DevOps. Ex-ingeniero senior en Amazon y Netflix. Especialista en microservicios, Docker, Kubernetes y CI/CD. Ha diseñado sistemas que manejan millones de usuarios diarios. Certificado en Google Cloud y Kubernetes (CKA).",
        image: "https://github.com/valenvirzi.png",
    },
    {
        id: 3,
        name: "Federico Santillan",
        stars: 4,
        description: "Científico de Datos y desarrollador con más de 6 años de experiencia en Machine Learning y Python. Ex-investigador en IBM Research y Tesla. Especialista en redes neuronales, procesamiento de lenguaje natural y visión por computadora. Doctor en Ciencias de la Computación y autor de múltiples papers académicos.",
        image: "https://github.com/fedemarsantillan.png",
    },
    {
        id: 4,
        name: "Mateo Maccarone",
        stars: 4,
        description: "Desarrollador Mobile Full Stack con más de 8 años de experiencia en React Native, Flutter y desarrollo nativo iOS/Android. Ex-tech lead en Spotify y Uber. Especialista en optimización de aplicaciones móviles, integración de APIs y desarrollo de SDKs. Ha publicado más de 20 apps con millones de descargas.",
        image: "https://github.com/Mattee37.png",
    },
    {
        id: 5,
        name: "Santiago Muse",
        stars: 4,
        description: "Arquitecto de Software con más de 10 años de experiencia en desarrollo Full Stack y arquitectura cloud. Ex-arquitecto de soluciones en Microsoft y Salesforce. Especialista en escalabilidad, seguridad y arquitectura de sistemas distribuidos. Certificado en AWS Solutions Architect y ha mentoreado a más de 300 desarrolladores.",
        image: "https://github.com/SantiagoMuse.png",
    }
]