IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044108_InitialCreate'
)
BEGIN
    CREATE TABLE [Cases] (
        [CaseID] int NOT NULL IDENTITY,
        [CaseName] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        [Status] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Cases] PRIMARY KEY ([CaseID])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044108_InitialCreate'
)
BEGIN
    CREATE TABLE [Evidence] (
        [EvidenceID] int NOT NULL IDENTITY,
        [Title] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        [Location] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Evidence] PRIMARY KEY ([EvidenceID])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044108_InitialCreate'
)
BEGIN
    CREATE TABLE [Investigations] (
        [InvestigationID] int NOT NULL IDENTITY,
        [CaseID] int NOT NULL,
        [SuspectID] int NOT NULL,
        [DateStarted] datetime2 NOT NULL,
        CONSTRAINT [PK_Investigations] PRIMARY KEY ([InvestigationID])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044108_InitialCreate'
)
BEGIN
    CREATE TABLE [Suspects] (
        [SuspectID] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        [Occupation] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Suspects] PRIMARY KEY ([SuspectID])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044108_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260903044108_InitialCreate', N'10.0.12');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044712_SeedInitialData'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CaseID', N'CaseName', N'Description', N'Status') AND [object_id] = OBJECT_ID(N'[Cases]'))
        SET IDENTITY_INSERT [Cases] ON;
    EXEC(N'INSERT INTO [Cases] ([CaseID], [CaseName], [Description], [Status])
    VALUES (1, N''The Missing Prototype'', N''A technology prototype has disappeared from a secure research laboratory.'', N''OPEN'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CaseID', N'CaseName', N'Description', N'Status') AND [object_id] = OBJECT_ID(N'[Cases]'))
        SET IDENTITY_INSERT [Cases] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044712_SeedInitialData'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'EvidenceID', N'Description', N'Location', N'Title') AND [object_id] = OBJECT_ID(N'[Evidence]'))
        SET IDENTITY_INSERT [Evidence] ON;
    EXEC(N'INSERT INTO [Evidence] ([EvidenceID], [Description], [Location], [Title])
    VALUES (1, N''Jamie Smith''''s access card was used to enter the research laboratory at 23:41.'', N''Security Office'', N''Security Access Log''),
    (2, N''CCTV footage shows a person entering the laboratory at approximately 23:43. The person''''s face cannot be clearly identified.'', N''Research Laboratory'', N''CCTV Report''),
    (3, N''A partial fingerprint was found on the prototype storage cabinet. The fingerprint belongs to a person who regularly works in the laboratory.'', N''Research Laboratory'', N''Fingerprint Report''),
    (4, N''An email sent shortly before the incident states: ''''The prototype must be moved before tomorrow''''s demonstration.'''''', N''Archive Room'', N''Email Message''),
    (5, N''A photograph taken after the incident shows that the prototype cabinet was open and the laboratory lights were switched off.'', N''Research Laboratory'', N''Photograph'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'EvidenceID', N'Description', N'Location', N'Title') AND [object_id] = OBJECT_ID(N'[Evidence]'))
        SET IDENTITY_INSERT [Evidence] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044712_SeedInitialData'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'SuspectID', N'Description', N'Name', N'Occupation') AND [object_id] = OBJECT_ID(N'[Suspects]'))
        SET IDENTITY_INSERT [Suspects] ON;
    EXEC(N'INSERT INTO [Suspects] ([SuspectID], [Description], [Name], [Occupation])
    VALUES (1, N''Alex developed the software used by the prototype and had access to the laboratory.'', N''Alex Morgan'', N''Software Developer''),
    (2, N''Jamie was responsible for security at the building on the night of the incident.'', N''Jamie Smith'', N''Security Officer''),
    (3, N''Taylor worked with the research team and had access to the laboratory during working hours.'', N''Taylor Williams'', N''Research Assistant'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'SuspectID', N'Description', N'Name', N'Occupation') AND [object_id] = OBJECT_ID(N'[Suspects]'))
        SET IDENTITY_INSERT [Suspects] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260903044712_SeedInitialData'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260903044712_SeedInitialData', N'10.0.12');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260909050510_AddConclusionColumn'
)
BEGIN
    ALTER TABLE [Investigations] ADD [Conclusion] nvarchar(max) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260909050510_AddConclusionColumn'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260909050510_AddConclusionColumn', N'10.0.12');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261008115006_AddSuspectDetails'
)
BEGIN
    ALTER TABLE [Suspects] ADD [Age] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261008115006_AddSuspectDetails'
)
BEGIN
    ALTER TABLE [Suspects] ADD [Height] decimal(6,2) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261008115006_AddSuspectDetails'
)
BEGIN
    ALTER TABLE [Suspects] ADD [Race] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261008115006_AddSuspectDetails'
)
BEGIN
    EXEC(N'UPDATE [Suspects] SET [Age] = NULL, [Height] = NULL, [Race] = N''Not specified''
    WHERE [SuspectID] = 1;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261008115006_AddSuspectDetails'
)
BEGIN
    EXEC(N'UPDATE [Suspects] SET [Age] = NULL, [Height] = NULL, [Race] = N''Not specified''
    WHERE [SuspectID] = 2;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261008115006_AddSuspectDetails'
)
BEGIN
    EXEC(N'UPDATE [Suspects] SET [Age] = NULL, [Height] = NULL, [Race] = N''Not specified''
    WHERE [SuspectID] = 3;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261008115006_AddSuspectDetails'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20261008115006_AddSuspectDetails', N'10.0.12');
END;

COMMIT;
GO

