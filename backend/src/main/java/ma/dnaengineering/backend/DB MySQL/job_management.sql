-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 21 jan. 2025 à 00:46
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `job_management`
--

-- --------------------------------------------------------

--
-- Structure de la table `job`
--

CREATE TABLE `job` (
  `id` bigint(20) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `posted_at` datetime(6) DEFAULT NULL,
  `salary` decimal(38,2) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `job`
--

INSERT INTO `job` (`id`, `description`, `location`, `posted_at`, `salary`, `title`, `updated_at`) VALUES
(1, 'Develop and maintain web applications using Java, Spring Boot, and React.', 'Casablanca, Morocco', '2025-01-19 16:30:12.000000', '10000.00', 'Software Developer', '2025-01-20 23:15:58.000000'),
(9, 'Analyze large datasets, build predictive models, and create data visualizations to drive business decisions.', 'San Francisco, CA', '2025-01-20 23:15:50.000000', '110000.00', 'Data Scientist', '2025-01-20 23:15:50.000000'),
(10, 'Manage product development cycles, collaborate with cross-functional teams, and define product roadmaps.', 'Austin, TX', '2025-01-20 23:16:37.000000', '95000.00', 'Product Manager', '2025-01-20 23:16:37.000000'),
(11, 'Plan and execute marketing campaigns, analyze market trends, and build customer engagement strategies.', 'Los Angeles, CA', '2025-01-20 23:17:10.000000', '75000.00', 'Marketing Specialist', '2025-01-20 23:17:10.000000');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `job`
--
ALTER TABLE `job`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
