/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { buildMockModuleProps, IImageData, ILinkData } from '@msdyn365-commerce/core';
import { INavigationMenuViewProps } from '@msdyn365-commerce-modules/navigation-menu';
import { mount } from 'enzyme';
import * as React from 'react';

import {
    ICategoryPromotionalContentData,
    INavigationMenuConfig
} from '../../definition-extensions/navigation-menu.ext.props.autogenerated';
import NavigationMenuView from '../../views/navigation-menu.view';

const mockConfig: INavigationMenuConfig = {
    className: 'Mock-class2',
    enabletopMenu: true,
    enableMultilevelMenu: true
};

interface IMenuItemData {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- used in test file only
    id?: number;
    linkText?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention -- linkURL used in test file only
    linkURL?: string;
    imageSource?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention -- used in test file only
    imageDestinationURL?: string;
    subMenu?: IMenuItemData[];
    promotionalContent?: ICategoryPromotionalContentData[];
    menuSource?: string;
}
const mockFunction = jest.fn();

const linkData: ILinkData = { destinationUrl: 'https://xyz.com' };
const imageData: IImageData = { src: 'https://xyz.com/image' };
const promo: ICategoryPromotionalContentData = { categoryName: '123123', text: 'Category 1', linkUrl: linkData, image: imageData };
const moduleProps = buildMockModuleProps({}, {}, mockConfig) as INavigationMenuViewProps;
const menuData: IMenuItemData = {
    id: 1,
    linkText: 'main-menu-mock',
    linkURL: 'https://xyz.com',
    imageSource: 'abc/xyz.png',
    subMenu: [
        {
            id: 1,
            linkText: 'sub-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 1,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    imageSource: 'abc/xyz.png'
                },
                {
                    id: 11,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    imageSource: 'abc/xyz.png'
                }
            ]
        }
    ],
    promotionalContent: [promo]
};

