import React, { useContext, useState, useRef, forwardRef } from "react";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { EditorContext, WebsiteContext } from "../../providers/editorProvider";

// Assuming these types are defined in your editorProvider
type Styles = React.CSSProperties;
type EditorContent = string | EditorElement[] | null;

interface EditorElement {
    parent: string;
    id: string;
    kind: "Elem" | "Container";
    styles: Styles;
    contents: EditorContent;
}



// Helper function to convert camelCase to kebab-case for CSS properties
const toKebabCase = (str: string): string => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

// Recursive function to traverse the JSON tree and generate HTML/CSS
const generateHtmlAndCss = (element: EditorElement, styleMap: Record<string, string> = {}): { html: string; styleMap: Record<string, string> } => {
    if (!element || !element.kind) {
        return { html: '', styleMap };
    }

    const className = `e-${element.id}`;
    if (element.styles && Object.keys(element.styles).length > 0) {
        const styleString = Object.entries(element.styles)
            .map(([key, value]) => `${toKebabCase(key)}: ${value};`)
            .join(' ');
        styleMap[className] = styleString;
    }

    const tagName = element.kind.toLowerCase() === 'elem' ? 'div' : 'div';
    let innerContent = '';

    if (element.contents && Array.isArray(element.contents)) {
        let childHtml = '';
        element.contents.forEach(child => {
            const result = generateHtmlAndCss(child as EditorElement, styleMap);
            childHtml += result.html;
        });
        innerContent = childHtml;
    } else {
        innerContent = typeof element.contents === 'string' ? element.contents : '';
    }

    const htmlTag = `<${tagName} class="${className}">${innerContent}</${tagName}>`;
    return { html: htmlTag, styleMap };
};

// Function to create the content of the CSS file
const createCssFile = (styleMap: Record<string, string>): string => {
    let cssString = '';
    for (const [className, styles] of Object.entries(styleMap)) {
        cssString += `.${className} { ${styles} }\n`;
    }
    return cssString;
};

// Function to create the content of the HTML file
const createHtmlFile = (htmlContent: string, title: string = "Generated Website"): string => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    ${htmlContent}
</body>
</html>
`;
};

// This is a placeholder for your actual Button component,
// using forwardRef to allow `useRef` to work correctly.
const Button = forwardRef<HTMLButtonElement, { children: React.ReactNode; onClick: () => void; disabled: boolean; variant: string }>(
    ({ children, onClick, disabled }, ref) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                disabled={disabled}
                style={{
                    padding: '12px 24px',
                    background: disabled
                        ? '#ccc'
                        : 'linear-gradient(to bottom right, #ffd700, #f0c14b, #b8860b)',
                    color: 'black',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.6 : 1,
                }}
            >
                {children}
            </button>
        );
    }
);

const GeneratenDownload = () => {
    const editorContext = useContext(EditorContext);
    const websiteContext = useContext(WebsiteContext);
    const [isLoading, setIsLoading] = useState(false);
    const downloadBtnRef = useRef<HTMLButtonElement>(null);

    // This check ensures the component doesn't crash if contexts are not provided.
    if (!editorContext || !websiteContext) {
        console.error("Contexts not found. GeneratenDownload must be used within an EditorProvider and WebsiteProvider.");
        return null;
    }

    const { state: website } = editorContext;
    const { state: websiteData } = websiteContext;

    const handleDownload = async () => {
        setIsLoading(true);
        if (downloadBtnRef.current) {
            downloadBtnRef.current.disabled = true;
        }

        try {
            if (!website) {
                throw new Error('No website data available');
            }

            const { html, styleMap } = generateHtmlAndCss(website);
            const finalHtml = createHtmlFile(html, websiteData.title);
            const finalCss = createCssFile(styleMap);

            const zip = new JSZip();
            zip.file("index.html", finalHtml);
            zip.file("styles.css", finalCss);

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "website.zip");

        } catch (e) {
            console.error("Error generating or zipping files:", e);
        } finally {
            setIsLoading(false);
            if (downloadBtnRef.current) {
                downloadBtnRef.current.disabled = false;
            }
        }
    };

    return (
        <Button
            ref={downloadBtnRef}
            onClick={handleDownload}
            disabled={isLoading}
            variant='auth'
        >
            {isLoading ? 'Generating...' : 'Download'}
        </Button>
    );
};

export default GeneratenDownload;
