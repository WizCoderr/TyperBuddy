export interface BlogPostData {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    alt: string;
}

export const blogPostData: BlogPostData[] = [
    {
        id: "1",
        title: "Essential Tips for Speed, Accuracy, and Efficiency",
        date: "2021-01-01",
        description: "This is the first blog post",
        image: "",
        alt: "Placeholder image",
    },
];
