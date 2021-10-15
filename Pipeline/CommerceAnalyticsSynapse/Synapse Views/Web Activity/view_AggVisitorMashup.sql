﻿CREATE OR ALTER VIEW [dbo].[view_AggVisitorMashup] AS
	SELECT * 
	FROM
		OPENROWSET
		( 
			BULK N'https://placeholder_storageaccount.dfs.core.windows.net/placeholder_container/placeholder_datarootpath/Ontologies/Commerce/AggVisitorMashup/*.parquet',
			FORMAT='parquet'
		)
		WITH
		(
			[dateId]								int,
			[clientUtcDate]							datetime2(7),
			[channelId]								bigint,
			[environmentId]							varchar(200),
			[pageDomain]							varchar(200),
			[pageType]								varchar(200),
			[pageLocale]							varchar(200),
			[browserLocale]							varchar(200),
			[utmSource]								varchar(200),
			[utmMedium]								varchar(200),
			[utmCampaign]							varchar(200),
			[utmTerm]								varchar(200),
			[utmContent]							varchar(200),
			[origin]								varchar(200),
			[isSignedIn]							bit,
			[isCookieConsent]						bit,
			[isNewUser]								bit,
			[uaPlatform]							varchar(200),
			[uaManufacturer]						varchar(200),
			[uaDevice]								varchar(200),
			[uaOsName]								varchar(200),
			[uaBrowserName]							varchar(200),
			[ripContinent]							varchar(200),
			[ripCountry]							varchar(200),
			[ripStateProvince]						varchar(200),
			[ripCity]								varchar(200),
			[screenSize]							varchar(200),
			[visitorCount]							bigint,
			[orderCount]							bigint,
			[orderOnlineRevenue]					float,
			[axSalesSalesTaxAmount]					decimal(38, 2),
			[axSalesNetAmount]						decimal(38, 2),
			[axSalesCostAmount]						decimal(38, 2),
			[axSalesMarginAmount]					decimal(38, 2),
			[axSalesTotalDiscountAmount]			decimal(38, 2),
			[axSalesCurrency]						varchar(200),
			[axSalesQuantity]						decimal(38, 2),
			[axCustomerRecencyBand]					bigint,
			[axCustomerRecencyString]				varchar(200),
			[axCustomerLifetimeValueBand]			bigint,
			[axCustomerLifetimeValueString]			varchar(200),
			[axCustomerRelationshipLengthBand]		bigint,
			[axCustomerRelationshipLengthString]	varchar(200),
			[axCustomerFrequencyBand]				bigint,
			[axCustomerFrequencyString]				varchar(200)
		) AS AggVisitor