-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-07-2014 a las 00:25:03
-- Versión del servidor: 5.6.15-log
-- Versión de PHP: 5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `conjunto_residencial`
--
CREATE DATABASE IF NOT EXISTS `conjunto_residencial` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `conjunto_residencial`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE IF NOT EXISTS `publicacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `contenido` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paginaprincipal`
--

CREATE TABLE IF NOT EXISTS `paginaprincipal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(20) NOT NULL,
  `imagenfondo` mediumblob NOT NULL,
  `footer` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `paginaprincipal`
--

INSERT INTO `paginaprincipal` (`id`, `titulo`, `imagenfondo`, `footer`) VALUES
(1, 'Conjunto residencial', 0xffd8ffe000104a46494600010200000100010000fffe00042a00ffe2021c4943435f50524f46494c450001010000020c6c636d73021000006d6e74725247422058595a2007dc00010019000300290039616373704150504c0000000000000000000000000000000000000000000000000000f6d6000100000000d32d6c636d7300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a64657363000000fc0000005e637072740000015c0000000b777470740000016800000014626b70740000017c000000147258595a00000190000000146758595a000001a4000000146258595a000001b80000001472545243000001cc0000004067545243000001cc0000004062545243000001cc0000004064657363000000000000000363320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074657874000000004642000058595a20000000000000f6d6000100000000d32d58595a20000000000000031600000333000002a458595a200000000000006fa2000038f50000039058595a2000000000000062990000b785000018da58595a2000000000000024a000000f840000b6cf63757276000000000000001a000000cb01c903630592086b0bf6103f15511b3421f1299032183b92460551775ded6b707a0589b19a7cac69bf7dd3c3e930ffffffdb004300090607080706090808080a0a090b0e170f0e0d0d0e1c14151117221e2323211e2020252a352d2527322820202e3f2f3237393c3c3c242d4246413a46353b3c39ffdb0043010a0a0a0e0c0e1b0f0f1b392620263939393939393939393939393939393939393939393939393939393939393939393939393939393939393939393939393939ffc200110800e100e103002200011101021101ffc4001b00000105010100000000000000000000000002030405060107ffc4001801010101010100000000000000000000000001020304ffc4001801010101010100000000000000000000000001020304ffda000c03000001110211000001dc00000001ced216eaa8ce1b372a5a2f3b8e41b3ed2d49afed5e6237451561b15e7b420000000000005000057c58659e6e5d2e3b6390d49ba1cee88c75ae7b644cc7eb7125e62fd1b147a15359ba653418ba68f593cff5b1660500000015c58c1ca43cdb042ad736c686e6a0d5631da0de7617993aea89e95e597d2e8b370e1d9b8c7da551b09d8a48aaa763e6adb7511a3d7f945c6a7a2085d0018fa2ae938b6526b67e6cab9a954b3aad3523cd4b8c438aeb5a9615f3a2c21a799d1d530f0b49cb1c4888750d0a945ceb6c4e890bb002bc9d3ea7479b8c953e9f16c9558ecb361bfd1e86fc4482dbdcd2da058d1caf258ed83c85340f75a66de0fa5dce4f416a6b9805000000050cbc450536e1a8f3cacb7a9e7b8cdf5cdd65fe12b24d544491632f1ba92cab163a65b1be7cde79acdd63d7bb94d1dcc8028000000000394f6f89e7aa060e4d32d2dae98b295166f2ed1b8b3586ed2ae663a0f218b2a65cbe5944f36ae9cb5d6398dcc593e95581c2ba01c1a48f8c10ef9eeb71dcf70a15b51d75a798e99b79906770f43aa6e44d34871bb38f75957e2c88f1429523bf95ef53f2cde46a449a8a380a0083c488a476af1aaaa776072eabaa990baf3951a4c6de6559534be5dac9e829e7d66d7b46f9bae3f0167f2b5f884d4c89d78bfa0ce4f8f51ec456b12489da9c4706b8225e676667b87584b836bb548cf7a737a2bec59d9905dcead586acf9778af3fc5546ead3b51759fd624c539d39f6642b793713731a7b0029c006e24ca4c6a1e66ca9f9f4ec97a075cc3e0bd7371979814e71dced32928c6ed394efcd3efd7b57326b95de9ca446bfcf8abda3bd8db3cd3b6740ae8035959070e94b065c3d59d513216f0d779dd67ab5746e64597cfaab8f18e91a2d8b1ac466e531be6df056f3d4becc76daa27e6fa4aa3c9b3a70b1402d35426abcdd9ea59917ae11dda4be98f3b736934c11b764c7cbbb9f9d665dbf939e9988db98298867754bd39e7adb4449908de935358c736130cbe9b13271af4a5f9cec359b702bcfab65d7f3e8a4b2bde7d017874eb3ba87986e36ece51b35eee26e736f64e76b9776ce29bb7615d9c6ecddc4c85a33b1aaaa62b4506ba0954e4f566d7beec88d1189097165459a8cb42f796949558e2549cd473bcd4569337a4e7a76b2ceb39f565b71bb5a42d1d39b7321ccb86987d8b1d65e645ad0b956a4aa3a01ffc4003010000104010204050304020300000000000200010304110512101321222030313233152341061434352442253640ffda0008010000010502f2378f029a2142626b732dccb78ade2b78adccb70adcc99d9fff0006abfc16d369e2bf3252fd9528027d3e3c69b1c5796af5a2a9147a754e5d5ab5e4d43e9b4d5daf147a958d36bbc1a5c315d8ea44106a1e7ead60390de9a37f61aeff000c7dba416351d6437d465a316fbdac348f52beff00dfaa10f20e6b61535386c453379962d435c58a7bab50010a2de9a37f3f5efe20fb68e4357b61cc8642da1fa73e4b3623ad1cd602ceac66c02b57fec1870f06a762055ae4365bc89ed43034da84d3aa95771b2b8f2ce6cb4826fa96ad194b59bd23366b4b512d947f4f7cba9d73b55daa4b52f6aef8d3ebc9ce8357fec5b87a3d2d55d9d9d89bc166dc35867bf6264108af55547b1dd114d5ed4da959d91b3c643abb8b5cd5649871fe37d7095bd50acd7a371e99fd6cd58be562c5bd4cecd7a7a9495abda9decd8ca6ea9d3ad36fbd7367cf1bdaaf585bbdfb9c1961438e5948a69f0a3dd31e1c5cdd3a87a87e31c372cf833c1dd3ba75a291952e00d84c484d01adfd399b519f422559b01613a255df0e4ddeedc7f0ce9f8e5d3aafa7d89d54d2e18133638bb383f0124c68cba65f0ed991cfbad7ae53aab1f64ddb2e788acb677741dd21369970d43a2ba828d7afe2923091a6d22b9a974bb00c632465cc5bf2b3968872a26ccf63b8f1d05bacb6c631391e474c499dd632edc237d8511f323f28c04da6d2abc8a4d226153c13d6079a461698d6e275975bbb1f83093a686474d01a28b6aee4f210a1956912f32af9844c2d7e62b12cefd8cdd9b59744d927680dd34642a332e048f6b1358c2b1dc2ca09e5ae75b57124063237957e4618dcf7c937b33f672ea11ede80dba495e68a58062949d013134ef855c2b6d7ea443f6d7ab5616b55abd68e5089cb6793ac49de1f158e89fe1c74aee8877207920564ce751c4e2c2d844db99e24d10a3647d0856992b4772b0f2ed795acf5b1b76c761fbcbe1650b74f44cb09db833215852323f7b2fcd52e647e1cacacacab364626bbdea6c7ee642dc45f1281fa3264c8dd76a6c262ebb948a4f770d1a7dd0f9065b5a53dcfbb33ca78047f0a88b08496e5b91badccb98ec213262652f064de9a349b2cb3acacacacf82f49b0653da10f5533f447f13a043c0e4dab739260275b3b240d8f971790f211b76a0554f97337a71cf1226156cf9a76cbba21ff001cbbcdc32d27a3a1740ebf1b1ddde1511ca088a574d1365e367697a20f8d37ae3b294dce83c24fb5889c8ec4bf70949f6abe5654beafc3280d46e9d645973934994658027dc5f86e1523e68e8ce6de2b4fd852a27c28c3795d7ef4ca4f7afce161467b56e44d94cdddd14f26786c3616e1a5b7df8fdbe1d50f6c445b419b73d7c73ecbee91322c3bf0665844298dc5739d7353c8ee9d37ba631d8dc34ce9247ed6f049230b5c73b0f77de4db569edd4fa9a64c8fdc29b8b8653b6163c0fc3f348f043e9e096539d8b78473f594cf73d79f93c59461bce61709450f1c29853f46e0ca4f770aa4c3340626de07b20a793bc9d86377cba2e0cceea37da523e4e2f76d7143c054ea474dc21aa6412e7770650cc40f5b521742426dc04f03bf9873126650d580b4c92856fa85e0a4318869ef4a0869b50a70d52a7ab558607af0d6fa7c75ebc9427a95c6ebd0affbb2a3096a772ad7929e8d004f6aed4ae36ac8b4370ead27928d680295ea55a3b855aa58873d32a29ce12a5746cb2b05ba10ee291fbcfd6a33969576379752ba3cfa11ff00d7a894a3a356190b4fd65bb6b48506915f326996bfb479711e7fe6656dba6fe9e152c63c9d42393ea65084b72bb6ed2352612bb3de82ab7e19f845214727d5014eff006bd0517555ee4f5d9ec4c53cb76cd81fdccad08deb11085fb409ed4b249b8f97199c48a7979ef3cae8a694a79ae589c61b3342cd72c303d87941ed96219820272c91f2669063ad9d95b6ed879bb2b32ca9be197da9fd380fa3f822f87fd26f911f16449fe345ed5feade9c7fffc4002111000202020104030000000000000000000001021110203103122141133050ffda0008010211013f01fc2afc1a144ec26abe8a22aca28487e0b1caf789e8b1703b23649591857d09781f188f0562b0f9da2bc8c90c831b1c9be076770d6d1547bc322ce4ed4783a837621e63c923d652383e4477243763d50cf59862711acad3825a46547c83ea5a1bbde5b76d8e0cadd8b489125c0f0f5fffc4002111000202020203000300000000000000000001021110201231213040134151ffda0008010111013f01f8afdbc8b116589e8cbf8f88d7a2c5bb484f363909d8bd13e8af387d9e068437e86fc8bbc3d7f5b49d221fd21d6248a2854509ed27c99d2ac2248e8bc404862ccfa208ede10d9d9c4a625421e926444bce6588b13cbd3cb20ab46ad9f8c50287b47a2b46e8e67245e95986b3d1edffc4003c100001020304090105060505000000000001000203111210213141041320223032516171521423627281428291a1b1c124333440a27392d1e1f0ffda0008010000063f02e0730b37a230792b75c0f85885885cc17305cc1621730588571fec227d17f21a9fa0c17163758e2e2326f45bf0e1cbabd57a37b98c302d51dfa4420625499120328249699784d9c06932bd6950cc21432520bf90d5a3c263250df298ea9fab841af95c428b1748861cfaf351d90c52da1b77f60e840d4f989cb2f282d34f7fdd37e7082d319d49fd50f9c59a63ba9fdd7bbae750e5c540d66b2aac73d9a4b72312a0a21880c9cc6e0bddbc1e2ce23fe8a66706076e6722d600d6895c105a77cdfb94cff5020a793def6aa7e26fea9cee8146f942d644980a044873a66d18299c2763fe40aeb8f50a513de316e3afe9c19bde029406d0df5155c425eeea6c3a2c2873c0974f0b34b6f5265f8a018d2e358b8590e30c0c736463f0a8df28544394e73bd68c22169a9f928a46225faa87107da134ef905b30697750b57a4ffb94c1983b337bafe8a50c6adbdf1553f7dddec9d8e8cc841e1cd0de69234c1630f52e9c907c27efb0f3755ef74774fe128c384dd58389cd6ee2c335fd3ff92742d4d356734f70875d43aafe9bfc9418daa96ab29e29d07514d59d4842d5572c0cd18a594cc4a5b3ab88670cfe4a62dd5e8d79f52d644353fbed9c8755db2b4b7b718578037702433b4f7d970efc2c57250deaeb94ddef1fd4abada4cc1e876c20d1b157e08f7d8cacc0a0d0d33382e468f257be8bf46adc8627d4dfb527b438775b95433d96e1110293da5be6dec154bc5a279aa58a66dcbeaa66fb4385c45e9af1f6870e4e6870eeb741867e15b8f6bff255446003caeca60db9d5f92becb815ca564af78572be6b342fbda65c599c909dc32160f3b38291b6fbcf65cb20a62caa1ba4a98ed2c70cf2536198e1cbf153e97a621e6c9d94b10738e2afb25829bded71ee51f3b01ed97b442baffb43ba11f45260c4cc64b7f9b85427bfa990407643cdb72936484dad12e9b33d865581b94767d93270e195059d778af09bc76c5fb445fc2eebe2723f08534ce04f60db47a784e79c0601341cb78a9e6eb21fd781357abac26d2df5708288f3e134590f6642d90692afb5d6b4f02f577d14821f1199454d80dd8a863b6ccd4c5c834385dd51de94fa2fdec92c6d0fce7826bb6a655471c82205806785a36f05cab0454f61f0f322a6a7b0b0c81c76defe88cf10879c3837ec02a916616b0f6376d8eea9cb1407554fa66668da48e189e08c88f36b9fe9086ccca0e18648342054577c28ec1e316faa436bdd35ce1f15cb7cb4bba04eeca590512e9d436037d4649cd3791b436794b7b5ac2705719ecc98c9a2e27c2ef99d9b820e17226cbf606c08987446649f3b13065e1531aeee14da41169396454ce0309a9590a21842b2e17fde50a1eac06d05d2ea9f384d85158eb9bea135ed5ecbb9d335ed2fd1eabcdd9e2b48d21fa3cc35ee201e8a0be13690ec42f688b07586ff00d5448c2148d465daf5a2c310e4d7d550ea980421aba0cc77b90854ca1087516f52a34587044374371177629c2232a6864ef5a1eae1810e21bfba6c087b8c7d22ecaf4e80f84d6c980d73bd44d222c311482715a3ce50e13e757d1691aa86c1abe57b73b90b26c74948dcf1958c919052454941a44f7861f3282d64530de184cc051cc6649f0a723247ff006698e82daa25f21f796961cdf7ae73e63bad19a7baad92982653f9944cdc5e70f2b42f0e517b44a7f352eb03f75a5d425373f1f2a3bfc05a0d2fac31eddeeaa045a4eaa6d04fd5384482d7b68122e0a2b1826439c25f55a135ecac6f4daa3c085a3b98f3f861b01edc42e5283bbe0a799b26a50a21682b5c621d67a95112292d5a90f3aaf4aa2145735a324698c4546650745797cbaaa04476af1a7255437b9956325ac311dac18391f7aebcd47ca115d11d5817154c58a5c3a2708710b5aec535822ba96e01111e33dd9d334dfe31fba7af94ed5690f6cf1bf150f487c77eb3233ecab8915c5e7124e38ffc052accafc4ae796ef5477b70617e286fd58e27cffd58133c70a1d876beedacdbffc40029100100020201030303050101000000000001001121314151617110819120a1b130c1d1f0f140e1ffda0008010000013f21fad40b704ff4608962245e9de830ebf3eb88b493d160ba6f0cff00467fa33fd19cf8bccff7622d24f459a41f1ff03c5d68fcc485d5d58c63f7f594094e8ed4d6dbe596b7e6e28f649b85d6ef18d7da017402722a5e588b2b1704c5ed1d67fbcc3cd88d6b283399ae58c718eb69e8419e2d4f7ff8129b001667cb89f6d07bcfe73e64fec277c50785fcca955d7e7a8280e84e5b2c3e5080571ae1ed08200505aebdfd2912bd88831544abe1b879ecf79fd57443a0dcb857e85fe047d8140ee4fb69a9e801f6112ee59bf32a3bafb6773260aef2fdd9626cd60b898ac834e5976ea83e5afde6372953cc73ad2c8916040e5dcbd9f5bd9fa2c69dc5e65b3f4f5fc40f7c066bd2b509eba7880be90501d080555b3d8ff987baa517302742291698f65883b99ce9b84a067f7b831893971337f225195581f643d08e9e815c7a522a0d2435edff00386440b11fa6b0ba06d9bf3e9d92c0eecb5fb42c6b528a8cb18133f12804d1c14c2dc2c7c82a273d6e3d7ed2bb43c8532823f2b748778010a4c638f2af2f3705c522b0aaf48aedbae273015ec66e56386e8e260cd725ea149c5886b72a94fb41cc5507e440020898f5add5c8bf696583b770b2f796d1ba8508834758959bc9285fb04dd4a2da4132f36c749be2a5679945512526bcc1718ed32b6a192e5d45b85b1169c7488e260a944cccecb037a7aec72c6ccc0422ba4ad47e262e0c9635dcc46edef191a860e366312cfa687a3b9471055142c8c208336b2af0ee6f7c4cd5be2388599531062c16f12b117f5d5010c3e1c1e0800000707ad65170541cd7de166539cca2ad6c982bb450959dc1aeb8ba2e50b85cca902bb1185790b8262562a90e7021c9c52e5eb57104b2661b1c80dab2ea8739a22026639a81ce5c0952fc0e6126767f76552cf3df5763b82582bb859f0c4cf48186165dd0d4170ce269e92b4d5062005e250deb26e17262deb0774d107be44c580a274d8511b0dc43156554b1603a47254f582cc1f1293896dd5d2882290b01fd34ae9c0b964fc41f11bb2381ca597168c58e284b5302582f1b8aad7338c5a884713ca42556026f1f82715798bdd3cb28e3f6a9be0bed29402e5bbf954a121452f35faacf40b62c2fb19d7cc2a1585c4bbbd146e61a82887cc12e83cc6f03cc320fda2d44a6311645e9412a3b008c02d336852fba3a7b32ef6d0115dbdafd3b85a1cc35ac02d1e2e6ae348aece886859799b345f8857afb47887006e5060f4990e18b40d1db3bb0a4332017854718edcc30cc53189077e1d2ea9ac20eafa2448a80dd7e8ba638c3a2887c224a9511f2a44b7a470ecc534a368216db274ac8604addf1183286f8c5cf03e4826c18e02717105a77947cca359eef9d4aaca4179330c3f4dcb972e591347c2fb4457da68f32c42de854fb865abde5c71ef05d225e2fc933ca07b7a187c4b84eb32c47b6502f3e96fe2642984c8c274a19f51fa255865e0ed1d0ad99f76a5ca38ac3ed1196e1aefacd04d3e8cca60c572a2879962898a8e0616bc7328e2e2c2ccab9d127033356d38b60cb972fd1f4b97b9ac5dca915b462925aa88d948b6b399d1730e8991d1835770bcbb820d6628ad5d6b31002a68b98b4ef14e51d1bc411522f88af5cc043430cc3f4c3eb6d9ca5011f8bcd474e314677a05be9aaf46708a2c43455ceeceaca8df3282869e840b40053894656de39807f24cc7352c4ad6a3b7cc66461b19a63b2f092e5b2fd0fa096aa50991a109e89ab96864153b6a661c07109530dbe91d7491c650ce3976ebda372317c4a9bd5bc42930940759c22569086e57951895e203bcb99836c5ba3d1d4d013c0d3de11a53549f51be002e6e1ac74630c64c591d2de5eb11d094f89b734f49aa0b9335158ddd15368429510c2cb3e20cc72184dd16f2cd2297c40538c4b4533769defd06d88cf527520c16c08fb7d2ca00e05b6037e8504b0df83ac6639b011712dd507a6c4a63c189b6267e6692f2f764035c8c6a271c4a2c9cdcc3255b2e09837e8b76ce7d1d6618db630005017987d2c11cad7ed0c16872db2fee56c281c973d953b2cd4652cbd5e63488d8e773bfa45e30622de26e7ac707bced188a53b8665f9a562dbf41b8453777de1a0e2be92342884651c61d5dc009e003111059996728c7de667bc77e85c778af02793d062749570a1123c41a711de63963082574f422a3d903de694fa69769aba8943606cea4a00dd4f78c5a055c104d51e66ad63e940da68474c4d290a97c1b9c7d009938942b94ab95a7b4296fa4259402d600a84aab433e9a993966170de3e8a98da0ad625a2a8749acd22ff0062263850dd7889c1c0fa1ad886ea33050e122b48ab94e630a3cea29018724b312a0acd4ddcb713766ae3cda2d80cf980977883d15541aa55b8a00b74b1ef2e28691f4a80059cceb1b4b7da0b8e94d5c4e3dd8f9a3b9f6468adf1e4240ac0c30f23dcb8a0d067dcaeb39cb3434b810926e000cd4b7ed68604d6dba6dcc855d2cae46843762a8ba05430c5fb1aca9f9615cd1c71627f7c417129e7821e67a9d564c2054975a4345c1d72459ed2a390acd6a6fda1bce834a1a8fcb0edd1cbef030bdcf73ff20acbf133dfe25f8f60e25440d9b6fc4b8ecc1ea6269582f8836192e88ab883a406463a78206a5b7399504a18575c9e63a6e85c8c3df0de51dee01ea0c42e7387b10e0b3e8b36261398a1e73d458393f0c352975fdc7f32835b0af9c6be5d9e4ea52ad1403f2c0380a076541618c66ae099c7b5cdb89ab901ee9d0984bbc137fd5283219ae25a138987befd19da5b3d3eec32e80e084c6db744753973136e91b218a13e533a872507cc3be4d05758456cd0aa399d0346197ac6d3696d4a8dada61caff314462c1197de59b8d5667da0c5c7e8c8d3f622fdd614b3fb70902f8117b0605661a638e2c56a09b06881c59c4bc0a2960f0e3c470b9d8af4672777e250311941d5d31b62b29701f831fb91257248f5ae9d3314081075ce9b7bb758806525dd58ed04d325749aa7f5d65fbcfbef423f79f9fd389be6deacfb686de4fcfaed89fc434cdcf339ff007b9b7cfa7da461b4d73a788ebd3fffda000c03000001110211000010f3cf2862c90c3b2980000fbcf32410f0093092c38003ee8af3e8df92d5c609e040f9fe24a4675fa2050101a0be539541deee1b8b5da2000fbcf81d649259d4f409c007efa29ce2c5503457b182cdfb43b7ac42c084574107507075f1fe2599c789628a0f906ed62fb9ad456f56d791f00e0581a9e49ccbbc156fb8f0b87bdad8cb2b321169e37cb87462dcba2645357862df3a2b88d71d9f1c1f050cc0ca3ca1652a0aba3ca420be0bffc4001f1100030003010100030100000000000000000111102131412030405171ffda0008010211013f10fd29f96619441ac4c21a265621cc33cfc344d147f26b12fa78cbf4a9496c88947f8164a0da54c626c9f4bba375995e0bd0ce6ad8d6195491c1fd3a99a07dc0c4c244741af9a074a21b786b8252af08758e9ba74924ceaf84a895aced0dece890922d1b13f2324a13253831d65437f07ac5f716f628a31f20e6a7817c2cd1237631742104ca8524b0fb83ca4b81ab88be08ba9813fc1508740a0f0f63586d89d4f2c4aa13b68436ca4899a522c7d63ccbbc8592cfffc4001f1101010100030101010003000000000000010011102131412051407181ffda0008010111013f10ff000542f7fb5b7f0b93fc4a666f726c4169b69697ae1b9caecb6dedf623db2cb390638549f6c8ea3dba815d865e196c3f5f440bd4e16d994927ac4b31eadfd6fa1f630080be51097ab05be64f9b1fa3485df57cbd5b0db6c78b7be77980f70642ee84b00f6d3a9ee65a293d7e170d97024c4418178b49da37a6ec3a8abb61af1f1ca9e8b1a37cbc702f86d9e5b59326a3c0e51ee0e04837fd4f97dbddb76e48f1bd7039edefc2c1ad93677bc62bfb28eec60cb79d41d49b1a43c18633858b4770338b1b2f2ccb5bc7fd9e3ef1e223d8bd479c3cff00ffc400291001000102030802030101000000000000011100213141511061718191a1b1f020d1c1e1f13040ffda0008010000013f10f9c803795fc6fdd6fd803256e9400f76a080dcf856ef5046bb7a2d7f1bf75fc4d7f1bf75f4b68fd46b77a8235de943e3fe0b43057d164896ac3307478d34029d8611ca5131cf326889129211827355a444a4d2b2f018470fb245c80090228184904a637d5a709687bdf2bd3efa2c0b04b8eb57a202851917cdaf60fcd6b9816897be953a115a0c922fa91ce95602e032ac99af5a92bb198959b77fe0be6c6504e05a590ddaed1e2a4f46fd34acfaa6bb3f8ad29e0e27c2bf6204fe55b9c0e95f878cb3da2ae22a4cc59d5156dd12532c417449b2e30bc1f06e15395454cc436b889c2fdab93903a1bffaea32c4a7402b496443d673b0c271c2b09c961aceaeab766bb478ab378d5e877d767f1522cbfd72145b7a1debdc20b5fc3dc5fc57b70687b0ce6ea5c2c70abd5094a4548789598b0f790ee283995e8025ad19102fc2b58ba11351c7acd72a01f2b3e5fe3b9c62572adf9cd0cb4478ae516c0e683629fb1630ae2ba030112e193cab71014ba715c488d7054e94fb5130b0644ddca8c96478ad0c888c719d2f5802a1bea1120f342c4479697ca970813a54412272c420e26fae0ae988e3d42a0e8cce8505388c9cabd66aec0d664e403ce2b81666f2666fc4cf5ab8188411c1132f8b01b3294d22ba2ec0e0615bc45903bb050f585abf9709bec584721c04d16c97c6b50485cad60bc7a34d20d9c55738e2a525acb212a6f8184a5ed083aac402c4eb8f0afd42b45f0d7e107eaa23a4c88011119c456fa90a059c2f8d1fcbfaab821e32e46262d851980169b0608dd587a206e3211194d7565dd2f31bf671b267f6c1418c9bc5e85ee732a4e204608e0edd381c17ad6b7950087769f2c183b9071f661768ef11031a0617df58b04d0670af56fd8e1df4f5a69050157bc1b106b1f27938a23eb4571442c965b864387cc80e91a01f8383857a82db74151f8181a748af480afe9e4d910d0afad036908b4875fe58365212ce3291c4577b71abf1402cfcf0e2cb58154020396dd7c882e8ec62a41fca46d6491eb8039d6950e889ae8f417afec81b577d5400b5f815a0c375c9f146da0c7a6006faebc0122ba68831e358a68a1974033b506bc0cba02d7bd0f683f1486ae27aecc728f96e4405f35e9a29b9d92b508b08782c3c9ad5280ff55fdc51fb41b9af242164f115acc39456f60ca615ac029ae02b7066c0803eb9952d8ca072b012f20fcd7e360e86c70d141d16622466e72a2d01ca2498ff003c544031d1ae2ca5e4b748adf5a87e63bd42c12f25700065e95c2e086f5c5dc4db9ecd815932412e845f2891c334da32779c5ef5f521b3c1e4707cd4f9615d2087e4d8830430a431124d8bb1c287fd2dcdc201580693299c5aac5dc0566007d96b8fdf1b196b7d30364c1e028ed1b0fa31af77133ae1b08afdf10a75e19a04741c4ac2419182e132c9394d71c50f63fc9aebca283039be2b1d43d240eaf8ae3c7a9ae799e6937e04ecf2015a1d844eaad82b58d816fc082bf628d841f91406fcab86c221c07cd1fcf005830b06c500ab29307e1830ec0e0492726ae49570c0a3892e38273ac0503189ddfe5b0781cc265e12d7f280bbd92b43cfbc6baf5ecfc2436455f6c00bef9d682c700256635e15f82206c1bf500d2bd43c577dc0717687c34b0e3b7166c5c263ad6e14462d1ea4f3a1b49f8868d5f8dc00135ce0802d83a05742021143d6d7e74c15a080cd2f4d49436d3c1a1a87a24025c6b84a15263d5bcefd93f3369d1411f7775684438800bc2fd295b4181a10e96d814e341de8d880f7ce96cceed0d9475c1cc0e4a76548bd6e343406a76080264fcfcdc5d9fa000ade148306dc15bf137549e8344830729abde2e610b17d2767dc3369fcae24b4177f80eb5efd005f87879cf47a76803cea10fb1edf32c9a9ad0c3885d66bea95389c5bf7ad1cbbc28be2bf0325ef434f8d1ca7e1456c8d869479d00d635addac003aceb5df8859b8c31af0415ef4bd6e58a1d930c218f7dda9f2602dd4d7eea9bab4126a1315dc6315a8f378965ae4f85048ee52fe902c50250e4a6a74d923e0f85a43d7404d77de0a99d0018b26fbe0ef5a0c004e118c57530035fa706c180df1031a1d9df828e10feab962004b3cb3f9e1832e2b273b9ce2ebbc2b1571bc38a778af541bbc5690fef1eed1586e805c07899d64f0d17cba50c7d92fc640244e1abf401b5bbac5405b89275ab5c8a1052f762fcb8501e008fd5791403846f4f2569f5712ef3bc5718c290a4bc226bb580153b13dc028f77e005f66b6d90506fb0e8ca97df0f196cb20d731304c4694763a053011f657f5207e09a5aea182423babf681295e3e6b50cef95ae6501220f35c96744bddd81b94eebd68a4caded8a1444f82397a545148f79ec6d32e1b3926fdab4db0b36dad8cc477d875c250f2a07b0f5adc71e3e09aec46073ad55486040b4906338274ae00a08d7ddf5f49c222be82093f55cddd89af315c24301e665476c9f82230c854f66dc88b41b0ea702409e7134fe0135f62447465ba96689025012a97620d09b52f2e0abf38af0150303af9ab2045fc04c2eebd3e862ed2250b6961509632bd4bac20b3cdbd7e8094a89b034de9c0b50a42a22a1240446b3955b6124cb2596fbc69516bb35d37f5ac858e7636caf7a4a4a8d8ed9006e320aef560244137f5acc84cf42d86f4856bd3229ed60231a40d0a96c91008e4cb952e222851668b7871a0ba4e6d39e15ef48397c0d60ebbf1b19d5142c00a50c1e83bb58c0c204715bcdf35e74e9d8dec9c075ceb8a8125c1956a2a40546c62fc751812d886b358e322c482d066cc70af4300035fcc3970ac71d0622118e10a54ea88e81006f3175e5460e77c28904025968e76a85807551c067ad5b07741c0c4c48418e55298b783818e0494a8e521c4b0224b68167951dab882602090b11c8a9db03516361820b528eba35252be4ad3b0177d049be3140e8030cc4bcdecbac29783fb9e6b60842632d5abbf895162619c2f4a5150db84a26fa2d5db0116e80561bb0cc29109046f8d2ea5f2acce14e202cc02cc495966f954e41e9160405c2e0f1569d84f482d53125517c28ba46c271ec04b89835b81800ebf4d8ba0d776547c008e6f1b63bebf1100416e98d7ed216c78d0180425b32db405680402c720211b224e36b55dd2269e293dc0311295bcb3a055e0013c265924ca73a2ae8a779e802e6d89ac963b44f98e75394202e5e024e3ad3c4a80e2922e4b331a54f9b3ea7e9a81126b614e71a3bdc2449580b48249204e232439d72ce1989cb0e9586083c2a973b569da3e608e78a75a21c55490d0a4610a1a953290072e5006e4b55e01d8d9b366cdc9e556301ac98052c8960871cdafec0d949afd8214399257a87dd67f068119719a5c91c8cea7660e0ec8a6124d611878523081250208b641196152d443086191804c44f2ae2ae2048a6d376f8d47c08ce455124dd579d3379388301c18c074ab6d030054980b181d0acc8c2c8b2e5399c6b019a28444a0498cc26d538648281090220216d19d66382eec296c4702d62d500a6b11cc0201174db05a62453824305009e7524d612e4466395a83e10cbaa60c4d9a8fc2a8b01249e284898547c4606c1038d90bd91973c00609251df9112388973e55048095a5280624433182f2d40906310800c0200ace7e597706a2220882ef2f16d2b0fb004a2c89701c166785ed070e3374e01172cab739012121224248382f2143bb7e36e9e8e14e347be9f0018ec7a9c6bd968f81df6da93c0f0af4786ceebe4d8f0ebcca369fffd9, '<h2 style="text-align: center; line-height: 1.6;"><span style="font-weight: bold; line-height: 1.42857143;">Todos los derechos reservados @2014 CopyRight</span></h2>');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
