USE [master]
GO
/****** Object:  Database [YllariFm]    Script Date: 5/22/2019 11:28:05 PM ******/
CREATE DATABASE [YllariFm]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'YllariFm', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\YllariFm.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'YllariFm_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\YllariFm_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [YllariFm] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [YllariFm].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [YllariFm] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [YllariFm] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [YllariFm] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [YllariFm] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [YllariFm] SET ARITHABORT OFF 
GO
ALTER DATABASE [YllariFm] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [YllariFm] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [YllariFm] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [YllariFm] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [YllariFm] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [YllariFm] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [YllariFm] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [YllariFm] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [YllariFm] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [YllariFm] SET  DISABLE_BROKER 
GO
ALTER DATABASE [YllariFm] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [YllariFm] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [YllariFm] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [YllariFm] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [YllariFm] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [YllariFm] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [YllariFm] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [YllariFm] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [YllariFm] SET  MULTI_USER 
GO
ALTER DATABASE [YllariFm] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [YllariFm] SET DB_CHAINING OFF 
GO
ALTER DATABASE [YllariFm] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [YllariFm] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [YllariFm] SET DELAYED_DURABILITY = DISABLED 
GO
USE [YllariFm]
GO
/****** Object:  Table [dbo].[Biblia]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Biblia](
	[IdBiblia] [int] IDENTITY(1,1) NOT NULL,
	[Mes] [int] NOT NULL,
	[Anho] [int] NOT NULL,
 CONSTRAINT [PK_Biblia] PRIMARY KEY CLUSTERED 
(
	[IdBiblia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[IdCliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](150) NOT NULL,
	[Tipo] [varchar](5) NOT NULL,
	[CorreoContacto] [varchar](80) NULL,
	[NumeroContacto] [varchar](30) NULL,
	[NumeroAdicional] [varchar](30) NULL,
	[Pais] [varchar](50) NULL,
	[Ciudad] [varchar](50) NULL,
	[NombreContacto] [varchar](50) NULL,
	[CorreoAdicional] [varchar](50) NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[IdCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[File]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[File](
	[IdFile] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](50) NOT NULL,
	[IdBiblia] [int] NOT NULL,
	[Descripcion] [varchar](750) NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[IdCliente] [int] NOT NULL,
 CONSTRAINT [PK_File] PRIMARY KEY CLUSTERED 
(
	[IdFile] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orden]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orden](
	[IdOrden] [int] IDENTITY(1,1) NOT NULL,
	[IdServicio] [int] NOT NULL,
	[RecordatorioEnviado] [bit] NOT NULL,
	[Recordatorio2Enviado] [bit] NOT NULL,
 CONSTRAINT [PK_Orden] PRIMARY KEY CLUSTERED 
(
	[IdOrden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pasajero]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pasajero](
	[IdPasajero] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](520) NULL,
 CONSTRAINT [PK_Pasajero] PRIMARY KEY CLUSTERED 
(
	[IdPasajero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proveedor]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proveedor](
	[IdProveedor] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[TipoProveedor] [varchar](5) NOT NULL,
	[Correo] [varchar](80) NULL,
	[NumeroContacto] [varchar](30) NULL,
	[NumeroContactoAdicional] [varchar](30) NULL,
	[CorreoAdicional] [varchar](50) NULL,
	[Ciudad] [varchar](50) NULL,
	[Pais] [varchar](50) NULL,
 CONSTRAINT [PK_Proveedor] PRIMARY KEY CLUSTERED 
(
	[IdProveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RegistroRecordatorio]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RegistroRecordatorio](
	[IdServicio] [int] NOT NULL,
	[IdProveedor] [int] NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[IdRegistroRecordatorio] [int] NOT NULL,
 CONSTRAINT [PK_RegistroRecordatorio] PRIMARY KEY CLUSTERED 
(
	[IdRegistroRecordatorio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Servicio]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Servicio](
	[IdServicio] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [date] NOT NULL,
	[TipoServicio] [varchar](5) NOT NULL,
	[Nombre] [varchar](250) NOT NULL,
	[IdFile] [int] NOT NULL,
	[HoraRecojo] [time](7) NULL,
	[HoraSalida] [time](7) NULL,
	[Vuelo] [varchar](150) NULL,
	[Pasajeros] [int] NOT NULL,
	[VR] [varchar](150) NULL,
	[TC] [varchar](150) NULL,
	[IdProveedor] [int] NULL,
	[Observaciones] [varchar](750) NULL,
	[Ciudad] [varchar](150) NULL,
	[NombrePasajero] [varchar](150) NULL,
	[Tren] [varchar](150) NULL,
	[ALM] [varchar](150) NULL,
 CONSTRAINT [PK_Servicio] PRIMARY KEY CLUSTERED 
(
	[IdServicio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Usr] [varchar](50) NOT NULL,
	[Clave] [varchar](600) NOT NULL,
	[FechaCreacionUtc] [datetime] NOT NULL,
	[Rol] [varchar](50) NULL,
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[NombrePersona] [varchar](50) NOT NULL,
	[CorreoPersona] [varchar](50) NOT NULL,
	[Genero] [int] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Vi_ciudades]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[Vi_ciudades] as
select Ciudad from cliente where Ciudad <> ''
union
select Ciudad from proveedor where ciudad <> ''
GO
/****** Object:  View [dbo].[Vi_paises]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[Vi_paises] as
select Pais from cliente where Pais <> ''
union
select Pais from proveedor where Pais <> ''
GO
SET IDENTITY_INSERT [dbo].[Biblia] ON 

INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (11, 1, 2018)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (24, 2, 2018)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (10, 3, 2018)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (13, 4, 2018)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (9, 8, 2018)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (1, 11, 2018)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (2, 12, 2018)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (12, 1, 2019)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (32, 2, 2019)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (34, 3, 2019)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (45, 4, 2019)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (47, 5, 2019)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (48, 6, 2019)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (51, 10, 2019)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (52, 12, 2019)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (67, 1, 2020)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (68, 2, 2020)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (71, 3, 2020)
INSERT [dbo].[Biblia] ([IdBiblia], [Mes], [Anho]) VALUES (70, 2, 2030)
SET IDENTITY_INSERT [dbo].[Biblia] OFF
SET IDENTITY_INSERT [dbo].[Cliente] ON 

INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (4, N'Agencia 1', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (5, N'Agencia!!aaaaaw', N'CLDIR', NULL, NULL, NULL, N'qwe', NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (8, N'memerssosw', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (9, N'SpaceTravel :)', N'OPMAY', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (12, N'asdqwdqwdqwxx', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (13, N'ree', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (14, N'qwzxccc', N'OPMAY', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (17, N'qwd', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (18, N'Volcan travel', N'CLDIR', N'volcan@gmail.com', NULL, N'216546', N'Perú', N'Lima', NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (19, N'eeeeeeee', N'CLDIR', N'rrrrrr', N'wwwwwww', N'ttt', N'z', N'x', N'eeeeeeee', NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (33, N'wii', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (39, N'errrrrrrrr', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (46, N'wwwww', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (49, N'wwwwwe', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (52, N'eeeerrrrrr', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (53, N'eeeerrrrrrw', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (54, N'wwwqqq', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (63, N'eewww', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (70, N'wwwwwwwwwwwwwww', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (71, N'xxxxxxx', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (72, N'eee', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (76, N'eweqweq', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (78, N'reeeeee', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (80, N'rrrrr', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (81, N'rrrrrii', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (83, N'rrrrriie', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (86, N'xen', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (87, N'midori', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (88, N'qqqqq', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (90, N'qwezxc', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (93, N'Agencia 12', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (95, N'qwe', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (96, N'opminn', N'CLDIR', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (97, N'opmin!!!', N'OPMIN', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Cliente] ([IdCliente], [Nombre], [Tipo], [CorreoContacto], [NumeroContacto], [NumeroAdicional], [Pais], [Ciudad], [NombreContacto], [CorreoAdicional]) VALUES (100, N'xxxxxx', N'OPMAY', N'x', NULL, NULL, N't', N'r', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Cliente] OFF
SET IDENTITY_INSERT [dbo].[File] ON 

INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (2, N'002-54', 1, N'File viaje colombianos', CAST(N'2018-04-12T00:00:00.000' AS DateTime), 97)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (3, N'002-56', 1, N'File viaje argentinos!', CAST(N'2018-12-04T11:11:27.957' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (6, N'00112', 2, N'Descripcionnn!', CAST(N'2018-12-09T00:02:53.447' AS DateTime), 9)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (17, N'qweqqq', 12, NULL, CAST(N'2018-12-10T18:34:39.203' AS DateTime), 52)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (19, N'vvv', 12, NULL, CAST(N'2018-12-10T18:35:45.810' AS DateTime), 5)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (21, N'Cod127edfd', 12, N'file para editarrrrrwr', CAST(N'2018-12-10T18:38:19.933' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (25, N'ssss', 12, NULL, CAST(N'2018-12-10T20:34:09.347' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (26, N'bb', 12, NULL, CAST(N'2018-12-10T20:34:24.700' AS DateTime), 5)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (27, N'bbn', 12, NULL, CAST(N'2018-12-10T20:34:28.557' AS DateTime), 8)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (28, N'asd', 12, N're', CAST(N'2018-12-10T20:53:25.793' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (29, N'123123', 12, N'', CAST(N'2018-12-10T21:20:14.923' AS DateTime), 5)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (34, N'asd123', 12, NULL, CAST(N'2018-12-10T22:09:13.777' AS DateTime), 9)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (35, N'codigoo', 12, NULL, CAST(N'2018-12-11T19:24:13.510' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (37, N'032-12', 2, NULL, CAST(N'2018-12-11T19:31:51.427' AS DateTime), 8)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (38, N'qwertyuiop´p', 12, NULL, CAST(N'2018-12-11T19:42:54.087' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (40, N'lol1', 9, NULL, CAST(N'2018-12-11T19:43:49.427' AS DateTime), 5)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (46, N'lol2w2', 9, NULL, CAST(N'2018-12-11T19:43:49.427' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (47, N'lol2ww2', 9, NULL, CAST(N'2018-12-11T19:43:49.427' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (48, N'lol232', 9, NULL, CAST(N'2018-12-11T19:43:49.427' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (49, N'lol2332', 9, NULL, CAST(N'2018-12-11T19:43:49.427' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (50, N'lol23312', 9, NULL, CAST(N'2018-12-11T19:43:49.427' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (52, N'Cod123', 9, N'descripcion del file nuevo', CAST(N'2018-12-11T19:43:49.000' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (53, N'Cod1233', 9, N'descripcion del file nuevo', CAST(N'2018-12-11T19:43:49.000' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (54, N'Cod124', 9, N'descripcion del file nuevo', CAST(N'2018-12-11T19:43:49.000' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (55, N'Cod125', 9, N'descripcion del file nuevo', CAST(N'2018-12-11T19:43:49.000' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (58, N'Cod126', 9, N'descripcion del file nuevo', CAST(N'2018-12-11T19:43:49.000' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (61, N'CodigoFile61', 9, N'file para editaR!', CAST(N'2018-12-11T19:43:49.000' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (62, N'Cod1270', 9, N'descripcion del file nuevo', CAST(N'2018-12-11T19:43:49.000' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (63, N'Cod12701', 9, N'descripcion del file nuevo', CAST(N'2019-05-16T10:34:43.357' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (65, N'qwerrrrrrrr', 9, N'descripcion del file nuevo', CAST(N'2019-05-16T11:10:34.537' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (66, N'qwerrrtrrrrrr', 9, N'descripcion del file nuevo', CAST(N'2019-05-16T11:12:05.060' AS DateTime), 18)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (68, N'qwerrrvrrrrr', 9, N'descripcion del file nuevo', CAST(N'2019-05-16T11:23:03.180' AS DateTime), 18)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (70, N'qwerrrvrrrrr2', 9, N'descripcion del file nuevo', CAST(N'2019-05-16T11:33:33.203' AS DateTime), 18)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (72, N'codeeeeeee', 24, N'desc', CAST(N'2019-05-16T11:35:57.537' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (74, N'codeeeeeee2', 24, N'desc', CAST(N'2019-05-16T11:36:13.003' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (76, N'', 24, N'', CAST(N'2019-05-16T11:44:50.103' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (86, N'codeeeeeeeeeeeeee2', 24, N'eeqdqdqw', CAST(N'2019-05-16T12:11:17.033' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (87, N'codeeeeeeeeeeeeee2312312', 24, N'eeqdqdqw', CAST(N'2019-05-16T12:15:56.953' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (88, N'codeeeeeeeeeeeeee2312312w', 24, N'eeqdqdqw', CAST(N'2019-05-16T12:16:45.533' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (92, N'filee', 24, N'', CAST(N'2019-05-16T15:39:04.950' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (96, N'whyyyy2', 10, N'', CAST(N'2019-05-17T02:08:29.260' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (99, N'weeeeee2', 24, N'', CAST(N'2019-05-17T02:27:50.043' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (100, N'qweqwe', 24, N'', CAST(N'2019-05-17T02:31:51.360' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (104, N'qweqweeeeeeeeeee23', 24, N'', CAST(N'2019-05-17T02:35:20.290' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (105, N'qweqweeeeeeeeeee234', 24, N'', CAST(N'2019-05-17T02:37:39.357' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (107, N'code1234', 24, N'', CAST(N'2019-05-17T03:14:09.240' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (110, N'code 2', 24, N'', CAST(N'2019-05-17T03:22:05.207' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (111, N'weeeeee3', 9, N'descripcion del file nuevo', CAST(N'2019-05-17T03:23:35.950' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (112, N'weeeeee34', 9, N'descripcion del file nuevo', CAST(N'2019-05-17T03:25:48.103' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (114, N'weeeeee324', 9, N'descripcion del file nuevo', CAST(N'2019-05-17T03:35:40.930' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (116, N'code123', 24, N'', CAST(N'2019-05-17T03:37:13.590' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (117, N'code 4', 24, N'', CAST(N'2019-05-17T03:50:05.593' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (118, N'code 3', 24, N'', CAST(N'2019-05-17T03:50:05.577' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (121, N'codertmre', 24, N'', CAST(N'2019-05-17T04:06:21.683' AS DateTime), 5)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (128, N'gilaso', 24, N'de mrrrrrrrrrrrrd', CAST(N'2019-05-17T04:21:45.607' AS DateTime), 5)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (130, N'gilasow', 24, N'de mrrrrrrrrrrrrd', CAST(N'2019-05-17T04:28:24.280' AS DateTime), 5)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (131, N'gilasowww', 24, N'de mrrrrrrrrrrrrd', CAST(N'2019-05-17T04:28:43.140' AS DateTime), 5)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (136, N'file001', 13, N'solo 1 servicio', CAST(N'2019-05-19T08:25:27.920' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (137, N'file002', 47, N'transportes y servicioes!', CAST(N'2019-05-19T09:07:15.763' AS DateTime), 4)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (138, N'filef', 24, N'qweqw', CAST(N'2019-05-19T09:12:04.067' AS DateTime), 93)
INSERT [dbo].[File] ([IdFile], [Codigo], [IdBiblia], [Descripcion], [FechaCreacion], [IdCliente]) VALUES (139, N'filef2', 24, N'qweqw', CAST(N'2019-05-19T09:15:20.263' AS DateTime), 93)
SET IDENTITY_INSERT [dbo].[File] OFF
SET IDENTITY_INSERT [dbo].[Proveedor] ON 

INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (1, N'Transportes Gato', N'EMPRE', N'ventas@transporgato.com', N'1234561', N'(12)123457', N'contacto@transpcat.com', NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (2, N'Catering Maria', N'PERSO', N'maria213@gmail.com', N'985478712', NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (6, N'Transps gato', N'PERSO', N'qwd', NULL, NULL, N'asd', N'2', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (12, N'nombre2', N'OTROS', NULL, NULL, NULL, NULL, N'qwe', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (13, N'nombre3', N'OTROS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (14, N'4', N'OTROS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (15, N'nombre5', N'OTROS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (18, N'transportes kari', N'OTROS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (19, N'swissotel', N'HOTEL', N'wiii', NULL, NULL, NULL, N'cityyyeeeeeeeeeeeeeeeeee', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (24, N'swissotelllllllllw', N'HOTEL', N'', N'weee', N'', N'qwe', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (26, N'arawi', N'OTROS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (28, N'hotelito', N'OTROS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (29, N'hotelaso!22', N'HOTEL', N'qwe@asd.com', N'123', N'345', N'qwe@asdsa.com', N'limmmmmma', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (34, N'sheraton-lima', N'HOTEL', N'sheraton@shasd.com', NULL, NULL, NULL, N'Lima', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (35, N'decameron', N'HOTEL', N'correo1', N'123', NULL, N'correo2', N'city', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (36, N'decameron2', N'HOTEL', N'correo1', N'123', NULL, N'correo2', N'city', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (40, N'weeeee23', N'HOTEL', N'asd', N'123', N'1234', N'asdqwdq', N'city', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (42, N'oper', N'OPERA', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (44, N'wewwww', N'TRANS', NULL, NULL, NULL, NULL, N'limwa', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (45, N'wii', N'TRANS', NULL, NULL, NULL, NULL, N'lima', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (46, N'qweqwr', N'TRANS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (47, N'g', N'TRANS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (49, N'gw', N'TRANS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (50, N'gwee', N'GUIAA', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (52, N'empr', N'EMPRE', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (53, N'cueva', N'PERSO', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (55, N'Palmeras', N'HOTEL', N'', N'', N'', N'', N'Arequipaa', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (56, N'sheraton', N'HOTEL', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (57, N'qwdqwd', N'HOTEL', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (58, N'eeeeeeeeeeeeeeeeeeeeeo', N'HOTEL', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (59, N'ww', N'OPERA', N'', N'', NULL, N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (60, N'Guiaaa', N'GUIAA', N'asd', N'123', N'1234', N'asdqwe', N'lima', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (61, N'punto azul', N'RESTA', N'', N'', NULL, N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (62, N'65456465', N'HOTEL', N'', N'', NULL, N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (63, N'proov', N'OTROS', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (64, N'HOTELe', N'HOTEL', N'', N'', NULL, N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (65, N'wqqqqq', N'GUIAA', N'', N'', NULL, N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (67, N'xqw', N'HOTEL', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (68, N'qwer', N'HOTEL', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (70, N'asdqw', N'HOTEL', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (71, N'asdqwxas', N'HOTEL', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (72, N'asdqwxasqwd', N'HOTEL', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (73, N'asdqwxasqwdw', N'HOTEL', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (75, N'', N'TRANS', N'', N'', N'w', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (76, N'rrrrrr', N'', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (78, N'rrrrrrrrrrrrrrr', N'TRANS', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (79, N'xcv', N'GUIAA', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (80, N'melia', N'HOTEL', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (81, N'qq', N'', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (84, N'Transportista Manuel', N'TRANS', N'', N'', N'', N'', N'lima', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (86, N'Transp. Matias', N'TRANS', N'manue123@gmail.com', N'98546871', N'', N'', N'Lima', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (87, N'rctmre', N'TRANS', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (88, N'wiiiiii', N'PERSO', N'', N'', N'', N'', N'', NULL)
INSERT [dbo].[Proveedor] ([IdProveedor], [Nombre], [TipoProveedor], [Correo], [NumeroContacto], [NumeroContactoAdicional], [CorreoAdicional], [Ciudad], [Pais]) VALUES (89, N'arawe', N'HOTEL', N'qwe', N'qwe', N'eqwe', N'qweqwe', N'qweqweqw', NULL)
SET IDENTITY_INSERT [dbo].[Proveedor] OFF
SET IDENTITY_INSERT [dbo].[Servicio] ON 

INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (3, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 2, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), N'LGA-531', 4, NULL, NULL, 1, N'Naa!', N'Cusco', NULL, NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (16, CAST(N'2018-10-03' AS Date), N'SERVI', N'Full day cajamarca', 3, NULL, NULL, NULL, 4, NULL, NULL, NULL, N'args!!', N'Cajamarcaqaaa', N'diego maradonaa', N'tren vip', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (17, CAST(N'2018-10-03' AS Date), N'TRANS', N'Movilidad baños del inca , hotel ensenada', 3, NULL, NULL, NULL, 1, NULL, NULL, NULL, N'args!!', N'Cajamarcawaaaa', N'diego maradonaa', N'tren vip', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (18, CAST(N'2018-12-13' AS Date), N'TRANS', N'serr', 34, CAST(N'02:00:00' AS Time), CAST(N'13:58:00' AS Time), N'', 1, N'', N'', NULL, N'', N'', N'132', NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (19, CAST(N'2018-12-05' AS Date), N'TRANS', N'serr!', 35, NULL, NULL, NULL, 32, NULL, NULL, NULL, NULL, NULL, N'larry', NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (20, CAST(N'2018-12-19' AS Date), N'TRANS', N'full day alsdjflaks jdflkasdj flkasjdfkl jasld', 37, NULL, NULL, NULL, 3, NULL, NULL, NULL, N'Vienen a las 4 am.', N'Ica', N'Mateo saavedra', NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (21, CAST(N'2018-12-14' AS Date), N'TRANS', N'qwe', 40, NULL, NULL, NULL, 12, NULL, NULL, NULL, NULL, NULL, N'qwe', NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (25, CAST(N'2018-10-05' AS Date), N'SERVI', N'nuevo serv', 2, CAST(N'00:00:20' AS Time), CAST(N'00:00:03' AS Time), N'LGA-531', 4, N'vr', N'tc', NULL, N'Naa!', N'Cusco', N'pax1', N'tren', N'a l m')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (26, CAST(N'2018-10-05' AS Date), N'SERVI', N'nuevo serv', 2, CAST(N'00:00:20' AS Time), CAST(N'00:00:03' AS Time), N'LGA-531', 4, N'vr', N'tc', NULL, N'Naa!', N'Cusco', N'pax1', N'tren', N'a l m')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (27, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 21, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (30, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 52, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (31, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 53, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (32, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 54, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (33, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 55, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (34, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 58, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (35, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco transp', 58, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (38, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 61, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (40, CAST(N'2018-10-05' AS Date), N'SERVI', N'serv nuevo 1!', 61, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (56, CAST(N'2019-05-16' AS Date), N'TRANS', N'serv nuevo 2!', 21, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones!', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (59, CAST(N'2019-05-16' AS Date), N'TRANS', N'serv nuevo 1!', 21, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (60, CAST(N'2019-05-16' AS Date), N'TRANS', N'serv nuevo 2!', 61, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones!', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (61, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 62, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (62, CAST(N'2018-10-05' AS Date), N'TRANS', N'Full day cusco transp', 62, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (63, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 63, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (64, CAST(N'2018-10-05' AS Date), N'TRANS', N'Full day cusco transp', 63, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (66, CAST(N'2019-05-21' AS Date), N'SERVI', N'nomb', 99, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, N'ciudad', N'', N'', N'')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (68, CAST(N'2018-10-05' AS Date), N'SERVI', N'Full day cusco', 111, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (69, CAST(N'2018-10-05' AS Date), N'TRANS', N'Full day cusco transp', 111, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', 1, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (70, CAST(N'0001-01-01' AS Date), N'TRANS', N'Full day cusco transp', 112, CAST(N'11:49:00' AS Time), CAST(N'11:50:00' AS Time), N'LGA-531', 4, N'v', N'c', NULL, N'Sin observaciones', N'Cusco', N'Gerrard', N'tren', N'alm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (71, CAST(N'0001-01-01' AS Date), N'TRANS', N'Full day cusco transp', 114, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (72, CAST(N'0001-01-01' AS Date), N'SERVI', N'weeeeeee', 117, NULL, NULL, NULL, 0, NULL, NULL, NULL, N'', N'', N'', N'', N'')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (73, CAST(N'0001-01-01' AS Date), N'SERVI', N'', 121, NULL, NULL, NULL, 0, NULL, NULL, NULL, N'', N'', N'', N'', N'')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (75, CAST(N'0001-01-01' AS Date), N'TRANS', N'asdasdasdas', 128, CAST(N'17:00:00' AS Time), CAST(N'16:00:00' AS Time), N'', 0, N'', N'', NULL, N'', N'', N'', NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (76, CAST(N'0001-01-01' AS Date), N'TRANS', N'weeeeee', 130, NULL, NULL, N'', 0, N'', N'', NULL, N'', N'', N'', NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (77, CAST(N'0001-01-01' AS Date), N'SERVI', N'jejej', 131, NULL, NULL, NULL, 0, NULL, NULL, NULL, N'', N'', N'', N'', N'')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (78, CAST(N'0001-01-01' AS Date), N'TRANS', N'weeeeee', 131, NULL, NULL, N'', 0, N'', N'', NULL, N'', N'', N'', NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (79, CAST(N'2019-05-15' AS Date), N'SERVI', N'serv1', 136, NULL, NULL, NULL, 3, NULL, NULL, 34, N'observaciones!', N'lima', N'lewis', N'tren', N'almmm')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (80, CAST(N'2019-05-23' AS Date), N'SERVI', N'in', 137, NULL, NULL, NULL, 2, NULL, NULL, 19, N'', N'limaa', N'lewis!!!', N'', N'')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (81, CAST(N'0001-01-01' AS Date), N'TRANS', N'apto / in', 137, CAST(N'17:00:00' AS Time), CAST(N'17:35:00' AS Time), N'', 0, N'', N'', 84, N'', N'', N'', NULL, NULL)
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (82, CAST(N'0001-01-01' AS Date), N'SERVI', N'innnnn', 138, NULL, NULL, NULL, 0, NULL, NULL, 60, N'', N'', N'qwe', N'', N'')
INSERT [dbo].[Servicio] ([IdServicio], [Fecha], [TipoServicio], [Nombre], [IdFile], [HoraRecojo], [HoraSalida], [Vuelo], [Pasajeros], [VR], [TC], [IdProveedor], [Observaciones], [Ciudad], [NombrePasajero], [Tren], [ALM]) VALUES (83, CAST(N'2019-05-07' AS Date), N'SERVI', N'innnnn', 139, NULL, NULL, NULL, 0, NULL, NULL, 60, N'', N'', N'qwe', N'', N'')
SET IDENTITY_INSERT [dbo].[Servicio] OFF
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Usr], [Clave], [FechaCreacionUtc], [Rol], [IdUsuario], [NombrePersona], [CorreoPersona], [Genero]) VALUES (N'admin', N'admin', CAST(N'2019-05-20T00:00:00.000' AS DateTime), N'Admin', 1, N'qwdqwd', N'dqdqw', 0)
INSERT [dbo].[Usuario] ([Usr], [Clave], [FechaCreacionUtc], [Rol], [IdUsuario], [NombrePersona], [CorreoPersona], [Genero]) VALUES (N'usr', N'W3IrMH/ObJRJBdEyaR1eSiIUt/6StziSDrP846kEIKGVEcMBCg53ErBU2u9bV7rVnsvZOzKA8hBXj1R/Su1NJQ==', CAST(N'2019-05-20T12:00:14.707' AS DateTime), N'Admin', 2, N'Luis', N'qwdqwdqw', 0)
INSERT [dbo].[Usuario] ([Usr], [Clave], [FechaCreacionUtc], [Rol], [IdUsuario], [NombrePersona], [CorreoPersona], [Genero]) VALUES (N'wee', N'LnK2hE2t4HFYduu8DYXR/FKgILqrf3TPtNAANeE8heA3uSgJWcSg5HzEv/JkCJ9MwoORNfqL4FCfLhK9wAuPZQ==', CAST(N'2019-05-20T12:02:28.343' AS DateTime), N'Admin', 3, N'dqw', N'dqw', 0)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
/****** Object:  Index [unico mes anho biblia]    Script Date: 5/22/2019 11:28:05 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [unico mes anho biblia] ON [dbo].[Biblia]
(
	[Anho] ASC,
	[Mes] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nombre unico]    Script Date: 5/22/2019 11:28:05 PM ******/
