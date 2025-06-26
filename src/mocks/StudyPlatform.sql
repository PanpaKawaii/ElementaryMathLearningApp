
USE master;
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = 'StudyPlatform')
BEGIN
    ALTER DATABASE StudyPlatform SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE StudyPlatform;
END

CREATE DATABASE StudyPlatform;
GO

USE StudyPlatform;
GO

IF OBJECT_ID('dbo.[Following]', 'U') IS NOT NULL
    DROP TABLE dbo.[Following];
    GO
IF OBJECT_ID('dbo.[AccomplishAchievement]', 'U') IS NOT NULL
    DROP TABLE dbo.[AccomplishAchievement];
    GO
IF OBJECT_ID('dbo.[Achievement]', 'U') IS NOT NULL
    DROP TABLE dbo.[Achievement];
    GO
IF OBJECT_ID('dbo.[TopicProgress]', 'U') IS NOT NULL
    DROP TABLE dbo.[TopicProgress];
    GO
IF OBJECT_ID('dbo.[Progress]', 'U') IS NOT NULL
    DROP TABLE dbo.[Progress];
    GO
IF OBJECT_ID('dbo.[BoughtSubject]', 'U') IS NOT NULL
    DROP TABLE dbo.[BoughtSubject];
    GO
IF OBJECT_ID('dbo.[Comment]', 'U') IS NOT NULL
    DROP TABLE dbo.[Comment];
    GO
IF OBJECT_ID('dbo.[User]', 'U') IS NOT NULL
    DROP TABLE dbo.[User];
    GO
IF OBJECT_ID('dbo.[Question]', 'U') IS NOT NULL
    DROP TABLE dbo.[Question];
    GO
IF OBJECT_ID('dbo.[Topic]', 'U') IS NOT NULL
    DROP TABLE dbo.[Topic];
    GO
IF OBJECT_ID('dbo.[Chapter]', 'U') IS NOT NULL
    DROP TABLE dbo.[Chapter];
    GO
IF OBJECT_ID('dbo.[Subject]', 'U') IS NOT NULL
    DROP TABLE dbo.[Subject];
    GO

-- Table: [Subject]
CREATE TABLE [Subject] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Name			NVARCHAR(255),
    Price			INT,
    UploadDate		DATE,
    LastEditDate	DATE
);

-- Table: [Chapter]
CREATE TABLE [Chapter] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Number			INT,
    Name			NVARCHAR(255),
    SubjectId		INT FOREIGN KEY REFERENCES [Subject](Id)
);

-- Table: [Topic]
CREATE TABLE [Topic] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Number		INT,
    Name		NVARCHAR(255),
    ChapterId	INT FOREIGN KEY REFERENCES [Chapter](Id)
);

-- Table: [Question]
CREATE TABLE [Question] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Number			INT,
    Type			NVARCHAR(255),
    Question		NVARCHAR(255),
    CorrectAnswer	NVARCHAR(255),
    Answers			NVARCHAR(255),
    Explaination	NVARCHAR(255),
    Note			NVARCHAR(255),
    TopicId			INT FOREIGN KEY REFERENCES [Topic](Id)
);

-- Table: [User]
CREATE TABLE [User] (
    Id					INT PRIMARY KEY IDENTITY(1,1),
    Name				NVARCHAR(255),
    Username			NVARCHAR(255),
    Password			NVARCHAR(255),
    Role				NVARCHAR(255),
    CuratorId			INT,
    Email				NVARCHAR(255),
    Point				INT,
    JoinedDate			DATE,
    DayStreak			INT,
    HighestDayStreak	INT
);

-- Table: [Comment]
CREATE TABLE [Comment] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Content		NVARCHAR(255),
    Answer		INT,
    CommentDate DATE,
    QuestionId	INT FOREIGN KEY REFERENCES [Question](Id),
    UserId		INT FOREIGN KEY REFERENCES [User](Id)
);

-- Table: [BoughtSubject]
CREATE TABLE [BoughtSubject] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    PurchaseDate	DATE,
    Feedback		NVARCHAR(255),
    SubjectId		INT FOREIGN KEY REFERENCES [Subject](Id),
    UserId			INT FOREIGN KEY REFERENCES [User](Id)
);

-- Table: [Progress]
CREATE TABLE [Progress] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Chapter			INT,
    Topic			INT,
    BoughtSubjectId	INT FOREIGN KEY REFERENCES [BoughtSubject](Id)
);

-- Table: [TopicProgress]
CREATE TABLE [TopicProgress] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Score		INT,
    StartDate	DATE,
    UserId		INT FOREIGN KEY REFERENCES [User](Id),
    TopicId		INT FOREIGN KEY REFERENCES [Topic](Id)
);

-- Table: [Achievement]
CREATE TABLE [Achievement] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Name		NVARCHAR(255),
    Description	NVARCHAR(255)
);

-- Table: [AccomplishAchievement]
CREATE TABLE [AccomplishAchievement] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Progress		INT,
    AchieveDate		DATE,
    Status			INT,
    AchievementId	INT FOREIGN KEY REFERENCES [Achievement](Id),
    UserId			INT FOREIGN KEY REFERENCES [User](Id)
);

-- Table: [Following]
CREATE TABLE [Following] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    FollowDate	DATE,
    FollowingId	INT FOREIGN KEY REFERENCES [User](Id),
    UserId		INT FOREIGN KEY REFERENCES [User](Id)
);

-- Table: [Subject]
INSERT INTO [Subject] (Name, Price, UploadDate, LastEditDate) VALUES
('Mathematics', 600000, '2024-01-15', '2025-05-20'),
('Physics', 700000, '2024-02-10', '2025-06-01'),
('Chemistry', 800000, '2024-03-05', '2025-05-25')

