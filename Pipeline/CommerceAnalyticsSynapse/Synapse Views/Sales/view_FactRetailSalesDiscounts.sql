﻿CREATE
or ALTER VIEW [dbo].[view_FactRetailSalesDiscounts] AS
SELECT *
FROM OPENROWSET (
		BULK N'https://placeholder_storageaccount.dfs.core.windows.net/placeholder_container/placeholder_datarootpath/Ontologies/Commerce/FactRetailSalesDiscounts/*.parquet',
		FORMAT = 'parquet'
	) WITH (
		[RetailSalesDiscountId] 		bigint,
		[Company] 				nvarchar(4),
		[StoreNumber] 				nvarchar(10),
		[RegisterNumber] 			nvarchar(10),
		[TransactionDate] 			datetime,
		[TimeId] 				bigint,
		[Currency] 				nvarchar(3),
		[CustomerAccount] 			nvarchar(38),
		[InvoiceAccount] 			nvarchar(20),
		[InvoiceNumber] 			nvarchar(20),
		[OrderNumber] 				nvarchar(20),
		[ItemNumber] 				nvarchar(20),
		[VariantNumber] 			nvarchar(10),
		[DiscountAmount] 			numeric(32, 6),
		[PeriodicDiscountAmount] 		numeric(32, 6),
		[CashDiscountAmount] 			numeric(32, 6),
		[OtherDiscountAmount] 			numeric(32, 6),
		[CustomerDiscountType] 			nvarchar(100),
		[DiscountCode] 				nvarchar(60),
		[DiscountOriginType] 			nvarchar(100),
		[LotNumber] 				nvarchar(20),
		[ManualDiscountType] 			nvarchar(100),
		[DiscountPercentage] 			numeric(32, 6),
		[Discount] 				nvarchar(20),
		[CompanyId] 				bigint,
		[CurrencyId] 				bigint,
		[ChannelId] 				bigint,
		[RetailTerminalId] 			bigint,
		[DateId] 				bigint,
		[CustomerId] 				bigint,
		[InvoiceCustomerId] 			bigint,
		[ItemId] 				bigint,
		[ProductId] 				bigint,
		[ProductVariantId] 			bigint,
		[WorkerId] 				bigint,
		[PeriodicDiscountId] 			bigint,
		[SysProcessingDateTime] 		datetime2,
		[SysIsDeleted] 				int
	) AS [FactRetailSalesDiscounts]