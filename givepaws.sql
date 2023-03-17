-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2023 at 04:01 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `givepaws`
--

-- --------------------------------------------------------

--
-- Table structure for table `authen`
--

CREATE TABLE `authen` (
  `authID` int(20) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `DOB` datetime NOT NULL,
  `address` varchar(1000) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `DateAuthen` datetime NOT NULL,
  `IDcard` varchar(100) NOT NULL,
  `user` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `authen`
--

INSERT INTO `authen` (`authID`, `firstname`, `surname`, `DOB`, `address`, `tel`, `DateAuthen`, `IDcard`, `user`) VALUES
(70, 'โสภณวิชญ์', 'ควันไชย', '2023-03-07 17:00:00', '43 หมู่ 6 ตำบลกำแพงแสน จังหวัดนครปฐม', '0638545547', '2023-03-14 13:04:41', '1245874699875', 40);

-- --------------------------------------------------------

--
-- Table structure for table `authen_check`
--

CREATE TABLE `authen_check` (
  `id` int(10) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `isApprove` tinyint(1) NOT NULL,
  `authen` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `authen_check`
--

INSERT INTO `authen_check` (`id`, `comment`, `isApprove`, `authen`) VALUES
(16, 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', 1, 70);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add permission', 1, 'add_permission'),
(2, 'Can change permission', 1, 'change_permission'),
(3, 'Can delete permission', 1, 'delete_permission'),
(4, 'Can view permission', 1, 'view_permission'),
(5, 'Can add group', 2, 'add_group'),
(6, 'Can change group', 2, 'change_group'),
(7, 'Can delete group', 2, 'delete_group'),
(8, 'Can view group', 2, 'view_group'),
(9, 'Can add content type', 3, 'add_contenttype'),
(10, 'Can change content type', 3, 'change_contenttype'),
(11, 'Can delete content type', 3, 'delete_contenttype'),
(12, 'Can view content type', 3, 'view_contenttype'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add log entry', 5, 'add_logentry'),
(18, 'Can change log entry', 5, 'change_logentry'),
(19, 'Can delete log entry', 5, 'delete_logentry'),
(20, 'Can view log entry', 5, 'view_logentry'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add authen', 7, 'add_authen'),
(26, 'Can change authen', 7, 'change_authen'),
(27, 'Can delete authen', 7, 'delete_authen'),
(28, 'Can view authen', 7, 'view_authen'),
(29, 'Can add auth group', 8, 'add_authgroup'),
(30, 'Can change auth group', 8, 'change_authgroup'),
(31, 'Can delete auth group', 8, 'delete_authgroup'),
(32, 'Can view auth group', 8, 'view_authgroup'),
(33, 'Can add auth group permissions', 9, 'add_authgrouppermissions'),
(34, 'Can change auth group permissions', 9, 'change_authgrouppermissions'),
(35, 'Can delete auth group permissions', 9, 'delete_authgrouppermissions'),
(36, 'Can view auth group permissions', 9, 'view_authgrouppermissions'),
(37, 'Can add auth permission', 10, 'add_authpermission'),
(38, 'Can change auth permission', 10, 'change_authpermission'),
(39, 'Can delete auth permission', 10, 'delete_authpermission'),
(40, 'Can view auth permission', 10, 'view_authpermission'),
(41, 'Can add card', 11, 'add_card'),
(42, 'Can change card', 11, 'change_card'),
(43, 'Can delete card', 11, 'delete_card'),
(44, 'Can view card', 11, 'view_card'),
(45, 'Can add django content type', 12, 'add_djangocontenttype'),
(46, 'Can change django content type', 12, 'change_djangocontenttype'),
(47, 'Can delete django content type', 12, 'delete_djangocontenttype'),
(48, 'Can view django content type', 12, 'view_djangocontenttype'),
(49, 'Can add django migrations', 13, 'add_djangomigrations'),
(50, 'Can change django migrations', 13, 'change_djangomigrations'),
(51, 'Can delete django migrations', 13, 'delete_djangomigrations'),
(52, 'Can view django migrations', 13, 'view_djangomigrations'),
(53, 'Can add donar', 14, 'add_donar'),
(54, 'Can change donar', 14, 'change_donar'),
(55, 'Can delete donar', 14, 'delete_donar'),
(56, 'Can view donar', 14, 'view_donar'),
(57, 'Can add donateaccept', 15, 'add_donateaccept'),
(58, 'Can change donateaccept', 15, 'change_donateaccept'),
(59, 'Can delete donateaccept', 15, 'delete_donateaccept'),
(60, 'Can view donateaccept', 15, 'view_donateaccept'),
(61, 'Can add donatetopic', 16, 'add_donatetopic'),
(62, 'Can change donatetopic', 16, 'change_donatetopic'),
(63, 'Can delete donatetopic', 16, 'delete_donatetopic'),
(64, 'Can view donatetopic', 16, 'view_donatetopic'),
(65, 'Can add hcapprovedocument', 17, 'add_hcapprovedocument'),
(66, 'Can change hcapprovedocument', 17, 'change_hcapprovedocument'),
(67, 'Can delete hcapprovedocument', 17, 'delete_hcapprovedocument'),
(68, 'Can view hcapprovedocument', 17, 'view_hcapprovedocument'),
(69, 'Can add hospital', 18, 'add_hospital'),
(70, 'Can change hospital', 18, 'change_hospital'),
(71, 'Can delete hospital', 18, 'delete_hospital'),
(72, 'Can view hospital', 18, 'view_hospital'),
(73, 'Can add hospitalcoordinator', 19, 'add_hospitalcoordinator'),
(74, 'Can change hospitalcoordinator', 19, 'change_hospitalcoordinator'),
(75, 'Can delete hospitalcoordinator', 19, 'delete_hospitalcoordinator'),
(76, 'Can view hospitalcoordinator', 19, 'view_hospitalcoordinator'),
(77, 'Can add paymentcard', 20, 'add_paymentcard'),
(78, 'Can change paymentcard', 20, 'change_paymentcard'),
(79, 'Can delete paymentcard', 20, 'delete_paymentcard'),
(80, 'Can view paymentcard', 20, 'view_paymentcard'),
(81, 'Can add receipttype', 21, 'add_receipttype'),
(82, 'Can change receipttype', 21, 'change_receipttype'),
(83, 'Can delete receipttype', 21, 'delete_receipttype'),
(84, 'Can view receipttype', 21, 'view_receipttype'),
(85, 'Can add report', 22, 'add_report'),
(86, 'Can change report', 22, 'change_report'),
(87, 'Can delete report', 22, 'delete_report'),
(88, 'Can view report', 22, 'view_report'),
(89, 'Can add users user', 23, 'add_usersuser'),
(90, 'Can change users user', 23, 'change_usersuser'),
(91, 'Can delete users user', 23, 'delete_usersuser'),
(92, 'Can view users user', 23, 'view_usersuser'),
(93, 'Can add users user groups', 24, 'add_usersusergroups'),
(94, 'Can change users user groups', 24, 'change_usersusergroups'),
(95, 'Can delete users user groups', 24, 'delete_usersusergroups'),
(96, 'Can view users user groups', 24, 'view_usersusergroups'),
(97, 'Can add users user user permissions', 25, 'add_usersuseruserpermissions'),
(98, 'Can change users user user permissions', 25, 'change_usersuseruserpermissions'),
(99, 'Can delete users user user permissions', 25, 'delete_usersuseruserpermissions'),
(100, 'Can view users user user permissions', 25, 'view_usersuseruserpermissions'),
(101, 'Can add authenimage', 26, 'add_authenimage'),
(102, 'Can change authenimage', 26, 'change_authenimage'),
(103, 'Can delete authenimage', 26, 'delete_authenimage'),
(104, 'Can view authenimage', 26, 'view_authenimage'),
(105, 'Can add django admin log', 27, 'add_djangoadminlog'),
(106, 'Can change django admin log', 27, 'change_djangoadminlog'),
(107, 'Can delete django admin log', 27, 'delete_djangoadminlog'),
(108, 'Can view django admin log', 27, 'view_djangoadminlog'),
(109, 'Can add django session', 28, 'add_djangosession'),
(110, 'Can change django session', 28, 'change_djangosession'),
(111, 'Can delete django session', 28, 'delete_djangosession'),
(112, 'Can view django session', 28, 'view_djangosession'),
(113, 'Can add givepaws authenimage', 29, 'add_givepawsauthenimage'),
(114, 'Can change givepaws authenimage', 29, 'change_givepawsauthenimage'),
(115, 'Can delete givepaws authenimage', 29, 'delete_givepawsauthenimage'),
(116, 'Can view givepaws authenimage', 29, 'view_givepawsauthenimage'),
(117, 'Can add authen check', 30, 'add_authencheck'),
(118, 'Can change authen check', 30, 'change_authencheck'),
(119, 'Can delete authen check', 30, 'delete_authencheck'),
(120, 'Can view authen check', 30, 'view_authencheck'),
(121, 'Can add card img', 31, 'add_cardimg'),
(122, 'Can change card img', 31, 'change_cardimg'),
(123, 'Can delete card img', 31, 'delete_cardimg'),
(124, 'Can view card img', 31, 'view_cardimg');

-- --------------------------------------------------------

--
-- Table structure for table `card`
--

CREATE TABLE `card` (
  `cardID` int(20) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `date` datetime NOT NULL,
  `cardstatus` varchar(100) NOT NULL,
  `receipttype` varchar(100) NOT NULL,
  `receiptnumber` varchar(100) NOT NULL,
  `receiptimgpath` varchar(1000) NOT NULL,
  `price` float NOT NULL,
  `user` bigint(20) NOT NULL,
  `hospitalID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`cardID`, `topic`, `description`, `date`, `cardstatus`, `receipttype`, `receiptnumber`, `receiptimgpath`, `price`, `user`, `hospitalID`) VALUES
(6, 'ช่วยเหลือ', 'ช่วยเหลือโรค........................', '2023-03-09 05:32:05', 'reject', 'ใบเสร็จ', '432578', 'img/receipt/Squidward_Him3brX.jpg', 5000, 40, 1),
(19, 'ขอความช่วยเหลือหมา', 'ขอความช่วยเหลือหมา', '2023-03-17 12:22:42', 'waiting', 'ใบเสร็จ', 'GWE-1231', 'img/receipt/cropped-3840-2160-1213237.jpg', 1111110000000, 40, 2),
(20, 'ช่วยแมว', 'ช่วยแมว', '2023-03-17 12:25:20', 'approve', 'ใบเสนอราคา', '7878', 'img/receipt/Desktop_4K__3840_x_2160_.png', 5875, 40, 2);

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(5, 'admin', 'logentry'),
(2, 'auth', 'group'),
(1, 'auth', 'permission'),
(3, 'contenttypes', 'contenttype'),
(7, 'givepaws', 'authen'),
(30, 'givepaws', 'authencheck'),
(26, 'givepaws', 'authenimage'),
(8, 'givepaws', 'authgroup'),
(9, 'givepaws', 'authgrouppermissions'),
(10, 'givepaws', 'authpermission'),
(11, 'givepaws', 'card'),
(31, 'givepaws', 'cardimg'),
(27, 'givepaws', 'djangoadminlog'),
(12, 'givepaws', 'djangocontenttype'),
(13, 'givepaws', 'djangomigrations'),
(28, 'givepaws', 'djangosession'),
(14, 'givepaws', 'donar'),
(15, 'givepaws', 'donateaccept'),
(16, 'givepaws', 'donatetopic'),
(29, 'givepaws', 'givepawsauthenimage'),
(17, 'givepaws', 'hcapprovedocument'),
(18, 'givepaws', 'hospital'),
(19, 'givepaws', 'hospitalcoordinator'),
(20, 'givepaws', 'paymentcard'),
(21, 'givepaws', 'receipttype'),
(22, 'givepaws', 'report'),
(23, 'givepaws', 'usersuser'),
(24, 'givepaws', 'usersusergroups'),
(25, 'givepaws', 'usersuseruserpermissions'),
(6, 'sessions', 'session'),
(4, 'users', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2023-03-07 17:39:25.145713'),
(2, 'contenttypes', '0002_remove_content_type_name', '2023-03-07 17:39:25.209269'),
(3, 'auth', '0001_initial', '2023-03-07 17:39:25.486677'),
(4, 'auth', '0002_alter_permission_name_max_length', '2023-03-07 17:39:25.548692'),
(5, 'auth', '0003_alter_user_email_max_length', '2023-03-07 17:39:25.555692'),
(6, 'auth', '0004_alter_user_username_opts', '2023-03-07 17:39:25.562695'),
(7, 'auth', '0005_alter_user_last_login_null', '2023-03-07 17:39:25.569692'),
(8, 'auth', '0006_require_contenttypes_0002', '2023-03-07 17:39:25.574692'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2023-03-07 17:39:25.580692'),
(10, 'auth', '0008_alter_user_username_max_length', '2023-03-07 17:39:25.586697'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2023-03-07 17:39:25.593698'),
(12, 'auth', '0010_alter_group_name_max_length', '2023-03-07 17:39:25.659945'),
(13, 'auth', '0011_update_proxy_permissions', '2023-03-07 17:39:25.666946'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2023-03-07 17:39:25.672946'),
(15, 'users', '0001_initial', '2023-03-07 17:39:25.955993'),
(16, 'admin', '0001_initial', '2023-03-07 17:42:18.842489'),
(17, 'admin', '0002_logentry_remove_auto_add', '2023-03-07 17:42:18.850490'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2023-03-07 17:42:18.858493'),
(19, 'givepaws', '0001_initial', '2023-03-07 17:42:18.873490'),
(20, 'sessions', '0001_initial', '2023-03-07 17:42:18.908492'),
(21, 'givepaws', '0002_authenimage', '2023-03-07 17:51:14.794455'),
(22, 'givepaws', '0003_djangoadminlog_djangosession_givepawsauthenimage_and_more', '2023-03-08 09:50:45.879697'),
(23, 'givepaws', '0004_authencheck', '2023-03-11 18:17:26.069633'),
(24, 'givepaws', '0005_delete_receipttype', '2023-03-16 05:28:05.021414'),
(25, 'givepaws', '0006_cardimg', '2023-03-16 13:39:38.943820');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donar`
--

CREATE TABLE `donar` (
  `donarID` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `topic` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `cardID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donateaccept`
--

CREATE TABLE `donateaccept` (
  `donateacceptID` int(20) NOT NULL,
  `hospitalID` int(20) NOT NULL,
  `hcID` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `description` varchar(10000) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `cardID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donatetopic`
--

CREATE TABLE `donatetopic` (
  `donatetopicID` int(20) NOT NULL,
  `cardID` int(20) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `donatetopic`
--

INSERT INTO `donatetopic` (`donatetopicID`, `cardID`, `topic`, `amount`) VALUES
(5, 6, 'ค่าอาหาร', 1000),
(6, 6, 'ค่ายา', 1000),
(10, 20, 'ค่าเดินทาง', 457),
(11, 20, 'ค่ายา', 5544);

-- --------------------------------------------------------

--
-- Table structure for table `givepaws_authenimage`
--

CREATE TABLE `givepaws_authenimage` (
  `id` bigint(20) NOT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `authen_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `givepaws_authenimage`
--

INSERT INTO `givepaws_authenimage` (`id`, `image`, `authen_id`) VALUES
(77, 'img/authen/012490_1280x720_740026_007.jpg', 70),
(78, 'img/authen/936378.jpg', 70);

-- --------------------------------------------------------

--
-- Table structure for table `givepaws_cardimg`
--

CREATE TABLE `givepaws_cardimg` (
  `id` bigint(20) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `card_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `givepaws_cardimg`
--

INSERT INTO `givepaws_cardimg` (`id`, `image`, `card_id`) VALUES
(7, 'img/card/Egx5IKJWkAE2LMd.jpg', 6),
(8, 'img/card/fantasy-mountain-landscape-uhdpaper.com-4K-8.1402.jpg', 6),
(9, 'img/card/images.jpg', 6),
(29, 'img/card/cropped-3840-2160-1213237.jpg', 19),
(30, 'img/card/WH3_Khorne_Wallpaper_Desktop_4K_3840x2160.jpg', 19),
(31, 'img/card/WH3_wallpaper_Valkia_2K-1.jpg', 19),
(32, 'img/card/WH3_wallpaper_Festus_2k.jpg', 19),
(33, 'img/card/cropped-3840-2160-1213230.jpg', 20),
(34, 'img/card/cropped-3840-2160-1213231.jpg', 20);

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `hospitalID` int(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`hospitalID`, `name`, `email`, `address`, `tel`) VALUES
(1, 'Hoospital', 'Hoospital', 'Hoospital', 'Hoospital'),
(2, 'Hoospital2', 'Hoospital2', 'Hoospital2', 'Hoospital2');

-- --------------------------------------------------------

--
-- Table structure for table `hospitalcoordinator`
--

CREATE TABLE `hospitalcoordinator` (
  `hcID` int(20) NOT NULL,
  `hospitalID` int(20) NOT NULL,
  `hcdocID` int(20) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hospitalcoordinator`
--

INSERT INTO `hospitalcoordinator` (`hcID`, `hospitalID`, `hcdocID`, `firstname`, `surname`, `tel`) VALUES
(1, 1, 1, 'HoospitalCoo', 'HoospitalCoo', 'HoospitalCoo');

-- --------------------------------------------------------

--
-- Table structure for table `paymentcard`
--

CREATE TABLE `paymentcard` (
  `paymentcardID` int(20) NOT NULL,
  `user` bigint(20) NOT NULL,
  `contribution` float NOT NULL,
  `date` datetime NOT NULL,
  `paymentcardimg` varchar(1000) NOT NULL,
  `status` varchar(100) NOT NULL,
  `donatetopicID` int(20) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `paymentcard`
--

INSERT INTO `paymentcard` (`paymentcardID`, `user`, `contribution`, `date`, `paymentcardimg`, `status`, `donatetopicID`, `comment`) VALUES
(3, 40, 50000, '2023-03-06 05:32:05', 'img/payment/1124772.jpg', 'waiting', 5, ''),
(5, 41, 500, '2023-03-15 07:37:16', 'test', 'test', 5, ''),
(6, 40, 47584, '2023-03-09 05:32:05', 'img/payment/astronaut-black-hole-galaxy-space-4k-a0_8o6iHAN.jpg', 'complete', 5, ''),
(18, 40, 5000, '2023-03-09 05:32:05', 'img/payment/kena-bridge-of-spirits-game-4k-wallpaper-3840x2160-uhdpaper.com-237.0_b.jpg', 'reject', 5, 'สลิปไม่ตรงกรุณาส่งมาใหม่');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `memberID` int(20) NOT NULL,
  `cardID` int(20) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `reportID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_user`
--

CREATE TABLE `users_user` (
  `id` bigint(20) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `is_employee` tinyint(1) NOT NULL,
  `is_hospitalcoordinator` tinyint(1) NOT NULL,
  `is_authen` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users_user`
--

INSERT INTO `users_user` (`id`, `last_login`, `is_superuser`, `first_name`, `last_name`, `is_staff`, `is_active`, `date_joined`, `name`, `email`, `password`, `username`, `is_employee`, `is_hospitalcoordinator`, `is_authen`) VALUES
(1, NULL, 0, '', '', 1, 1, '2023-03-07 17:45:12.215576', 'admin-spw', 'admin-spw@gmail.com', 'pbkdf2_sha256$390000$IQUfhHmSWI16vfPG8JAAnf$tcKxhlddHNz0D/gmGmrkYEgO2WOr0SRkBug3B2trlzc=', 'admin-spw', 0, 0, 0),
(21, NULL, 0, '', '', 0, 1, '2023-03-10 07:30:53.631110', 'employee-spw', 'employee-spw@gmail.com', 'pbkdf2_sha256$390000$OFpej4UE7t80EWl6KvJjYY$WGyCCMpHUl0MDsgqIO3Oo6+ijrIDSqJgHpadocOl67Y=', 'employee-spw', 1, 0, 0),
(22, NULL, 0, '', '', 0, 1, '2023-03-10 07:32:28.249206', 'hospital-spw', 'hospital-spw@gmail.com', 'pbkdf2_sha256$390000$oxeocjmFevo6YC1LH2IKhW$ibUmislx8P0b1UJnIHsGW/SBLcuYbZULSFMh8pYVOyo=', 'hospital-spw', 0, 1, 0),
(35, NULL, 0, '', '', 0, 1, '2023-03-11 15:07:00.733636', 'spw-kwc007', 'spw-kwc@gmail.com', 'pbkdf2_sha256$390000$5QwiWHR4EYuUajQXOti7K9$HVQ45KSv9JFtEWs0c6RiGCegqj6vlzcE0ngY1FQS5ac=', 'spw-kwc007', 0, 0, 0),
(40, NULL, 0, '', '', 0, 1, '2023-03-12 17:07:46.977567', 'Kwanchai', 'Kwanchai@ku.th', 'pbkdf2_sha256$390000$s4h3s5oZGQiS1Nx6rArQfu$biPtC55BjqoLooVC5NiD+oWEDjGOeIvLmCXfTk1pr9w=', 'Kwanchai', 0, 0, 1),
(41, NULL, 0, '', '', 0, 1, '2023-03-14 07:06:44.448066', 'test', 'test@gmail.com', 'pbkdf2_sha256$390000$kL9KyP8jUEJ5D6XRScNYy6$tFvi+SXOnNHBoGHSFPkdbzx4lHmulFZAz1U03dkG5yg=', 'test-authen', 0, 0, 0),
(43, NULL, 0, '', '', 0, 1, '2023-03-17 12:51:56.860381', 'Sophonwit', 'Sophonwit.ksss@ku.th', 'pbkdf2_sha256$390000$qNBjuWVJb9DLxx0WJSV3r8$KY28AIBSQeybP+fTjbg2z1jySb7zAmhL0fBfF67y9tk=', 'Sophonwit', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_user_groups`
--

CREATE TABLE `users_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_user_user_permissions`
--

CREATE TABLE `users_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authen`
--
ALTER TABLE `authen`
  ADD PRIMARY KEY (`authID`),
  ADD UNIQUE KEY `user` (`user`);

--
-- Indexes for table `authen_check`
--
ALTER TABLE `authen_check`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `authen` (`authen`),
  ADD KEY `comment` (`comment`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`cardID`),
  ADD KEY `user` (`user`),
  ADD KEY `hospitalID` (`hospitalID`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_users_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `donar`
--
ALTER TABLE `donar`
  ADD PRIMARY KEY (`donarID`),
  ADD KEY `donarID` (`cardID`) USING BTREE;

--
-- Indexes for table `donateaccept`
--
ALTER TABLE `donateaccept`
  ADD PRIMARY KEY (`donateacceptID`),
  ADD UNIQUE KEY `hcID` (`hcID`),
  ADD UNIQUE KEY `cardID` (`cardID`),
  ADD KEY `hospitalID` (`hospitalID`);

--
-- Indexes for table `donatetopic`
--
ALTER TABLE `donatetopic`
  ADD PRIMARY KEY (`donatetopicID`),
  ADD KEY `cardID` (`cardID`);

--
-- Indexes for table `givepaws_authenimage`
--
ALTER TABLE `givepaws_authenimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `givepaws_authenimage_authen_id_35a6bde3_fk_authen_authID` (`authen_id`);

--
-- Indexes for table `givepaws_cardimg`
--
ALTER TABLE `givepaws_cardimg`
  ADD PRIMARY KEY (`id`),
  ADD KEY `givepaws_cardimg_card_id_3cf3c6c2_fk_card_cardID` (`card_id`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`hospitalID`);

--
-- Indexes for table `hospitalcoordinator`
--
ALTER TABLE `hospitalcoordinator`
  ADD PRIMARY KEY (`hcID`),
  ADD KEY `hcdocID` (`hcdocID`),
  ADD KEY `hospitalcoordinator_ibfk_2` (`hospitalID`);

--
-- Indexes for table `paymentcard`
--
ALTER TABLE `paymentcard`
  ADD PRIMARY KEY (`paymentcardID`),
  ADD KEY `memberID` (`user`),
  ADD KEY `donatetopicID` (`donatetopicID`),
  ADD KEY `donatetopicID_2` (`donatetopicID`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`reportID`),
  ADD KEY `cardID` (`cardID`),
  ADD KEY `memberID` (`memberID`);

--
-- Indexes for table `users_user`
--
ALTER TABLE `users_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users_user_groups`
--
ALTER TABLE `users_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_groups_user_id_group_id_b88eab82_uniq` (`user_id`,`group_id`),
  ADD KEY `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_user_permissions_user_id_permission_id_43338c45_uniq` (`user_id`,`permission_id`),
  ADD KEY `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` (`permission_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authen`
--
ALTER TABLE `authen`
  MODIFY `authID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `authen_check`
--
ALTER TABLE `authen_check`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `cardID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `donar`
--
ALTER TABLE `donar`
  MODIFY `donarID` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donateaccept`
--
ALTER TABLE `donateaccept`
  MODIFY `donateacceptID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donatetopic`
--
ALTER TABLE `donatetopic`
  MODIFY `donatetopicID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `givepaws_authenimage`
--
ALTER TABLE `givepaws_authenimage`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `givepaws_cardimg`
--
ALTER TABLE `givepaws_cardimg`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `hospital`
--
ALTER TABLE `hospital`
  MODIFY `hospitalID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hospitalcoordinator`
--
ALTER TABLE `hospitalcoordinator`
  MODIFY `hcID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `paymentcard`
--
ALTER TABLE `paymentcard`
  MODIFY `paymentcardID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `reportID` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_user`
--
ALTER TABLE `users_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `users_user_groups`
--
ALTER TABLE `users_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authen`
--
ALTER TABLE `authen`
  ADD CONSTRAINT `authen_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `authen_check`
--
ALTER TABLE `authen_check`
  ADD CONSTRAINT `authen_check_ibfk_1` FOREIGN KEY (`authen`) REFERENCES `authen` (`authID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `card_ibfk_4` FOREIGN KEY (`user`) REFERENCES `users_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `card_ibfk_5` FOREIGN KEY (`hospitalID`) REFERENCES `hospital` (`hospitalID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);

--
-- Constraints for table `donar`
--
ALTER TABLE `donar`
  ADD CONSTRAINT `donar_ibfk_1` FOREIGN KEY (`cardID`) REFERENCES `card` (`cardID`);

--
-- Constraints for table `donateaccept`
--
ALTER TABLE `donateaccept`
  ADD CONSTRAINT `donateaccept_ibfk_1` FOREIGN KEY (`hcID`) REFERENCES `hospitalcoordinator` (`hcID`),
  ADD CONSTRAINT `donateaccept_ibfk_3` FOREIGN KEY (`hospitalID`) REFERENCES `hospital` (`hospitalID`),
  ADD CONSTRAINT `donateaccept_ibfk_4` FOREIGN KEY (`cardID`) REFERENCES `card` (`cardID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `donatetopic`
--
ALTER TABLE `donatetopic`
  ADD CONSTRAINT `donatetopic_ibfk_1` FOREIGN KEY (`cardID`) REFERENCES `card` (`cardID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `givepaws_authenimage`
--
ALTER TABLE `givepaws_authenimage`
  ADD CONSTRAINT `givepaws_authenimage_authen_id_35a6bde3_fk_authen_authID` FOREIGN KEY (`authen_id`) REFERENCES `authen` (`authID`) ON DELETE CASCADE;

--
-- Constraints for table `givepaws_cardimg`
--
ALTER TABLE `givepaws_cardimg`
  ADD CONSTRAINT `givepaws_cardimg_card_id_3cf3c6c2_fk_card_cardID` FOREIGN KEY (`card_id`) REFERENCES `card` (`cardID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hospitalcoordinator`
--
ALTER TABLE `hospitalcoordinator`
  ADD CONSTRAINT `hospitalcoordinator_ibfk_2` FOREIGN KEY (`hospitalID`) REFERENCES `hospital` (`hospitalID`);

--
-- Constraints for table `paymentcard`
--
ALTER TABLE `paymentcard`
  ADD CONSTRAINT `paymentcard_ibfk_2` FOREIGN KEY (`donatetopicID`) REFERENCES `donatetopic` (`donatetopicID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paymentcard_ibfk_3` FOREIGN KEY (`user`) REFERENCES `users_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`cardID`) REFERENCES `card` (`cardID`);

--
-- Constraints for table `users_user_groups`
--
ALTER TABLE `users_user_groups`
  ADD CONSTRAINT `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `users_user_groups_user_id_5f6f5a90_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);

--
-- Constraints for table `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  ADD CONSTRAINT `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `users_user_user_permissions_user_id_20aca447_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
