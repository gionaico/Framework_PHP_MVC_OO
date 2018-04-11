-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-04-2018 a las 13:08:18
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `LearnEasy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses`
--

CREATE TABLE `courses` (
  `id` int(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `lenguage` varchar(20) NOT NULL,
  `ulr` varchar(300) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `levelCour` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `courseDescr` varchar(300) NOT NULL,
  `personalDescr` varchar(300) NOT NULL,
  `register_date` date NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `category` varchar(200) NOT NULL,
  `subject` varchar(20) NOT NULL,
  `sub_subject` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `courses`
--

INSERT INTO `courses` (`id`, `title`, `lenguage`, `ulr`, `duration`, `levelCour`, `price`, `courseDescr`, `personalDescr`, `register_date`, `avatar`, `category`, `subject`, `sub_subject`) VALUES
(1, 'Laravel para principiantes', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Medio', '99.99', '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-14', 'media/courses/default-potho.jpg', 'Security:Javascript:Laravel:', '', ''),
(2, 'Laravel para principiantes', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '99.99', '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-14', 'media/courses/1laravel.png', 'Backend:Robotics:Django:SQL:', 'Backend', ''),
(3, 'Laravel para principiantes', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '99.99', '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-14', 'media/courses/default-potho.jpg', 'Backend:Robotics:Django:SQL:', 'Backend', ''),
(4, 'Laravel para principiantes', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '99.99', '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-14', 'media/courses/default-potho.jpg', 'Backend:Robotics:Django:SQL:', 'Backend', ''),
(5, 'Laravel para principiantes', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '99.99', '5 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-14', 'media/courses/default-potho.jpg', 'Backend:Robotics:Django:SQL:', 'Backend', ''),
(6, 'Laravel para principiantes', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '99.99', '6 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-14', 'media/courses/default-potho.jpg', 'Backend:Robotics:Django:SQL:', 'Backend', ''),
(7, 'aprendiendo diseno web', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '19.25', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', '2018-03-15', 'media/courses/disenadorweb.png', 'Security:Laravel:', 'Security', ''),
(8, 'aprendiendo diseno web', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Medio', '19.25', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', '2018-03-15', 'media/courses/default-potho.jpg', 'Security:Django:', 'Security', ''),
(9, 'aprendiendo diseno web', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '19.25', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', '2018-03-15', 'media/courses/default-potho.jpg', 'Frondend:Diseny:Javascript:', 'Security', ''),
(10, 'aprendiendo diseno web', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Basic', '19.25', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', '2018-03-15', 'media/courses/default-potho.jpg', 'Robotics:SQL:', '', ''),
(11, 'aprendiendo diseno web', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Medio', '19.25', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', '2018-03-15', 'media/courses/default-potho.jpg', 'SQL:Mongo:', 'DB', ''),
(12, 'aprendiendo diseno web', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '19.25', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', '2018-03-15', 'media/courses/default-potho.jpg', 'Frondend:Laravel:Mongo:', 'Frondend', ''),
(13, 'aprendiendo diseno web', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Expert', '19.25', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', '2018-03-15', 'media/courses/default-potho.jpg', 'Security:SQL:', 'Backend', ''),
(14, 'aprendiendo diseno web', 'Spanish', 'https://www.youtube.com/', 'betwen 1-3 hours', 'Medio', '19.25', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', 'Adobe Photoshop es un editor de grÃ¡ficos rasterizados desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografÃ­as y grÃ¡ficos, su nombre en espaÃ±ol significa literalmente \"taller de fotos\". ', '2018-03-15', 'media/courses/default-potho.jpg', 'Robotics:Javascript:Laravel:SQL:', 'Backend', ''),
(15, 'JS para principiantes (desde 0)', 'Spanish', 'https://es.stackoverflow.com/questions/99249/c%C3%B3mo-obtener-json-desde-una-url', 'betwen 3-5 hours', 'Expert', '15.99', '14 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-21', 'media/courses/javascript.png', 'Javascript:', 'Frontend', 'Javascript'),
(16, 'JS para principiantes ', 'Spanish', 'https://es.stackoverflow.com/questions/99249/c%C3%B3mo-obtener-json-desde-una-url', 'betwen 3-5 hours', 'Medio', '15.99', '13 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-21', 'media/courses/default-potho.jpg', 'Backend:Security:PHP:', 'Frontend', 'Jquery'),
(17, 'JS para principiantes ', 'Spanish', 'https://es.stackoverflow.com/questions/99249/c%C3%B3mo-obtener-json-desde-una-url', 'betwen 3-5 hours', 'Expert', '15.99', '12 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-21', 'media/courses/default-potho.jpg', 'Angular:Node js:', 'Frontend', 'Javascript'),
(18, 'JS para principiantes ', 'Spanish', 'https://es.stackoverflow.com/questions/99249/c%C3%B3mo-obtener-json-desde-una-url', 'betwen 3-5 hours', 'Expert', '15.99', '11 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-21', 'media/courses/default-potho.jpg', 'Robotics:SQL:', 'Frontend', 'Angular 5'),
(19, 'JS para principiantes ', 'Spanish', 'https://es.stackoverflow.com/questions/99249/c%C3%B3mo-obtener-json-desde-una-url', 'greater than 10 hours', 'Expert', '15.99', '10 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-21', 'media/courses/default-potho.jpg', 'PHP:', 'DB', 'Mongo DB'),
(20, 'JS para principiantes ', 'Spanish', 'https://es.stackoverflow.com/questions/99249/c%C3%B3mo-obtener-json-desde-una-url', 'greater than 10 hours', 'Basic', '15.99', '9 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2018-03-21', 'media/courses/default-potho.jpg', 'Django:Laravel:Node js:', 'Frontend', 'Angular 5'),
(21, 'DB para novatos', 'Spanish', 'https://es.stackoverflow.com/questions/99249/c%C3%B3mo-obtener-json-desde-una-url', 'betwen 1-3 hours', 'Medio', '15.25', '8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, inventore, officiis! Unde quidem, iure quos velit consequuntur, accusantium recusandae ipsa odio corporis provident sequi temporibus autem aspernatur consequatur voluptates architecto!200', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2018-03-21', 'media/courses/bases.png', 'Security:Laravel:', 'Frontend', 'Jquery'),
(22, 'JAVA profesional orientado a objetos', 'Spanish', 'https://www.youtube.com/', 'greater than 10 hours', 'Medio', '75.2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi ab sit ex quis a repellendus architecto impedit nulla inventore ut sequi neque quaerat, asperiores voluptates in eum distinctio perferendis, at. Error eaque, saepe dolorem veniam vero odit veritatis eius corrupti ullam quam. Enim labori', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi ab sit ex quis a repellendus architecto impedit nulla inventore ut sequi neque quaerat, asperiores voluptates in eum distinctio perferendis, at. Error eaque, saepe dolorem veniam vero odit veritatis eius corrupti ullam quam. Enim labori', '2018-03-23', 'media/courses/default-potho.jpg', 'Backend:Django:', 'Backend', 'PHP'),
(23, 'CSS RESPONSIVE', 'Spanish', 'https://www.youtube.com/watch?v=dHQIQMYbhvU&list=PLkpsl5JUPCc7n0yQK0Zut8htZDfBPJoUa', 'betwen 5-10 hours', 'Medio', '48.65', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, provident amet repudiandae ipsum sunt quod, labore aliquam aspernatur, est nobis ex suscipit placeat facere culpa quam possimus odio magni a.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, provident amet repudiandae ipsum sunt quod, labore aliquam aspernatur, est nobis ex suscipit placeat facere culpa quam possimus odio magni a.', '2018-04-01', 'media/courses/435170690-sound.jpg', 'Backend:SQL:', 'Frontend', 'Jquery'),
(24, 'Disenyo  web', 'English', 'https://www.youtube.com/watch?v=dHQIQMYbhvU&list=PLkpsl5JUPCc7n0yQK0Zut8htZDfBPJoUa', 'betwen 3-5 hours', 'Expert', '15.25', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae obcaecati quidem aliquam nesciunt doloremque, harum doloribus eligendi ea cumque aspernatur est veniam animi tempore ratione ullam ipsam quae natus magnam.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae obcaecati quidem aliquam nesciunt doloremque, harum doloribus eligendi ea cumque aspernatur est veniam animi tempore ratione ullam ipsam quae natus magnam.', '2018-04-01', 'media/products/515389555-smile.jpg', 'Frondend:Diseny:Javascript:', 'Frontend', 'Javascript'),
(25, 'Seguridad de sistemas', 'Portuguese', 'https://www.youtube.com/watch?v=dHQIQMYbhvU&list=PLkpsl5JUPCc7n0yQK0Zut8htZDfBPJoUa', 'betwen 1-3 hours', 'Expert', '89.20', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, laborum est. Commodi nemo in cumque excepturi quis sapiente non consequatur vitae, dolorum inventore maxime deleniti provident laborum blanditiis quo. Repellat.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, laborum est. Commodi nemo in cumque excepturi quis sapiente non consequatur vitae, dolorum inventore maxime deleniti provident laborum blanditiis quo. Repellat.', '2018-04-01', 'media/products/1105224164-v.jpeg', 'Frondend:Laravel:', 'OP', 'Linux'),
(26, 'Juegos Frontend', 'Spanish', 'https://www.youtube.com/watch?v=dHQIQMYbhvU&list=PLkpsl5JUPCc7n0yQK0Zut8htZDfBPJoUa', 'greater than 10 hours', 'Medio', '12.50', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, laborum est. Commodi nemo in cumque excepturi quis sapiente non consequatur vitae, dolorum inventore maxime deleniti provident laborum blanditiis quo. Repellat.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, laborum est. Commodi nemo in cumque excepturi quis sapiente non consequatur vitae, dolorum inventore maxime deleniti provident laborum blanditiis quo. Repellat.', '2018-04-01', 'media/courses/2075060831-451028.jpg', 'Backend:Frondend:', 'Diseny', 'CSS3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id`, `user_name`, `id_curso`) VALUES
('giovanny_2', 'giovanny', 2),
('iando_2', 'iando', 2),
('pepon_21', 'pepon', 21),
('giovanny_7', 'giovanny', 7),
('iando_7', 'iando', 7),
('iando_15', 'iando', 15),
('giovanny_15', 'giovanny', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_name` varchar(50) NOT NULL COMMENT 'Clave primaria',
  `name` varchar(50) NOT NULL COMMENT 'nombre cliente',
  `birth_date` date NOT NULL,
  `genere` varchar(11) NOT NULL,
  `country` varchar(50) NOT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `phone` int(9) NOT NULL COMMENT 'móvil',
  `email` varchar(100) NOT NULL COMMENT 'email',
  `password` varchar(200) NOT NULL,
  `interests` varchar(100) NOT NULL,
  `register_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla de clientes';

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_name`, `name`, `birth_date`, `genere`, `country`, `province`, `city`, `phone`, `email`, `password`, `interests`, `register_date`) VALUES
('giovanny', 'apell1 apell2', '2000-01-07', 'NaNa', 'ES', '46', 'Valencia', 654654654, 'gmc.sss@gmail.com', '$2y$10$dZnLxKAJ5isjqecvxq9u.upj9PEb4CUQNlJkSSE0z5zWd86GVVhgm', 'Frondend:OS:Diseny:', '2018-03-09'),
('iando', 'apell1 apell2', '1989-01-07', 'NaNa', 'ES', '46', 'Valencia', 654654654, 'gmc.sss@gmail.com', '$2y$10$j8kq0R5uCdt.8f5XGN7cIuypY5KLya8SDaIeqpcDLiT8dfBYozEya', 'Frondend:OS:Diseny:', '2018-03-09'),
('iandocccc', 'sdfv sdgsgf', '2000-01-01', 'NaNa', 'AX', NULL, NULL, 654654699, 'dsfasdf@sdf.ffcc', '$2y$10$C/MFW7mVxfaYY1KtrI2WEOeEwpYCPSNbyNP7RD0ZoJ1mLPwl316RC', 'Backend:Frondend:Robotics:Security:', '2018-03-09'),
('iandoe', 'dsffsd dsfsd', '2000-01-01', 'NaNa', 'AX', NULL, NULL, 951951951, 'dsfasdf@sdf.ffe', '$2y$10$OdIdo9Z69ijLY60Eck1W9uVLddIEKj4bHxnr8C8b9VBIzVSNQ7yNC', 'Frondend:OS:', '2018-03-09'),
('marga', 'ape ape2', '2000-01-01', 'NaNa', 'AX', NULL, NULL, 951357852, 'sfsf@fdgdfg.ffg', '$2y$10$C7jJDmv0c8rxMO0IveDI7Oa90/YH8AkFjv8ZgXcv9ya3bxTPo8XKq', 'OS:', '2018-03-11'),
('pepito', 'apell1 apell2', '1989-01-07', 'NaNa', 'ES', '46', 'Valencia', 654654654, 'gmc.sss@gmail.com', '$2y$10$pCjnDxz/VFtVwZq6QE5mSuEpOyGntu8OrGrCMQGriKIkgLIAnYSXS', 'Frondend:OS:Diseny:', '2018-03-09'),
('pepon', 'ape1 ape2', '1985-01-03', 'NaNa', 'AR', NULL, NULL, 654654654, 'sfgsfdg@fdsdg.cd', '$2y$10$Xb0wyq0k0NWg16/vjddBp.QC3AwCCz3IuPPS7VSWMiNpgEppzdbXG', 'Diseny:Robotics:', '2018-03-09'),
('un', 'name', '2010-00-00', 'male', 'ES', '46', 'dddd', 654654654, 'dsfasdf@sdf.ff', 'dsfsd55', 'dsfdf', '0000-00-00'),
('xfgcdsfgdfg', 'fgdfgdfg', '2000-01-07', 'NaNa', 'AR', NULL, NULL, 654654654, 'sdfgsg@fdgfdg.dsf', '$2y$10$wE5yazRFQFYBWUrjos9A0uAP4AfJ45oYohYFayfTi3/16ljwEPwvS', 'Frondend:', '2018-03-09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;