/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';
import { CommerceProperty, SimpleProduct } from '@msdyn365-commerce/retail-proxy';

import {
    IBuyboxAddToCartViewProps,
    IBuyboxAddToOrderTemplateViewProps,
    IBuyboxAddToWishlistViewProps,
    IBuyboxData,
    IBuyboxKeyInPriceViewProps,
    IBuyboxProductConfigureDropdownViewProps,
    IBuyboxProductConfigureViewProps,
    IBuyboxProductQuantityViewProps,
    IBuyboxShopSimilarLookViewProps
} from '@msdyn365-commerce-modules/buybox';
import { IBuyboxViewProps } from '@msdyn365-commerce-modules/buybox/src/modules/buybox/./buybox';
import { IBuyboxFindInStoreViewProps } from '@msdyn365-commerce-modules/buybox/src/modules/buybox/./components/buybox-find-in-store';
import {
    IBuyboxProps as IBuyboxExtentionProps,
    IBuyboxResources as IBuyboxExtentionResources
} from '../definition-extensions/buybox.ext.props.autogenerated';

const BuyboxView: React.FC<IBuyboxViewProps & IBuyboxExtentionProps<IBuyboxData> & IBuyboxExtentionResources> = props => {
    const {
        ModuleProps,
        MediaGalleryContainerProps,
        ProductInfoContainerProps,
        addToCart,
        addToOrderTemplate,
        addToWishlist,
        configure,
        description,
        findInStore,
        quantity,
        price,
        title,
        rating,
        inventoryLabel,
        shopSimilarLook,
        keyInPrice,
        shopSimilarDescription,
        unitOfMeasure
    } = props;

    const isGiftWrapKey: string = 'isGiftWrap';
    const [isGiftWrap, setIsGiftWrap] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsGiftWrap(false);
    }, [props.data.product.result]);

    const _updateProductExtensionProperty = (extensionPropertyKey: string, product?: SimpleProduct) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (product) {
            const value = event.currentTarget.checked;
            setIsGiftWrap(value);
            product.ExtensionProperties = product.ExtensionProperties || [];
            const property = product.ExtensionProperties.find((extension: CommerceProperty) => extension.Key === extensionPropertyKey);
            if (property) {
                property.Value = { BooleanValue: value };
            } else {
                product.ExtensionProperties.push({
                    Key: extensionPropertyKey,
                    Value: {
                        BooleanValue: value
                    }
                });
            }
        }
    };

    const _renderGiftWrap = (product: SimpleProduct | undefined): JSX.Element => {
        return (
            <div className='ms-buybox__is-gift-wrap'>
                <input
                    className='ms-buybox__is-gift-wrap-checkbox'
                    type='checkbox'
                    aria-label={'Add Gift Wrap'}
                    checked={isGiftWrap}
                    onChange={_updateProductExtensionProperty(isGiftWrapKey, product)}
                />
                <label className='ms-buybox__is-gift-wrap-label'>{props.resources.addGiftWrapText || 'Add Gift Wrap'}</label>
            </div>
        );
    };

    return (
        <Module {...ModuleProps}>
            <Node {...MediaGalleryContainerProps}>{props.mediaGallery}</Node>
            <Node {...ProductInfoContainerProps}>
                {title}
                {price}
                {unitOfMeasure}
                {props.bulkPurchaseLink}
                {description}
                {rating}
                {configure && _renderConfigure(configure)}
                {keyInPrice && _renderKeyInPrice(keyInPrice)}
                {quantity && _renderQuantity(quantity)}
                {inventoryLabel}
                {_renderGiftWrap(props.data.product.result)}
                {addToCart && _renderAddToCart(addToCart)}
                {findInStore && _renderFindInStore(findInStore)}
                {addToOrderTemplate && _renderAddToOrderTemplate(addToOrderTemplate)}
                {addToWishlist && _renderAddToWishlist(addToWishlist)}
                {_renderSocialShare(props.slots && props.slots.socialShare)}
                {shopSimilarLook && _renderShopSimilarItem(shopSimilarLook)}
                {shopSimilarDescription && _renderShopSimilarItem(shopSimilarDescription)}
            </Node>
        </Module>
    );
};

const _renderAddToCart = (addToCart: IBuyboxAddToCartViewProps): JSX.Element => {
    const { ContainerProps, errorBlock, button } = addToCart;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

const _renderAddToOrderTemplate = (addToOrderTemplate: IBuyboxAddToOrderTemplateViewProps): JSX.Element => {
    const { ContainerProps, errorBlock, button } = addToOrderTemplate;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

const _renderAddToWishlist = (addToWishlist: IBuyboxAddToWishlistViewProps): JSX.Element => {
    const { ContainerProps, errorBlock, button } = addToWishlist;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

const _renderConfigure = (configure: IBuyboxProductConfigureViewProps): JSX.Element => {
    const { ContainerProps, dropdowns } = configure;

    return <Node {...ContainerProps}>{dropdowns.map(_renderConfigureDropdown)}</Node>;
};

const _renderSocialShare = (socialShare: React.ReactNode[]): JSX.Element | undefined => {
    if (!socialShare || socialShare.length === 0) {
        return undefined;
    }

    return <>{socialShare[0]}</>;
};

const _renderConfigureDropdown = (dropdown: IBuyboxProductConfigureDropdownViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, errors, select } = dropdown;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
                {errors}
            </Node>
            {select}
        </Node>
    );
};

const _renderFindInStore = (findInStore: IBuyboxFindInStoreViewProps): JSX.Element => {
    const { ContainerProps, storeSelector, heading, description, errors, button, modal, productPickupOptionList } = findInStore;

    return (
        <Node {...ContainerProps}>
            {storeSelector}
            {heading}
            {productPickupOptionList}
            {description}
            {errors}
            {button}
            {modal}
        </Node>
    );
};

const _renderQuantity = (quantity: IBuyboxProductQuantityViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, input, errors } = quantity;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
                {errors}
            </Node>
            {input}
        </Node>
    );
};

const _renderKeyInPrice = (keyInPrice: IBuyboxKeyInPriceViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, input } = keyInPrice;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>{heading}</Node>
            {input}
        </Node>
    );
};

const _renderShopSimilarItem = (shopSimilarItem: IBuyboxShopSimilarLookViewProps): JSX.Element => {
    const { ContainerProps, errors, input } = shopSimilarItem;

    return (
        <Node {...ContainerProps}>
            {errors}
            {input}
        </Node>
    );
};
export default BuyboxView;