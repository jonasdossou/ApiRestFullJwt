// Modèle de données pour les tâches
// Comme nous n'utilisons pas de base de données, nous allons stocker les tâches en mémoire

// Tableau pour stocker les tâches
let tasks = [
    {
      id: 1,
      title: "Apprendre Node.js",
      description: "Étudier les concepts de base de Node.js et Express",
      status: "en cours",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Créer une API REST",
      description: "Développer une API RESTful pour la gestion de tâches",
      status: "à faire",
      createdAt: new Date().toISOString()
    }
  ];
  
  // Compteur pour générer des IDs uniques
  let nextId = 3;
  
  // Méthodes pour manipuler les tâches
  const Task = {
    // Récupérer toutes les tâches
    getAll: () => {
      return tasks;
    },
  
    // Récupérer une tâche par son ID
    getById: (id) => {
      return tasks.find(task => task.id === parseInt(id));
    },
  
    // Créer une nouvelle tâche
    create: (taskData) => {
      const newTask = {
        id: nextId++,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || "à faire",
        createdAt: new Date().toISOString()
      };
      tasks.push(newTask);
      return newTask;
    },
  
    // Mettre à jour une tâche existante
    update: (id, taskData) => {
      const index = tasks.findIndex(task => task.id === parseInt(id));
      if (index === -1) return null;
  
      const updatedTask = {
        ...tasks[index],
        title: taskData.title || tasks[index].title,
        description: taskData.description || tasks[index].description,
        status: taskData.status || tasks[index].status,
        updatedAt: new Date().toISOString()
      };
  
      tasks[index] = updatedTask;
      return updatedTask;
    },
  
    // Supprimer une tâche
    delete: (id) => {
      const index = tasks.findIndex(task => task.id === parseInt(id));
      if (index === -1) return false;
  
      tasks.splice(index, 1);
      return true;
    }
  };
  
  module.exports = Task; 






// Modèle de données pour les utilisateurs
// Comme nous n'utilisons pas de base de données, nous allons stocker les utilisateurs en mémoire

// Tableau pour stocker les utilisateurs
let users = [
	{
		id: 1,
		username: "admin",
		password: "admin123", // En production, il faudrait hacher les mots de passe
		email: "admin@example.com",
		createdAt: new Date().toISOString(),
	},
];

// Compteur pour générer des IDs uniques
let nextId1 = 2;

// Méthodes pour manipuler les utilisateurs
const User = {
	// Récupérer tous les utilisateurs
	getAll: () => {
		return users.map((user) => {
			const { password, ...userWithoutPassword } = user;
			return userWithoutPassword;
		});
	},

	// Récupérer un utilisateur par son ID
	getById: (id) => {
		const user = users.find((user) => user.id === parseInt(id));
		if (!user) return null;

		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	},

	// Récupérer un utilisateur par son nom d'utilisateur
	getByUsername: (username) => {
		return users.find((user) => user.username === username);
	},

	// Créer un nouvel utilisateur
	create: (userData) => {
		// Vérifier si l'utilisateur existe déjà
		if (users.some((user) => user.username === userData.username)) {
			return null;
		}

		const newUser = {
			id: nextId++,
			username: userData.username,
			password: userData.password, // En production, il faudrait hacher les mots de passe
			email: userData.email,
			createdAt: new Date().toISOString(),
		};

		users.push(newUser);

		const { password, ...userWithoutPassword } = newUser;
		return userWithoutPassword;
	},

	// Authentifier un utilisateur
	authenticate: (username, password) => {
		const user = users.find(
			(user) => user.username === username && user.password === password
		);
		if (!user) return null;

		const { password: pwd, ...userWithoutPassword } = user;
		return userWithoutPassword;
	},
};

module.exports = User;




























// MIDDLEWARE
// Middleware d'authentification
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Clé secrète pour vérifier les tokens JWT (doit être la même que dans authController)
const JWT_SECRET = 'votre_clé_secrète_jwt'; // En production, utilisez une variable d'environnement

// Middleware pour protéger les routes
const auth = (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Accès non autorisé. Token manquant."
      });
    }

    // Extraire le token
    const token = authHeader.split(' ')[1];

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Vérifier si l'utilisateur existe toujours
    const user = User.getById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    // Ajouter les informations de l'utilisateur à la requête
    req.user = decoded;
    
    // Passer au middleware suivant
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Accès non autorisé. Token invalide.",
      error: error.message
    });
  }
};

module.exports = auth; 