ALTER TABLE [dbo].[Cliente] ADD  CONSTRAINT [nombre unico] UNIQUE NONCLUSTERED 
(
	[Nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [codigo unico]    Script Date: 5/22/2019 11:28:05 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [codigo unico] ON [dbo].[File]
(
	[Codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [NOMBRE_UNICO]    Script Date: 5/22/2019 11:28:05 PM ******/
ALTER TABLE [dbo].[Proveedor] ADD  CONSTRAINT [NOMBRE_UNICO] UNIQUE NONCLUSTERED 
(
	[Nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Proveedor] ADD  CONSTRAINT [DF_Proveedor_TipoProveedor]  DEFAULT ('OTROS') FOR [TipoProveedor]
GO
ALTER TABLE [dbo].[File]  WITH CHECK ADD  CONSTRAINT [FK_File_Biblia] FOREIGN KEY([IdBiblia])
REFERENCES [dbo].[Biblia] ([IdBiblia])
GO
ALTER TABLE [dbo].[File] CHECK CONSTRAINT [FK_File_Biblia]
GO
ALTER TABLE [dbo].[File]  WITH CHECK ADD  CONSTRAINT [FK_File_Cliente] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[Cliente] ([IdCliente])
GO
ALTER TABLE [dbo].[File] CHECK CONSTRAINT [FK_File_Cliente]
GO
ALTER TABLE [dbo].[RegistroRecordatorio]  WITH CHECK ADD  CONSTRAINT [FK_RegistroRecordatorio_Proveedor] FOREIGN KEY([IdProveedor])
REFERENCES [dbo].[Proveedor] ([IdProveedor])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[RegistroRecordatorio] CHECK CONSTRAINT [FK_RegistroRecordatorio_Proveedor]
GO
ALTER TABLE [dbo].[RegistroRecordatorio]  WITH CHECK ADD  CONSTRAINT [FK_RegistroRecordatorio_Servicio] FOREIGN KEY([IdServicio])
REFERENCES [dbo].[Servicio] ([IdServicio])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[RegistroRecordatorio] CHECK CONSTRAINT [FK_RegistroRecordatorio_Servicio]
GO
ALTER TABLE [dbo].[Servicio]  WITH CHECK ADD  CONSTRAINT [FK_Servicio_File] FOREIGN KEY([IdFile])
REFERENCES [dbo].[File] ([IdFile])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Servicio] CHECK CONSTRAINT [FK_Servicio_File]
GO
ALTER TABLE [dbo].[Servicio]  WITH CHECK ADD  CONSTRAINT [FK_Servicio_Proveedor] FOREIGN KEY([IdProveedor])
REFERENCES [dbo].[Proveedor] ([IdProveedor])
GO
ALTER TABLE [dbo].[Servicio] CHECK CONSTRAINT [FK_Servicio_Proveedor]
GO
/****** Object:  StoredProcedure [dbo].[Pr_VerCiudades]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Pr_VerCiudades] as
select Ciudad from cliente where Ciudad <> ''
union
select Ciudad from proveedor where Ciudad <> ''
GO
/****** Object:  StoredProcedure [dbo].[Pr_VerPaises]    Script Date: 5/22/2019 11:28:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Pr_VerPaises] as
select Pais from cliente where Pais <> ''
union
select Pais from proveedor where Pais <> ''
GO
USE [master]
GO
ALTER DATABASE [YllariFm] SET  READ_WRITE 
GO
