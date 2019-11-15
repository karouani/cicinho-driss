-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  ven. 15 nov. 2019 à 01:51
-- Version du serveur :  10.4.8-MariaDB
-- Version de PHP :  7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `massage`
--

-- --------------------------------------------------------

--
-- Structure de la table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `content` blob NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `files`
--

INSERT INTO `files` (`id`, `content`, `type`) VALUES
(4, 0x696d61676520626173653634, 'application/png'),
(5, 0x436c65696e2064276f65696c, 'imoticone');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `messages` blob NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `date_update` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `from_id`, `to_id`, `messages`, `is_read`, `date_update`) VALUES
(6, 2, 1, 0x426f6e6a6f7572204d722059617373696e65207475207078204d276169646572, 0, '2019-11-14 22:51:08'),
(7, 1, 2, 0x4f7569206269656e737572652c207175656c6c652065737420766f7472652070726f626c656d65, 0, '2019-11-14 22:51:40'),
(8, 2, 1, 0x496d6167652053756976616e7420766f7573206578706c697175657261697273206d6f6e206269672070726f626c656d65, 0, '2019-11-14 22:52:29'),
(9, 2, 1, 0x756e646566696e6564, 1, '2019-11-14 22:53:08'),
(10, 2, 1, 0x756e646566696e6564, 0, '2019-11-14 22:56:31'),
(11, 3, 1, 0x486f6c6120416d69676f20436f6d65206573746179, 0, '2019-11-14 22:56:46'),
(12, 1, 3, 0x45737461204275656e69202c20596f7520746f2e3f, 0, '2019-11-14 22:57:04'),
(13, 3, 1, 0x42696e69202c20696e692047726163696173, 0, '2019-11-14 22:57:18'),
(14, 3, 1, 0x756e646566696e6564, 0, '2019-11-14 22:57:48');

-- --------------------------------------------------------

--
-- Structure de la table `msg_file`
--

CREATE TABLE `msg_file` (
  `id_file` int(11) NOT NULL,
  `id_message` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `msg_file`
--

INSERT INTO `msg_file` (`id_file`, `id_message`) VALUES
(4, 9),
(5, 14);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `login`, `password`, `date_create`, `role`) VALUES
(1, 'Yassinos', 'admin', '123456', '2019-11-14 22:24:40', 'admin'),
(2, 'cicin', 'cicin', '123456', '2019-11-14 22:25:02', 'user'),
(3, 'navas', 'user', 'user', '2019-11-14 22:25:19', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from_id` (`from_id`,`to_id`),
  ADD KEY `to_id` (`to_id`);

--
-- Index pour la table `msg_file`
--
ALTER TABLE `msg_file`
  ADD KEY `id_file` (`id_file`),
  ADD KEY `id_message` (`id_message`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login` (`login`,`password`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`from_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`to_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `msg_file`
--
ALTER TABLE `msg_file`
  ADD CONSTRAINT `msg_file_ibfk_1` FOREIGN KEY (`id_file`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `msg_file_ibfk_2` FOREIGN KEY (`id_message`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
