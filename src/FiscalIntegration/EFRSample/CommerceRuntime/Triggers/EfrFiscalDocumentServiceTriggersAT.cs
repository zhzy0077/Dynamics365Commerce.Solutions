﻿/**
 * SAMPLE CODE NOTICE
 * 
 * THIS SAMPLE CODE IS MADE AVAILABLE AS IS.  MICROSOFT MAKES NO WARRANTIES, WHETHER EXPRESS OR IMPLIED,
 * OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY OR COMPLETENESS OF RESPONSES, OF RESULTS, OR CONDITIONS OF MERCHANTABILITY.
 * THE ENTIRE RISK OF THE USE OR THE RESULTS FROM THE USE OF THIS SAMPLE CODE REMAINS WITH THE USER.
 * NO TECHNICAL SUPPORT IS PROVIDED.  YOU MAY NOT DISTRIBUTE THIS CODE UNLESS YOU HAVE A LICENSE AGREEMENT WITH MICROSOFT THAT ALLOWS YOU TO DO SO.
 */

namespace Contoso
{
    namespace CommerceRuntime.DocumentProvider.EFRSample.Triggers
    {
        using System;
        using System.Collections.Generic;
        using System.Threading.Tasks;
        using Microsoft.Dynamics.Commerce.Runtime;
        using Microsoft.Dynamics.Commerce.Runtime.DataModel;
        using Microsoft.Dynamics.Commerce.Runtime.DataServices.Messages;
        using Microsoft.Dynamics.Commerce.Runtime.Messages;
        using Contoso.CommerceRuntime.DocumentProvider.EFRSample.Messages;

        public sealed class EfrFiscalDocumentServiceTriggersAT : ICountryRegionAware, IRequestTriggerAsync
        {
            public IEnumerable<Type> SupportedRequestTypes
            {
                get
                {
                    return new[]
                    {
                        typeof(PopulateEfrLocalizationInfoRequest),
                        typeof(GetExtensionPackageDefinitionsRequest),
                    };
                }
            }

            public IEnumerable<string> SupportedCountryRegions
            {
                get
                {
                    return new[]
                    {
                        nameof(CountryRegionISOCode.AT),
                    };
                }
            }

            public Task OnExecuted(Request request, Response response)
            {
                switch (request)
                {
                    case PopulateEfrLocalizationInfoRequest populateEfrLocalizationInfoRequest:
                        PopulateEfrLocalizationInfo(populateEfrLocalizationInfoRequest, (SingleEntityDataServiceResponse<DataModelEFR.Documents.Receipt>)response);
                        break;
                    case GetExtensionPackageDefinitionsRequest getExtensionPackageDefinitionsRequest:
                        GetExtensionPackageDefinitions(getExtensionPackageDefinitionsRequest, response);
                        break;
                }

                return Task.CompletedTask;
            }

            public Task OnExecuting(Request request)
            {
                return Task.CompletedTask;
            }

            private static void PopulateEfrLocalizationInfo(PopulateEfrLocalizationInfoRequest request, SingleEntityDataServiceResponse<DataModelEFR.Documents.Receipt> response)
            {
                var receipt = response.Entity;
                var salesOrder = request.SalesOrder;

                receipt.TransactionNumber = salesOrder.Id;
                receipt.ReceiptDateTime = salesOrder.CreatedDateTime.DateTime;
            }

            private static void GetExtensionPackageDefinitions(Request request, Response response)
            {
                ThrowIf.Null(request, "request");
                ThrowIf.Null(response, "response");

                var extensionPackageDefinition = new ExtensionPackageDefinition();

                // Should match the PackageName used when packaging the customization package (i.e. in CustomizationPackage.props).
                extensionPackageDefinition.Name = "Contoso.EFRSample";
                extensionPackageDefinition.Publisher = "Contoso";
                extensionPackageDefinition.IsEnabled = true;

                var getExtensionsResponse = (GetExtensionPackageDefinitionsResponse)response;
                getExtensionsResponse.ExtensionPackageDefinitions.Add(extensionPackageDefinition);
            }
        }
    }
}