-- Table: [Chapter]
INSERT INTO [Chapter] (Number, Name, SubjectId) VALUES
(1, 'Calculus', 1),
(2, 'Comparation', 1),
(3, 'Sorting', 1),
(1, 'Velocity, Time And Distance', 2),
(2, 'Force And Gravity', 2),
(1, 'Electromagnetism', 3),
(2, 'Organic Chemistry', 3)

-- Table: [Topic]
INSERT INTO [Topic] (Number, Name, ChapterId) VALUES
(1, 'Linear Equations', 1),
(2, 'Quadratic Equations', 1),
(1, 'Linear Equations', 2),
(2, 'Quadratic Equations', 2),
(1, 'Linear Equations', 3),
(2, 'Quadratic Equations', 3),
(1, 'Newtons Laws', 4),
(1, 'Hydrocarbons', 6)

-- Table: [Question]
INSERT INTO [Question] (Number, Type, Question, CorrectAnswer, Answers, Explaination, Note, TopicId) VALUES
(1, 'Multiple Choice', 'Solve 2x + 3 = 7', '2', '1, 2, 3, 4', '2x = 4, x = 2', 'Check steps', 1),
(2, 'True/False', 'Quadratic has one root', 'False', 'True, False', 'Quadratics have two roots', '', 1),
(3, 'Multiple Choice', 'F = ma, a = ?', '1/m', 'm, 1/F', 'From F = ma, a = F/m', '', 1),
(1, 'Short Answer', 'Define Electric Field', 'Force per unit charge', 'Charge per unit force', 'E = F/q', '', 2),
(2, 'Multiple Choice', 'Methane is a?', 'Hydrocarbon', 'Alcohol', 'CH4 is a hydrocarbon', '', 2)

-- Table: [User]
INSERT INTO [User] (Name, Username, Password, Role, CuratorId, Email, Point, JoinedDate, DayStreak, HighestDayStreak) VALUES
('John Doe', 'jdoe', 'pass123', 'Student', NULL, 'jdoe@example.com', 100, '2024-06-01', 5, 10),
('Jane Smith', 'jsmith', 'pass456', 'Student', NULL, 'jsmith@example.com', 150, '2024-06-02', 7, 12),
('Alice Brown', 'abrown', 'pass789', 'Curator', 1, 'abrown@example.com', 200, '2024-06-03', 3, 8),
('Bob Johnson', 'bjohnson', 'pass101', 'Student', NULL, 'bjohnson@example.com', 120, '2024-06-04', 4, 9),
('Carol White', 'cwhite', 'pass112', 'Student', NULL, 'cwhite@example.com', 180, '2025-06-01', 6, 11)

-- Table: [Comment]
INSERT INTO [Comment] (Content, Answer, CommentDate, QuestionId, UserId) VALUES
('Good explanation', null, '2025-06-01', 1, 1),
('Disagree with answer', 1, '2025-06-02', 2, 1),
('Clear solution', 2, '2025-06-03', 3, 1),
('Needs more detail', 2, '2025-06-04', 4, 1),
('Useful note', 3, '2025-06-05', 5, 1)

-- Table: [BoughtSubject]
INSERT INTO [BoughtSubject] (PurchaseDate, Feedback, SubjectId, UserId) VALUES
('2025-01-10', 'Great course', 1, 1),
('2025-02-15', 'Very informative', 2, 2),
('2025-03-20', 'Needs more examples', 3, 3),
('2025-04-25', 'Excellent content', 2, 4),
('2025-05-30', 'Highly recommended', 3, 5)

-- Table: [Progress]
INSERT INTO [Progress] (Chapter, Topic, BoughtSubjectId) VALUES
(2, 1, 1)

-- Table: [TopicProgress]
INSERT INTO [TopicProgress] (Score, StartDate, UserId, TopicId) VALUES
(85, '2025-06-01', 1, 1),
(90, '2025-06-02', 2, 2),
(88, '2025-06-03', 3, 3),
(92, '2025-06-04', 4, 4),
(87, '2025-06-05', 5, 5)

-- Table: [Achievement]
INSERT INTO [Achievement] (Name, Description) VALUES
('Beginer', 'Completed first chapter'),
('Intermediate', 'Completed five topics'),
('Advanced', 'Scored 90+ in quiz'),
('Expert', 'Completed all subjects'),
('Master', 'Highest streak achieved')

-- Table: [AccomplishAchievement]
INSERT INTO [AccomplishAchievement] (Progress, AchieveDate, Status, AchievementId, UserId) VALUES
(85, '2025-06-01', 1, 1, 1),
(90, '2025-06-02', 1, 2, 2),
(88, '2025-06-03', 1, 3, 3),
(92, '2025-06-04', 1, 4, 4),
(87, '2025-06-05', 1, 5, 5)

-- Table: [Following]
INSERT INTO [Following] (FollowDate, FollowingId, UserId) VALUES
('2025-06-01', 1, 2),
('2025-06-02', 2, 1),
('2025-06-03', 1, 3),
('2025-06-04', 1, 4),
('2025-06-05', 4, 3)

SELECT * FROM [Subject]
SELECT * FROM [Chapter]
SELECT * FROM [Topic]
SELECT * FROM [Question]
SELECT * FROM [User]
SELECT * FROM [Comment]
SELECT * FROM [BoughtSubject]
SELECT * FROM [Progress]
SELECT * FROM [TopicProgress]
SELECT * FROM [Achievement]
SELECT * FROM [AccomplishAchievement]
SELECT * FROM [Following]