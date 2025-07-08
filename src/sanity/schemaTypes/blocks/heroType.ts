import { defineField, defineType } from "sanity";
import { TextIcon } from "@sanity/icons";

export const heroType = defineType({
    name: "hero",
    type: "object",
    groups: [
        {
            name: "content",
            title: "Content",
        },
        {
            name: "style",
            title: "Style",
        },
    ],
    fields: [
        // add subtitle
        defineField({
            name: "subtitle",
            type: "string",
            title: "Subtitle",
            description: "Subtitle for the Hero section",
            group: "content",
        }),
        defineField({
            name: "text",
            type: "blockContent",
            title: "Hero Text",
            description: "Text to display in the Hero section",
            group: "content",
        }),
        // add background color
        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'color',
            description: 'Choose a background color for the Hero',
            group: "style",
            
        }),
        // text color
        defineField({
            name: 'textColor',
            title: 'Text Color',
            type: 'color',
            description: 'Choose a text color for the Hero',
            group: "style",
        }),
        //alignment
        defineField({
            name: "alignment",
            type: "string",
            title: "Alignment",
            description: "Choose the alignment of the text in the Hero section",
            options: {
                list: ["left", "center", "right"],            
                layout: "radio",                        
            },
            initialValue: "center",
            group: "style",
        }),
    ],
    icon: TextIcon,
    preview: {
        select: {
            title: "title",
            media: "image",
        },
        prepare({ title, media }) {
            return {
                title: title ?? "Hero Block",
                media: media ?? TextIcon,
            };
        },
    },
});