const mockProps: INavigationMenuViewProps = {
    ...moduleProps,
    className: 'Mock-class',
    id: 'mock-test',
    menuItemData: [menuData, menuData],
    isMobileView: true,
    showCategoryImage: true,
    showPromotionalContent: true,
    Navigation: {
        moduleProps,
        className: 'ms-nav',
        tag: 'nav',
        role: 'navigation',
        'aria-label': 'Menu'
    },
    MenuList: {
        className: 'ms-nav__list',
        tag: 'ul'
    },
    ListItem: {
        className: 'ms-nav__list__item',
        tag: 'li'
    },
    DivContainer: {
        tag: 'div',
        className: 'ms-nav__feature',
        role: 'menu'
    },
    ImageDivContainer: {
        tag: 'div',
        className: 'category-image',
        role: 'menu'
    },
    Link: {
        tag: 'a',
        className: 'ms-nav__list__item__link',
        onMouseEnter: mockFunction,
        onMouseLeave: mockFunction
    },
    Button: {
        className: 'ms-nav__list__item__button',
        tag: 'button',
        onClick: mockFunction
    },
    ImageContainer: {
        className: 'ms-nav__list__item__image'
    },
    Span: {
        className: 'ms-nav__list__item__span',
        tag: 'span'
    },
    MobileDescriptionContainer: {
        className: 'ms-nav__list__mobile__container'
    },
    MobileBackButton: {
        className: 'ms-nav__list__mobile__container__button',
        tag: 'button',
        onClick: mockFunction
    },
    MobileDescriptionLabel: {
        className: 'ms-nav__list__mobile__container__span',
        tag: 'span'
    }
};
describe('Navigation Menu Unit Test', () => {
    it('View renders correctly', () => {
        const wrapper = mount(<NavigationMenuView {...mockProps} />);
        const instance = wrapper.instance() as NavigationMenuView;
        const button = wrapper.find('button');
        expect(button).toBeDefined();
        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 1 });

        // @ts-expect-error
        expect(instance._renderDisplay()).toBeDefined();
        wrapper.setProps({ isMobileView: false });
        expect(button).toBeDefined();
        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.unmount();
    });
    it('View renders correctly submenu', () => {
        const wrapper = mount(<NavigationMenuView {...mockProps} />);
        const instance = wrapper.instance() as NavigationMenuView;
        wrapper.setState({ activeMenu: 11 });

        // @ts-expect-error
        expect(instance._renderDisplay()).toBeDefined();
    });
    it('View renders correctly with menu data', () => {
        const menuDatawithlink: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            subMenu: [
                {
                    id: 1,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com'
                }
            ]
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            subMenu: [
                {
                    id: 1,
                    linkText: 'sub-menu-mock'
                }
            ]
        };
        const menuDatawithsubMenu: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com'
        };
        const wrapper = mount(<NavigationMenuView {...mockProps} isMobileView={false} />);

        const button = wrapper.find('button');
        wrapper.setState({ showImage: true, activeMenu: 1 });
        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setProps({ isMobileView: true });

        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 10 });

        wrapper.setProps({ menuItemData: [menuDatawithlink, menuDatawithlink] });
        wrapper.setProps({ menuItemData: [menuDatawithoutlink, menuDatawithoutlink] });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        wrapper.setProps({ menuItemData: [] });

        expect(wrapper.state('activeMenu')).toBe(1);
        wrapper.setProps({ menuItemData: [menuDatawithsubMenu, menuDatawithsubMenu] });
        wrapper.setProps({ isMobileView: false });
    });

    it('View renders correctly with menu data and category image', () => {
        const menuDatawithimage: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 1,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    imageSource: 'abc/xyz.png'
                }
            ]
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 1,
                    linkText: 'sub-menu-mock',
                    imageSource: 'abc/xyz.png'
                }
            ]
        };
        const menuDatawithsubMenu: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png'
        };
        const wrapper = mount(<NavigationMenuView {...mockProps} isMobileView={false} />);

        const button = wrapper.find('button');
        wrapper.setState({ showImage: true, activeMenu: 1 });
        button.at(0).simulate('click');
        wrapper.setProps({ isMobileView: true });

        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 10 });

        wrapper.setProps({ menuItemData: [menuDatawithimage, menuDatawithimage] });
        wrapper.setProps({ menuItemData: [menuDatawithoutlink, menuDatawithoutlink] });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        wrapper.setProps({ menuItemData: [] });

        expect(wrapper.state('activeMenu')).toBe(1);
        wrapper.setProps({ menuItemData: [menuDatawithsubMenu, menuDatawithsubMenu] });
        wrapper.setProps({ isMobileView: false });
    });

    const mockPropsBrowser: INavigationMenuViewProps = {
        ...moduleProps,
        className: 'Mock-class',
        id: 'mock-test',
        menuItemData: [menuData, menuData],
        isMobileView: false,
        showCategoryImage: true,
        showPromotionalContent: true,
        Navigation: {
            moduleProps,
            className: 'ms-nav',
            tag: 'nav',
            role: 'navigation',
            'aria-label': 'Menu'
        },
        MenuList: {
            className: 'ms-nav__list',
            tag: 'ul'
        },
        ListItem: {
            className: 'ms-nav__list__item',
            tag: 'li'
        },
        DivContainer: {
            tag: 'div',
            className: 'ms-nav__feature',
            role: 'menu'
        },
        ImageDivContainer: {
            tag: 'div',
            className: 'category-image',
            role: 'menu'
        },
        Link: {
            tag: 'a',
            className: 'ms-nav__list__item__link',
            onMouseEnter: mockFunction,
            onMouseLeave: mockFunction
        },
        Button: {
            className: 'ms-nav__list__item__button',
            tag: 'button',
            onClick: mockFunction
        },
        ImageContainer: {
            className: 'ms-nav__list__item__image'
        },
        Span: {
            className: 'ms-nav__list__item__span',
            tag: 'span'
        },
        MobileDescriptionContainer: {
            className: 'ms-nav__list__mobile__container'
        },
        MobileBackButton: {
            className: 'ms-nav__list__mobile__container__button',
            tag: 'button',
            onClick: mockFunction
        },
        MobileDescriptionLabel: {
            className: 'ms-nav__list__mobile__container__span',
            tag: 'span'
        }
    };
    it('View renders correctly with menu data and promotional content', () => {
        const menuDatawithimage: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 1,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    imageSource: 'abc/xyz.png'
                }
            ],
            promotionalContent: [promo]
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 1,
                    linkText: 'sub-menu-mock',
                    imageSource: 'abc/xyz.png'
                }
            ],
            promotionalContent: [promo]
        };
        const menuDatawithsubMenu: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png'
        };
        const wrapper = mount(<NavigationMenuView {...mockPropsBrowser} isMobileView={false} />);

        const button = wrapper.find('button');
        wrapper.setState({ showImage: true, activeMenu: 1 });
        const instance = wrapper.instance() as NavigationMenuView;

        // @ts-expect-error private function
        instance._renderPromotionalLink('link1', 'https://xyz.com');

        // @ts-expect-error private function
        instance._getCategoryImage('https://xyz.com/image', 'alt text');

        // @ts-expect-error private function
        instance._closeSubmenu();

        // @ts-expect-error private function
        instance._handleClickOutside({ target: null });
        button.at(0).simulate('click');
        wrapper.setProps({ isMobileView: true });

        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 10 });

        wrapper.setProps({ menuItemData: [menuDatawithimage, menuDatawithimage] });
        wrapper.setProps({ menuItemData: [menuDatawithoutlink, menuDatawithoutlink] });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        wrapper.setProps({ menuItemData: [] });

        expect(wrapper.state('activeMenu')).toBe(1);
        wrapper.setProps({ menuItemData: [menuDatawithsubMenu, menuDatawithsubMenu] });
        wrapper.setProps({ isMobileView: false });
    });
    it('View renders correctly without submenu', () => {
        const menuDatawithimage: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png'
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            imageSource: 'abc/xyz.png'
        };
        const menuDatawithoutsubMenu: IMenuItemData = {
            id: 2,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png'
        };
        const wrapper = mount(<NavigationMenuView {...mockPropsBrowser} isMobileView={false} />);

        const button = wrapper.find('button');
        wrapper.setState({ showImage: true, activeMenu: 1 });
        button.at(0).simulate('click');
        wrapper.setProps({ isMobileView: true });

        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 10 });

        wrapper.setProps({ menuItemData: [menuDatawithimage, menuDatawithimage] });
        wrapper.setProps({ menuItemData: [menuDatawithoutlink, menuDatawithoutlink] });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        wrapper.setProps({ menuItemData: [] });

        wrapper.setProps({ menuItemData: [menuDatawithoutsubMenu, menuDatawithoutsubMenu] });
        wrapper.setProps({ isMobileView: false });
        expect(wrapper).toMatchSnapshot();
    });
});