// Some useful functions for the DOM

// The function to get the element by query selector
export const $ = (selector) => document.querySelector(selector);

// The function to get the element by query selector all
export const $$ = (selector) => document.querySelectorAll(selector);

// The function to create an element
export const createElement = (tag, props, ...children) => {
    const element = document.createElement(tag);
    Object.keys(props).forEach((key) => (element[key] = props[key]));
    if (children.length > 0) {
        children.forEach((child) => {
            if (typeof child === "string") {
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
    }
    return element;
};
